/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export {};

// NOTE: The GoogleGenAI import has been removed from the client-side code.

// --- Type Declarations for CDN Libraries ---
declare const gsap: any;
declare const ScrollTrigger: any;

// TypeScript type augmentation for Midtrans Snap.js
declare global {
    interface Window {
        snap: any;
        copyToClipboard: (text: string, button: HTMLButtonElement) => void;
    }
}

// --- DOM Element Selection ---
const mainContentScrollContainer = document.getElementById('main-content-scroll-container') as HTMLElement;
const pageRiwayat = document.getElementById('page-riwayat') as HTMLElement;
const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;
const personaContainer = document.getElementById('personaContainer') as HTMLElement;
const personaButtons = document.querySelectorAll('.btn-persona') as NodeListOf<HTMLButtonElement>;
const appContainer = document.getElementById('appContainer') as HTMLElement;
const userStatusContainer = document.getElementById('userStatusContainer') as HTMLElement;
const userCredits = document.getElementById('userCredits') as HTMLParagraphElement;
const mainAppInterface = document.getElementById('mainAppInterface') as HTMLElement;
const uploadContainer = document.getElementById('uploadContainer') as HTMLElement;
const themeInput = document.getElementById('theme-input') as HTMLInputElement;
const fileInput = document.getElementById('file-upload') as HTMLInputElement;
const imagePreviewContainer = document.getElementById('imagePreviewContainer') as HTMLElement;
const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
const analyzeButton = document.getElementById('analyzeButton') as HTMLButtonElement;
const loaderContainer = document.getElementById('loaderContainer') as HTMLElement;
const loaderText = document.getElementById('loaderText') as HTMLParagraphElement;
const resultsContainer = document.getElementById('resultsContainer') as HTMLElement;
const errorContainer = document.getElementById('errorContainer') as HTMLElement;
const errorMessage = document.getElementById('errorMessage') as HTMLParagraphElement;
const resetButton = document.getElementById('resetButton') as HTMLButtonElement;
const backFromLoaderButton = document.getElementById('backFromLoaderButton') as HTMLButtonElement;
const backFromResultsButton = document.getElementById('backFromResultsButton') as HTMLButtonElement;

// --- New Result Preview Selectors ---
const resultImagePreviewContainer = document.getElementById('resultImagePreviewContainer') as HTMLElement;
const resultImagePreview = document.getElementById('resultImagePreview') as HTMLImageElement;

// --- Subscription Modal Selectors ---
const subscriptionModal = document.getElementById('subscriptionModal') as HTMLElement;
const closeModalButton = document.getElementById('closeModalButton') as HTMLButtonElement;
const initiatePaymentButton = document.getElementById('initiatePaymentButton') as HTMLButtonElement;
const upgradeButtonPricing = document.getElementById('upgradeButtonPricing') as HTMLButtonElement;
const modalInfoView = document.getElementById('modalInfoView') as HTMLElement;
const modalProcessingView = document.getElementById('modalProcessingView') as HTMLElement;
const processingMessage = document.getElementById('processingMessage') as HTMLParagraphElement;

// --- Login & History Selectors ---
const loginNavButton = document.getElementById('loginNavButton') as HTMLButtonElement;
const userProfile = document.getElementById('userProfile') as HTMLElement;
const userProfileButton = document.getElementById('userProfileButton') as HTMLButtonElement;
const userEmailSpan = document.getElementById('userEmail') as HTMLSpanElement;
const userDropdown = document.getElementById('userDropdown') as HTMLElement;
const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;
const loginModal = document.getElementById('loginModal') as HTMLElement;
const closeLoginModalButton = document.getElementById('closeLoginModalButton') as HTMLButtonElement;

// Login Modal Views
const authView = document.getElementById('authView') as HTMLElement;
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const loginEmailInput = document.getElementById('loginEmail') as HTMLInputElement;
const loginPasswordInput = document.getElementById('loginPassword') as HTMLInputElement;
const loginModalTitle = document.getElementById('loginModalTitle') as HTMLHeadingElement;
const loginSubmitButton = document.getElementById('loginSubmitButton') as HTMLButtonElement;
const loginSwitchPrompt = document.getElementById('loginSwitchPrompt') as HTMLSpanElement;
const loginSwitchLink = document.getElementById('loginSwitchLink') as HTMLAnchorElement;
const loginModalError = document.getElementById('loginModalError') as HTMLParagraphElement;

// Forgot Password View Selectors
const forgotPasswordLink = document.getElementById('forgotPasswordLink') as HTMLAnchorElement;
const forgotPasswordView = document.getElementById('forgotPasswordView') as HTMLElement;
const forgotPasswordForm = document.getElementById('forgotPasswordForm') as HTMLFormElement;
const forgotPasswordEmail = document.getElementById('forgotPasswordEmail') as HTMLInputElement;
const forgotPasswordSubmitButton = document.getElementById('forgotPasswordSubmitButton') as HTMLButtonElement;
const forgotPasswordModalError = document.getElementById('forgotPasswordModalError') as HTMLParagraphElement;
const forgotPasswordModalSuccess = document.getElementById('forgotPasswordModalSuccess') as HTMLParagraphElement;
const backToLoginLink = document.getElementById('backToLoginLink') as HTMLAnchorElement;

// Reset Password Modal Selectors
const resetPasswordModal = document.getElementById('resetPasswordModal') as HTMLElement;
const closeResetPasswordModalButton = document.getElementById('closeResetPasswordModalButton') as HTMLButtonElement;
const resetPasswordForm = document.getElementById('resetPasswordForm') as HTMLFormElement;
const resetPasswordInput = document.getElementById('resetPasswordInput') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('confirmPasswordInput') as HTMLInputElement;
const resetPasswordSubmitButton = document.getElementById('resetPasswordSubmitButton') as HTMLButtonElement;
const resetPasswordModalError = document.getElementById('resetPasswordModalError') as HTMLParagraphElement;


const historyNavButton = document.getElementById('historyNavButton') as HTMLAnchorElement;
const historyGrid = document.getElementById('historyGrid') as HTMLElement;
const historyEmptyState = document.getElementById('historyEmptyState') as HTMLElement;
const historyDetailModal = document.getElementById('historyDetailModal') as HTMLElement;
const closeHistoryDetailModalButton = document.getElementById('closeHistoryDetailModalButton') as HTMLButtonElement;
const historyDetailContent = document.getElementById('historyDetailContent') as HTMLElement;

// --- Mobile Menu Selectors ---
const mobileMenuButton = document.getElementById('mobileMenuButton') as HTMLButtonElement;
const mobileMenu = document.getElementById('mobileMenu') as HTMLElement;
const closeMobileMenuButton = document.getElementById('closeMobileMenuButton') as HTMLButtonElement;
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link') as NodeListOf<HTMLAnchorElement>;
const mobileHistoryNavButton = document.getElementById('mobileHistoryNavButton') as HTMLAnchorElement;
const mobileLoginButton = document.getElementById('mobileLoginButton') as HTMLButtonElement;
const mobileUserProfile = document.getElementById('mobileUserProfile') as HTMLElement;
const mobileUserEmail = document.getElementById('mobileUserEmail') as HTMLParagraphElement;
const mobileLogoutButton = document.getElementById('mobileLogoutButton') as HTMLButtonElement;

// --- Audio Player Icons ---
const playIconSVG = `<svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>`;
const pauseIconSVG = `<svg class="pause-icon hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;


// --- State Variables ---
let base64ImageData: string | null = null;
let userPersona: 'creator' | 'casual' | null = null;
let currentUser: User | null = null;
let isLoginMode = true; // For login/register modal
let midtransClientKey: string | null = null;
const API_BASE_URL = ''; // Now served from same origin
let analysisAbortController: AbortController | null = null;
let passwordResetToken: string | null = null;


// --- Type Definitions ---
interface User {
    id: number;
    email: string;
    is_premium: boolean | number;
    premium_expiry?: number; // timestamp
    generation_credits?: number;
}

interface Song {
    title: string;
    artist: string;
    album_art_url?: string;
    preview_url?: string;
    artist_image_url?: string;
}

interface IdeaResult {
    mood: string;
    caption: string;
    hashtags: string[];
    song: Song;
}

interface HistoryItem {
    id: string; // timestamp
    thumbnailDataUrl: string;
    resultData: IdeaResult[];
    persona: 'creator' | 'casual';
    date: string;
}


// --- API & Auth Functions ---

/**
 * A wrapper for fetch that includes the auth token.
 */
async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    headers.append('Content-Type', 'application/json');

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || (response.status === 403 && !(await response.clone().json()).quotaExceeded)) {
        handleLogout(); // Token is invalid or expired, log out user
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.');
    }
    return response;
}

/**
 * Fetches necessary configuration from the backend.
 */
async function fetchConfig() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/config`);
        if (!response.ok) throw new Error('Gagal memuat konfigurasi.');
        const config = await response.json();
        midtransClientKey = config.midtransClientKey;
        // Set the client key for the Midtrans script tag
        const snapScript = document.querySelector('script[src="https://app.midtrans.com/snap/snap.js"]');
        if (snapScript) {
            snapScript.setAttribute('data-client-key', midtransClientKey!);
        }
    } catch (error) {
        console.error("Error fetching config:", error);
        showError("Gagal memuat konfigurasi aplikasi. Beberapa fitur mungkin tidak berfungsi.");
    }
}


/**
 * Checks if a user is logged in by verifying the token with the backend.
 */
async function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/api/me`);
            if (!response.ok) {
                throw new Error('Token tidak valid');
            }
            currentUser = await response.json();
            updateUserUI();
        } catch (error) {
            console.error("Auth check failed:", error);
            handleLogout();
        }
    } else {
        updateUserUI();
    }
}

/**
 * Handles user login and registration submission.
 */
async function handleAuthSubmit(event: Event) {
    event.preventDefault();
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    const endpoint = isLoginMode ? '/api/login' : '/api/register';
    
    loginModalError.classList.add('hidden');
    loginSubmitButton.disabled = true;
    loginSubmitButton.innerHTML = `<div class="loader-small" style="width: 24px; height: 24px; border-width: 3px; border-top-color: var(--color-bg-start);"></div>`;

    try {
        if (!isLoginMode) { // Registration
            const regResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const regData = await regResponse.json();
            if (!regResponse.ok) throw new Error(regData.error || 'Gagal mendaftar.');
        }
        
        // Login
        const loginResponse = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const loginData = await loginResponse.json();
        if (!loginResponse.ok) throw new Error(loginData.error || 'Gagal login.');

        localStorage.setItem('authToken', loginData.token);
        await checkAuthStatus();
        closeLoginModal();

    } catch (error: any) {
        loginModalError.textContent = error.message || "Terjadi kesalahan.";
        loginModalError.classList.remove('hidden');
    } finally {
        loginSubmitButton.disabled = false;
        loginSubmitButton.textContent = isLoginMode ? 'Masuk' : 'Daftar';
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('authToken');
    updateUserUI();
    showPage('page-home');
    resetUI();
}


// --- Core Functions ---

/**
 * Shows a specific page view (either the main scrolling content or the history page).
 * @param pageId The ID of the page/view to show.
 */
function showPage(pageId: string) {
    mainContentScrollContainer.classList.add('hidden');
    pageRiwayat.classList.add('hidden');

    if (pageId === 'page-riwayat') {
        pageRiwayat.classList.remove('hidden');
        renderHistoryPage();
    } else {
        // Default to showing the main scrollable content
        mainContentScrollContainer.classList.remove('hidden');
        if(pageId === 'page-home') {
             const homeElement = document.getElementById('home');
             homeElement?.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

/**
 * Resets the main app UI to its initial state, keeping the user logged in.
 */
function resetUI() {
    personaContainer.classList.remove('hidden');
    mainAppInterface.classList.add('hidden');
    
    uploadContainer.classList.remove('hidden');
    imagePreviewContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    loaderContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    
    fileInput.value = '';
    themeInput.value = '';
    base64ImageData = null;
    userPersona = null;
    imagePreview.src = '#';
    personaButtons.forEach(btn => btn.classList.remove('selected'));
    
    updatePremiumUI();
}

/**
 * Returns the user to the image preview screen from the loader or results.
 */
function goBackToPreview() {
    // If an analysis is running, abort it.
    if (analysisAbortController) {
        analysisAbortController.abort();
        analysisAbortController = null; // Clear the controller
    }
    
    // Reset UI to the preview state
    loaderContainer.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    imagePreviewContainer.classList.remove('hidden');
}


/**
 * Displays an error message to the user.
 * @param message The error message to display.
 */
function showError(message: string) {
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
}

function updateUserUI() {
    if (currentUser) {
        // Desktop
        loginNavButton.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userEmailSpan.textContent = currentUser.email;
        historyNavButton.classList.remove('hidden');
        
        // Mobile
        mobileLoginButton.classList.add('hidden');
        mobileUserProfile.classList.remove('hidden');
        mobileUserEmail.textContent = currentUser.email;

        // User Status/Credits Display
        userStatusContainer.classList.remove('hidden');
        if (currentUser.is_premium) {
            userCredits.innerHTML = `Status: <span class="font-bold text-accent">Premium</span>`;
        } else {
            const credits = currentUser.generation_credits ?? 0;
            userCredits.innerHTML = `Sisa Kuota: <span class="font-bold text-accent-light">${credits}</span>`;
        }
    } else {
        // Desktop
        loginNavButton.classList.remove('hidden');
        userProfile.classList.add('hidden');
        historyNavButton.classList.add('hidden');
        
        // Mobile
        mobileLoginButton.classList.remove('hidden');
        mobileUserProfile.classList.add('hidden');
        mobileHistoryNavButton.classList.add('hidden');
        
        // Hide status display
        userStatusContainer.classList.add('hidden');
    }
    updatePremiumUI();
}


// --- Modal Handling (Login, Subscription, History, Mobile Menu) ---

function openLoginModal() {
    switchToAuthView();
    loginModal.classList.remove('hidden');
}

function closeLoginModal() {
    loginModal.classList.add('hidden');
    loginForm.reset();
    forgotPasswordForm.reset();
    loginModalError.classList.add('hidden');
    forgotPasswordModalError.classList.add('hidden');
    forgotPasswordModalSuccess.classList.add('hidden');
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    loginModalTitle.textContent = isLoginMode ? 'Login' : 'Daftar';
    loginSubmitButton.textContent = isLoginMode ? 'Masuk' : 'Daftar';
    loginSwitchPrompt.textContent = isLoginMode ? 'Belum punya akun?' : 'Sudah punya akun?';
    loginSwitchLink.textContent = isLoginMode ? 'Daftar di sini' : 'Login di sini';
    loginModalError.classList.add('hidden');
}

function switchToAuthView() {
    authView.classList.remove('hidden');
    forgotPasswordView.classList.add('hidden');
}

function switchToForgotPasswordView() {
    authView.classList.add('hidden');
    forgotPasswordView.classList.remove('hidden');
}

function openSubscriptionModal() {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    subscriptionModal.classList.remove('hidden');
}

function closeSubscriptionModal() {
    subscriptionModal.classList.add('hidden');
    setTimeout(() => {
        modalInfoView.classList.remove('hidden');
        modalProcessingView.classList.add('hidden');
        initiatePaymentButton.disabled = false;
        initiatePaymentButton.innerHTML = "Langganan Sekarang";
    }, 300); 
}

function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('fade-in');
}

function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('fade-in');
}

function openResetPasswordModal() {
    resetPasswordModal.classList.remove('hidden');
}

function closeResetPasswordModal() {
    resetPasswordModal.classList.add('hidden');
    resetPasswordForm.reset();
    resetPasswordModalError.classList.add('hidden');
}


// --- Password Reset ---
async function handleForgotPassword(event: Event) {
    event.preventDefault();
    forgotPasswordModalError.classList.add('hidden');
    forgotPasswordModalSuccess.classList.add('hidden');
    forgotPasswordSubmitButton.disabled = true;
    forgotPasswordSubmitButton.innerHTML = `<div class="loader-small" style="border-top-color: var(--color-bg-start);"></div>`;

    try {
        const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: forgotPasswordEmail.value }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Gagal mengirim email.');

        forgotPasswordModalSuccess.textContent = 'Link reset telah dikirim. Silakan periksa email Anda.';
        forgotPasswordModalSuccess.classList.remove('hidden');
        forgotPasswordForm.reset();
    } catch (error: any) {
        forgotPasswordModalError.textContent = error.message;
        forgotPasswordModalError.classList.remove('hidden');
    } finally {
        forgotPasswordSubmitButton.disabled = false;
        forgotPasswordSubmitButton.textContent = 'Kirim Link';
    }
}

async function handleResetPassword(event: Event) {
    event.preventDefault();
    if (resetPasswordInput.value !== confirmPasswordInput.value) {
        resetPasswordModalError.textContent = 'Password tidak cocok.';
        resetPasswordModalError.classList.remove('hidden');
        return;
    }
    if (!passwordResetToken) {
        resetPasswordModalError.textContent = 'Token reset tidak ditemukan.';
        resetPasswordModalError.classList.remove('hidden');
        return;
    }

    resetPasswordModalError.classList.add('hidden');
    resetPasswordSubmitButton.disabled = true;
    resetPasswordSubmitButton.innerHTML = `<div class="loader-small" style="border-top-color: var(--color-bg-start);"></div>`;

    try {
        const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: passwordResetToken,
                password: resetPasswordInput.value,
            }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Gagal mereset password.');
        
        alert('Password berhasil direset! Silakan login dengan password baru Anda.');
        closeResetPasswordModal();
        openLoginModal();
    } catch (error: any) {
        resetPasswordModalError.textContent = error.message;
        resetPasswordModalError.classList.remove('hidden');
    } finally {
        resetPasswordSubmitButton.disabled = false;
        resetPasswordSubmitButton.textContent = 'Reset Password';
    }
}


// --- Subscription and Payment ---

async function initiateMidtransPayment() {
    if (!currentUser) {
        showError("Anda harus login untuk melanjutkan pembayaran.");
        openLoginModal();
        return;
    }

    initiatePaymentButton.disabled = true;
    initiatePaymentButton.innerHTML = `<div class="loader-small" style="border-top-color: var(--color-bg-start);"></div>`;

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/create-transaction`, {
            method: 'POST',
            body: JSON.stringify({ amount: 10000 }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Gagal membuat transaksi di server.');
        }

        const { token } = await response.json();
        if (!token) throw new Error("Token transaksi tidak diterima.");

        window.snap.pay(token, {
            onSuccess: function(result: any){
                console.log('success', result);
                processPayment("Pembayaran berhasil! Memperbarui status akun Anda...");
            },
            onPending: function(result: any){
                console.log('pending', result);
                alert("Pembayaran Anda sedang diproses. Status akun akan diperbarui setelah pembayaran dikonfirmasi.");
                closeSubscriptionModal();
            },
            onError: function(result: any){
                console.log('error', result);
                showError("Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.");
                closeSubscriptionModal();
            },
            onClose: function(){
                initiatePaymentButton.disabled = false;
                initiatePaymentButton.textContent = "Langganan Sekarang";
            }
        });

    } catch (error: any) {
        console.error("Inisiasi pembayaran gagal:", error);
        showError(error.message || "Gagal memulai sesi pembayaran.");
        initiatePaymentButton.disabled = false;
        initiatePaymentButton.textContent = "Langganan Sekarang";
    }
}

function processPayment(message: string = "Memproses pembayaran...") {
    modalInfoView.classList.add('hidden');
    processingMessage.textContent = message;
    modalProcessingView.classList.remove('hidden');

    // Wait for a few seconds to let the webhook process, then refresh user data
    setTimeout(async () => {
        await checkAuthStatus(); // Re-fetch user data from server
        closeSubscriptionModal();
        alert('Selamat! Pembayaran berhasil. Akun Anda kini Premium.');
        if (userPersona !== 'creator') {
           selectPersona('creator');
        }
    }, 3500); // Increased delay
}

function updatePremiumUI() {
    const isPremium = currentUser?.is_premium ?? false;
    const premiumTags = document.querySelectorAll('.premium-tag, .premium-feature-badge');
    const themeInputContainer = document.getElementById('themeInputContainer');
    
    if (isPremium) {
        premiumTags.forEach(tag => (tag as HTMLElement).style.display = 'none');
        if (themeInputContainer) themeInputContainer.classList.remove('disabled-feature');
        themeInput.disabled = false;
        upgradeButtonPricing.textContent = "Anda Sudah Premium";
        upgradeButtonPricing.disabled = true;
        historyNavButton.classList.remove('hidden'); // Show history for premium
        mobileHistoryNavButton.classList.remove('hidden'); // Show mobile history for premium
    } else {
        premiumTags.forEach(tag => (tag as HTMLElement).style.display = 'inline-block');
        // The input is for context for all users, so we don't disable it.
        // The backend will decide if a background is generated.
        if (themeInputContainer) themeInputContainer.classList.remove('disabled-feature');
        themeInput.disabled = false;
        upgradeButtonPricing.textContent = "Upgrade ke Premium";
        upgradeButtonPricing.disabled = false;
        historyNavButton.classList.add('hidden'); // Hide history for non-premium
        mobileHistoryNavButton.classList.add('hidden'); // Hide mobile history for non-premium
    }
}


// --- Event Handlers ---

function selectPersona(persona: 'creator' | 'casual') {
    if (persona === 'creator' && !currentUser?.is_premium) {
        openSubscriptionModal();
        return;
    }
    
    userPersona = persona;
    personaButtons.forEach(button => {
        button.classList.toggle('selected', button.dataset.persona === persona);
    });

    personaContainer.classList.add('hidden');
    mainAppInterface.classList.remove('hidden');
    mainAppInterface.classList.add('fade-in');
}

function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
                imagePreview.src = result;
                if (result.includes(',')) {
                    base64ImageData = result; // Store the full data URL
                    uploadContainer.classList.add('hidden');
                    imagePreviewContainer.classList.remove('hidden');
                    resultsContainer.classList.add('hidden');
                    errorContainer.classList.add('hidden');
                } else {
                    showError("Format file gambar tidak didukung.");
                    fileInput.value = '';
                }
            } else {
                showError("Gagal membaca file gambar.");
                fileInput.value = '';
            }
        };
        reader.readAsDataURL(file);
    }
}

async function handleAnalyzeClick() {
    if (!currentUser) {
        showError("Anda harus login untuk menganalisis foto.");
        openLoginModal();
        return;
    }
    if (!base64ImageData || !userPersona) {
        showError("Pastikan Anda sudah memilih persona dan mengunggah gambar.");
        return;
    }

    // Abort previous request if any and create a new controller for the new request
    if (analysisAbortController) {
        analysisAbortController.abort();
    }
    analysisAbortController = new AbortController();

    imagePreviewContainer.classList.add('hidden');
    loaderContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');

    const theme = themeInput.value.trim();
    loaderText.textContent = (theme && currentUser.is_premium) ? "MEMBUAT BACKGROUND & MENGANALISIS..." : "MENGANALISIS KONTEN...";

    try {
        const payload = { base64ImageData, persona: userPersona, theme };

        const response = await fetchWithAuth(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            body: JSON.stringify(payload),
            signal: analysisAbortController.signal // Pass the signal to the fetch request
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 403 && errorData.quotaExceeded) {
                // Specific handling for quota error: show subscription modal
                openSubscriptionModal();
                goBackToPreview();
                return;
            }
            throw new Error(errorData.error || "Gagal mendapatkan respons dari server.");
        }

        const { analysis }: { analysis: IdeaResult[] } = await response.json();

        // Refresh user data to show updated credit count immediately
        await checkAuthStatus();

        if (!analysis || (Array.isArray(analysis) && analysis.length === 0)) {
            throw new Error("Respons AI tidak valid atau kosong. Coba lagi.");
        }

        displayResults(analysis);
        await addToHistory(base64ImageData, analysis, userPersona);
        loaderContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');

    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.log('Analysis fetch aborted by user.');
            // goBackToPreview() has already handled the UI, so we just exit.
            return;
        }
        console.error("Error during analysis:", error);
        showError(error.message || "Terjadi kesalahan saat menghubungi server AI.");
        goBackToPreview();
    } finally {
        // Clear the controller once the operation is complete (success, error, or abort)
        analysisAbortController = null;
    }
}

// --- UI Rendering & Audio ---

function copyToClipboard(textToCopy: string, buttonElement: HTMLButtonElement) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalContent = buttonElement.innerHTML;
        buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
        setTimeout(() => {
            buttonElement.innerHTML = originalContent;
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}
window.copyToClipboard = copyToClipboard;


/**
 * Membuat string HTML untuk satu kartu/slide.
 */
function createSlideHTML(idea: IdeaResult): string {
    const { mood, caption, hashtags, song } = idea;
    const combinedHashtags = hashtags.map(h => `#${h}`).join(' ');
    
    const albumArt = song.album_art_url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23475569'%3E%3Cpath d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z'/%3E%3C/svg%3E";
    const artistImage = song.artist_image_url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239CA3AF'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

    let musicPlayerHTML = '';

    const playerContent = `
        <img src="${albumArt}" alt="Album Art" class="w-14 h-14 rounded-md object-cover flex-shrink-0" crossOrigin="anonymous">
        <div class="flex-grow text-left overflow-hidden">
            <p class="font-bold text-white truncate leading-tight">${song.title}</p>
            <div class="flex items-center space-x-2 mt-1">
                <img src="${artistImage}" alt="${song.artist}" class="w-5 h-5 rounded-full object-cover">
                <p class="text-sm text-slate-400 truncate">${song.artist}</p>
            </div>
        </div>
    `;

    // JIKA ADA URL CUPLIKAN, BUAT TOMBOL PLAY/PAUSE YANG BISA DIPUTAR
    if (song.preview_url) {
        musicPlayerHTML = `
            <div class="mt-4 p-3 rounded-lg bg-black bg-opacity-20 flex items-center space-x-3">
                ${playerContent}
                <audio class="audio-preview hidden" src="${song.preview_url}" preload="none"></audio>
                <button class="play-pause-btn text-white bg-green-500 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 hover:bg-green-600 transition">
                    ${playIconSVG}
                    ${pauseIconSVG}
                </button>
            </div>
        `;
    } else { // JIKA TIDAK ADA URL CUPLIKAN, BUAT TOMBOL ABU-ABU YANG MENGARAH KE SPOTIFY
        const searchQuery = encodeURIComponent(`${song.title} ${song.artist}`);
        const spotifyLink = `https://open.spotify.com/search/${searchQuery}`;
        musicPlayerHTML = `
            <div class="mt-4 p-3 rounded-lg bg-black bg-opacity-20 flex items-center space-x-3">
                ${playerContent}
                <a href="${spotifyLink}" target="_blank" title="Pratinjau tidak tersedia. Cari di Spotify." class="play-pause-btn text-white bg-slate-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 hover:bg-slate-700 transition no-underline">
                    ${playIconSVG}
                </a>
            </div>
        `;
    }
    
    const combinedTextToCopy = `"${caption}"\n\n${combinedHashtags}`;

    return `
        <div class="slide text-left w-full flex-shrink-0">
            <div class="flex justify-between items-center">
                <span class="mood-badge">${mood}</span>
                 <button onclick='copyToClipboard(${JSON.stringify(combinedTextToCopy)}, this)' class="btn-copy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </button>
            </div>
            <p class="caption-text">“${caption}”</p>
            <p class="hashtags">${combinedHashtags}</p>
            ${musicPlayerHTML}
        </div>
    `;
}

/**
 * Menambahkan event listener ke semua tombol play/pause yang baru dibuat.
 */
function setupAudioPlayers() {
    const allPlayButtons = document.querySelectorAll('.play-pause-btn');
    
    allPlayButtons.forEach(button => {
        // Hanya tambahkan listener ke tombol <button> yang bisa diputar, bukan link <a>
        if (button.tagName.toLowerCase() !== 'button') return;

        const slide = button.closest('.slide');
        const audio = slide?.querySelector<HTMLAudioElement>('.audio-preview');
        const playIcon = button.querySelector('.play-icon');
        const pauseIcon = button.querySelector('.pause-icon');

        if (audio && playIcon && pauseIcon) {
            let playTimeout: number | undefined;

            const stopPlayback = () => {
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                if (playTimeout) {
                    clearTimeout(playTimeout);
                    playTimeout = undefined;
                }
            }

            button.addEventListener('click', (event) => {
                event.stopPropagation();
                
                // Hentikan semua audio lain dan reset ikonnya
                document.querySelectorAll<HTMLAudioElement>('.audio-preview').forEach(otherAudio => {
                    if (otherAudio !== audio) {
                        otherAudio.pause(); // Ini akan memicu listener 'pause' pada audio lain
                    }
                });

                // Putar atau jeda audio yang ini
                if (audio.paused) {
                    audio.play().catch(e => console.error("Error playing audio:", e));
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');

                    // Set timeout untuk menjeda lagu setelah 15 detik
                    if (playTimeout) clearTimeout(playTimeout);
                    playTimeout = window.setTimeout(() => {
                        if (!audio.paused) {
                            audio.pause();
                        }
                    }, 15000);

                } else {
                    audio.pause(); // Ini akan memicu event 'pause' yang akan memanggil stopPlayback
                }
            });

            audio.addEventListener('pause', stopPlayback);
            audio.addEventListener('ended', stopPlayback);
        }
    });
}


/**
 * Mengatur fungsionalitas tombol next/prev pada slider.
 */
function setupSlider(slideCount: number, sliderWrapper: HTMLElement, prevButton: HTMLButtonElement, nextButton: HTMLButtonElement) {
    let currentIndex = 0;

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function stopAllAudio() {
        sliderWrapper.querySelectorAll<HTMLAudioElement>('.audio-preview').forEach(audio => {
            if (!audio.paused) {
                 audio.pause();
            }
        });
    }

    prevButton.onclick = () => {
        stopAllAudio();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
        updateSlider();
    };

    nextButton.onclick = () => {
        stopAllAudio();
        currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
        updateSlider();
    };

    // Initialize
    updateSlider();
}

/**
 * Fungsi utama untuk menampilkan semua hasil dari AI ke dalam slider.
 */
function displayResults(results: IdeaResult[]) {
    const sliderWrapper = resultsContainer.querySelector('.slider-wrapper') as HTMLElement;
    const prevButton = resultsContainer.querySelector('#prev-slide') as HTMLButtonElement;
    const nextButton = resultsContainer.querySelector('#next-slide') as HTMLButtonElement;
    const resultsTitle = resultsContainer.querySelector('h3') as HTMLHeadingElement;

    if (!results || results.length === 0) {
        showError("AI tidak dapat memberikan hasil untuk gambar ini. Coba dengan gambar lain.");
        goBackToPreview();
        return;
    }
    
    sliderWrapper.innerHTML = results.map(createSlideHTML).join('');
    
    if (resultsTitle) {
        resultsTitle.textContent = `${results.length} Ide Konten Untukmu`;
    }

    resultsContainer.classList.remove('hidden');
    loaderContainer.classList.add('hidden');
    
    setupSlider(results.length, sliderWrapper, prevButton, nextButton);
    setupAudioPlayers();
}

// --- History Management ---

async function addToHistory(imageDataUrl: string, resultData: IdeaResult[], persona: 'creator' | 'casual') {
    if (!currentUser?.is_premium) return;
    
    try {
        const thumbnailDataUrl = await createThumbnail(imageDataUrl, 200);
        const newHistoryItem = {
            thumbnailDataUrl,
            resultData,
            persona,
            // The date is now set by the server, so we don't need to send it.
        };
        const response = await fetchWithAuth(`${API_BASE_URL}/api/history`, {
            method: 'POST',
            body: JSON.stringify(newHistoryItem)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gagal menyimpan riwayat:", errorData.error);
        }

    } catch (error) {
        console.error("Gagal mengirim data riwayat:", error);
    }
}

async function renderHistoryPage() {
    if (!currentUser) {
        historyEmptyState.classList.remove('hidden');
        historyGrid.classList.add('hidden');
        historyEmptyState.textContent = "Silakan login untuk melihat riwayat Anda.";
        return;
    }
    if (!currentUser.is_premium) {
        historyEmptyState.classList.remove('hidden');
        historyGrid.classList.add('hidden');
        historyEmptyState.innerHTML = `Fitur Riwayat hanya untuk pengguna Premium. <a href="#" id="upgradeFromHistory" class="text-accent font-bold hover:underline">Upgrade sekarang</a>.`;
        document.getElementById('upgradeFromHistory')?.addEventListener('click', (e) => {
            e.preventDefault();
            openSubscriptionModal();
        });
        return;
    }

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/history`);
        if (!response.ok) throw new Error('Gagal memuat riwayat');
        const history: HistoryItem[] = await response.json();

        historyGrid.innerHTML = '';
        if (history.length === 0) {
            historyEmptyState.classList.remove('hidden');
            historyGrid.classList.add('hidden');
            historyEmptyState.textContent = "Anda belum memiliki riwayat. Mulai analisis foto pertama Anda!";
        } else {
            historyEmptyState.classList.add('hidden');
            historyGrid.classList.remove('hidden');
            history.forEach(item => {
                const firstResult = item.resultData[0];
                const caption = firstResult.caption || 'Hasil Analisis';

                const card = document.createElement('div');
                card.className = 'futuristic-card rounded-2xl overflow-hidden cursor-pointer text-left flex flex-col';
                card.innerHTML = `
                    <img src="${item.thumbnailDataUrl}" class="w-full h-40 object-cover" alt="Analisis thumbnail">
                    <div class="p-4 flex flex-col flex-grow">
                        <p class="text-xs text-text-muted">${item.date}</p>
                        <h4 class="font-bold text-text-primary truncate capitalize">${firstResult.mood || item.persona}</h4>
                        <p class="text-sm text-text-muted flex-grow truncate">"${caption}"</p>
                    </div>
                `;
                card.addEventListener('click', () => showHistoryDetail(item));
                historyGrid.appendChild(card);
            });
        }
    } catch(error: any) {
        historyEmptyState.textContent = error.message || "Gagal memuat riwayat. Coba lagi nanti.";
        historyEmptyState.classList.remove('hidden');
        historyGrid.classList.add('hidden');
    }
}

function showHistoryDetail(item: HistoryItem) {
    historyDetailContent.innerHTML = `
        <div class="slider-container relative w-full mx-auto">
            <div class="slider-wrapper flex transition-transform duration-500 ease-in-out">
                ${item.resultData.map(createSlideHTML).join('')}
            </div>
            <button class="slider-nav left-0 prev-slide-history">&lt;</button>
            <button class="slider-nav right-0 next-slide-history">&gt;</button>
        </div>
    `;

    const sliderWrapper = historyDetailContent.querySelector('.slider-wrapper') as HTMLElement;
    const prevButton = historyDetailContent.querySelector('.prev-slide-history') as HTMLButtonElement;
    const nextButton = historyDetailContent.querySelector('.next-slide-history') as HTMLButtonElement;

    if (sliderWrapper && prevButton && nextButton) {
        setupSlider(item.resultData.length, sliderWrapper, prevButton, nextButton);
        setupAudioPlayers();
    }
    
    historyDetailModal.classList.remove('hidden');
}

function closeHistoryDetailModal() {
    historyDetailModal.classList.add('hidden');
    historyDetailContent.innerHTML = ''; // Clean up to stop audio
}

function createThumbnail(dataUrl: string, maxWidth: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            } else {
                reject(new Error('Could not get canvas context'));
            }
        };
        img.onerror = () => reject(new Error('Could not load image for thumbnail creation'));
        img.src = dataUrl;
    });
}

/**
 * Handles all navigation clicks (desktop and mobile) to scroll smoothly
 * or switch between the main view and history view.
 * @param event The click event.
 * @param isMobile Whether the click is from the mobile menu.
 */
function handleNavigation(event: Event, isMobile: boolean = false) {
    event.preventDefault();
    const link = event.currentTarget as HTMLAnchorElement;
    const pageId = link.dataset.page;
    const anchor = link.getAttribute('href');

    if (isMobile) {
        closeMobileMenu();
    }

    if (pageId) {
        // It's a full-page switch, like for Riwayat or back to Home.
        showPage(pageId);
    } else if (anchor && anchor.startsWith('#')) {
        // It's an anchor scroll link.
        // Special case for reset password links
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('token')) {
             window.location.href = window.location.pathname + anchor;
             return;
        }

        const targetElement = document.querySelector(anchor);

        // Ensure the main scroll container is visible before trying to scroll.
        // This is crucial for when we are on the history page.
        if (mainContentScrollContainer.classList.contains('hidden')) {
            showPage('page-home'); // This switches to the main content view
             // We need to wait a moment for the DOM to update before scrolling.
            setTimeout(() => {
                targetElement?.scrollIntoView({ behavior: 'smooth' });
            }, 150);
        } else {
             if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}


// --- Animation & Interaction Setup ---
function setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // --- GSAP Defaults for cleaner code ---
    gsap.defaults({
        duration: 0.8,
        ease: "power3.out",
    });

    // --- Initial Load Animations ---
    // Using a timeline for better control and sequencing
    const tl = gsap.timeline({ defaults: { opacity: 0, y: 20 } });
    tl.from(".hero-title", { delay: 0.2, duration: 1 })
      .from(".hero-description", {}, "-=0.8")
      .from(".social-proof-container", {}, "-=0.8")
      .from(".app-card-container", {}, "-=0.8");

    // --- Scroll-triggered Animations for sections ---
    const sections = document.querySelectorAll('#about, #harga');
    sections.forEach(section => {
        const sectionTitle = section.querySelector('.section-title');
        const featureCards = section.querySelectorAll('.feature-card');

        // Animate section title
        if (sectionTitle) {
            gsap.from(sectionTitle, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Trigger when section top hits 80% from viewport top
                    toggleActions: "play none none none", // Play once on enter
                },
                opacity: 0,
                y: 30,
            });
        }
        
        // Animate feature cards
        if (featureCards.length > 0) {
            gsap.from(featureCards, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%", // Trigger a bit later for cards
                    toggleActions: "play none none none",
                },
                opacity: 0,
                y: 30,
                stagger: 0.15,
            });
        }
    });
}


// --- Initialization ---
async function init() {
     // --- Logo Animation Setup ---
    const logoTextElement = document.getElementById('logo-text');
    if (logoTextElement) {
        const text = logoTextElement.textContent || "";
        logoTextElement.innerHTML = '';
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.className = 'logo-letter';
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            span.style.animationDelay = `${index * 0.05}s`;
            logoTextElement.appendChild(span);
        });
    }

    // Check for reset password token in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (window.location.pathname.includes('reset-password') && urlParams.has('token')) {
        passwordResetToken = urlParams.get('token');
        history.replaceState(null, '', window.location.pathname.split('reset-password')[0]); // Clean URL
        openResetPasswordModal();
    }


    // Fetch config and check auth status on load
    await fetchConfig();
    await checkAuthStatus();

    // Set up navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => handleNavigation(event, false));
    });

    // App logic event listeners
    personaButtons.forEach(button => {
        const persona = button.dataset.persona as 'creator' | 'casual';
        if (persona) button.addEventListener('click', () => selectPersona(persona));
    });

    fileInput.addEventListener('change', handleFileSelect);
    analyzeButton.addEventListener('click', handleAnalyzeClick);
    resetButton.addEventListener('click', () => {
         // When resetting, scroll the app card back into view if it's off-screen
        const appCard = document.querySelector('.app-card-container');
        if(appCard) {
            appCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(resetUI, 300);
    });
    
    // Back button listeners
    backFromLoaderButton.addEventListener('click', goBackToPreview);
    backFromResultsButton.addEventListener('click', goBackToPreview);

    // Auth listeners
    loginNavButton.addEventListener('click', openLoginModal);
    closeLoginModalButton.addEventListener('click', closeLoginModal);
    loginForm.addEventListener('submit', handleAuthSubmit);
    loginSwitchLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthMode();
    });
    userProfileButton.addEventListener('click', () => userDropdown.classList.toggle('hidden'));
    logoutButton.addEventListener('click', handleLogout);

    // Password Reset Listeners
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToForgotPasswordView();
    });
    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToAuthView();
    });
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    resetPasswordForm.addEventListener('submit', handleResetPassword);
    closeResetPasswordModalButton.addEventListener('click', closeResetPasswordModal);

    // Subscription modal listeners
    closeModalButton.addEventListener('click', closeSubscriptionModal);
    initiatePaymentButton.addEventListener('click', initiateMidtransPayment);
    upgradeButtonPricing.addEventListener('click', openSubscriptionModal);

    // History listeners
    closeHistoryDetailModalButton.addEventListener('click', closeHistoryDetailModal);

    // Mobile Menu listeners
    mobileMenuButton.addEventListener('click', openMobileMenu);
    closeMobileMenuButton.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
         link.addEventListener('click', (event) => handleNavigation(event, true));
    });
    
    mobileLoginButton.addEventListener('click', () => {
        openLoginModal();
        closeMobileMenu();
    });

    mobileLogoutButton.addEventListener('click', () => {
        handleLogout();
        closeMobileMenu();
    });


    // Initial UI state
    showPage('page-home');
    resetUI();

    // Setup animations and interactions
    setupAnimations();
}

init();