// Settings dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const settingsDropdown = document.getElementById('settings-dropdown');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');

    if (!settingsDropdown || !settingsBtn || !settingsMenu) return;

    // Initialize settings menu
    updateSettingsMenu();
    setupEventListeners();

    function setupEventListeners() {
        // Toggle settings dropdown
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSettingsMenu();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!settingsDropdown.contains(e.target)) {
                closeSettingsMenu();
            }
        });

        // Handle settings menu clicks
        settingsMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            handleSettingsClick(e);
        });
    }

    function updateSettingsMenu() {
        const isLoggedIn = window.authUtils && window.authUtils.isLoggedIn();
        const currentUser = isLoggedIn ? window.authUtils.getCurrentUser() : null;

        if (isLoggedIn && currentUser) {
            // Logged in menu
            settingsMenu.innerHTML = `
                <div class="settings-header">
                    <div class="user-avatar-small">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="User">
                    </div>
                    <div class="user-info-small">
                        <div class="user-name-small">${currentUser.firstName} ${currentUser.lastName}</div>
                        <div class="user-email-small">${currentUser.email}</div>
                    </div>
                </div>
                <div class="settings-divider"></div>
                <a href="account.html" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Account
                </a>
                <a href="account.html#orders" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1z"/>
                    </svg>
                    Recent Orders
                </a>
                <a href="account.html#wishlist" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Wishlist
                </a>
                <a href="account.html#addresses" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Addresses
                </a>
                <div class="settings-divider"></div>
                <a href="contact.html" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Help & Support
                </a>
                <button class="settings-item logout-btn" data-action="logout">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16,17 21,12 16,7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                </button>
            `;
        } else {
            // Not logged in menu
            settingsMenu.innerHTML = `
                <div class="settings-header">
                    <div class="welcome-text">
                        <div class="welcome-title">Welcome to Liv-Lif</div>
                        <div class="welcome-subtitle">Sign in to access your account</div>
                    </div>
                </div>
                <div class="settings-divider"></div>
                <a href="login.html" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                        <polyline points="10,17 15,12 10,7"/>
                        <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Sign In
                </a>
                <a href="login.html" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Create Account
                </a>
                <div class="settings-divider"></div>
                <a href="contact.html" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Help & Support
                </a>
                <a href="about.html" class="settings-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    About Us
                </a>
            `;
        }
    }

    function toggleSettingsMenu() {
        const isOpen = settingsDropdown.classList.contains('active');
        if (isOpen) {
            closeSettingsMenu();
        } else {
            openSettingsMenu();
        }
    }

    function openSettingsMenu() {
        settingsDropdown.classList.add('active');
        updateSettingsMenu(); // Refresh menu content
    }

    function closeSettingsMenu() {
        settingsDropdown.classList.remove('active');
    }

    function handleSettingsClick(e) {
        const target = e.target.closest('.settings-item');
        if (!target) return;

        const action = target.dataset.action;
        
        if (action === 'logout') {
            e.preventDefault();
            handleLogout();
        } else if (target.href) {
            // Allow normal navigation for links
            closeSettingsMenu();
        }
    }

    function handleLogout() {
        if (window.authUtils) {
            // Show confirmation
            if (confirm('Are you sure you want to logout?')) {
                window.authUtils.logout();
            }
        }
        closeSettingsMenu();
    }

    // Add CSS styles for settings dropdown
    if (!document.querySelector('#settings-styles')) {
        const style = document.createElement('style');
        style.id = 'settings-styles';
        style.textContent = `
            .settings-dropdown {
                position: relative;
            }

            .settings-btn {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--border-radius-full);
                color: var(--color-text-dark);
                transition: all var(--transition-normal);
                background: none;
                border: none;
                cursor: pointer;
            }

            .settings-btn:hover {
                background: var(--color-background);
                color: var(--color-primary);
            }

            .settings-menu {
                position: absolute;
                top: calc(100% + 8px);
                right: 0;
                background: var(--color-white);
                min-width: 280px;
                box-shadow: var(--shadow-xl);
                border-radius: var(--border-radius-xl);
                padding: var(--space-md) 0;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all var(--transition-normal);
                z-index: var(--z-dropdown);
                border: 1px solid var(--color-border);
            }

            .settings-dropdown.active .settings-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .settings-header {
                padding: var(--space-lg);
                border-bottom: 1px solid var(--color-border);
                margin-bottom: var(--space-sm);
            }

            .user-avatar-small {
                width: 40px;
                height: 40px;
                border-radius: var(--border-radius-full);
                overflow: hidden;
                margin-bottom: var(--space-md);
            }

            .user-avatar-small img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .user-name-small {
                font-weight: var(--weight-semibold);
                color: var(--color-text-dark);
                margin-bottom: var(--space-xs);
            }

            .user-email-small {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }

            .welcome-title {
                font-weight: var(--weight-semibold);
                color: var(--color-text-dark);
                margin-bottom: var(--space-xs);
            }

            .welcome-subtitle {
                font-size: var(--text-sm);
                color: var(--color-text-muted);
            }

            .settings-item {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                padding: var(--space-md) var(--space-lg);
                color: var(--color-text-dark);
                text-decoration: none;
                font-size: var(--text-sm);
                font-weight: var(--weight-medium);
                transition: all var(--transition-normal);
                border: none;
                background: none;
                width: 100%;
                text-align: left;
                cursor: pointer;
            }

            .settings-item:hover {
                background: var(--color-background);
                color: var(--color-primary);
            }

            .settings-item svg {
                flex-shrink: 0;
            }

            .settings-divider {
                height: 1px;
                background: var(--color-border);
                margin: var(--space-sm) 0;
            }

            .logout-btn {
                color: #dc2626 !important;
            }

            .logout-btn:hover {
                background: #fee2e2 !important;
                color: #dc2626 !important;
            }

            @media (max-width: 768px) {
                .settings-menu {
                    min-width: 260px;
                    right: -20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Listen for auth state changes
    window.addEventListener('storage', function(e) {
        if (e.key === 'livlif_user') {
            updateSettingsMenu();
        }
    });
});

// Function to require login for cart operations
function requireLoginForOrder() {
    if (window.authUtils && !window.authUtils.isLoggedIn()) {
        const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
        
        // Show login prompt
        if (confirm('Please login to place an order. Would you like to login now?')) {
            window.location.href = `login.html?return=${currentUrl}`;
        }
        return false;
    }
    return true;
}

// Export for use in other scripts
window.settingsUtils = {
    requireLoginForOrder: requireLoginForOrder,
    updateSettingsMenu: function() {
        const settingsDropdown = document.getElementById('settings-dropdown');
        if (settingsDropdown) {
            // Trigger update
            const event = new CustomEvent('updateSettings');
            settingsDropdown.dispatchEvent(event);
        }
    }
};