// ===========================
// CONTACT PAGE FUNCTIONALITY
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateContactForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Store message in localStorage (in real app, send to server)
                const messages = JSON.parse(localStorage.getItem('contact-messages') || '[]');
                messages.push({
                    ...data,
                    timestamp: new Date().toISOString(),
                    id: Date.now()
                });
                localStorage.setItem('contact-messages', JSON.stringify(messages));
                
                // Show success message
                if (window.LivLif && window.LivLif.showNotification) {
                    window.LivLif.showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                }
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Form Validation
function validateContactForm(data) {
    const errors = [];
    
    // Required fields
    if (!data.firstName?.trim()) {
        errors.push('First name is required');
    }
    
    if (!data.lastName?.trim()) {
        errors.push('Last name is required');
    }
    
    if (!data.email?.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject?.trim()) {
        errors.push('Please select a subject');
    }
    
    if (!data.message?.trim()) {
        errors.push('Message is required');
    } else if (data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (data.phone?.trim() && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Show errors
    if (errors.length > 0) {
        if (window.LivLif && window.LivLif.showNotification) {
            window.LivLif.showNotification(errors[0], 'error');
        } else {
            alert(errors.join('\n'));
        }
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        
                        if (otherQuestion && otherAnswer) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                        }
                    }
                });
                
                // Toggle current item
                if (isExpanded) {
                    this.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                } else {
                    this.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }
            });
        }
    });
}

// Add FAQ styles
const faqStyles = document.createElement('style');
faqStyles.textContent = `
    .faq-section {
        padding: var(--section-spacing) 0;
        background: var(--color-background);
    }
    
    .faq-grid {
        display: grid;
        gap: var(--space-lg);
        max-width: 800px;
        margin: 0 auto;
    }
    
    .faq-item {
        background: var(--color-white);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        transition: box-shadow var(--transition-normal);
    }
    
    .faq-item:hover {
        box-shadow: var(--shadow-md);
    }
    
    .faq-question {
        width: 100%;
        padding: var(--space-lg);
        background: none;
        border: none;
        text-align: left;
        font-size: var(--text-lg);
        font-weight: var(--weight-semibold);
        color: var(--color-text-dark);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: color var(--transition-normal);
    }
    
    .faq-question:hover {
        color: var(--color-primary);
    }
    
    .faq-question svg {
        transition: transform var(--transition-normal);
        flex-shrink: 0;
        margin-left: var(--space-md);
    }
    
    .faq-question[aria-expanded="true"] svg {
        transform: rotate(180deg);
    }
    
    .faq-answer {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all var(--transition-normal);
    }
    
    .faq-answer p {
        padding: 0 var(--space-lg) var(--space-lg);
        color: var(--color-text-muted);
        line-height: var(--leading-relaxed);
        margin: 0;
    }
    
    .contact-section {
        padding: var(--space-2xl) 0;
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-4xl);
        align-items: start;
    }
    
    .contact-form-container {
        background: var(--color-white);
        padding: var(--space-2xl);
        border-radius: var(--border-radius-xl);
        box-shadow: var(--shadow-lg);
    }
    
    .form-title {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-xl);
        color: var(--color-text-dark);
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-lg);
    }
    
    .contact-info {
        padding: var(--space-xl);
    }
    
    .info-title {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-md);
        color: var(--color-text-dark);
    }
    
    .info-subtitle {
        color: var(--color-text-muted);
        margin-bottom: var(--space-2xl);
        line-height: var(--leading-relaxed);
    }
    
    .contact-methods {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
        margin-bottom: var(--space-2xl);
    }
    
    .contact-method {
        display: flex;
        gap: var(--space-lg);
        align-items: flex-start;
    }
    
    .method-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--color-primary) 0%, #ff8533 100%);
        border-radius: var(--border-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-white);
        flex-shrink: 0;
    }
    
    .method-content {
        flex: 1;
    }
    
    .method-title {
        font-size: var(--text-lg);
        font-weight: var(--weight-semibold);
        margin-bottom: var(--space-xs);
        color: var(--color-text-dark);
    }
    
    .method-details {
        color: var(--color-text-dark);
        margin-bottom: var(--space-xs);
        font-weight: var(--weight-medium);
    }
    
    .method-note {
        color: var(--color-text-muted);
        font-size: var(--text-sm);
    }
    
    .social-links {
        border-top: 1px solid var(--color-border);
        padding-top: var(--space-xl);
    }
    
    .social-title {
        font-size: var(--text-lg);
        margin-bottom: var(--space-lg);
        color: var(--color-text-dark);
    }
    
    .social-icons {
        display: flex;
        gap: var(--space-md);
    }
    
    .social-icons .social-link {
        width: 44px;
        height: 44px;
        background: var(--color-background);
        border-radius: var(--border-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-dark);
        transition: all var(--transition-normal);
    }
    
    .social-icons .social-link:hover {
        background: var(--color-primary);
        color: var(--color-white);
        transform: translateY(-2px);
    }
    
    .map-section {
        padding: var(--space-2xl) 0;
        background: var(--color-background);
    }
    
    .map-container {
        background: var(--color-white);
        border-radius: var(--border-radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
    }
    
    .map-placeholder {
        height: 400px;
        background: linear-gradient(135deg, var(--color-secondary) 0%, #2d5f47 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-white);
        text-align: center;
    }
    
    .map-content {
        max-width: 300px;
    }
    
    .map-icon {
        margin-bottom: var(--space-lg);
        opacity: 0.8;
    }
    
    .map-content h3 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-md);
    }
    
    .map-content p {
        margin-bottom: var(--space-lg);
        opacity: 0.9;
        line-height: var(--leading-relaxed);
    }
    
    .store-hours {
        margin-bottom: var(--space-lg);
        padding: var(--space-lg);
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius-lg);
        backdrop-filter: blur(10px);
    }
    
    .store-hours h4 {
        font-size: var(--text-base);
        margin-bottom: var(--space-sm);
        font-weight: var(--weight-semibold);
    }
    
    .store-hours p {
        margin: 0;
        font-size: var(--text-sm);
        opacity: 0.9;
    }
    
    @media (max-width: 768px) {
        .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
        }
        
        .contact-form-container {
            padding: var(--space-xl);
        }
        
        .form-row {
            grid-template-columns: 1fr;
            gap: var(--space-md);
        }
        
        .contact-info {
            padding: 0;
        }
        
        .contact-method {
            gap: var(--space-md);
        }
        
        .method-icon {
            width: 40px;
            height: 40px;
        }
        
        .map-placeholder {
            height: 300px;
        }
        
        .map-content {
            padding: var(--space-lg);
        }
    }
`;
document.head.appendChild(faqStyles);