// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!window.authUtils || !window.authUtils.isLoggedIn()) {
        window.location.href = 'login.html?return=' + encodeURIComponent(window.location.pathname);
        return;
    }

    // DOM elements
    const navItems = document.querySelectorAll('.account-nav .nav-item');
    const sectionContents = document.querySelectorAll('.account-section-content');
    const userNameEl = document.getElementById('user-name');
    const userEmailEl = document.getElementById('user-email');
    const userAvatarEl = document.getElementById('user-avatar');

    // Initialize
    init();

    function init() {
        loadUserData();
        setupEventListeners();
        
        // Check for hash in URL to show specific section
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        }
    }

    function loadUserData() {
        const currentUser = window.authUtils.getCurrentUser();
        if (currentUser) {
            if (userNameEl) userNameEl.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
            if (userEmailEl) userEmailEl.textContent = currentUser.email;
            
            // Load additional user data (in a real app, this would come from an API)
            loadAccountData(currentUser);
        }
    }

    function loadAccountData(user) {
        // Simulate loading account data
        // In a real application, this would be API calls
        
        // Update overview stats
        updateOverviewStats();
        
        // Load recent orders
        loadRecentOrders();
        
        // Load wishlist
        loadWishlist();
        
        // Load addresses
        loadAddresses();
        
        // Populate profile form
        populateProfileForm(user);
    }

    function updateOverviewStats() {
        // Simulate stats (in real app, fetch from API)
        const stats = {
            totalOrders: 12,
            wishlistItems: 5,
            loyaltyPoints: 850
        };

        // Update the overview cards
        const overviewCards = document.querySelectorAll('.overview-card');
        overviewCards.forEach((card, index) => {
            const valueEl = card.querySelector('.card-value');
            if (valueEl) {
                switch (index) {
                    case 0:
                        valueEl.textContent = stats.totalOrders;
                        break;
                    case 1:
                        valueEl.textContent = stats.wishlistItems;
                        break;
                    case 2:
                        valueEl.textContent = stats.loyaltyPoints;
                        break;
                }
            }
        });
    }

    function loadRecentOrders() {
        // This would typically fetch from an API
        // For demo, the orders are already in the HTML
        
        // Add event listeners to order action buttons
        const orderButtons = document.querySelectorAll('.order-actions .btn');
        orderButtons.forEach(button => {
            button.addEventListener('click', handleOrderAction);
        });
    }

    function loadWishlist() {
        // Add event listeners to wishlist buttons
        const wishlistButtons = document.querySelectorAll('.wishlist-item .btn');
        wishlistButtons.forEach(button => {
            button.addEventListener('click', handleWishlistAction);
        });

        const removeButtons = document.querySelectorAll('.remove-wishlist');
        removeButtons.forEach(button => {
            button.addEventListener('click', handleRemoveFromWishlist);
        });
    }

    function loadAddresses() {
        // Add event listeners to address buttons
        const addressButtons = document.querySelectorAll('.address-actions .btn');
        addressButtons.forEach(button => {
            button.addEventListener('click', handleAddressAction);
        });
    }

    function populateProfileForm(user) {
        const form = document.querySelector('.profile-form');
        if (form) {
            const firstNameInput = form.querySelector('#first-name');
            const lastNameInput = form.querySelector('#last-name');
            const emailInput = form.querySelector('#email');
            const phoneInput = form.querySelector('#phone');

            if (firstNameInput) firstNameInput.value = user.firstName || '';
            if (lastNameInput) lastNameInput.value = user.lastName || '';
            if (emailInput) emailInput.value = user.email || '';
            if (phoneInput) phoneInput.value = user.phone || '';

            // Add form submit handler
            form.addEventListener('submit', handleProfileUpdate);
        }
    }

    function setupEventListeners() {
        // Navigation items
        navItems.forEach(item => {
            item.addEventListener('click', handleNavClick);
        });

        // Add new address button
        const addAddressBtn = document.querySelector('.section-header .btn-primary');
        if (addAddressBtn) {
            addAddressBtn.addEventListener('click', handleAddAddress);
        }
    }

    function handleNavClick(event) {
        event.preventDefault();
        const section = event.target.dataset.section;
        showSection(section);
        
        // Update URL hash
        window.history.pushState(null, null, `#${section}`);
    }

    function showSection(sectionName) {
        // Update active nav item
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            }
        });

        // Show corresponding section
        sectionContents.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${sectionName}-section`) {
                section.classList.add('active');
            }
        });
    }

    function handleOrderAction(event) {
        const action = event.target.textContent.toLowerCase();
        const orderCard = event.target.closest('.order-card');
        const orderNumber = orderCard.querySelector('.order-number').textContent;

        switch (action) {
            case 'view details':
                showMessage(`Viewing details for ${orderNumber}`, 'info');
                break;
            case 'reorder':
                if (confirm(`Reorder items from ${orderNumber}?`)) {
                    showMessage('Items added to cart!', 'success');
                }
                break;
            case 'track order':
                showMessage(`Tracking ${orderNumber}`, 'info');
                break;
            case 'cancel':
                if (confirm(`Cancel ${orderNumber}?`)) {
                    showMessage('Order cancelled successfully', 'success');
                    // Update order status
                    const statusEl = orderCard.querySelector('.order-status');
                    statusEl.textContent = 'Cancelled';
                    statusEl.className = 'order-status cancelled';
                }
                break;
        }
    }

    function handleWishlistAction(event) {
        const itemCard = event.target.closest('.wishlist-item');
        const itemName = itemCard.querySelector('.item-name').textContent;
        
        if (window.settingsUtils && !window.settingsUtils.requireLoginForOrder()) {
            return;
        }

        showMessage(`${itemName} added to cart!`, 'success');
    }

    function handleRemoveFromWishlist(event) {
        const itemCard = event.target.closest('.wishlist-item');
        const itemName = itemCard.querySelector('.item-name').textContent;
        
        if (confirm(`Remove ${itemName} from wishlist?`)) {
            itemCard.remove();
            showMessage('Item removed from wishlist', 'success');
            
            // Update wishlist count in overview
            const wishlistCountEl = document.querySelector('.overview-card:nth-child(2) .card-value');
            if (wishlistCountEl) {
                const currentCount = parseInt(wishlistCountEl.textContent);
                wishlistCountEl.textContent = currentCount - 1;
            }
        }
    }

    function handleAddressAction(event) {
        const action = event.target.textContent.toLowerCase();
        const addressCard = event.target.closest('.address-card');
        const addressType = addressCard.querySelector('.address-type').textContent;

        switch (action) {
            case 'edit':
                showMessage(`Editing ${addressType} address`, 'info');
                break;
            case 'delete':
                if (confirm(`Delete ${addressType} address?`)) {
                    addressCard.remove();
                    showMessage('Address deleted successfully', 'success');
                }
                break;
        }
    }

    function handleAddAddress() {
        showMessage('Add new address functionality would open here', 'info');
    }

    function handleProfileUpdate(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const updatedUser = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            birthday: formData.get('birthday'),
            dietary: formData.getAll('dietary')
        };

        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Saving...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Update stored user data
            const currentUser = window.authUtils.getCurrentUser();
            const updatedUserData = { ...currentUser, ...updatedUser };
            
            if (localStorage.getItem('livlif_user')) {
                localStorage.setItem('livlif_user', JSON.stringify(updatedUserData));
            } else {
                sessionStorage.setItem('livlif_user', JSON.stringify(updatedUserData));
            }

            // Update UI
            loadUserData();
            
            showMessage('Profile updated successfully!', 'success');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    }

    function showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.account-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `account-message ${type}`;
        messageEl.textContent = message;
        
        // Style the message
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
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
        if (!document.querySelector('#account-message-styles')) {
            const style = document.createElement('style');
            style.id = 'account-message-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(messageEl);

        // Remove message after 4 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 4000);
    }

    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        } else {
            showSection('overview');
        }
    });
});