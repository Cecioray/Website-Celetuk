
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const midtransClient = require('midtrans-client');
require('dotenv').config();

const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- Environment Variables & Constants ---
// Gunakan variabel environment atau sediakan placeholder untuk pengembangan.
// Ini mencegah server crash jika file .env tidak ada.
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'YOUR_MIDTRANS_SERVER_KEY';
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || 'YOUR_MIDTRANS_CLIENT_KEY';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default-secret-key-for-development-should-be-changed';
const SALT_ROUNDS = 10;

// --- In-Memory Database ---
const users = [];
const history = {}; // Diindeks berdasarkan ID pengguna
let userIdCounter = 1;

// --- Midtrans Snap Instance ---
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: MIDTRANS_SERVER_KEY,
    clientKey: MIDTRANS_CLIENT_KEY
});

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};


// --- API Endpoints ---

// GET /api/config - Menyediakan Kunci Klien Midtrans ke frontend
app.get('/api/config', (req, res) => {
    res.json({ midtransClientKey: MIDTRANS_CLIENT_KEY });
});

// POST /api/register - Pendaftaran pengguna
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email dan password diperlukan." });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "Email sudah terdaftar." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = {
            id: userIdCounter++,
            email,
            password: hashedPassword,
            is_premium: false,
            premium_expiry: null,
        };
        users.push(newUser);
        history[newUser.id] = [];
        console.log(`Pengguna terdaftar: ${email}`);
        res.status(201).json({ message: "Registrasi berhasil. Silakan login." });
    } catch (error) {
        res.status(500).json({ error: "Gagal mendaftarkan pengguna." });
    }
});

// POST /api/login - Login pengguna
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ error: "Email atau password salah." });
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const tokenPayload = { id: user.id, email: user.email };
            const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: '1d' });
            res.json({ token });
        } else {
            res.status(400).json({ error: "Email atau password salah." });
        }
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan saat login." });
    }
});

// GET /api/me - Mendapatkan profil pengguna saat ini
app.get('/api/me', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }
    const { password, ...userProfile } = user;
    res.json(userProfile);
});

// POST /api/create-transaction - Membuat transaksi pembayaran Midtrans
app.post('/api/create-transaction', authenticateToken, (req, res) => {
    if (MIDTRANS_SERVER_KEY === 'YOUR_MIDTRANS_SERVER_KEY') {
        return res.status(500).json({ error: "Fitur pembayaran tidak aktif. Kunci Midtrans belum diatur di server." });
    }
    
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    const orderId = `CELETUK-${user.id}-${Date.now()}`;
    const amount = 10000;

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: amount,
        },
        customer_details: {
            email: user.email,
        },
        item_details: [{
            id: 'PREMIUM-1-MONTH',
            price: amount,
            quantity: 1,
            name: "Celetuk Premium (1 Bulan)",
            category: "Digital Subscription"
        }],
        callbacks: {
            finish: `http://localhost:8080` // Redirect pengguna setelah pembayaran
        }
    };

    snap.createTransaction(parameter)
        .then(transaction => {
            res.json({ token: transaction.token });
        })
        .catch(error => {
            console.error("Gagal membuat transaksi Midtrans:", error);
            res.status(500).json({ error: "Gagal membuat transaksi pembayaran." });
        });
});

// POST /api/midtrans-notification - Menangani webhook dari Midtrans
app.post('/api/midtrans-notification', async (req, res) => {
    const notificationJson = req.body;
    
    try {
        const statusResponse = await snap.transaction.notification(notificationJson);
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        console.log(`Notifikasi Midtrans diterima. Order ID: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);

        if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
            if (fraudStatus == 'accept') {
                const userId = parseInt(orderId.split('-')[1]);
                const user = users.find(u => u.id === userId);
                if (user && !user.is_premium) {
                    user.is_premium = true;
                    // Atur kedaluwarsa 30 hari dari sekarang
                    user.premium_expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
                    console.log(`Pengguna ID ${userId} (${user.email}) telah di-upgrade ke Premium.`);
                }
            }
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error("Kesalahan pemrosesan notifikasi Midtrans:", error.message);
        res.status(500).send('Error memproses notifikasi');
    }
});


// GET /api/history - Mendapatkan riwayat analisis pengguna
app.get('/api/history', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    if (!user.is_premium) return res.status(403).json({ error: "Riwayat adalah fitur premium." });

    res.json(history[user.id] || []);
});

// POST /api/history - Menambahkan item baru ke riwayat pengguna
app.post('/api/history', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    if (!user.is_premium) return res.status(403).json({ error: "Riwayat adalah fitur premium." });
    
    const newHistoryItem = { id: Date.now().toString(), ...req.body };
    if (!history[user.id]) {
        history[user.id] = [];
    }
    history[user.id].unshift(newHistoryItem); // Tambahkan ke awal array

    // Batasi ukuran riwayat, misal 50 item terakhir
    if (history[user.id].length > 50) {
        history[user.id].pop();
    }
    
    res.status(201).json(newHistoryItem);
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server Node.js berjalan di http://localhost:${PORT}`);
    if (MIDTRANS_SERVER_KEY === 'YOUR_MIDTRANS_SERVER_KEY' || JWT_SECRET_KEY === 'default-secret-key-for-development-should-be-changed') {
        console.warn("\n****************************************************************************");
        console.warn("PERINGATAN: Server berjalan dengan konfigurasi default/demo.");
        console.warn("Buat file .env dan atur variabel berikut untuk fungsionalitas penuh:");
        console.warn("- MIDTRANS_SERVER_KEY");
        console.warn("- MIDTRANS_CLIENT_KEY");
        console.warn("- JWT_SECRET_KEY");
        console.warn("Fungsionalitas pembayaran tidak akan bekerja sampai kunci Midtrans diatur.");
        console.warn("****************************************************************************\n");
    }
});