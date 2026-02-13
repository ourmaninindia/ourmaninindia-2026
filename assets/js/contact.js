// ==========================================
// CONTACT FORM HANDLER (Client-side)
// Location: assets/js/contact.js
// Handles form validation and submission
// ==========================================

(function() {
    'use strict';
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        const submitBtn = document.getElementById('contact-submit');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        
        // Real-time validation
        nameInput.addEventListener('blur', function() {
            validateName();
        });
        
        emailInput.addEventListener('blur', function() {
            validateEmail();
        });
        
        messageInput.addEventListener('blur', function() {
            validateMessage();
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                submitContactForm();
            }
        });
        
        // Validation functions
        function validateName() {
            nameError.textContent = '';
            nameInput.classList.remove('is-invalid');
            
            if (nameInput.validity.valueMissing) {
                nameError.textContent = 'Please enter your name';
                nameInput.classList.add('is-invalid');
                return false;
            }
            
            if (nameInput.value.trim().length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameInput.classList.add('is-invalid');
                return false;
            }
            
            nameInput.classList.add('is-valid');
            return true;
        }
        
        function validateEmail() {
            emailError.textContent = '';
            emailInput.classList.remove('is-invalid');
            
            if (emailInput.validity.valueMissing) {
                emailError.textContent = 'Please enter your email';
                emailInput.classList.add('is-invalid');
                return false;
            }
            
            if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.classList.add('is-invalid');
                return false;
            }
            
            emailInput.classList.add('is-valid');
            return true;
        }
        
        function validateMessage() {
            messageError.textContent = '';
            messageInput.classList.remove('is-invalid');
            
            if (messageInput.validity.valueMissing) {
                messageError.textContent = 'Please enter a message';
                messageInput.classList.add('is-invalid');
                return false;
            }
            
            if (messageInput.value.trim().length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageInput.classList.add('is-invalid');
                return false;
            }
            
            messageInput.classList.add('is-valid');
            return true;
        }
        
        // Submit to Netlify Function
        function submitContactForm() {
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            nameInput.disabled = true;
            emailInput.disabled = true;
            messageInput.disabled = true;
            
            // Call Netlify Function
            fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim()
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
                    
                    // Remove validation classes
                    nameInput.classList.remove('is-valid');
                    emailInput.classList.remove('is-valid');
                    messageInput.classList.remove('is-valid');
                    
                    // Show success modal
                    openModal('contactSuccessModal');
                } else {
                    // API returned an error
                    const errorMsg = result.data.error || 'Failed to send message. Please try again.';
                    document.getElementById('contact-error-message').textContent = errorMsg;
                    openModal('contactErrorModal');
                }
            })
            .catch(function(err) {
                // Network error
                console.error('Contact form error:', err);
                document.getElementById('contact-error-message').textContent = 'Network error. Please check your connection and try again.';
                openModal('contactErrorModal');
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                nameInput.disabled = false;
                emailInput.disabled = false;
                messageInput.disabled = false;
            });
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }
    
})();