// ==========================================
// NEWSLETTER SUBSCRIPTION
// Handles form submission via Netlify Function
// ==========================================

(function() {
    'use strict';
    
    function initNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;
        
        const email = document.getElementById('newsletter-email');
        const error = document.getElementById('newsletter-error');
        const submitBtn = document.getElementById('newsletter-submit');
        
        // Real-time validation
        email.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateEmail();
            }
        });
        
        email.addEventListener('blur', function() {
            if (this.value) {
                validateEmail();
            }
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateEmail()) {
                return;
            }
            
            submitNewsletter();
        });
        
        // Validation function
        function validateEmail() {
            error.textContent = '';
            email.classList.remove('is-invalid');
            
            if (email.validity.valueMissing) {
                error.textContent = 'Please enter your email address';
                email.classList.add('is-invalid');
                return false;
            }
            
            if (email.validity.typeMismatch || email.validity.patternMismatch) {
                error.textContent = 'Please enter a valid email address';
                email.classList.add('is-invalid');
                return false;
            }
            
            return true;
        }
        
        // Submit to Netlify Function
        function submitNewsletter() {
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            email.disabled = true;
            
            // Call Netlify Function
            fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value
                })
            })
            .then(function(response) {
                return response.json().then(function(data) {
                    return { status: response.status, data: data };
                });
            })
            .then(function(result) {
                if (result.status === 200) {
                    // Success!
                    form.reset();
                    openModal('successModal');
                } else {
                    // API returned an error
                    const errorMsg = result.data.error || 'Subscription failed. Please try again.';
                    document.getElementById('error-message').textContent = errorMsg;
                    openModal('errorModal');
                }
            })
            .catch(function(err) {
                // Network error
                console.error('Subscription error:', err);
                document.getElementById('error-message').textContent = 'Network error. Please check your connection and try again.';
                openModal('errorModal');
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                email.disabled = false;
            });
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsletterForm);
    } else {
        initNewsletterForm();
    }
    
})();