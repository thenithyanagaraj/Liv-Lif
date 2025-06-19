// ===========================
// CAROUSEL FUNCTIONALITY
// ===========================

class Carousel {
    constructor(element, options = {}) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.prevBtn = element.querySelector('.carousel-prev');
        this.nextBtn = element.querySelector('.carousel-next');
        this.items = element.querySelectorAll('.product-card, .testimonial-card');
        
        // Options
        this.options = {
            itemsToShow: options.itemsToShow || 3,
            itemsToScroll: options.itemsToScroll || 1,
            gap: options.gap || 24,
            autoplay: options.autoplay || false,
            autoplayDelay: options.autoplayDelay || 5000,
            infinite: options.infinite !== false,
            responsive: options.responsive || [
                { breakpoint: 768, itemsToShow: 1 },
                { breakpoint: 1024, itemsToShow: 2 }
            ],
            ...options
        };
        
        this.currentIndex = 0;
        this.itemWidth = 0;
        this.maxIndex = 0;
        this.autoplayTimer = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (!this.track || this.items.length === 0) return;
        
        this.setupCarousel();
        this.bindEvents();
        this.updateCarousel();
        
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.updateCarousel();
        }, 250));
    }
    
    setupCarousel() {
        // Set up track styles
        this.track.style.display = 'flex';
        this.track.style.transition = 'transform 0.3s ease';
        
        // Calculate responsive items to show
        this.updateResponsiveSettings();
    }
    
    updateResponsiveSettings() {
        const windowWidth = window.innerWidth;
        let itemsToShow = this.options.itemsToShow;
        
        // Apply responsive settings
        for (const breakpoint of this.options.responsive) {
            if (windowWidth <= breakpoint.breakpoint) {
                itemsToShow = breakpoint.itemsToShow;
                break;
            }
        }
        
        this.currentItemsToShow = itemsToShow;
        this.maxIndex = Math.max(0, this.items.length - this.currentItemsToShow);
        
        // Ensure current index is within bounds
        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }
    }
    
    updateCarousel() {
        this.updateResponsiveSettings();
        
        // Calculate item width
        const carouselWidth = this.carousel.offsetWidth;
        const totalGap = this.options.gap * (this.currentItemsToShow - 1);
        this.itemWidth = (carouselWidth - totalGap) / this.currentItemsToShow;
        
        // Set item widths and gaps
        this.items.forEach((item, index) => {
            item.style.flex = `0 0 ${this.itemWidth}px`;
            item.style.marginRight = index < this.items.length - 1 ? `${this.options.gap}px` : '0';
        });
        
        // Update transform
        this.updateTransform();
        this.updateButtons();
    }
    
    updateTransform() {
        const translateX = -(this.currentIndex * (this.itemWidth + this.options.gap));
        this.track.style.transform = `translateX(${translateX}px)`;
    }
    
    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentIndex === 0 && !this.options.infinite ? '0.5' : '1';
            this.prevBtn.style.pointerEvents = this.currentIndex === 0 && !this.options.infinite ? 'none' : 'auto';
        }
        
        if (this.nextBtn) {
            this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex && !this.options.infinite ? '0.5' : '1';
            this.nextBtn.style.pointerEvents = this.currentIndex >= this.maxIndex && !this.options.infinite ? 'none' : 'auto';
        }
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Touch/swipe support
        this.bindTouchEvents();
        
        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.next();
            }
        });
        
        // Pause autoplay on hover
        if (this.options.autoplay) {
            this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
    
    bindTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.track.style.transition = 'none';
        }, { passive: true });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            const currentTranslateX = -(this.currentIndex * (this.itemWidth + this.options.gap));
            
            this.track.style.transform = `translateX(${currentTranslateX + deltaX}px)`;
        }, { passive: true });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            isDragging = false;
            this.track.style.transition = 'transform 0.3s ease';
            
            const deltaX = currentX - startX;
            const threshold = this.itemWidth * 0.3;
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.prev();
                } else {
                    this.next();
                }
            } else {
                this.updateTransform();
            }
        });
    }
    
    next() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        if (this.options.infinite && this.currentIndex >= this.maxIndex) {
            this.currentIndex = 0;
        } else if (this.currentIndex < this.maxIndex) {
            this.currentIndex += this.options.itemsToScroll;
            if (this.currentIndex > this.maxIndex) {
                this.currentIndex = this.maxIndex;
            }
        }
        
        this.updateTransform();
        this.updateButtons();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        if (this.options.infinite && this.currentIndex <= 0) {
            this.currentIndex = this.maxIndex;
        } else if (this.currentIndex > 0) {
            this.currentIndex -= this.options.itemsToScroll;
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }
        }
        
        this.updateTransform();
        this.updateButtons();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }
    
    goTo(index) {
        if (this.isTransitioning || index < 0 || index > this.maxIndex) return;
        
        this.isTransitioning = true;
        this.currentIndex = index;
        this.updateTransform();
        this.updateButtons();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }
    
    startAutoplay() {
        if (!this.options.autoplay) return;
        
        this.pauseAutoplay();
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, this.options.autoplayDelay);
    }
    
    pauseAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
    
    destroy() {
        this.pauseAutoplay();
        
        // Remove event listeners
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prev);
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.next);
        }
        
        // Reset styles
        this.track.style.transform = '';
        this.track.style.transition = '';
        this.items.forEach(item => {
            item.style.flex = '';
            item.style.marginRight = '';
        });
    }
    
    // Utility function
    debounce(func, wait) {
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
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Featured products carousel
    const featuredCarousel = document.getElementById('featured-carousel');
    if (featuredCarousel) {
        new Carousel(featuredCarousel, {
            itemsToShow: 3,
            itemsToScroll: 1,
            gap: 24,
            autoplay: false,
            infinite: true,
            responsive: [
                { breakpoint: 768, itemsToShow: 1 },
                { breakpoint: 1024, itemsToShow: 2 }
            ]
        });
    }
    
    // Testimonials carousel
    const testimonialsSlider = document.getElementById('testimonials-slider');
    if (testimonialsSlider) {
        new Carousel(testimonialsSlider, {
            itemsToShow: 1,
            itemsToScroll: 1,
            gap: 0,
            autoplay: true,
            autoplayDelay: 6000,
            infinite: true
        });
    }
    
    // Initialize any other carousels
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
        const options = JSON.parse(carousel.dataset.carousel || '{}');
        new Carousel(carousel, options);
    });
});

// Export Carousel class
window.Carousel = Carousel;