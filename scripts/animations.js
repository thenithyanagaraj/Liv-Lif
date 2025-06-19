// ===========================
// ANIMATION UTILITIES
// ===========================

class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
    }
    
    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll([
            '.fade-in',
            '.slide-in-left',
            '.slide-in-right',
            '.slide-in-up',
            '.slide-in-down',
            '.scale-in',
            '.rotate-in',
            '[data-animate]'
        ].join(', '));
        
        animatedElements.forEach(el => {
            // Set initial state
            this.setInitialState(el);
            observer.observe(el);
        });
        
        this.observers.set('intersection', observer);
    }
    
    // Set initial animation state
    setInitialState(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fade-in':
                element.style.opacity = '0';
                break;
            case 'slide-in-left':
                element.style.opacity = '0';
                element.style.transform = 'translateX(-30px)';
                break;
            case 'slide-in-right':
                element.style.opacity = '0';
                element.style.transform = 'translateX(30px)';
                break;
            case 'slide-in-up':
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                break;
            case 'slide-in-down':
                element.style.opacity = '0';
                element.style.transform = 'translateY(-30px)';
                break;
            case 'scale-in':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.8)';
                break;
            case 'rotate-in':
                element.style.opacity = '0';
                element.style.transform = 'rotate(-10deg) scale(0.8)';
                break;
        }
        
        // Set transition
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Get animation type from element
    getAnimationType(element) {
        if (element.classList.contains('fade-in')) return 'fade-in';
        if (element.classList.contains('slide-in-left')) return 'slide-in-left';
        if (element.classList.contains('slide-in-right')) return 'slide-in-right';
        if (element.classList.contains('slide-in-up')) return 'slide-in-up';
        if (element.classList.contains('slide-in-down')) return 'slide-in-down';
        if (element.classList.contains('scale-in')) return 'scale-in';
        if (element.classList.contains('rotate-in')) return 'rotate-in';
        
        // Check data attribute
        return element.dataset.animate || 'fade-in';
    }
    
    // Trigger animation
    triggerAnimation(element, intersectionRatio) {
        const delay = element.dataset.delay ? parseInt(element.dataset.delay) : 0;
        const duration = element.dataset.duration ? parseInt(element.dataset.duration) : 600;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0) scale(1) rotate(0)';
            element.style.transitionDuration = `${duration}ms`;
            
            // Add animated class for CSS hooks
            element.classList.add('animated');
            
            // Trigger custom event
            element.dispatchEvent(new CustomEvent('animated', {
                detail: { intersectionRatio }
            }));
        }, delay);
    }
    
    // Setup scroll-based animations
    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax effects
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            // Progress bars
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = Math.min(100, Math.max(0, 
                        ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
                    ));
                    bar.style.setProperty('--progress', `${progress}%`);
                }
            });
            
            // Sticky elements
            const stickyElements = document.querySelectorAll('[data-sticky]');
            stickyElements.forEach(el => {
                const offset = parseInt(el.dataset.sticky) || 0;
                const rect = el.getBoundingClientRect();
                
                if (rect.top <= offset) {
                    el.classList.add('is-sticky');
                } else {
                    el.classList.remove('is-sticky');
                }
            });
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    // Setup hover animations
    setupHoverAnimations() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.btn, .magnetic');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
        
        // Tilt effect for cards
        const tiltElements = document.querySelectorAll('.product-card, .blog-card, .tilt');
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }
    
    // Setup loading animations
    setupLoadingAnimations() {
        // Skeleton loading
        const skeletonElements = document.querySelectorAll('.skeleton');
        skeletonElements.forEach(el => {
            el.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
            el.style.backgroundSize = '200% 100%';
            el.style.animation = 'skeleton-loading 1.5s infinite';
        });
        
        // Add skeleton animation keyframes
        if (!document.querySelector('#skeleton-styles')) {
            const style = document.createElement('style');
            style.id = 'skeleton-styles';
            style.textContent = `
                @keyframes skeleton-loading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                    40%, 43% { transform: translate3d(0,-30px,0); }
                    70% { transform: translate3d(0,-15px,0); }
                    90% { transform: translate3d(0,-4px,0); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 100%, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale3d(0.3, 0.3, 0.3);
                    }
                    50% {
                        opacity: 1;
                    }
                }
                
                @keyframes slideInLeft {
                    from {
                        transform: translate3d(-100%, 0, 0);
                        visibility: visible;
                    }
                    to {
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translate3d(100%, 0, 0);
                        visibility: visible;
                    }
                    to {
                        transform: translate3d(0, 0, 0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Utility methods
    animateElement(element, animation, duration = 600, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                element.style.animation = `${animation} ${duration}ms ease-out forwards`;
                
                const handleAnimationEnd = () => {
                    element.removeEventListener('animationend', handleAnimationEnd);
                    resolve();
                };
                
                element.addEventListener('animationend', handleAnimationEnd);
            }, delay);
        });
    }
    
    // Stagger animations for multiple elements
    staggerAnimation(elements, animation, staggerDelay = 100) {
        const promises = [];
        
        elements.forEach((element, index) => {
            const delay = index * staggerDelay;
            promises.push(this.animateElement(element, animation, 600, delay));
        });
        
        return Promise.all(promises);
    }
    
    // Create loading spinner
    createLoadingSpinner(container) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-ring"></div>
            <div class="spinner-text">Loading...</div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .spinner-ring {
                width: 40px;
                height: 40px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #FF6B00;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }
            
            .spinner-text {
                color: #666;
                font-size: 0.9rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        if (!document.querySelector('#spinner-styles')) {
            style.id = 'spinner-styles';
            document.head.appendChild(style);
        }
        
        container.appendChild(spinner);
        return spinner;
    }
    
    // Remove loading spinner
    removeLoadingSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.style.opacity = '0';
            spinner.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                spinner.parentNode.removeChild(spinner);
            }, 300);
        }
    }
    
    // Cleanup
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.animationManager = new AnimationManager();
    
    // Add utility classes for animations
    const utilityStyles = document.createElement('style');
    utilityStyles.textContent = `
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bounce { animation: bounce 1s infinite; }
        .animate-shake { animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-zoomIn { animation: zoomIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        
        .transition-all { transition: all 0.3s ease; }
        .transition-colors { transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease; }
        .transition-transform { transition: transform 0.3s ease; }
        .transition-opacity { transition: opacity 0.3s ease; }
        
        .hover\\:scale-105:hover { transform: scale(1.05); }
        .hover\\:scale-110:hover { transform: scale(1.1); }
        .hover\\:-translate-y-1:hover { transform: translateY(-0.25rem); }
        .hover\\:-translate-y-2:hover { transform: translateY(-0.5rem); }
        
        .group:hover .group-hover\\:opacity-100 { opacity: 1; }
        .group:hover .group-hover\\:translate-y-0 { transform: translateY(0); }
        .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
    `;
    document.head.appendChild(utilityStyles);
});

// Export AnimationManager
window.AnimationManager = AnimationManager;