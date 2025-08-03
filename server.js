
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
const users = []; // Stores user objects: { id, email, password, is_premium, premium_expiry }
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
            premium_expiry: null
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
        return res.status(500).json({ error: 'Layanan AI tidak dikonfigurasi di server.' });
    }

    try {
        const { base64ImageData, persona, theme } = req.body;
        const userRecord = users.find(u => u.id === req.user.id);

        if (!userRecord) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
        }
        if (!base64ImageData || !persona) {
            return res.status(400).json({ error: 'Data gambar dan persona diperlukan.' });
        }

        let backgroundImageUrl = null;
        if (theme && userRecord.is_premium) {
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
                backgroundImageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
            } catch (error) {
                console.error("Gagal membuat background AI:", error);
            }
        }
        
        let systemInstruction = "";
        let responseSchema;
        const imageData = base64ImageData.split(',')[1];
        const themeInstruction = theme ? `\nSANGAT PENTING: Sesuaikan semua rekomendasi (caption, hashtag, lagu) dengan tema yang diberikan pengguna: "${theme}".` : "";

        if (persona === 'creator') {
            systemInstruction = `Anda adalah seorang ahli strategi SEO dan media sosial. Analisis gambar ini secara mendalam.
1.  **Buat Caption SEO-Friendly:** Tulis caption deskriptif (sekitar 20-30 kata) yang natural, memasukkan keyword relevan, dan diakhiri dengan ajakan (call-to-action).
2.  **Buat Alt Text:** Tulis deskripsi Alt Text yang jelas dan ringkas.
3.  **Riset Hashtag:** Berikan 2 set hashtag: 5 hashtag 'umum' dengan volume tinggi, dan 5 hashtag 'spesifik' yang lebih niche.
4.  **Pilih Lagu:** Rekomendasikan SATU lagu yang sedang viral atau sangat populer di TikTok/Reels saat ini yang nuansanya sangat cocok dengan gambar. Prioritaskan lagu yang dikenal luas.` + themeInstruction;
            responseSchema = { type: Type.OBJECT, properties: { seoCaption: { type: Type.STRING }, altText: { type: Type.STRING }, hashtags: { type: Type.OBJECT, properties: { umum: { type: Type.ARRAY, items: { type: Type.STRING } }, spesifik: { type: Type.ARRAY, items: { type: Type.STRING } } } }, song: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, artist: { type: Type.STRING } }, required: ["title", "artist"] } }, required: ["seoCaption", "altText", "hashtags", "song"] };
        } else { // casual
            systemInstruction = `Anda adalah orang yang ada di dalam foto ini. Anda sedang membuat postingan untuk media sosial Anda sendiri. Kepribadian Anda adalah Gen Z: keren, ekspressif, dan seringkali reflektif. Gaya bicaramu santai, campur-campur bahasa Indonesia dan Inggris.
Analisis gambar ini dari sudut pandang PERTAMA (first-person). Rasakan vibe, ekspresi, dan lingkunganmu di dalam foto. Berdasarkan itu, berikan LIMA ide konten yang berbeda.
ATURAN WAJIB, HARUS DIPATUHI:
1.  **POV & Caption:** Kamu ADALAH subjek di foto. Semua caption harus dari sudut pandangmu (menggunakan kata seperti "gue", "aku", "I", "my"). Caption WAJIB SUPER SINGKAT (MAKSIMAL 5 KATA).
2.  **Mood:** Ini adalah nama vibe atau perasaanmu saat foto itu diambil. Harus kreatif dan slang.
3.  **LARANGAN:** Dilarang keras bertingkah seperti AI yang menganalisis. Dilarang mengomentari "orang di foto". Kamu ADALAH orang itu.
4.  **Hashtags & Lagu:** Hashtag (2-3) harus singkat dan mendukung mood-mu. Lagu HARUS viral atau populer di TikTok/Reels dan benar-benar cocok dengan perasaanmu di foto.
${themeInstruction}`;
            responseSchema = { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { mood: { type: Type.STRING }, caption: { type: Type.STRING }, hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }, song: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, artist: { type: Type.STRING } }, required: ["title", "artist"] } }, required: ["mood", "caption", "hashtags", "song"] } };
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
        const analysisResult = Array.isArray(parsedJson) ? parsedJson : [parsedJson];

        res.json({ analysis: analysisResult, background: backgroundImageUrl });
    } catch (error) {
        console.error("Error in /api/analyze:", error);
        res.status(500).json({ error: 'Gagal menganalisis konten.' });
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
