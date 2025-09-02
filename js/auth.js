// UMMTO Authentication System
// Supports Google OAuth, Email/Password, and other providers

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userRole = null; // 'student', 'professor', 'admin'
        this.providers = {
            google: this.initGoogleAuth.bind(this),
            email: this.initEmailAuth.bind(this)
        };

        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.initGoogleAuth();
        this.setupAuthUI();
        this.setupEventListeners();
    }

    // Initialize Google OAuth
    initGoogleAuth() {
        // Load Google OAuth script if not already loaded
        if (!document.querySelector('script[src*="accounts.google.com"]')) {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            script.onload = () => {
                this.initializeGoogleSignIn();
            };
        } else {
            this.initializeGoogleSignIn();
        }
    }

    initializeGoogleSignIn() {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with actual client ID
                callback: this.handleGoogleCallback.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });
        }
    }

    handleGoogleCallback(response) {
        // Decode JWT token
        const userData = this.decodeJWT(response.credential);

        this.authenticateUser({
            provider: 'google',
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            id: userData.sub
        });
    }

    decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    // Email/Password Authentication
    initEmailAuth() {
        // Setup email/password authentication
        this.setupEmailAuthUI();
    }

    setupEmailAuthUI() {
        // Create email auth modal if it doesn't exist
        if (!document.getElementById('email-auth-modal')) {
            const modal = document.createElement('div');
            modal.id = 'email-auth-modal';
            modal.className = 'auth-modal';
            modal.innerHTML = `
                <div class="auth-modal-content">
                    <div class="auth-modal-header">
                        <h3>Connexion</h3>
                        <button class="auth-modal-close">&times;</button>
                    </div>
                    <div class="auth-modal-body">
                        <div class="auth-tabs">
                            <button class="auth-tab active" data-tab="login">Connexion</button>
                            <button class="auth-tab" data-tab="register">Inscription</button>
                        </div>

                        <div id="login-form" class="auth-form active">
                            <form id="loginForm">
                                <div class="form-group">
                                    <label for="login-email">Email</label>
                                    <input type="email" id="login-email" required>
                                </div>
                                <div class="form-group">
                                    <label for="login-password">Mot de passe</label>
                                    <input type="password" id="login-password" required>
                                </div>
                                <div class="form-group">
                                    <label class="checkbox-label">
                                        <input type="checkbox" id="remember-me">
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <button type="submit" class="auth-btn">Se connecter</button>
                            </form>
                        </div>

                        <div id="register-form" class="auth-form">
                            <form id="registerForm">
                                <div class="form-group">
                                    <label for="register-name">Nom complet</label>
                                    <input type="text" id="register-name" required>
                                </div>
                                <div class="form-group">
                                    <label for="register-email">Email</label>
                                    <input type="email" id="register-email" required>
                                </div>
                                <div class="form-group">
                                    <label for="register-role">Rôle</label>
                                    <select id="register-role" required>
                                        <option value="">Sélectionner un rôle</option>
                                        <option value="student">Étudiant</option>
                                        <option value="professor">Professeur</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="register-password">Mot de passe</label>
                                    <input type="password" id="register-password" required>
                                </div>
                                <div class="form-group">
                                    <label for="register-confirm-password">Confirmer le mot de passe</label>
                                    <input type="password" id="register-confirm-password" required>
                                </div>
                                <button type="submit" class="auth-btn">S'inscrire</button>
                            </form>
                        </div>

                        <div class="auth-divider">
                            <span>ou</span>
                        </div>

                        <div class="auth-providers">
                            <button class="auth-provider google-btn" id="google-signin">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continuer avec Google
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            this.setupEmailAuthEvents();
        }
    }

    setupEmailAuthEvents() {
        // Tab switching
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;

                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Show corresponding form
                const forms = document.querySelectorAll('.auth-form');
                forms.forEach(form => form.classList.remove('active'));
                document.getElementById(`${targetTab}-form`).classList.add('active');
            });
        });

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEmailLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEmailRegister();
            });
        }

        // Modal close
        const closeBtn = document.querySelector('.auth-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('email-auth-modal').style.display = 'none';
            });
        }

        // Google sign-in
        const googleBtn = document.getElementById('google-signin');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                if (window.google && window.google.accounts) {
                    window.google.accounts.id.prompt();
                } else {
                    this.showNotification('Google Sign-In n\'est pas disponible', 'error');
                }
            });
        }
    }

    handleEmailLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Simulate API call
        this.simulateLogin(email, password, rememberMe);
    }

    handleEmailRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const role = document.getElementById('register-role').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            this.showNotification('Les mots de passe ne correspondent pas', 'error');
            return;
        }

        // Simulate API call
        this.simulateRegister({ name, email, role, password });
    }

    simulateLogin(email, password, rememberMe) {
        // Simulate API response
        setTimeout(() => {
            // Mock successful login
            const userData = {
                id: 'user_' + Date.now(),
                email: email,
                name: email.split('@')[0],
                role: email.includes('prof') ? 'professor' : 'student',
                provider: 'email'
            };

            this.authenticateUser(userData, rememberMe);
            document.getElementById('email-auth-modal').style.display = 'none';
            this.showNotification('Connexion réussie!', 'success');
        }, 1000);
    }

    simulateRegister(userData) {
        // Simulate API response
        setTimeout(() => {
            this.showNotification('Inscription réussie! Vous pouvez maintenant vous connecter.', 'success');
            document.getElementById('email-auth-modal').style.display = 'none';

            // Switch to login tab
            document.querySelector('[data-tab="login"]').click();
        }, 1000);
    }

    authenticateUser(userData, remember = false) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        this.userRole = userData.role;

        // Store user data
        if (remember) {
            localStorage.setItem('ummto_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('ummto_user', JSON.stringify(userData));
        }

        // Update UI
        this.updateAuthUI();

        // Redirect based on role
        this.redirectAfterAuth();
    }

    loadUserFromStorage() {
        const storedUser = localStorage.getItem('ummto_user') || sessionStorage.getItem('ummto_user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                this.currentUser = userData;
                this.isAuthenticated = true;
                this.userRole = userData.role;
                this.updateAuthUI();
            } catch (e) {
                console.error('Error loading user data:', e);
            }
        }
    }

    updateAuthUI() {
        const authButtons = document.querySelectorAll('.auth-btn, .login-btn');
        const userInfo = document.querySelectorAll('.user-info');
        const logoutButtons = document.querySelectorAll('.logout-btn');

        if (this.isAuthenticated) {
            // Hide login buttons
            authButtons.forEach(btn => btn.style.display = 'none');

            // Show user info
            userInfo.forEach(info => {
                info.style.display = 'block';
                if (this.currentUser) {
                    info.innerHTML = `
                        <span>Bonjour, ${this.currentUser.name}</span>
                        <span class="user-role">${this.userRole === 'professor' ? 'Professeur' : 'Étudiant'}</span>
                    `;
                }
            });

            // Show logout buttons
            logoutButtons.forEach(btn => btn.style.display = 'block');
        } else {
            // Show login buttons
            authButtons.forEach(btn => btn.style.display = 'block');

            // Hide user info and logout
            userInfo.forEach(info => info.style.display = 'none');
            logoutButtons.forEach(btn => btn.style.display = 'none');
        }
    }

    redirectAfterAuth() {
        const currentPath = window.location.pathname;

        if (this.userRole === 'professor' && !currentPath.includes('professor-portal')) {
            window.location.href = 'professor-portal/';
        } else if (this.userRole === 'student' && !currentPath.includes('student-portal') && !currentPath.includes('forum')) {
            // Students can access student portal or forum
            if (currentPath.includes('professor-portal')) {
                window.location.href = 'student-portal/';
            }
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userRole = null;

        // Clear storage
        localStorage.removeItem('ummto_user');
        sessionStorage.removeItem('ummto_user');

        // Update UI
        this.updateAuthUI();

        // Redirect to home
        if (window.location.pathname.includes('professor-portal') || window.location.pathname.includes('student-portal')) {
            window.location.href = '../index.html';
        }

        this.showNotification('Déconnexion réussie', 'info');
    }

    setupAuthUI() {
        // Add auth buttons to pages that need them
        const pagesNeedingAuth = ['professor-portal', 'student-portal'];

        if (pagesNeedingAuth.some(page => window.location.pathname.includes(page))) {
            this.addAuthUI();
        }
    }

    addAuthUI() {
        // Add login/logout buttons to navigation
        const nav = document.querySelector('nav');
        if (nav && !document.querySelector('.auth-ui')) {
            const authUI = document.createElement('div');
            authUI.className = 'auth-ui';
            authUI.innerHTML = `
                <div class="user-info" style="display: none;"></div>
                <button class="auth-btn login-btn" style="display: none;">Connexion</button>
                <button class="logout-btn" style="display: none;" onclick="authSystem.logout()">Déconnexion</button>
            `;
            nav.appendChild(authUI);
        }
    }

    setupEventListeners() {
        // Handle login button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('login-btn') || e.target.classList.contains('auth-btn')) {
                document.getElementById('email-auth-modal').style.display = 'flex';
            }
        });

        // Handle logout
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('logout-btn')) {
                this.logout();
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Check if user has required role
    hasRole(requiredRole) {
        return this.userRole === requiredRole;
    }

    // Get current user data
    getCurrentUser() {
        return this.currentUser;
    }

    // Check authentication status
    isUserAuthenticated() {
        return this.isAuthenticated;
    }
}

// Initialize authentication system
const authSystem = new AuthSystem();

// Make it globally available
window.authSystem = authSystem;

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}