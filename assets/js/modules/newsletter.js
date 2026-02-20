/**
 * Newsletter Subscription Module
 * 
 * Handles newsletter form submission via Netlify Function.
 * Features real-time validation, loading states, and success/error modals.
 * Integrates with Netlify serverless functions for backend processing.
 * 
 * @module newsletter
 * @requires #newsletterForm - Form element
 * @requires #newsletter-email - Email input field
 * @requires #newsletter-error - Email error message container
 * @requires #newsletter-sections-error - Sections error message container
 * @requires .newsletter__section-checkbox - Section checkboxes (at least one required)
 * @requires #newsletter-submit - Submit button
 * @requires #successModal - Success modal (opened on success)
 * @requires #errorModal - Error modal (opened on failure)
 * @requires #error-message - Error message display in modal
 * @requires /.netlify/functions/subscribe - Backend endpoint
 * 
 * @example
 * // HTML structure:
 * // <form id="newsletterForm">
 * //   <input type="checkbox" class="newsletter__section-checkbox" value="blog" />
 * //   <input type="checkbox" class="newsletter__section-checkbox" value="cycling" />
 * //   <span id="newsletter-sections-error"></span>
 * //   <input type="email" id="newsletter-email" required />
 * //   <span id="newsletter-error"></span>
 * //   <button id="newsletter-submit">Subscribe</button>
 * // </form>
 * // 
 * // <div class="modal" id="successModal">
 * //   <p>Successfully subscribed!</p>
 * // </div>
 * // 
 * // <div class="modal" id="errorModal">
 * //   <p id="error-message"></p>
 * // </div>
 * 
 * // JavaScript usage:
 * import { initNewsletterForm } from './modules/newsletter.js';
 * initNewsletterForm();
 * 
 * @see Netlify Functions documentation
 * @see openModal() - Global function to open modals
 */

/**
 * Initializes newsletter subscription form
 * Sets up validation, submission, and error handling
 * 
 * @function initNewsletterForm
 * @returns {void}
 * 
 * @description
 * Features:
 * - Real-time validation on input and blur events
 * - Client-side validation (required email, at least one section)
 * - Loading state during submission
 * - Success modal on successful subscription
 * - Error modal with specific error messages
 * - Form reset after success
 * - Disabled state during submission to prevent double-submit
 * - Submit button disabled until all requirements met
 * 
 * Validation requirements:
 * - Valid email address
 * - At least one section checkbox selected
 * 
 * Validation triggers:
 * - Input event: validates if field was previously invalid
 * - Blur event: validates if field has content
 * - Change event (checkboxes): validates sections and enables/disables button
 * - Submit: always validates before sending
 * 
 * API endpoint: /.netlify/functions/subscribe
 * Expected request: { email: string, sections: string[] }
 * Expected response: { status: 200 } on success
 * Expected error: { error: "message" } on failure
 */
export function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    // Early exit if newsletter form not present
    if (!form) return;

    const email = document.getElementById('newsletter-email');
    const emailError = document.getElementById('newsletter-error');
    const sectionsError = document.getElementById('newsletter-sections-error');
    const submitBtn = document.getElementById('newsletter-submit');
    const checkboxes = document.querySelectorAll('.newsletter__section-checkbox');

    /**
     * Real-time validation on email input
     * Only validates if field was previously marked invalid
     * Prevents annoying validation while user is still typing
     */
    email.addEventListener('input', function () {
        if (this.classList.contains('is-invalid')) {
            validateEmail();
        }
        updateSubmitButton();
    });

    /**
     * Validation on blur (leaving field)
     * Only validates if field has content
     * Helps catch errors before submission
     */
    email.addEventListener('blur', function () {
        if (this.value) {
            validateEmail();
        }
        updateSubmitButton();
    });

    /**
     * Real-time validation on checkbox change
     * Updates submit button state immediately
     */
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            validateSections();
            updateSubmitButton();
        });
    });

    /**
     * Form submission handler
     * Validates email and sections, then submits to Netlify Function
     */
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields before submitting
        const emailValid = validateEmail();
        const sectionsValid = validateSections();

        if (!emailValid || !sectionsValid) {
            return;
        }

        submitNewsletter();
    });

    /**
     * Validates email field using HTML5 validation API
     * Shows appropriate error messages
     * 
     * @private
     * @function validateEmail
     * @returns {boolean} True if valid, false if invalid
     * 
     * @description
     * Validation checks:
     * 1. Required: field must have value
     * 2. Type: must be valid email format
     * 3. Pattern: additional pattern matching if specified
     */
    function validateEmail() {
        // Clear previous errors
        emailError.textContent = '';
        email.classList.remove('is-invalid');

        // Check if empty
        if (email.validity.valueMissing) {
            emailError.textContent = form.dataset.errorEmailRequired || 'Please enter your email address';
            email.classList.add('is-invalid');
            return false;
        }

        // Check if valid email format
        if (email.validity.typeMismatch || email.validity.patternMismatch) {
            emailError.textContent = form.dataset.errorEmailInvalid || 'Please enter a valid email address';
            email.classList.add('is-invalid');
            return false;
        }

        return true;
    }

    /**
     * Validates that at least one section is selected
     * Shows appropriate error message
     * 
     * @private
     * @function validateSections
     * @returns {boolean} True if at least one selected, false otherwise
     */
    function validateSections() {
        // Clear previous error
        sectionsError.textContent = '';
        
        // Check if at least one checkbox is checked
        const hasSelection = Array.from(checkboxes).some(checkbox => checkbox.checked);
        
        if (!hasSelection) {
            sectionsError.textContent = form.dataset.errorSectionsRequired || 'Please select at least one topic';
            return false;
        }

        return true;
    }

    /**
     * Updates submit button enabled/disabled state
     * Button is only enabled when:
     * - Email is valid (non-empty and proper format)
     * - At least one section is selected
     * 
     * @private
     * @function updateSubmitButton
     * @returns {void}
     */
    function updateSubmitButton() {
        // Check email validity (basic check, not full validation)
        const emailValue = email.value.trim();
        const emailHasValue = emailValue.length > 0;
        const emailLooksValid = emailValue.includes('@') && emailValue.includes('.');
        
        // Check if at least one checkbox is selected
        const hasSelection = Array.from(checkboxes).some(checkbox => checkbox.checked);
        
        // Enable button only if both conditions are met
        submitBtn.disabled = !(emailHasValue && emailLooksValid && hasSelection);
    }

    /**
     * Gets selected sections from checkboxes
     * 
     * @private
     * @function getSelectedSections
     * @returns {string[]} Array of selected section values
     */
    function getSelectedSections() {
        return Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }

    /**
     * Submits newsletter subscription to Netlify Function
     * Handles loading states, success, and error responses
     * 
     * @private
     * @function submitNewsletter
     * @returns {void}
     * 
     * @description
     * Flow:
     * 1. Show loading state (disable form, change button text)
     * 2. POST to /.netlify/functions/subscribe with email and sections
     * 3. On success: reset form, show success modal
     * 4. On error: show error modal with message
     * 5. Always: restore form state (re-enable)
     * 
     * Network errors vs API errors:
     * - Network error: fetch fails, catch block handles
     * - API error: non-200 status, then block handles
     */
    function submitNewsletter() {
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        email.disabled = true;
        checkboxes.forEach(checkbox => checkbox.disabled = true);

        // Get selected sections
        const selectedSections = getSelectedSections();

        // Call Netlify Function
        fetch('/.netlify/functions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                sections: selectedSections
            })
        })
            .then(function (response) {
                // Parse JSON response with status code
                return response.json().then(function (data) {
                    return { status: response.status, data: data };
                });
            })
            .then(function (result) {
                if (result.status === 200) {
                    // Success: clear form and show success modal
                    form.reset();
                    updateSubmitButton(); // Re-disable button after reset
                    openModal('successModal');
                } else {
                    // API error: show error modal with message
                    const errorMsg = result.data.error || 'Subscription failed. Please try again.';
                    document.getElementById('error-message').textContent = errorMsg;
                    openModal('errorModal');
                }
            })
            .catch(function (err) {
                // Network error: show generic error modal
                console.error('Subscription error:', err);
                document.getElementById('error-message').textContent = 
                    'Network error. Please check your connection and try again.';
                openModal('errorModal');
            })
            .finally(function () {
                // Always restore form state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                email.disabled = false;
                checkboxes.forEach(checkbox => checkbox.disabled = false);
                updateSubmitButton(); // Update button state based on current form values
            });
    }

    // Initial button state check on page load
    updateSubmitButton();
}