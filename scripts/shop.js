// Shop page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load products data
    if (typeof getAllProducts === 'undefined') {
        console.error('Products data not loaded');
        return;
    }

    let currentProducts = getAllProducts();
    let filteredProducts = [...currentProducts];
    let currentPage = 1;
    const productsPerPage = 12;

    // DOM elements
    const productsGrid = document.getElementById('products-grid');
    const productCount = document.getElementById('product-count');
    const sortSelect = document.getElementById('sort-select');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const priceSliders = document.querySelectorAll('.price-slider');
    const tagFilters = document.querySelectorAll('.tag-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    // Initialize page
    init();

    function init() {
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const searchParam = urlParams.get('search');
        const tagParam = urlParams.get('tag');
        
        if (categoryParam) {
            filterByCategory(categoryParam);
        } else if (searchParam) {
            filterBySearch(searchParam);
        } else if (tagParam) {
            filterByTag(tagParam);
        }
        
        setupEventListeners();
        renderProducts();
        updatePagination();
    }

    function setupEventListeners() {
        // Sort dropdown
        if (sortSelect) {
            sortSelect.addEventListener('change', handleSort);
        }

        // Category filters
        categoryFilters.forEach(filter => {
            filter.addEventListener('change', handleCategoryFilter);
        });

        // Price sliders
        priceSliders.forEach(slider => {
            slider.addEventListener('input', handlePriceFilter);
        });

        // Tag filters
        tagFilters.forEach(tag => {
            tag.addEventListener('click', handleTagFilter);
        });

        // Pagination
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => changePage(currentPage - 1));
        }
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => changePage(currentPage + 1));
        }
    }

    function filterByCategory(category) {
        // Map URL categories to data categories
        const categoryMap = {
            'soups': 'soups',
            'salads': 'salads',
            'mains': 'mains',
            'desserts': 'desserts',
            'beverages': 'beverages',
            'snacks': 'snacks'
        };

        if (categoryMap[category]) {
            currentProducts = getProductsByCategory(categoryMap[category]);
        } else {
            currentProducts = getAllProducts();
        }
        
        applyFilters();
    }

    function filterBySearch(searchTerm) {
        currentProducts = getAllProducts().filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        applyFilters();
        
        // Update page title to show search results
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.textContent = `Search Results for "${searchTerm}"`;
        }
    }

    function filterByTag(tag) {
        currentProducts = getAllProducts().filter(product => 
            product.tags.some(productTag => productTag.toLowerCase().includes(tag.toLowerCase()))
        );
        
        applyFilters();
        
        // Update page title to show tag results
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.textContent = `Products tagged "${tag}"`;
        }
    }

    function handleSort() {
        const sortValue = sortSelect.value;
        filteredProducts = sortProducts(filteredProducts, sortValue);
        currentPage = 1;
        renderProducts();
        updatePagination();
    }

    function handleCategoryFilter() {
        const selectedCategories = Array.from(categoryFilters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);

        if (selectedCategories.includes('all') || selectedCategories.length === 0) {
            currentProducts = getAllProducts();
        } else {
            currentProducts = [];
            selectedCategories.forEach(category => {
                if (category !== 'all') {
                    currentProducts.push(...getProductsByCategory(category));
                }
            });
        }

        applyFilters();
    }

    function handlePriceFilter() {
        applyFilters();
    }

    function handleTagFilter(event) {
        const tag = event.target;
        tag.classList.toggle('active');
        applyFilters();
    }

    function applyFilters() {
        const filters = {
            minPrice: document.getElementById('price-min')?.value || 0,
            maxPrice: document.getElementById('price-max')?.value || 1000,
            tags: Array.from(document.querySelectorAll('.tag-filter.active'))
                .map(tag => tag.dataset.tag)
        };

        filteredProducts = filterProducts(currentProducts, filters);
        
        // Apply current sort
        if (sortSelect) {
            filteredProducts = sortProducts(filteredProducts, sortSelect.value);
        }

        currentPage = 1;
        renderProducts();
        updatePagination();
        updateProductCount();
    }

    function renderProducts() {
        if (!productsGrid) return;

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                    <a href="shop-products.html" class="btn btn-primary">View All Products</a>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card fade-in">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.bestseller ? '<div class="product-badge">Bestseller</div>' : ''}
                    ${product.new ? '<div class="product-badge">New</div>' : ''}
                    <button class="product-wishlist" aria-label="Add to wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <p class="product-price">₹${product.price}</p>
                    <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to new add-to-cart buttons
        const addToCartButtons = productsGrid.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });
    }

    function handleAddToCart(event) {
        const productId = event.target.dataset.productId;
        const product = getProductById(productId);
        
        if (product && typeof addToCart === 'function') {
            addToCart(product);
            
            // Visual feedback
            event.target.textContent = 'Added!';
            event.target.disabled = true;
            
            setTimeout(() => {
                event.target.textContent = 'Add to Cart';
                event.target.disabled = false;
            }, 1500);
        }
    }

    function updateProductCount() {
        if (productCount) {
            productCount.textContent = filteredProducts.length;
        }
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage <= 1;
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage >= totalPages;
        }

        // Update page numbers
        const pageNumbers = document.querySelector('.pagination-numbers');
        if (pageNumbers) {
            pageNumbers.innerHTML = '';
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
                const pageBtn = document.createElement('span');
                pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => changePage(i));
                pageNumbers.appendChild(pageBtn);
            }
        }
    }

    function changePage(page) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderProducts();
            updatePagination();
            
            // Scroll to top of products
            if (productsGrid) {
                productsGrid.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Update price range display
    function updatePriceDisplay() {
        const minSlider = document.getElementById('price-min');
        const maxSlider = document.getElementById('price-max');
        const minValue = document.getElementById('min-value');
        const maxValue = document.getElementById('max-value');

        if (minSlider && maxSlider && minValue && maxValue) {
            minValue.textContent = minSlider.value;
            maxValue.textContent = maxSlider.value;
        }
    }

    // Initialize price display
    updatePriceDisplay();
    
    // Update price display on slider change
    priceSliders.forEach(slider => {
        slider.addEventListener('input', updatePriceDisplay);
    });
});