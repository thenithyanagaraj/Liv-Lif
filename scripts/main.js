// ===========================
// MAIN JAVASCRIPT FILE
// ===========================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initNewsletterForm();
    initQuizModal();
    initSearch();
    
    console.log('Liv-Lif website initialized successfully');
});

// ===========================
// NAVIGATION
// ===========================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===========================
// SCROLL EFFECTS
// ===========================
function initScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// ANIMATIONS
// ===========================
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// ===========================
// NEWSLETTER FORM
// ===========================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Validate email
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Store email in localStorage (in real app, send to server)
                const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
                    showNotification('Thank you for subscribing to our newsletter!', 'success');
                    this.reset();
                } else {
                    showNotification('You are already subscribed to our newsletter', 'info');
                }
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// ===========================
// QUIZ MODAL
// ===========================
function initQuizModal() {
    const quizBtn = document.getElementById('take-quiz-btn');
    
    if (quizBtn) {
        quizBtn.addEventListener('click', function() {
            // Create quiz modal
            const modal = createQuizModal();
            document.body.appendChild(modal);
            
            // Show modal
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
        });
    }
}

function createQuizModal() {
    const modal = document.createElement('div');
    modal.className = 'quiz-modal';
    modal.innerHTML = `
        <div class="quiz-overlay"></div>
        <div class="quiz-content">
            <button class="quiz-close" aria-label="Close quiz">&times;</button>
            <h2>Find Your Perfect Wellness Match</h2>
            <div class="quiz-step active" data-step="1">
                <h3>What's your primary wellness goal?</h3>
                <div class="quiz-options">
                    <button class="quiz-option" data-value="energy">Boost Energy</button>
                    <button class="quiz-option" data-value="digestion">Improve Digestion</button>
                    <button class="quiz-option" data-value="immunity">Strengthen Immunity</button>
                    <button class="quiz-option" data-value="relaxation">Promote Relaxation</button>
                </div>
            </div>
            <div class="quiz-step" data-step="2">
                <h3>What time of day do you prefer wellness products?</h3>
                <div class="quiz-options">
                    <button class="quiz-option" data-value="morning">Morning</button>
                    <button class="quiz-option" data-value="afternoon">Afternoon</button>
                    <button class="quiz-option" data-value="evening">Evening</button>
                    <button class="quiz-option" data-value="anytime">Anytime</button>
                </div>
            </div>
            <div class="quiz-step" data-step="3">
                <h3>What's your preferred product type?</h3>
                <div class="quiz-options">
                    <button class="quiz-option" data-value="beverages">Beverages</button>
                    <button class="quiz-option" data-value="snacks">Snacks</button>
                    <button class="quiz-option" data-value="spreads">Spreads</button>
                    <button class="quiz-option" data-value="all">All Types</button>
                </div>
            </div>
            <div class="quiz-results" style="display: none;">
                <h3>Your Wellness Recommendations</h3>
                <div class="recommended-products"></div>
                <button class="btn btn-primary" onclick="window.location.href='shop.html'">Shop Now</button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .quiz-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .quiz-modal.active {
            opacity: 1;
            visibility: visible;
        }
        .quiz-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
        }
        .quiz-content {
            position: relative;
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        .quiz-modal.active .quiz-content {
            transform: scale(1);
        }
        .quiz-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .quiz-step {
            display: none;
        }
        .quiz-step.active {
            display: block;
        }
        .quiz-options {
            display: grid;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .quiz-option {
            padding: 1rem;
            border: 2px solid #E1E3DC;
            border-radius: 0.5rem;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .quiz-option:hover {
            border-color: #FF6B00;
            background: #FFF5F0;
        }
        .recommended-products {
            display: grid;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .product-recommendation {
            padding: 1rem;
            border: 1px solid #E1E3DC;
            border-radius: 0.5rem;
            background: #FDFCF9;
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.quiz-close');
    const overlay = modal.querySelector('.quiz-overlay');
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Quiz logic
    let currentStep = 1;
    let answers = {};
    
    const options = modal.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const step = this.closest('.quiz-step').dataset.step;
            answers[`step${step}`] = this.dataset.value;
            
            if (currentStep < 3) {
                // Move to next step
                modal.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
                currentStep++;
                modal.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
            } else {
                // Show results
                showQuizResults(modal, answers);
            }
        });
    });
    
    return modal;
}

function showQuizResults(modal, answers) {
    const steps = modal.querySelectorAll('.quiz-step');
    const results = modal.querySelector('.quiz-results');
    
    steps.forEach(step => step.style.display = 'none');
    results.style.display = 'block';
    
    // Generate recommendations based on answers
    const recommendations = generateRecommendations(answers);
    const container = results.querySelector('.recommended-products');
    
    container.innerHTML = recommendations.map(product => `
        <div class="product-recommendation">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p><strong>₹${product.price}</strong></p>
        </div>
    `).join('');
}

function generateRecommendations(answers) {
    // Simple recommendation logic based on answers
    const products = [
        { name: 'Golden Turmeric Latte', description: 'Perfect for morning energy and immunity', price: 299 },
        { name: 'Herbal Detox Tea', description: 'Great for evening relaxation and digestion', price: 249 },
        { name: 'Almond Energy Balls', description: 'Ideal afternoon snack for sustained energy', price: 199 },
        { name: 'Wild Honey & Fig Spread', description: 'Versatile spread for any time of day', price: 399 }
    ];
    
    // Return 2-3 products based on answers
    return products.slice(0, 3);
}

// ===========================
// ENHANCED SEARCH FUNCTIONALITY
// ===========================
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            // Create search modal
            const searchModal = createSearchModal();
            document.body.appendChild(searchModal);
            
            // Show modal and focus input
            requestAnimationFrame(() => {
                searchModal.classList.add('active');
                searchModal.querySelector('.search-input').focus();
            });
        });
    }
}

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    
    // Get recent searches from localStorage
    const recentSearches = JSON.parse(localStorage.getItem('livlif_recent_searches') || '[]');
    
    modal.innerHTML = `
        <div class="search-overlay"></div>
        <div class="search-content">
            <div class="search-header">
                <input type="text" class="search-input" placeholder="Search products, recipes, articles...">
                <button class="search-close" aria-label="Close search">&times;</button>
            </div>
            <div class="search-results">
                ${recentSearches.length > 0 ? `
                    <div class="search-suggestions">
                        <h4>Recent Searches</h4>
                        <div class="suggestion-tags">
                            ${recentSearches.map(search => `<span class="suggestion-tag recent-search">${search}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                <div class="search-suggestions">
                    <h4>Popular on Liv-Lif</h4>
                    <div class="suggestion-tags">
                        <span class="suggestion-tag">Moringa Soup</span>
                        <span class="suggestion-tag">Thai Green Curry</span>
                        <span class="suggestion-tag">Jamun Ice Cream</span>
                        <span class="suggestion-tag">Filter Coffee</span>
                        <span class="suggestion-tag">Organic</span>
                        <span class="suggestion-tag">Vegan</span>
                        <span class="suggestion-tag">Traditional</span>
                        <span class="suggestion-tag">Wellness</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .search-modal.active {
            opacity: 1;
            visibility: visible;
        }
        .search-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
        }
        .search-content {
            position: relative;
            background: white;
            margin: 2rem;
            border-radius: 1rem;
            overflow: hidden;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
            max-width: 600px;
            margin: 2rem auto;
        }
        .search-modal.active .search-content {
            transform: translateY(0);
        }
        .search-header {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #E1E3DC;
        }
        .search-input {
            flex: 1;
            border: none;
            outline: none;
            font-size: 1.1rem;
            padding: 0.5rem;
        }
        .search-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
            padding: 0.5rem;
        }
        .search-results {
            padding: 1.5rem;
            max-height: 60vh;
            overflow-y: auto;
        }
        .search-suggestions {
            margin-bottom: 2rem;
        }
        .search-suggestions:last-child {
            margin-bottom: 0;
        }
        .search-suggestions h4 {
            margin-bottom: 1rem;
            color: var(--color-text-dark);
            font-size: 1rem;
            font-weight: 600;
        }
        .suggestion-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .suggestion-tag {
            padding: 0.5rem 1rem;
            background: var(--color-background);
            border: 1px solid var(--color-border);
            border-radius: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        .suggestion-tag:hover {
            background: var(--color-primary);
            color: white;
            border-color: var(--color-primary);
        }
        .suggestion-tag.recent-search {
            background: var(--color-blush);
            border-color: var(--color-primary);
        }
        .search-item {
            padding: 1rem;
            border-bottom: 1px solid var(--color-border);
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .search-item:hover {
            background: var(--color-background);
        }
        .search-item:last-child {
            border-bottom: none;
        }
        .item-type {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background: var(--color-primary);
            color: white;
            font-size: 0.75rem;
            border-radius: 0.25rem;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
        }
        .search-item h5 {
            margin: 0.5rem 0 0.25rem 0;
            color: var(--color-text-dark);
        }
        .search-item p {
            margin: 0;
            color: var(--color-text-muted);
            font-size: 0.9rem;
        }
        .no-results {
            text-align: center;
            padding: 2rem;
            color: var(--color-text-muted);
        }
        .no-results h4 {
            margin-bottom: 1rem;
            color: var(--color-text-dark);
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.search-close');
    const overlay = modal.querySelector('.search-overlay');
    const input = modal.querySelector('.search-input');
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Handle search input
    input.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            performSearch(query, modal);
        } else {
            // Show default suggestions when input is cleared
            showDefaultSuggestions(modal);
        }
    });
    
    // Handle suggestion clicks
    const suggestions = modal.querySelectorAll('.suggestion-tag');
    suggestions.forEach(tag => {
        tag.addEventListener('click', function() {
            const query = this.textContent;
            input.value = query;
            performSearch(query, modal);
            saveRecentSearch(query);
        });
    });
    
    // Handle Enter key
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                saveRecentSearch(query);
                // Redirect to shop with search query
                window.location.href = `shop-products.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
    
    return modal;
}

function performSearch(query, modal) {
    const resultsContainer = modal.querySelector('.search-results');
    
    // Website content to search through
    const websiteContent = [
        // Products
        { type: 'product', name: 'Moringa Soup', price: '₹180', category: 'Cup of Nourishment', description: 'Nutrient-rich moringa leaves in a warming, healing broth' },
        { type: 'product', name: 'Thai Green Curry', price: '₹320', category: 'Traditional Techniques', description: 'Authentic Thai curry with coconut milk and vegetables' },
        { type: 'product', name: 'Jamun Ice Cream', price: '₹150', category: 'Chill Treats', description: 'Creamy ice cream made with fresh jamun fruit' },
        { type: 'product', name: 'Filter Coffee', price: '₹80', category: 'Quench Couture', description: 'Traditional South Indian filter coffee' },
        { type: 'product', name: 'Dal Soup', price: '₹160', category: 'Cup of Nourishment', description: 'Traditional lentil soup with aromatic spices' },
        { type: 'product', name: 'Rasam Soup', price: '₹170', category: 'Cup of Nourishment', description: 'South Indian tangy tamarind soup with healing spices' },
        { type: 'product', name: 'American Coleslaw', price: '₹140', category: 'Garden of Flavours', description: 'Crisp cabbage and carrots in creamy dressing' },
        { type: 'product', name: 'Russian Salad', price: '₹160', category: 'Garden of Flavours', description: 'Mixed vegetables with creamy mayonnaise dressing' },
        { type: 'product', name: 'Palak Lesuni', price: '₹280', category: 'Traditional Techniques', description: 'Spinach curry with garlic and traditional spices' },
        { type: 'product', name: 'Paneer Bhurji', price: '₹300', category: 'Traditional Techniques', description: 'Scrambled cottage cheese with onions and spices' },
        { type: 'product', name: 'Mango Chill', price: '₹140', category: 'Chill Treats', description: 'Refreshing mango-based frozen dessert' },
        { type: 'product', name: 'Coffee Scoop', price: '₹160', category: 'Chill Treats', description: 'Rich coffee-flavored ice cream with a caffeine kick' },
        { type: 'product', name: 'Tulsi Tea', price: '₹70', category: 'Quench Couture', description: 'Healing holy basil tea with natural herbs' },
        { type: 'product', name: 'Saffron Milk', price: '₹100', category: 'Quench Couture', description: 'Warm milk infused with premium saffron' },
        
        // Categories
        { type: 'category', name: 'Cup of Nourishment', description: 'Warming soups for every season' },
        { type: 'category', name: 'Garden of Flavours', description: 'Fresh salads and healthy sides' },
        { type: 'category', name: 'Traditional Techniques', description: 'Modern twist on classic flavors' },
        { type: 'category', name: 'Chill Treats', description: 'Frozen delights and sweet endings' },
        { type: 'category', name: 'Quench Couture', description: 'Beverages for every mood' },
        
        // Pages
        { type: 'page', name: 'About Us', description: 'Learn about our wellness journey and mission' },
        { type: 'page', name: 'Contact', description: 'Get in touch with our team' },
        { type: 'page', name: 'Account', description: 'Manage your profile and orders' },
        
        // Tags/Keywords
        { type: 'tag', name: 'Organic', description: 'Products made with certified organic ingredients' },
        { type: 'tag', name: 'Vegan', description: 'Plant-based products suitable for vegans' },
        { type: 'tag', name: 'Traditional', description: 'Recipes based on traditional cooking methods' },
        { type: 'tag', name: 'Wellness', description: 'Products focused on health and well-being' },
        { type: 'tag', name: 'Gluten Free', description: 'Products suitable for gluten-free diets' },
        { type: 'tag', name: 'Protein Rich', description: 'High-protein food options' },
        { type: 'tag', name: 'Immunity Boost', description: 'Products that help strengthen immunity' },
        { type: 'tag', name: 'Digestive', description: 'Foods that aid digestion' }
    ];
    
    const filteredResults = websiteContent.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
    
    if (filteredResults.length > 0) {
        resultsContainer.innerHTML = `
            <h4>Search Results for "${query}"</h4>
            <div class="search-items">
                ${filteredResults.map(item => `
                    <div class="search-item" data-type="${item.type}" data-name="${item.name}">
                        <span class="item-type">${item.type}</span>
                        <h5>${item.name}</h5>
                        <p>${item.description}</p>
                        ${item.price ? `<p><strong>${item.price}</strong></p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add click handlers to search results
        const searchItems = resultsContainer.querySelectorAll('.search-item');
        searchItems.forEach(item => {
            item.addEventListener('click', function() {
                const type = this.dataset.type;
                const name = this.dataset.name;
                
                // Save search and redirect based on type
                saveRecentSearch(query);
                
                switch (type) {
                    case 'product':
                        window.location.href = `shop-products.html?search=${encodeURIComponent(name)}`;
                        break;
                    case 'category':
                        const categoryMap = {
                            'Cup of Nourishment': 'soups',
                            'Garden of Flavours': 'salads',
                            'Traditional Techniques': 'mains',
                            'Chill Treats': 'desserts',
                            'Quench Couture': 'beverages'
                        };
                        const category = categoryMap[name];
                        if (category) {
                            window.location.href = `shop.html?category=${category}`;
                        }
                        break;
                    case 'page':
                        if (name === 'About Us') window.location.href = 'about.html';
                        else if (name === 'Contact') window.location.href = 'contact.html';
                        else if (name === 'Account') window.location.href = 'account.html';
                        break;
                    case 'tag':
                        window.location.href = `shop-products.html?tag=${encodeURIComponent(name.toLowerCase())}`;
                        break;
                    default:
                        window.location.href = `shop-products.html?search=${encodeURIComponent(query)}`;
                }
            });
        });
    } else {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h4>No results found for "${query}"</h4>
                <p>Try searching for products, categories, or wellness topics available on our website.</p>
            </div>
        `;
    }
}

function showDefaultSuggestions(modal) {
    const resultsContainer = modal.querySelector('.search-results');
    const recentSearches = JSON.parse(localStorage.getItem('livlif_recent_searches') || '[]');
    
    resultsContainer.innerHTML = `
        ${recentSearches.length > 0 ? `
            <div class="search-suggestions">
                <h4>Recent Searches</h4>
                <div class="suggestion-tags">
                    ${recentSearches.map(search => `<span class="suggestion-tag recent-search">${search}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        <div class="search-suggestions">
            <h4>Popular on Liv-Lif</h4>
            <div class="suggestion-tags">
                <span class="suggestion-tag">Moringa Soup</span>
                <span class="suggestion-tag">Thai Green Curry</span>
                <span class="suggestion-tag">Jamun Ice Cream</span>
                <span class="suggestion-tag">Filter Coffee</span>
                <span class="suggestion-tag">Organic</span>
                <span class="suggestion-tag">Vegan</span>
                <span class="suggestion-tag">Traditional</span>
                <span class="suggestion-tag">Wellness</span>
            </div>
        </div>
    `;
    
    // Re-add event listeners to suggestion tags
    const suggestions = resultsContainer.querySelectorAll('.suggestion-tag');
    suggestions.forEach(tag => {
        tag.addEventListener('click', function() {
            const query = this.textContent;
            const input = modal.querySelector('.search-input');
            input.value = query;
            performSearch(query, modal);
            saveRecentSearch(query);
        });
    });
}

function saveRecentSearch(query) {
    if (!query || query.length < 2) return;
    
    let recentSearches = JSON.parse(localStorage.getItem('livlif_recent_searches') || '[]');
    
    // Remove if already exists
    recentSearches = recentSearches.filter(search => search.toLowerCase() !== query.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(query);
    
    // Keep only last 5 searches
    recentSearches = recentSearches.slice(0, 5);
    
    localStorage.setItem('livlif_recent_searches', JSON.stringify(recentSearches));
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Allow manual dismissal
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
}

// ===========================
// PERFORMANCE OPTIMIZATIONS
// ===========================

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for use in other scripts
window.LivLif = {
    showNotification,
    isValidEmail,
    debounce,
    throttle
};