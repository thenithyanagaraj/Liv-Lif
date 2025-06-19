// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Initialize
    init();

    function init() {
        setupEventListeners();
        
        // Check if user is already logged in
        if (isLoggedIn()) {
            // Redirect to account page or previous page
            const returnUrl = new URLSearchParams(window.location.search).get('return') || 'account.html';
            window.location.href = returnUrl;
        }
    }

    function setupEventListeners() {
        // Tab switching
        authTabs.forEach(tab => {
            tab.addEventListener('click', handleTabSwitch);
        });

        // Form submissions
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegister);
        }

        // Password toggles
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', handlePasswordToggle);
        });

        // Social auth buttons
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(button => {
            button.addEventListener('click', handleSocialAuth);
        });
    }

    function handleTabSwitch(event) {
        const targetTab = event.target.dataset.tab;
        
        // Update active tab
        authTabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        // Show/hide forms
        if (targetTab === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        }
    }

    function handlePasswordToggle(event) {
        const passwordInput = event.target.closest('.password-input').querySelector('input');
        const isPassword = passwordInput.type === 'password';
        
        passwordInput.type = isPassword ? 'text' : 'password';
        
        // Update icon
        const icon = event.target.closest('.password-toggle').querySelector('svg');
        if (isPassword) {
            // Show "eye-off" icon
            icon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            // Show "eye" icon
            icon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    }

    function handleLogin(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        // Basic validation
        if (!email || !password) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Signing In...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // For demo purposes, accept any email/password
            if (email && password) {
                // Create user session
                const userData = {
                    id: 'user_' + Date.now(),
                    email: email,
                    firstName: email.split('@')[0],
                    lastName: 'User',
                    loginTime: new Date().toISOString(),
                    remember: remember
                };

                // Store user data
                if (remember) {
                    localStorage.setItem('livlif_user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('livlif_user', JSON.stringify(userData));
                }

                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect after short delay
                setTimeout(() => {
                    const returnUrl = new URLSearchParams(window.location.search).get('return') || 'account.html';
                    window.location.href = returnUrl;
                }, 1500);
            } else {
                showMessage('Invalid email or password.', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        }, 1000);
    }

    function handleRegister(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const terms = formData.get('terms');

        // Validation
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long.', 'error');
            return;
        }

        if (!terms) {
            showMessage('Please accept the Terms of Service and Privacy Policy.', 'error');
            return;
        }

        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Creating Account...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Create user session
            const userData = {
                id: 'user_' + Date.now(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                loginTime: new Date().toISOString(),
                isNewUser: true
            };

            // Store user data
            localStorage.setItem('livlif_user', JSON.stringify(userData));

            showMessage('Account created successfully! Redirecting...', 'success');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 1500);
        }, 1000);
    }

    function handleSocialAuth(event) {
        const provider = event.target.closest('.social-btn').classList.contains('google-btn') ? 'Google' : 'Facebook';
        
        showMessage(`${provider} authentication is not available in demo mode.`, 'info');
    }

    function showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message ${type}`;
        messageEl.textContent = message;
        
        // Style the message
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                messageEl.style.backgroundColor = '#10b981';
                break;
            case 'error':
                messageEl.style.backgroundColor = '#ef4444';
                break;
            case 'info':
            default:
                messageEl.style.backgroundColor = '#3b82f6';
                break;
        }

        // Add animation keyframes
        if (!document.querySelector('#auth-message-styles')) {
            const style = document.createElement('style');
            style.id = 'auth-message-styles';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(messageEl);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    function isLoggedIn() {
        return localStorage.getItem('livlif_user') || sessionStorage.getItem('livlif_user');
    }
});

// Export functions for use in other scripts
window.authUtils = {
    isLoggedIn: function() {
        return localStorage.getItem('livlif_user') || sessionStorage.getItem('livlif_user');
    },
    
    getCurrentUser: function() {
        const userData = localStorage.getItem('livlif_user') || sessionStorage.getItem('livlif_user');
        return userData ? JSON.parse(userData) : null;
    },
    
    logout: function() {
        localStorage.removeItem('livlif_user');
        sessionStorage.removeItem('livlif_user');
        window.location.href = 'index.html';
    },
    
    requireLogin: function() {
        if (!this.isLoggedIn()) {
            const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = `login.html?return=${currentUrl}`;
            return false;
        }
        return true;
    }
};