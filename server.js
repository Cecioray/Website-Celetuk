

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
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- Environment Variables & Constants ---
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'YOUR_MIDTRANS_SERVER_KEY';
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || 'YOUR_MIDTRANS_CLIENT_KEY';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default-secret-key-for-development-should-be-changed';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SALT_ROUNDS = 10;

// --- In-Memory Database (for demonstration) ---
const users = []; // Stores user objects: { id, email, password, is_premium, premium_expiry, generation_credits }
const history = {}; // Keyed by user ID, stores an array of history items
let userIdCounter = 1;

// --- Midtrans Snap Instance ---
const snap = new midtransClient.Snap({
    isProduction: false, // Set to true for production environment
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
});

// --- Google AI Instance ---
let ai;
if (GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
} else {
    console.warn('--- WARNING: GEMINI_API_KEY is not set in the .env file. AI features will be disabled. ---');
}


// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET_KEY, (err, userPayload) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403); // Forbidden
        }
        req.user = userPayload; // Contains { id, email }
        next();
    });
};


// --- AI Helper Functions ---

/**
 * Generates a background image using AI.
 * @param {string} theme - The user-provided theme for the background.
 * @returns {Promise<string|null>} - A promise that resolves to a base64 data URL of the image, or null on failure.
 */
async function generateAiBackground(theme) {
    try {
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: `cinematic, high resolution, photorealistic background: ${theme}`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });
        const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("Gagal membuat background AI:", error);
        return null; // Return null on failure so Promise.all doesn't reject the whole batch
    }
}

/**
 * Analyzes the image content using AI.
 * @param {string} base64ImageData - The base64 encoded image data.
 * @param {'creator'|'casual'} persona - The selected user persona.
 * @param {string} theme - The optional theme for context.
 * @returns {Promise<Object>} - A promise that resolves to the parsed JSON analysis from the AI.
 */
async function getAiAnalysis(base64ImageData, persona, theme) {
    const imageData = base64ImageData.split(',')[1];
    const themeInstruction = theme ? `\nSANGAT PENTING: Sesuaikan semua rekomendasi (caption, hashtag, lagu) dengan tema yang diberikan pengguna: "${theme}".` : "";

    let systemInstruction = "";
    let responseSchema;
    const songSchema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: 'Judul lagu.' },
            artist: { type: Type.STRING, description: 'Nama artis.' },
            album_art_url: { type: Type.STRING, description: 'URL gambar sampul album (dari Spotify, dll). Opsional.' },
            preview_url: { type: Type.STRING, description: 'URL pratinjau audio 30 detik. Opsional.' }
        },
        required: ["title", "artist"]
    };

    if (persona === 'creator') {
        systemInstruction = `Anda adalah seorang social media manager Gen Z yang strategis, kreatif, dan ahli dalam membuat konten viral yang tetap terlihat profesional. Analisis gambar ini untuk menghasilkan konten yang engaging dan optimal untuk Instagram/TikTok.
1.  **Caption SEO:** Buat caption yang menarik dengan 'hook' yang kuat di awal (sekitar 25-40 kata). Gunakan gaya bahasa modern dan relevan untuk audiens muda, tapi tetap informatif dan profesional. Sisipkan keyword yang relevan secara natural.
2.  **Alt Text:** Deskripsi gambar yang jelas, akurat, dan kaya keyword untuk aksesibilitas dan SEO.
3.  **Hashtag:** Berikan 5 hashtag umum (volume tinggi) dan 5 hashtag spesifik (niche, relevan dengan gambar dan caption).
4.  **Lagu:** SATU rekomendasi lagu yang sedang tren di TikTok/Reels yang cocok dengan nuansa konten. Sertakan judul, artis, dan jika memungkinkan, URL publik untuk gambar sampul album dan pratinjau audio 30 detik.` + themeInstruction;
        responseSchema = { type: Type.OBJECT, properties: { seoCaption: { type: Type.STRING }, altText: { type: Type.STRING }, hashtags: { type: Type.OBJECT, properties: { umum: { type: Type.ARRAY, items: { type: Type.STRING } }, spesifik: { type: Type.ARRAY, items: { type: Type.STRING } } } }, song: songSchema }, required: ["seoCaption", "altText", "hashtags", "song"] };
    } else { // casual
        systemInstruction = `Anda adalah seorang content creator Gen Z yang sangat ahli membuat konten viral. Tugas Anda adalah melihat gambar dan memberikan LIMA ide konten dari sudut pandang yang unik dan 'relatable'.
- Gaya Bahasa: Gunakan bahasa gaul Gen Z yang relevan (contoh: "spill", "pov", "vibes", "era"). Singkat, edgy, dan hindari kata-kata 'cringe' atau terlalu formal.
- Jika ada subjek (manusia/hewan): Buat caption seolah-olah subjek itu yang berbicara (Point of View).
- Jika tidak ada subjek (pemandangan/makanan): Buat caption dari sudut pandang orang yang mengambil foto, fokus pada celetukan lucu.
- PENTING: Hindari caption narsis (contoh: "Aku cantik banget"). Fokus pada humor, observasi unik, atau perasaan yang tulus.
Setiap ide WAJIB berisi:
1.  **Mood:** Vibe atau perasaan (contoh: 'Lagi chill', 'Laper era', 'Random thoughts').
2.  **Caption:** Super singkat dan jenaka. MAKSIMAL 6 KATA.
3.  **Hashtags:** 3 hashtag yang spesifik dan sedang tren.
4.  **Lagu:** Satu lagu viral (TikTok/Reels) yang cocok dengan mood. Sertakan judul, artis, dan jika memungkinkan, URL publik untuk sampul album dan pratinjau audio.` + themeInstruction;
        responseSchema = { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { mood: { type: Type.STRING }, caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }, song: songSchema }, required: ["mood", "caption", "hashtags", "song"] } };
    }

    const imagePart = { inlineData: { mimeType: 'image/jpeg', data: imageData } };
    const textPart = { text: "Analisis gambar ini dan berikan rekomendasi konten." };

    const analysisResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [textPart, imagePart] },
        config: { systemInstruction: systemInstruction, responseMimeType: "application/json", responseSchema: responseSchema },
    });
    
    const jsonText = analysisResponse.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return Array.isArray(parsedJson) ? parsedJson : [parsedJson];
}


// --- API Endpoints ---

// GET /api/config - Provides the Midtrans Client Key to the frontend
app.get('/api/config', (req, res) => {
    res.json({ midtransClientKey: MIDTRANS_CLIENT_KEY });
});

// POST /api/register - User registration
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password dibutuhkan.' });
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah terdaftar.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = {
            id: userIdCounter++,
            email: email,
            password: hashedPassword,
            is_premium: false,
            premium_expiry: null,
            generation_credits: 5 // Free trial credits for new users
        };
        users.push(newUser);

        console.log(`User registered: ${newUser.email}`);
        res.status(201).json({ message: 'Pendaftaran berhasil. Silakan login.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

// POST /api/login - User login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Email atau password salah.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email atau password salah.' });
        }

        const tokenPayload = { id: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: '7d' });

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

// GET /api/me - Get current user's profile
app.get('/api/me', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
    }

    // Automatically check for expired premium status on profile fetch
    if (user.is_premium && user.premium_expiry && Date.now() > user.premium_expiry) {
        user.is_premium = false;
        user.premium_expiry = null;
        console.log(`Premium expired for user ${user.email}`);
    }

    const { password, ...userData } = user;
    res.json(userData);
});

// POST /api/analyze - Main endpoint for AI analysis and background generation
app.post('/api/analyze', authenticateToken, async (req, res) => {
    if (!ai) {
        return res.status(503).json({ error: 'Layanan AI tidak dikonfigurasi di server.' });
    }

    try {
        const { base64ImageData, persona, theme } = req.body;
        const userRecord = users.find(u => u.id === req.user.id);

        if (!userRecord) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }
        
        // Check if user has generation credits or is premium
        const canGenerate = userRecord.is_premium || (userRecord.generation_credits && userRecord.generation_credits > 0);
        
        if (!canGenerate) {
            return res.status(403).json({ 
                error: 'Kuota gratis Anda telah habis. Silakan upgrade ke Pro untuk melanjutkan.',
                quotaExceeded: true 
            });
        }
        
        if (!base64ImageData || !persona) {
            return res.status(400).json({ error: 'Data gambar dan persona diperlukan.' });
        }
        
        // Create promises for both AI tasks to run them in parallel
        const analysisPromise = getAiAnalysis(base64ImageData, persona, theme);
        const backgroundPromise = (theme && userRecord.is_premium)
            ? generateAiBackground(theme)
            : Promise.resolve(null);

        // Await both promises to complete
        const [analysisResult, backgroundImageUrl] = await Promise.all([analysisPromise, backgroundPromise]);
        
        if (!analysisResult || (Array.isArray(analysisResult) && analysisResult.length === 0)) {
            throw new Error("Respons AI tidak valid atau kosong. Coba lagi.");
        }

        // Decrement credits if user is not premium
        if (!userRecord.is_premium) {
            userRecord.generation_credits = Math.max(0, userRecord.generation_credits - 1);
            console.log(`User ${userRecord.email} used a credit. Remaining: ${userRecord.generation_credits}`);
        }

        res.json({ analysis: analysisResult, background: backgroundImageUrl });

    } catch (error) {
        console.error("Error in /api/analyze:", error);
        if (error instanceof SyntaxError) {
             return res.status(500).json({ error: 'Gagal mem-parsing respons dari AI. Coba lagi.' });
        }
        res.status(500).json({ error: 'Gagal menganalisis konten. Server AI mungkin sedang sibuk.' });
    }
});


// POST /api/create-transaction - Initiate a payment with Midtrans
app.post('/api/create-transaction', authenticateToken, async (req, res) => {
    try {
        const user = users.find(u => u.id === req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }

        const { amount } = req.body;
        const order_id = `CELETUK-${user.id}-${Date.now()}`;
        
        const parameter = {
            transaction_details: {
                order_id: order_id,
                gross_amount: amount
            },
            customer_details: {
                email: user.email,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        res.json({ token: transaction.token });

    } catch (error) {
        console.error('Midtrans transaction creation error:', error);
        res.status(500).json({ error: 'Gagal membuat transaksi Midtrans.' });
    }
});

// POST /api/midtrans-notification - Webhook handler for Midtrans
app.post('/api/midtrans-notification', async (req, res) => {
    try {
        const notificationJson = req.body;
        const statusResponse = await snap.transaction.notification(notificationJson);
        
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        console.log(`Received Midtrans notification for order ${orderId}: ${transactionStatus}`);

        if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
            if (fraudStatus == 'accept') {
                const userId = parseInt(orderId.split('-')[1]);
                const user = users.find(u => u.id === userId);
                if (user) {
                    user.is_premium = true;
                    // When upgrading, credits are no longer needed
                    user.generation_credits = 0;
                    user.premium_expiry = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 days from now
                    console.log(`User ${user.email} (ID: ${userId}) is now premium.`);
                } else {
                     console.error(`User with ID ${userId} not found for order ${orderId}.`);
                }
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Midtrans notification error:', error);
        res.status(500).send('Error processing notification');
    }
});

// GET /api/history - Get user's analysis history
app.get('/api/history', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user || !user.is_premium) {
        return res.status(403).json({ error: 'Fitur riwayat hanya untuk pengguna Premium.' });
    }
    
    const userHistory = history[req.user.id] || [];
    res.json(userHistory);
});

// POST /api/history - Save a new analysis to history
app.post('/api/history', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
     if (!user || !user.is_premium) {
        return res.status(403).json({ error: 'Hanya pengguna Premium yang bisa menyimpan riwayat.' });
    }
    
    const historyItem = req.body;
    if (!history[req.user.id]) {
        history[req.user.id] = [];
    }
    
    history[req.user.id].unshift(historyItem);
    
    // Optional: limit history size to prevent memory issues
    if (history[req.user.id].length > 50) {
        history[req.user.id].pop();
    }
    
    res.status(201).json({ message: 'Riwayat berhasil disimpan.' });
});

// Serve static files from 'public' directory (for video background)
app.use(express.static('public'));

// Serve static files from the 'dist' directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Final catch-all to serve index.html for any non-API routes.
// This is essential for single-page applications using client-side routing.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (MIDTRANS_SERVER_KEY.startsWith('YOUR_') || JWT_SECRET_KEY.startsWith('default-')) {
        console.warn('--- WARNING: Server is using default development keys. Set credentials in a .env file for production. ---');
    }
    if(!GEMINI_API_KEY) {
        console.warn('--- WARNING: GEMINI_API_KEY is not set. AI features will not work. ---');
    }
});