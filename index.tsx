/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export {};

// --- Type Declarations for CDN Libraries ---
declare const gsap: any;
declare const ScrollTrigger: any;
declare const Spotify: any;

// TypeScript type augmentation for Midtrans Snap.js & Spotify
declare global {
    interface Window {
        snap: any;
        copyToClipboard: (text: string, button: HTMLButtonElement) => void;
        onSpotifyWebPlaybackSDKReady: () => void;
    }
}

// Global definition for Spotify's SDK ready callback.
// This is the entry point for the Spotify SDK.
window.onSpotifyWebPlaybackSDKReady = () => {
    console.log("Spotify Web Playback SDK is ready to be initialized.");
    // The SDK is loaded, but we need an access token to create a player.
    // The token is processed on DOMContentLoaded. If it's present, initializeSpotifyPlayer will be called.
    const token = spotifyAccessToken || localStorage.getItem('spotifyAccessToken');
    if (token) {
        initializeSpotifyPlayer(token);
    }
};

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
const backToPersonaButton = document.getElementById('backToPersonaButton') as HTMLButtonElement;
const changeImageButton = document.getElementById('changeImageButton') as HTMLButtonElement;

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

// --- Spotify SDK Selectors & Icons ---
const connectSpotifyButton = document.getElementById('connectSpotifyButton') as HTMLButtonElement;
const playIconSVG = `<svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>`;
const pauseIconSVG = `<svg class="pause-icon hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;

// --- Audio Preview Timing ---
const PREVIEW_START_TIME_MS = 7.5 * 1000;
const PREVIEW_DURATION_MS = 15 * 1000;

// --- State Variables ---
let base64ImageData: string | null = null;
let userPersona: 'creator' | 'casual' | null = null;
let currentUser: User | null = null;
let isLoginMode = true; // For login/register modal
let midtransClientKey: string | null = null;
const API_BASE_URL = ''; // Now served from same origin
let analysisAbortController: AbortController | null = null;
let passwordResetToken: string | null = null;

// Spotify SDK State
let spotifyPlayer: any = null;
let spotifyDeviceId: string | null = null;
let spotifyAccessToken: string | null = null;
let activePlaybackTimeout: number | null = null;
let currentPlayingUri: string | null = null;
let currentHtmlAudio: HTMLAudioElement | null = null;

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
    uri?: string;
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
 * Fetches essential config from the server like API keys.
 */
async function getAppConfig() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/config`);
        const config = await response.json();
        midtransClientKey = config.midtransClientKey;
        if (window.snap && midtransClientKey) {
            window.snap.config.clientKey = midtransClientKey;
        }
    } catch (error) {
        console.error('Failed to get app config:', error);
        showError('Gagal memuat konfigurasi aplikasi. Beberapa fitur mungkin tidak berfungsi.');
    }
}

/**
 * Checks for a valid token and fetches user data.
 */
async function checkLoginStatus() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        updateUserUI(null);
        return;
    }
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/me`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const user = await response.json();
        currentUser = user;
        updateUserUI(user);
    } catch (error) {
        console.error('Login check failed:', error);
        handleLogout();
    }
}

/**
 * Handles the user login/registration process.
 */
async function handleAuth(event: Event) {
    event.preventDefault();
    loginModalError.classList.add('hidden');
    loginSubmitButton.disabled = true;
    loginSubmitButton.innerHTML = `<div class="loader-small !border-t-slate-800 !w-6 !h-6 !border-2"></div>`;

    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    const endpoint = isLoginMode ? '/api/login' : '/api/register';

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Gagal ${isLoginMode ? 'login' : 'mendaftar'}.`);
        }

        if (isLoginMode) {
            localStorage.setItem('authToken', data.token);
            await checkLoginStatus();
            closeLoginModal();
        } else {
            // Switch to login view with a success message
            showError(data.message, 'success');
            setTimeout(() => {
                loginModalError.classList.add('hidden');
                switchAuthMode(true);
            }, 1000);
        }
    } catch (error: any) {
        showError(error.message);
    } finally {
        loginSubmitButton.disabled = false;
        loginSubmitButton.textContent = isLoginMode ? 'Masuk' : 'Daftar';
    }
}

/**
 * Handles user logout.
 */
function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('spotifyAccessToken');
    currentUser = null;
    spotifyAccessToken = null;
    spotifyPlayer = null;
    spotifyDeviceId = null;
    updateUserUI(null);
    if (pageRiwayat.style.display !== 'none') {
        showPage('home');
    }
}

// --- Spotify SDK Integration ---

/**
 * Initializes the Spotify Player instance.
 * This should only be called when a valid token is available.
 * @param {string} token - The Spotify OAuth Access Token.
 */
function initializeSpotifyPlayer(token: string) {
    if (spotifyPlayer) {
        spotifyPlayer.disconnect();
    }
    
    spotifyPlayer = new Spotify.Player({
        name: 'Celetuk Web Player',
        getOAuthToken: (cb: (token: string) => void) => {
            cb(token);
        },
        volume: 0.5
    });

    // Error handling
    spotifyPlayer.addListener('initialization_error', ({ message }: { message: string }) => { 
        console.error('Spotify Init Error:', message); 
        handleSpotifyError();
    });
    spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => { 
        console.error('Spotify Auth Error:', message);
        handleSpotifyError();
        showError('Sesi Spotify Anda berakhir. Silakan hubungkan kembali.');
    });
    spotifyPlayer.addListener('account_error', ({ message }: { message: string }) => { 
        console.error('Spotify Account Error:', message); 
        showError('Error akun Spotify. Pastikan Anda menggunakan akun Premium.');
    });
    spotifyPlayer.addListener('playback_error', ({ message }: { message: string }) => { console.error('Spotify Playback Error:', message); });

    // Player state changes
    spotifyPlayer.addListener('player_state_changed', (state: any) => {
        if (!state) {
            if (currentPlayingUri) resetAllPlayButtons();
            return;
        }
        if (state.paused && state.track_window.current_track.uri === currentPlayingUri) {
            resetAllPlayButtons();
        }
     });

    // Ready
    spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
        spotifyDeviceId = device_id;
        updateSpotifyButtonState(true);
    });

    // Not Ready
    spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
        spotifyDeviceId = null;
        updateSpotifyButtonState(false);
    });

    spotifyPlayer.connect().then((success: boolean) => {
        if (success) console.log('The Spotify Player has connected successfully!');
    });
}

/**
 * Handles common Spotify errors by logging the user out of Spotify integration.
 */
function handleSpotifyError() {
    localStorage.removeItem('spotifyAccessToken');
    spotifyAccessToken = null;
    spotifyDeviceId = null;
    if (spotifyPlayer) {
        spotifyPlayer.disconnect();
        spotifyPlayer = null;
    }
    updateSpotifyButtonState(false);
}

/**
 * Processes the URL for Spotify tokens after a redirect and sets up the player if a token is found.
 */
function processAndSetupSpotify() {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('spotify_access_token');
    const errorFromUrl = urlParams.get('spotify_error');

    if (errorFromUrl) {
        showError(`Gagal menghubungkan ke Spotify: ${errorFromUrl}`);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
    }

    let currentToken: string | null = null;
    if (tokenFromUrl) {
        currentToken = tokenFromUrl;
        spotifyAccessToken = tokenFromUrl;
        localStorage.setItem('spotifyAccessToken', tokenFromUrl);
        // Clean the URL so the token isn't visible or re-used on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        currentToken = localStorage.getItem('spotifyAccessToken');
        spotifyAccessToken = currentToken;
    }

    if (currentToken) {
        // If we have a token, initialize the player.
        // This handles cases where this function runs *after* the SDK has already loaded.
        if (typeof Spotify !== 'undefined' && Spotify.Player) {
            initializeSpotifyPlayer(currentToken);
        }
    } else {
        updateSpotifyButtonState(false);
    }
}

/**
 * Updates the 'Connect Spotify' button based on connection status.
 * @param {boolean} isConnected - Whether the Spotify player is connected.
 */
function updateSpotifyButtonState(isConnected: boolean) {
    if (connectSpotifyButton) {
        if(isConnected) {
            const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-green-400" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>`;
            connectSpotifyButton.innerHTML = `${checkIcon} <span>Spotify Terhubung</span>`;
            connectSpotifyButton.disabled = true;
            connectSpotifyButton.classList.remove('btn-secondary');
            connectSpotifyButton.classList.add('cursor-default', 'opacity-80');
        } else {
            const spotifyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-green-400" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.437c2.766-.835 7.352-.639 9.609 1.079a.747.747 0 1 1-1.225.825"/></svg>`;
            connectSpotifyButton.innerHTML = `${spotifyIcon} <span>Hubungkan Spotify</span>`;
            connectSpotifyButton.disabled = false;
            connectSpotifyButton.classList.add('btn-secondary');
            connectSpotifyButton.classList.remove('cursor-default', 'opacity-80');
        }
    }
}

/**
 * Handles toggling playback for a song, deciding between Spotify SDK and HTML5 Audio.
 * @param {Song} song - The song object with URI and preview URL.
 * @param {HTMLButtonElement} buttonEl - The play/pause button that was clicked.
 */
async function toggleSongPlayback(song: Song, buttonEl: HTMLButtonElement) {
    const isPlaying = buttonEl.classList.contains('playing');
    const clickedUri = song.uri;

    // Stop any currently playing audio (both Spotify and HTML5)
    if (spotifyPlayer && !spotifyPlayer.paused) spotifyPlayer.pause();
    if (currentHtmlAudio) {
        currentHtmlAudio.pause();
        currentHtmlAudio = null;
    }
    
    // Clear any pending pause timeout
    if (activePlaybackTimeout) clearTimeout(activePlaybackTimeout);
    
    // Reset all buttons *before* starting new playback
    resetAllPlayButtons();

    if (isPlaying) {
        // If the clicked button was playing, we just stop it. The reset call handles the UI.
        return;
    }

    // --- Start new playback ---
    // Prioritize Spotify SDK if connected and track is available
    if (spotifyPlayer && spotifyDeviceId && clickedUri && spotifyAccessToken) {
        try {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${spotifyDeviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [clickedUri], position_ms: PREVIEW_START_TIME_MS }),
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${spotifyAccessToken}` },
            });
            updatePlayButtonState(buttonEl, true);
            currentPlayingUri = clickedUri;
            activePlaybackTimeout = window.setTimeout(() => {
                if (spotifyPlayer) spotifyPlayer.pause();
                resetAllPlayButtons();
            }, PREVIEW_DURATION_MS);
        } catch (error) {
            console.error('Failed to play via Spotify SDK', error);
            showError("Gagal memulai pemutaran di Spotify. Coba hubungkan ulang.");
        }
    } 
    // Fallback to HTML5 Audio if preview URL exists
    else if (song.preview_url) {
        currentHtmlAudio = new Audio(song.preview_url);
        currentHtmlAudio.play().catch(e => console.error("Audio playback error:", e));
        updatePlayButtonState(buttonEl, true);
        currentPlayingUri = song.preview_url; // Use URL as a unique ID for fallback
        currentHtmlAudio.addEventListener('ended', resetAllPlayButtons);
        activePlaybackTimeout = window.setTimeout(() => {
            if (currentHtmlAudio) currentHtmlAudio.pause();
            resetAllPlayButtons();
        }, PREVIEW_DURATION_MS); // Use shorter duration for HTML audio previews
    } 
    // No playable source
    else {
        showError('Tidak ada preview lagu yang tersedia.');
    }
}


// --- UI & Application Flow ---

/**
 * Updates the UI based on the user's login status.
 * @param {User | null} user - The current user object or null if logged out.
 */
function updateUserUI(user: User | null) {
    if (user) {
        // Desktop UI
        loginNavButton.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userEmailSpan.textContent = user.email;
        if (user.is_premium) {
            userStatusContainer.classList.add('hidden');
            connectSpotifyButton.classList.remove('hidden');
            updateSpotifyButtonState(!!spotifyDeviceId);
            historyNavButton.classList.remove('hidden');
        } else {
            userStatusContainer.classList.remove('hidden');
            userCredits.textContent = `Sisa credits: ${user.generation_credits}`;
            connectSpotifyButton.classList.add('hidden');
            historyNavButton.classList.add('hidden');
        }

        // Mobile UI
        mobileLoginButton.classList.add('hidden');
        mobileUserProfile.classList.remove('hidden');
        mobileUserEmail.textContent = user.email;
        if(user.is_premium) {
            mobileHistoryNavButton.classList.remove('hidden');
        } else {
            mobileHistoryNavButton.classList.add('hidden');
        }
    } else {
        // Desktop UI
        loginNavButton.classList.remove('hidden');
        userProfile.classList.add('hidden');
        userStatusContainer.classList.add('hidden');
        connectSpotifyButton.classList.add('hidden');
        historyNavButton.classList.add('hidden');

        // Mobile UI
        mobileLoginButton.classList.remove('hidden');
        mobileUserProfile.classList.add('hidden');
        mobileHistoryNavButton.classList.add('hidden');
    }
}

/**
 * Switches between the Login and Register forms.
 * @param {boolean} toLogin - True to show login, false for register.
 */
function switchAuthMode(toLogin: boolean) {
    isLoginMode = toLogin;
    loginModalError.classList.add('hidden');
    loginModalTitle.textContent = toLogin ? 'Login' : 'Daftar';
    loginSubmitButton.textContent = toLogin ? 'Masuk' : 'Daftar';
    loginSwitchPrompt.textContent = toLogin ? 'Belum punya akun?' : 'Sudah punya akun?';
    loginSwitchLink.textContent = toLogin ? 'Daftar di sini' : 'Login di sini';
    forgotPasswordLink.classList.toggle('hidden', !toLogin);
    loginForm.reset();
}

/**
 * Handles persona selection and transitions to the main app interface.
 * @param {string} persona - The selected persona ('creator' or 'casual').
 */
function selectPersona(persona: 'creator' | 'casual') {
    if (persona === 'creator' && (!currentUser || !currentUser.is_premium)) {
        openSubscriptionModal();
        return;
    }
    userPersona = persona;
    updateAnalyzeButtonState();
    gsap.to(personaContainer, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            personaContainer.classList.add('hidden');
            mainAppInterface.classList.remove('hidden');
            gsap.fromTo(mainAppInterface, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    });
}

/**
 * Handles file selection, reads the image, and displays a preview.
 */
function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            base64ImageData = e.target?.result as string;
            imagePreview.src = base64ImageData;
            uploadContainer.classList.add('hidden');
            imagePreviewContainer.classList.remove('hidden');
            updateAnalyzeButtonState();
        };
        reader.readAsDataURL(file);
    }
}

/**
 * Starts the AI analysis process.
 */
async function analyzeImage() {
    if (!base64ImageData || !userPersona) return;
    analysisAbortController = new AbortController();

    showLoader(true, 'Menganalisis fotomu...');

    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            body: JSON.stringify({
                base64ImageData,
                persona: userPersona,
                theme: themeInput.value || null
            }),
            signal: analysisAbortController.signal,
        });

        if (!response.ok) {
            let errorData = { error: 'Terjadi kesalahan pada server.', quotaExceeded: false };
            try {
                // Try to parse the error response, but don't fail if it's not JSON
                errorData = await response.json();
            } catch (e) {
                console.error("Failed to parse error response as JSON:", e);
            }

            if (errorData.quotaExceeded) {
                showLoader(false); // Hide loader first
                mainAppInterface.classList.remove('hidden'); // Restore the main UI
                openSubscriptionModal(); // Show the modal on top
            } else {
                // For other errors, throw to be handled by the catch block
                throw new Error(errorData.error || 'Terjadi kesalahan saat analisis.');
            }
            // IMPORTANT: Stop execution here since we handled the error response
            return; 
        }

        const data = await response.json();

        // Defensive check for valid, non-empty results from the AI
        if (!data.analysis || !Array.isArray(data.analysis) || data.analysis.length === 0) {
            throw new Error('AI tidak memberikan hasil yang valid. Coba lagi dengan foto atau tema yang berbeda.');
        }

        if (currentUser?.is_premium) {
            await saveToHistory(base64ImageData, data.analysis, userPersona);
        }

        renderResults(data.analysis);
        await checkLoginStatus(); // Re-check to get updated credits

    } catch (error: any) {
        if (error.name !== 'AbortError') {
            console.error("Analysis failed:", error);
            showError(error.message || 'Terjadi kesalahan tak terduga.');
            // Ensure a clean state on error: hide loader, hide results, show main UI
            showLoader(false);
            resultsContainer.classList.add('hidden');
            mainAppInterface.classList.remove('hidden');
        }
    }
}

/**
 * Renders the analysis results into a slider.
 * @param {IdeaResult[]} results - An array of content ideas.
 */
function renderResults(results: IdeaResult[]) {
    showLoader(false);
    mainAppInterface.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    const sliderWrapper = resultsContainer.querySelector('.slider-wrapper') as HTMLElement;
    sliderWrapper.innerHTML = ''; // Clear previous results
    
    results.forEach((idea, index) => {
        const slide = createIdeaCard(idea, index);
        sliderWrapper.appendChild(slide);
    });

    // Initialize slider
    const slides = sliderWrapper.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide') as HTMLButtonElement;
    const nextButton = document.getElementById('next-slide') as HTMLButtonElement;
    let currentIndex = 0;

    function goToSlide(index: number) {
        if (index < 0 || index >= slides.length) return;
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    }

    prevButton.onclick = () => goToSlide(currentIndex - 1);
    nextButton.onclick = () => goToSlide(currentIndex + 1);
}

/**
 * Creates a single result card element.
 * @param {IdeaResult} idea - The content idea object.
 * @param {number} index - The index of the idea.
 * @returns {HTMLElement} The created slide element.
 */
function createIdeaCard(idea: IdeaResult, index: number): HTMLElement {
    const slide = document.createElement('div');
    slide.className = 'slide fade-in';
    slide.style.animationDelay = `${index * 100}ms`;

    const hashtags = idea.hashtags.map(h => `#${h}`).join(' ');

    slide.innerHTML = `
        <div class="flex flex-col h-full">
            <div class="flex justify-between items-center mb-4">
                <span class="mood-badge">${idea.mood}</span>
            </div>
            <div class="flex-grow flex items-center">
                 <p class="caption-text">${idea.caption}</p>
            </div>
             <p class="hashtags text-sm mb-4">${hashtags}</p>
            <div class="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between gap-4">
                <div class="flex items-center gap-4 overflow-hidden">
                    <button class="play-pause-btn">
                        ${playIconSVG}
                        ${pauseIconSVG}
                    </button>
                    <div class="min-w-0">
                        <p class="font-bold text-white truncate">${idea.song.title}</p>
                        <p class="text-sm text-text-muted truncate">${idea.song.artist}</p>
                    </div>
                </div>
                <button class="btn-copy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
            </div>
        </div>
    `;

    const copyButton = slide.querySelector('.btn-copy') as HTMLButtonElement;
    copyButton.addEventListener('click', () => {
        const textToCopy = `${idea.caption}\n\n${hashtags}\n\nSong suggestion: ${idea.song.title} by ${idea.song.artist}`;
        window.copyToClipboard(textToCopy, copyButton);
    });

    const playPauseBtn = slide.querySelector('.play-pause-btn') as HTMLButtonElement;
    playPauseBtn.addEventListener('click', () => toggleSongPlayback(idea.song, playPauseBtn));
    
    if(!idea.song.uri && !idea.song.preview_url) {
        playPauseBtn.disabled = true;
        playPauseBtn.style.opacity = '0.5';
        playPauseBtn.style.cursor = 'not-allowed';
    }

    return slide;
}

/**
 * Resets the application state to the initial persona selection screen.
 */
function resetApp() {
    resetAllPlayButtons();
    if(currentHtmlAudio) currentHtmlAudio.pause();
    if(spotifyPlayer) spotifyPlayer.pause();

    analysisAbortController?.abort();

    resultsContainer.classList.add('hidden');
    returnToPersonaSelection();
}

/**
 * Resets the UI from image preview back to the upload prompt.
 */
function resetImageSelection() {
    base64ImageData = null;
    fileInput.value = '';
    imagePreview.src = '';
    imagePreviewContainer.classList.add('hidden');
    uploadContainer.classList.remove('hidden');
    updateAnalyzeButtonState();
}

/**
 * Transitions the UI back to the persona selection screen.
 */
function returnToPersonaSelection() {
    userPersona = null;
    resetImageSelection();
    
    gsap.to(mainAppInterface, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            mainAppInterface.classList.add('hidden');
            personaContainer.classList.remove('hidden');
            gsap.fromTo(personaContainer, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    });

    personaButtons.forEach(btn => btn.classList.remove('selected'));
}

/**
 * Enables or disables the analyze button based on app state.
 */
function updateAnalyzeButtonState() {
    analyzeButton.disabled = !base64ImageData || !userPersona;
}

/**
 * Shows or hides the main loader.
 * @param {boolean} show - Whether to show the loader.
 * @param {string} [text] - Optional text to display.
 */
function showLoader(show: boolean, text: string = 'MENGANALISIS...') {
    if (show) {
        mainAppInterface.classList.add('hidden');
        loaderContainer.classList.remove('hidden');
        loaderText.textContent = text;
    } else {
        loaderContainer.classList.add('hidden');
    }
}

/**
 * Displays an error message to the user.
 * @param {string} message - The error message to display.
 * @param {'error' | 'success'} type - The type of message.
 */
function showError(message: string, type: 'error' | 'success' = 'error') {
    const el = isLoginMode ? loginModalError : (type === 'error' ? forgotPasswordModalError : forgotPasswordModalSuccess);
    if(loginModal.style.display !== 'none' && authView.style.display !== 'none') {
        loginModalError.textContent = message;
        loginModalError.classList.remove('hidden');
        if (type === 'success') {
            loginModalError.classList.replace('bg-red-900/50', 'bg-green-900/50');
            loginModalError.classList.replace('border-red-500', 'border-green-500');
            loginModalError.classList.replace('text-red-300', 'text-green-300');
        } else {
            loginModalError.classList.replace('bg-green-900/50', 'bg-red-900/50');
            loginModalError.classList.replace('border-green-500', 'border-red-500');
            loginModalError.classList.replace('text-green-300', 'text-red-300');
        }
    } else {
        errorMessage.textContent = message;
        errorContainer.classList.remove('hidden');
        setTimeout(() => errorContainer.classList.add('hidden'), 5000);
    }
}

/**
 * Resets the visual state of all play/pause buttons to 'paused'.
 */
function resetAllPlayButtons() {
    document.querySelectorAll('.play-pause-btn').forEach(btn => {
        updatePlayButtonState(btn as HTMLButtonElement, false);
    });
    currentPlayingUri = null;
    if (activePlaybackTimeout) {
        clearTimeout(activePlaybackTimeout);
        activePlaybackTimeout = null;
    }
}

/**
 * Updates a play/pause button's icons and state class.
 * @param {HTMLButtonElement} buttonEl - The button to update.
 * @param {boolean} isPlaying - The new state.
 */
function updatePlayButtonState(buttonEl: HTMLButtonElement, isPlaying: boolean) {
    const playIcon = buttonEl.querySelector('.play-icon');
    const pauseIcon = buttonEl.querySelector('.pause-icon');
    if (isPlaying) {
        playIcon?.classList.add('hidden');
        pauseIcon?.classList.remove('hidden');
        buttonEl.classList.add('playing');
    } else {
        playIcon?.classList.remove('hidden');
        pauseIcon?.classList.add('hidden');
        buttonEl.classList.remove('playing');
    }
}

// --- Modals & Page Navigation ---

function openLoginModal() {
    loginModal.classList.remove('hidden');
    switchAuthMode(true);
    authView.classList.remove('hidden');
    forgotPasswordView.classList.add('hidden');
}
function closeLoginModal() { loginModal.classList.add('hidden'); loginForm.reset(); forgotPasswordForm.reset(); }
function openSubscriptionModal() { subscriptionModal.classList.remove('hidden'); }
function closeSubscriptionModal() { subscriptionModal.classList.add('hidden'); }

function showPage(pageId: string) {
    document.querySelectorAll('.page-content').forEach(page => (page as HTMLElement).classList.add('hidden'));
    
    if (pageId === 'page-riwayat') {
        fetchHistory();
        pageRiwayat.classList.remove('hidden');
        mainContentScrollContainer.classList.add('hidden');
    } else {
        mainContentScrollContainer.classList.remove('hidden');
        const targetPage = document.getElementById(pageId.replace('page-', '')) as HTMLElement;
        if(targetPage) {
            targetPage.classList.remove('hidden');
            // If it's the home page, ensure we start at the top
            if (pageId === 'page-home') {
                 mainContentScrollContainer.style.display = 'block';
                 pageRiwayat.classList.add('hidden');
                 const homeSection = document.getElementById('home');
                 homeSection?.classList.remove('hidden');
            }
        }
    }
}

// --- History Functions ---

async function fetchHistory() {
    if (!currentUser?.is_premium) {
        showError("Riwayat hanya tersedia untuk pengguna Premium.");
        return;
    }
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/history`);
        const history = await response.json();
        
        if (!response.ok) throw new Error(history.error || "Gagal memuat riwayat.");

        historyGrid.innerHTML = '';
        if (Array.isArray(history) && history.length === 0) {
            historyEmptyState.classList.remove('hidden');
            historyGrid.classList.add('hidden');
        } else {
            historyEmptyState.classList.add('hidden');
            historyGrid.classList.remove('hidden');
            (history as HistoryItem[]).forEach(createHistoryCard);
        }
    } catch (error: any) {
        showError(error.message);
    }
}

function createHistoryCard(item: HistoryItem) {
    const card = document.createElement('div');
    card.className = 'futuristic-card p-3 rounded-xl cursor-pointer';
    card.innerHTML = `
        <img src="${item.thumbnailDataUrl}" alt="History thumbnail" class="rounded-lg w-full h-48 object-cover mb-3">
        <p class="text-sm font-semibold text-text-primary">Analisis ${item.persona}</p>
        <p class="text-xs text-text-muted">${item.date}</p>
    `;
    card.addEventListener('click', () => showHistoryDetail(item));
    historyGrid.appendChild(card);
}

function showHistoryDetail(item: HistoryItem) {
    historyDetailContent.innerHTML = ''; // Clear previous content

    const contentWrapper = document.createElement('div');
    contentWrapper.innerHTML = `
        <h2 class="text-2xl font-bold text-white mb-2">Detail Riwayat</h2>
        <p class="text-text-muted mb-4">Analisis <span class="font-semibold text-accent">${item.persona}</span> pada tanggal ${item.date}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-bold text-lg mb-2">Foto Asli</h3>
                <img src="${item.thumbnailDataUrl}" class="rounded-lg w-full object-cover">
            </div>
            <div>
                <h3 class="font-bold text-lg mb-2">Hasil Analisis</h3>
                <div class="space-y-4">
                    ${item.resultData.map(idea => `
                        <div class="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                            <p class="font-semibold text-white">"${idea.caption}"</p>
                            <p class="text-sm text-text-muted mt-1">${idea.hashtags.map(h => `#${h}`).join(' ')}</p>
                            <p class="text-sm text-accent-secondary mt-1">🎵 ${idea.song.title} - ${idea.song.artist}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    historyDetailContent.appendChild(contentWrapper);
    historyDetailModal.classList.remove('hidden');
}

async function saveToHistory(thumbnailDataUrl: string, resultData: IdeaResult[], persona: 'creator' | 'casual') {
    try {
        await fetchWithAuth(`${API_BASE_URL}/api/history`, {
            method: 'POST',
            body: JSON.stringify({ thumbnailDataUrl, resultData, persona })
        });
    } catch (error) {
        console.warn("Could not save to history:", error);
    }
}


// --- Utility Functions ---

window.copyToClipboard = (text: string, button: HTMLButtonElement) => {
    navigator.clipboard.writeText(text).then(() => {
        const originalContent = button.innerHTML;
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
        setTimeout(() => {
            button.innerHTML = originalContent;
        }, 1500);
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
};


// --- GSAP Animations ---
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered logo animation
    const logoText = document.getElementById('logo-text');
    if(logoText) {
        const letters = logoText.textContent!.split('');
        logoText.textContent = '';
        letters.forEach(letter => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'logo-letter';
            logoText.appendChild(span);
        });

        gsap.to('.logo-letter', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
        });
    }

    // Animate sections on scroll
    document.querySelectorAll('.section-title, .hero-title, .hero-description, .feature-card, .app-card-container, .social-proof-container').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
        });
    });
}


// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    getAppConfig();
    checkLoginStatus();
    processAndSetupSpotify();
    initAnimations();

    // Persona selection
    personaButtons.forEach(button => {
        button.addEventListener('click', () => {
            personaButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectPersona(button.dataset.persona as 'creator' | 'casual');
        });
    });

    // Main app buttons
    fileInput.addEventListener('change', handleFileSelect);
    analyzeButton.addEventListener('click', analyzeImage);
    resetButton.addEventListener('click', resetApp);
    changeImageButton.addEventListener('click', resetImageSelection);
    backToPersonaButton.addEventListener('click', returnToPersonaSelection);

    backFromLoaderButton.addEventListener('click', () => {
        analysisAbortController?.abort();
        showLoader(false);
        mainAppInterface.classList.remove('hidden');
    });
    backFromResultsButton.addEventListener('click', () => {
        mainAppInterface.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        imagePreviewContainer.classList.remove('hidden');
    });

    // Auth buttons
    loginNavButton.addEventListener('click', openLoginModal);
    closeLoginModalButton.addEventListener('click', closeLoginModal);
    loginForm.addEventListener('submit', handleAuth);
    loginSwitchLink.addEventListener('click', (e) => { e.preventDefault(); switchAuthMode(!isLoginMode); });

    // Profile dropdown
    userProfileButton.addEventListener('click', () => userDropdown.classList.toggle('hidden'));
    logoutButton.addEventListener('click', handleLogout);
    
    // Subscription modal
    closeModalButton.addEventListener('click', closeSubscriptionModal);
    upgradeButtonPricing.addEventListener('click', () => {
        if (!currentUser) { openLoginModal(); return; }
        openSubscriptionModal();
    });
    initiatePaymentButton.addEventListener('click', handlePayment);

    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            if (pageId) {
                showPage(pageId);
                // For single-page scrolling sections
                if (['home', 'about', 'harga'].includes(pageId.replace('page-',''))) {
                    mainContentScrollContainer.style.display = 'block';
                    pageRiwayat.classList.add('hidden');
                    const targetSection = document.getElementById(pageId.replace('page-',''));
                    targetSection?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    historyNavButton.addEventListener('click', (e) => { e.preventDefault(); showPage('page-riwayat'); });

    // Spotify connect button
    connectSpotifyButton.addEventListener('click', () => {
        window.location.href = '/api/spotify-login';
    });
    
    // History modal
    closeHistoryDetailModalButton.addEventListener('click', () => historyDetailModal.classList.add('hidden'));

    // Reset password flow
    forgotPasswordLink.addEventListener('click', (e) => { e.preventDefault(); authView.classList.add('hidden'); forgotPasswordView.classList.remove('hidden'); });
    backToLoginLink.addEventListener('click', (e) => { e.preventDefault(); forgotPasswordView.classList.add('hidden'); authView.classList.remove('hidden'); });
    forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    
    // Handle password reset from URL token
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('token')) {
        passwordResetToken = urlParams.get('token');
        resetPasswordModal.classList.remove('hidden');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    closeResetPasswordModalButton.addEventListener('click', () => resetPasswordModal.classList.add('hidden'));
    resetPasswordForm.addEventListener('submit', handleResetPassword);

    // Mobile Menu
    mobileMenuButton.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
    closeMobileMenuButton.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    mobileNavLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
    mobileLoginButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        openLoginModal();
    });
    mobileLogoutButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        handleLogout();
    });
    mobileHistoryNavButton.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.add('hidden');
        showPage('page-riwayat');
    })
});

// --- Payments ---
async function handlePayment() {
    modalInfoView.classList.add('hidden');
    modalProcessingView.classList.remove('hidden');
    processingMessage.textContent = 'Membuat transaksi...';
    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/create-transaction`, {
            method: 'POST',
            body: JSON.stringify({ amount: 10000 })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        window.snap.pay(data.token, {
            onSuccess: function(result: any){
                console.log('Payment success:', result);
                processingMessage.textContent = 'Pembayaran berhasil! Memperbarui akun...';
                setTimeout(() => {
                    closeSubscriptionModal();
                    checkLoginStatus(); // Re-fetch user status
                }, 2000);
            },
            onPending: function(result: any){
                console.log('Payment pending:', result);
                processingMessage.textContent = 'Menunggu pembayaran Anda...';
            },
            onError: function(result: any){
                 console.error('Payment error:', result);
                processingMessage.textContent = `Pembayaran gagal. Silakan coba lagi.`;
                setTimeout(() => {
                     modalProcessingView.classList.add('hidden');
                     modalInfoView.classList.remove('hidden');
                }, 3000);
            },
            onClose: function(){
                if (modalProcessingView.style.display !== 'none' && processingMessage.textContent === 'Menunggu pembayaran Anda...') {
                    console.log('customer closed the popup without finishing the payment');
                    modalProcessingView.classList.add('hidden');
                    modalInfoView.classList.remove('hidden');
                }
            }
        });

    } catch (error: any) {
        processingMessage.textContent = `Error: ${error.message}`;
        setTimeout(() => {
            modalProcessingView.classList.add('hidden');
            modalInfoView.classList.remove('hidden');
        }, 3000);
    }
}


// --- Password Reset Flow ---
async function handleForgotPassword(event: Event) {
    event.preventDefault();
    forgotPasswordModalError.classList.add('hidden');
    forgotPasswordModalSuccess.classList.add('hidden');
    forgotPasswordSubmitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: forgotPasswordEmail.value })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        forgotPasswordModalSuccess.textContent = 'Link reset telah dikirim ke email Anda.';
        forgotPasswordModalSuccess.classList.remove('hidden');
    } catch(err: any) {
        forgotPasswordModalError.textContent = err.message || 'Gagal mengirim email.';
        forgotPasswordModalError.classList.remove('hidden');
    } finally {
        forgotPasswordSubmitButton.disabled = false;
    }
}

async function handleResetPassword(event: Event) {
    event.preventDefault();
    resetPasswordModalError.classList.add('hidden');
    
    if (resetPasswordInput.value !== confirmPasswordInput.value) {
        resetPasswordModalError.textContent = 'Password tidak cocok.';
        resetPasswordModalError.classList.remove('hidden');
        return;
    }

    resetPasswordSubmitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: passwordResetToken, password: resetPasswordInput.value })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        resetPasswordModal.classList.add('hidden');
        openLoginModal();
        showError(data.message, 'success');

    } catch(err: any) {
        resetPasswordModalError.textContent = err.message || 'Gagal mereset password.';
        resetPasswordModalError.classList.remove('hidden');
    } finally {
        resetPasswordSubmitButton.disabled = false;
    }
}