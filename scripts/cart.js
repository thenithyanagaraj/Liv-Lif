// Enhanced cart functionality with login requirement and quantity increment
document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('livlif_cart')) || [];
    
    // DOM elements
    const cartBtn = document.getElementById('cart-btn');
    const cartCount = document.getElementById('cart-count');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Initialize
    updateCartUI();
    setupEventListeners();

    function setupEventListeners() {
        // Cart button
        if (cartBtn) {
            cartBtn.addEventListener('click', openCart);
        }

        // Close cart
        if (cartClose) {
            cartClose.addEventListener('click', closeCart);
        }
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCart);
        }

        // Add to cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                handleAddToCart(e);
            }
        });

        // Checkout button
        document.addEventListener('click', function(e) {
            if (e.target.href && e.target.href.includes('checkout.html')) {
                e.preventDefault();
                handleCheckout();
            }
        });
    }

    function handleAddToCart(event) {
        // Check if user is logged in for orders
        if (window.settingsUtils && !window.settingsUtils.requireLoginForOrder()) {
            return;
        }

        const productId = event.target.dataset.productId;
        
        // Get product data
        let product = null;
        if (window.getProductById) {
            product = window.getProductById(productId);
        } else {
            // Fallback for homepage products
            product = getHomepageProduct(productId);
        }

        if (product) {
            addToCart(product);
            
            // Visual feedback
            const originalText = event.target.textContent;
            event.target.textContent = 'Added!';
            event.target.disabled = true;
            event.target.style.background = '#10b981';
            
            setTimeout(() => {
                event.target.textContent = originalText;
                event.target.disabled = false;
                event.target.style.background = '';
            }, 1500);
        }
    }

    function getHomepageProduct(productId) {
        // Fallback product data for homepage
        const homepageProducts = {
            'moringa-soup': {
                id: 'moringa-soup',
                name: 'Moringa Soup',
                price: 180,
                image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'soups'
            },
            'thai-green-curry': {
                id: 'thai-green-curry',
                name: 'Thai Green Curry',
                price: 320,
                image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'mains'
            },
            'jamun-ice-cream': {
                id: 'jamun-ice-cream',
                name: 'Jamun Ice Cream',
                price: 150,
                image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'desserts'
            },
            'filter-coffee': {
                id: 'filter-coffee',
                name: 'Filter Coffee',
                price: 80,
                image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'beverages'
            }
        };
        
        return homepageProducts[productId];
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Increment quantity by 1 each time
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartUI();
        showCartMessage(`${product.name} added to cart!`);
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }

    function updateQuantity(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = quantity;
                saveCart();
                updateCartUI();
            }
        }
    }

    function saveCart() {
        localStorage.setItem('livlif_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Update cart total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotal) {
            cartTotal.textContent = `₹${total}`;
        }

        // Update cart items
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <h3>Your cart is empty</h3>
                        <p>Add some delicious items to get started!</p>
                        <a href="shop-products.html" class="btn btn-primary">Start Shopping</a>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="item-details">
                            <h4 class="item-name">${item.name}</h4>
                            <p class="item-price">₹${item.price}</p>
                        </div>
                        <div class="item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}" aria-label="Remove item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                `).join('');

                // Add event listeners for cart item controls
                cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
                    btn.addEventListener('click', handleQuantityChange);
                });

                cartItems.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', handleRemoveItem);
                });
            }
        }
    }

    function handleQuantityChange(event) {
        const productId = event.target.dataset.id;
        const isPlus = event.target.classList.contains('plus');
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            const newQuantity = isPlus ? item.quantity + 1 : item.quantity - 1;
            updateQuantity(productId, newQuantity);
        }
    }

    function handleRemoveItem(event) {
        const productId = event.target.closest('.remove-item').dataset.id;
        const item = cart.find(item => item.id === productId);
        
        if (item && confirm(`Remove ${item.name} from cart?`)) {
            removeFromCart(productId);
            showCartMessage(`${item.name} removed from cart`);
        }
    }

    function handleCheckout() {
        // Check if user is logged in
        if (window.authUtils && !window.authUtils.isLoggedIn()) {
            const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
            
            if (confirm('Please login to proceed with checkout. Would you like to login now?')) {
                window.location.href = `login.html?return=${currentUrl}`;
            }
            return;
        }

        if (cart.length === 0) {
            showCartMessage('Your cart is empty!', 'error');
            return;
        }

        // Proceed to checkout
        window.location.href = 'checkout.html';
    }

    function openCart() {
        if (cartDrawer) {
            cartDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCart() {
        if (cartDrawer) {
            cartDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function showCartMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.cart-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `cart-message ${type}`;
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
            z-index: 1001;
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
            default:
                messageEl.style.backgroundColor = '#3b82f6';
                break;
        }

        // Add animation keyframes if not exists
        if (!document.querySelector('#cart-message-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-message-styles';
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
                
                .empty-cart {
                    text-align: center;
                    padding: var(--space-3xl);
                    color: var(--color-text-muted);
                }
                
                .empty-cart-icon {
                    margin-bottom: var(--space-lg);
                    opacity: 0.5;
                }
                
                .empty-cart h3 {
                    font-size: var(--text-xl);
                    margin-bottom: var(--space-md);
                    color: var(--color-text-dark);
                }
                
                .empty-cart p {
                    margin-bottom: var(--space-xl);
                }
                
                .cart-item {
                    display: flex;
                    gap: var(--space-md);
                    padding: var(--space-lg);
                    border-bottom: 1px solid var(--color-border);
                }
                
                .cart-item:last-child {
                    border-bottom: none;
                }
                
                .item-image {
                    width: 60px;
                    height: 60px;
                    border-radius: var(--border-radius-lg);
                    overflow: hidden;
                    flex-shrink: 0;
                }
                
                .item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .item-details {
                    flex: 1;
                }
                
                .item-name {
                    font-size: var(--text-base);
                    font-weight: var(--weight-medium);
                    margin-bottom: var(--space-xs);
                    color: var(--color-text-dark);
                }
                
                .item-price {
                    font-size: var(--text-sm);
                    color: var(--color-primary);
                    font-weight: var(--weight-semibold);
                }
                
                .item-controls {
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-sm);
                    align-items: flex-end;
                }
                
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    background: var(--color-background);
                    border-radius: var(--border-radius-lg);
                    padding: var(--space-xs);
                }
                
                .quantity-btn {
                    width: 24px;
                    height: 24px;
                    border-radius: var(--border-radius-sm);
                    background: var(--color-white);
                    border: 1px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--text-sm);
                    font-weight: var(--weight-bold);
                    cursor: pointer;
                    transition: all var(--transition-normal);
                }
                
                .quantity-btn:hover {
                    background: var(--color-primary);
                    color: var(--color-white);
                    border-color: var(--color-primary);
                }
                
                .quantity {
                    font-size: var(--text-sm);
                    font-weight: var(--weight-medium);
                    min-width: 20px;
                    text-align: center;
                }
                
                .remove-item {
                    width: 24px;
                    height: 24px;
                    border-radius: var(--border-radius-sm);
                    background: none;
                    border: none;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    transition: all var(--transition-normal);
                }
                
                .remove-item:hover {
                    color: #ef4444;
                    background: #fee2e2;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(messageEl);

        // Remove message after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }

    // Export functions for use in other scripts
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateQuantity = updateQuantity;
    window.getCart = () => cart;
    window.clearCart = () => {
        cart = [];
        saveCart();
        updateCartUI();
    };
});