/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const midtransClient = require('midtrans-client');
const path = require('path');
const { GoogleGenAI, Type } = require('@google/genai');
const { Pool } = require('pg');
const axios = require('axios');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

// --- Configuration ---
const app = express();
const PORT = process.env.PORT || 3000;
const SALT_ROUNDS = 10;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- PostgreSQL Database Connection (Neon) ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for Neon DB
    }
});

const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                is_premium BOOLEAN DEFAULT FALSE,
                premium_expiry BIGINT,
                generation_credits INTEGER DEFAULT 5
            );
        `);
        // Add columns for password reset if they don't exist
        await client.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS reset_password_token TEXT,
            ADD COLUMN IF NOT EXISTS reset_password_expires BIGINT;
        `);
        await client.query(`
            CREATE TABLE IF NOT EXISTS history (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                thumbnail_data_url TEXT NOT NULL,
                result_data TEXT NOT NULL,
                persona TEXT NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
        `);
        console.log("PostgreSQL tables are ready.");
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        client.release();
    }
};

// --- External Service Clients ---
const snap = new midtransClient.Snap({
    isProduction: process.env.NODE_ENV === 'production',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

let ai;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} else {
    console.warn('WARNING: GEMINI_API_KEY is not set. AI features will be disabled.');
}

// --- Spotify API Helpers ---
let spotifyToken = { value: null, expires: 0 };

const getSpotifyToken = async () => {
    if (spotifyToken.value && spotifyToken.expires > Date.now()) {
        return spotifyToken.value;
    }
    try {
        const credentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`
            }
        });
        const tokenData = response.data;
        spotifyToken = {
            value: tokenData.access_token,
            expires: Date.now() + (tokenData.expires_in - 300) * 1000 // Refresh 5 mins before expiry
        };
        console.log("New Spotify token obtained.");
        return spotifyToken.value;
    } catch (error) {
        console.error("Error getting Spotify token:", error.response ? error.response.data : error.message);
        return null;
    }
};

const searchSpotifyTrack = async (query, token) => {
    if (!token) return null;
    try {
        const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
            params: { q: query, type: 'track', limit: 1 },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const track = searchResponse.data.tracks.items[0];
        if (track) {
            let artist_image_url = null;
            // Get artist image from the primary artist
            if (track.artists && track.artists[0] && track.artists[0].id) {
                try {
                    const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${track.artists[0].id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    artist_image_url = artistResponse.data.images[0]?.url;
                } catch (artistError) {
                     console.error("Error fetching Spotify artist:", artistError.response ? artistError.response.data : artistError.message);
                     // Non-fatal, continue without artist image
                }
            }
            return {
                preview_url: track.preview_url,
                album_art_url: track.album.images[0]?.url,
                artist_image_url: artist_image_url,
            };
        }
        return null;
    } catch (error) {
        console.error("Error searching Spotify:", error.response ? error.response.data : error.message);
        return null;
    }
};

// --- AI Helper Function ---
async function getAiAnalysis(base64ImageData, persona, theme) {
    const imageData = base64ImageData.split(',')[1];
    const systemInstruction = `
    Anda adalah seorang content creator Gen Z yang sangat ahli dalam membuat konten viral dan estetik untuk Instagram & TikTok. Gaya bahasa Anda santai, cerdas, relevan, dan seringkali "nyeleneh" atau jenaka. Anda adalah teman yang suka nyeletuk hal-hal lucu dan tak terduga saat melihat sebuah foto.

    TUGAS UTAMA ANDA:
    Analisis gambar yang diberikan dan buatkan 5 OPSI KONTEN LENGKAP yang berbeda. Setiap opsi harus terasa seperti satu ide utuh yang orisinal.

    ATURAN PALING KETAT UNTUK SETIAP OPSI:
    1.  **Mood**: Tuliskan satu kata atau frasa singkat yang menggambarkan vibe atau perasaan (contoh: 'Mode serius', 'Era nostalgia', 'Random thoughts', 'Lagi OTW').
    2.  **Caption**: Buat satu caption yang SUPER SINGKAT (MAKSIMAL 7 KATA), witty, dan relevan dengan gambar. Fokus pada observasi unik, celetukan jenaka, atau pemikiran random yang terlintas.
        -   **GAYA BAHASA**: Gunakan gaya "celetuk". Contoh: lihat foto orang pakai kacamata hitam, caption bisa jadi "Ada bambang pamungkas nih". Lihat foto pemandangan, caption bisa "Bumi lagi cakep banget hari ini".
        -   **HINDARI KERAS FRASA KLISÉ & CRINGE**: Jangan pernah gunakan 'POV', 'main character', 'outfit on point', 'vibe check', "healing", "candu", atau frasa lain yang sudah terlalu umum dan basi. Jadilah orisinal dan segar. Jangan terdengar sombong atau pamer.
    3.  **Hashtags**: Berikan 3 hashtag yang spesifik dan estetik (tanpa tanda #). Hindari hashtag super generik.
    4.  **Lagu**: Berikan 1 rekomendasi lagu yang sedang tren atau sangat cocok dengan mood. Formatnya harus: 'Judul Lagu oleh Nama Artis'.
    5.  **TEMA (JIKA ADA)**: Jika pengguna memberikan tema "${theme || 'tidak ada'}", gabungkan secara alami dan kreatif ke dalam ide konten.

    FORMAT OUTPUT:
    Kembalikan HANYA dalam format array JSON yang valid dan bersih. Setiap elemen dalam array adalah satu objek ide konten.
    `;

    const responseSchema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                mood: { type: Type.STRING },
                caption: { type: Type.STRING },
                hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                song: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, artist: { type: Type.STRING } } }
            },
            required: ["mood", "caption", "hashtags", "song"]
        }
    };

    const imagePart = { inlineData: { mimeType: 'image/jpeg', data: imageData } };
    const textPart = { text: "Analyze this image and generate content packages based on the system instruction." };

    const analysisResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
        config: { systemInstruction, responseMimeType: "application/json", responseSchema },
    });
    
    const jsonText = analysisResponse.text.trim();
    return JSON.parse(jsonText);
}


// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userPayload) => {
        if (err) return res.sendStatus(403);
        req.user = userPayload; // Contains { id, email }
        next();
    });
};


// --- API Endpoints ---

app.get('/api/config', (req, res) => {
    res.json({ midtransClientKey: process.env.MIDTRANS_CLIENT_KEY });
});

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
        
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        await pool.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2)`, [email, passwordHash]);
        res.status(201).json({ message: 'Registration successful. Please log in.' });
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Email is already registered.' });
        console.error('Registration error:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        
        const tokenPayload = { id: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

app.get('/api/me', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(`SELECT id, email, is_premium, premium_expiry, generation_credits FROM users WHERE id = $1`, [req.user.id]);
        let user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found.' });
        
        if (user.is_premium && user.premium_expiry && Date.now() > user.premium_expiry) {
            await pool.query(`UPDATE users SET is_premium = FALSE, premium_expiry = NULL WHERE id = $1`, [user.id]);
            user.is_premium = false;
        }
        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to retrieve user data.' });
    }
});

app.post('/api/analyze', authenticateToken, async (req, res) => {
    if (!ai) return res.status(503).json({ error: 'AI service is not configured on the server.' });

    try {
        const { base64ImageData, persona, theme } = req.body;
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
        const user = userResult.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (!user.is_premium && user.generation_credits <= 0) {
            return res.status(403).json({ error: 'Your free quota has been used up.', quotaExceeded: true });
        }
        if (!base64ImageData || !persona) return res.status(400).json({ error: 'Image data and persona are required.' });

        const analysisResults = await getAiAnalysis(base64ImageData, persona, theme);

        const spotifyApiToken = await getSpotifyToken();
        const enrichedResults = await Promise.all(analysisResults.map(async (idea) => {
            if (idea.song && idea.song.title && idea.song.artist) {
                const spotifyData = await searchSpotifyTrack(`${idea.song.title} ${idea.song.artist}`, spotifyApiToken);
                if (spotifyData) {
                    idea.song = { ...idea.song, ...spotifyData };
                }
            }
            return idea;
        }));
        
        if (!user.is_premium) {
            await pool.query('UPDATE users SET generation_credits = generation_credits - 1 WHERE id = $1', [user.id]);
        }
        
        res.json({ analysis: enrichedResults });
    } catch (error) {
        console.error("Error in /api/analyze:", error);
        res.status(500).json({ error: error.message || 'Failed to analyze content.' });
    }
});

// --- PASSWORD RESET ENDPOINTS ---

app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            // To prevent email enumeration, always return a success-like message.
            return res.json({ message: 'If your email is registered, you will receive a reset link.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000; // 1 hour expiry

        await pool.query(
            'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3',
            [token, expires, user.email]
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Use the production URL for the reset link
        const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${token}`;

        await transporter.sendMail({
            to: user.email,
            from: `Celetuk <${process.env.EMAIL_USER}>`,
            subject: 'Reset Password untuk Akun Celetuk Anda',
            text: `Anda menerima email ini karena Anda (atau orang lain) meminta reset password untuk akun Anda.\n\n` +
                  `Silakan klik link berikut, atau salin dan tempel di browser Anda untuk melanjutkan:\n\n` +
                  `${resetLink}\n\n` +
                  `Link ini akan kedaluwarsa dalam 1 jam.\n\n`+
                  `Jika Anda tidak meminta ini, silakan abaikan email ini dan password Anda akan tetap sama.\n`
        });

        res.json({ message: 'Email reset password telah dikirim.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Gagal mengirim email reset.' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;
        const userResult = await pool.query(
            'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > $2',
            [token, Date.now()]
        );
        const user = userResult.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Token reset password tidak valid atau sudah kedaluwarsa.' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        await pool.query(
            'UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
            [passwordHash, user.id]
        );
        
        res.json({ message: 'Password berhasil direset. Silakan login.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Gagal mereset password.' });
    }
});


// --- PAYMENT & HISTORY ENDPOINTS ---
app.post('/api/create-transaction', authenticateToken, async (req, res) => {
    try {
        const { amount } = req.body;
        const order_id = `CELETUK-${req.user.id}-${Date.now()}`;
        const parameter = {
            transaction_details: { order_id, gross_amount: amount },
            customer_details: { email: req.user.email },
        };
        const transaction = await snap.createTransaction(parameter);
        res.json({ token: transaction.token });
    } catch (error) {
        console.error('Midtrans transaction error:', error);
        res.status(500).json({ error: 'Failed to create Midtrans transaction.' });
    }
});

app.post('/api/midtrans-notification', async (req, res) => {
    try {
        const statusResponse = await snap.transaction.notification(req.body);
        const { order_id, transaction_status, fraud_status } = statusResponse;

        if ((transaction_status === 'capture' || transaction_status === 'settlement') && fraud_status === 'accept') {
            const userId = parseInt(order_id.split('-')[1], 10);
            if (!isNaN(userId)) {
                const expiryTimestamp = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days
                await pool.query(`UPDATE users SET is_premium = TRUE, premium_expiry = $1, generation_credits = 0 WHERE id = $2`, [expiryTimestamp, userId]);
                console.log(`User ID ${userId} is now premium.`);
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Midtrans notification error:', error);
        res.status(500).send('Error processing notification');
    }
});

app.get('/api/history', authenticateToken, async (req, res) => {
    try {
        const userResult = await pool.query('SELECT is_premium FROM users WHERE id = $1', [req.user.id]);
        if (!userResult.rows[0]?.is_premium) return res.status(403).json({ error: 'History feature is for Premium users only.' });

        const historyResult = await pool.query('SELECT * FROM history WHERE user_id = $1 ORDER BY created_at DESC', [req.user.id]);
        const formattedHistory = historyResult.rows.map(item => ({
            id: item.id,
            thumbnailDataUrl: item.thumbnail_data_url,
            resultData: JSON.parse(item.result_data),
            persona: item.persona,
            date: new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
        }));
        res.json(formattedHistory);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Failed to load history.' });
    }
});

app.post('/api/history', authenticateToken, async (req, res) => {
    try {
        const userResult = await pool.query('SELECT is_premium FROM users WHERE id = $1', [req.user.id]);
        if (!userResult.rows[0]?.is_premium) return res.status(403).json({ error: 'Only Premium users can save history.' });

        const { thumbnailDataUrl, resultData, persona } = req.body;
        await pool.query('INSERT INTO history (user_id, thumbnail_data_url, result_data, persona) VALUES ($1, $2, $3, $4)', 
            [req.user.id, thumbnailDataUrl, JSON.stringify(resultData), persona]);
        res.status(201).json({ message: 'History saved successfully.' });
    } catch (error) {
        console.error('Error saving history:', error);
        res.status(500).json({ error: 'Failed to save history.' });
    }
});

// --- Serve Frontend ---
// This should be after all API routes
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    createTables();
});