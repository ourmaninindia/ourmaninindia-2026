/**
 * Generic Form Validation & Submission Module
 *
 * Handles validation and submission for all site forms.
 * Supports inline error messages, loading states, and success/error modals.
 * Form-specific behaviour is configured via data attributes on the <form> element.
 *
 * @module forms
 *
 * @example
 * // Contact form:
 * // <form
 * //   id="contactForm"
 * //   data-endpoint="https://formspree.io/f/xxxx"
 * //   data-success-modal="successModal"
 * //   data-error-modal="errorModal"
 * // >
 * //   <input type="text"  name="name"    required data-error="nameError" />
 * //   <span id="nameError"></span>
 * //   <input type="email" name="email"   required data-error="emailError" />
 * //   <span id="emailError"></span>
 * //   <textarea           name="message" required data-error="messageError"></textarea>
 * //   <span id="messageError"></span>
 * //   <button type="submit">Send</button>
 * // </form>
 *
 * // Newsletter form (with checkboxes):
 * // <form
 * //   id="newsletterForm"
 * //   data-endpoint="/.netlify/functions/subscribe"
 * //   data-success-modal="successModal"
 * //   data-error-modal="errorModal"
 * //   data-checkbox-group="newsletter__section-checkbox"
 * //   data-checkbox-error="newsletter-sections-error"
 * // >
 * //   <input type="checkbox" class="newsletter__section-checkbox" value="blog" />
 * //   <input type="checkbox" class="newsletter__section-checkbox" value="cycling" />
 * //   <span id="newsletter-sections-error"></span>
 * //   <input type="email" name="email" required data-error="newsletter-error" />
 * //   <span id="newsletter-error"></span>
 * //   <button type="submit">Subscribe</button>
 * // </form>
 */

export function initForms() {
    document.querySelectorAll('form[data-endpoint]').forEach(form => {
        initForm(form);
    });
}

/**
 * Initialises a single form with validation and submission
 *
 * @param {HTMLFormElement} form
 */
function initForm(form) {
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitBtn) return;

    const fields      = Array.from(form.querySelectorAll('input, textarea, select'));
    const checkboxCls = form.dataset.checkboxGroup;
    const checkboxes  = checkboxCls ? Array.from(form.querySelectorAll(`.${checkboxCls}`)) : [];

    // ─── Real-time validation ────────────────────────────────────────────────

    fields.forEach(field => {
        // Validate on blur if field has content
        field.addEventListener('blur', () => {
            if (field.value) validateField(field);
            updateSubmitButton(form, submitBtn, checkboxes);
        });

        // Re-validate on input only if previously marked invalid
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) validateField(field);
            updateSubmitButton(form, submitBtn, checkboxes);
        });
    });

    // Checkbox group validation
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            validateCheckboxGroup(form, checkboxes);
            updateSubmitButton(form, submitBtn, checkboxes);
        });
    });

    // ─── Submit ──────────────────────────────────────────────────────────────

    form.addEventListener('submit', e => {
        e.preventDefault();

        // Validate all fields on submit
        const fieldsValid    = fields
            .filter(f => f.type !== 'checkbox' && f.type !== 'radio')
            .map(f => validateField(f))
            .every(Boolean);

        const checkboxValid  = checkboxes.length
            ? validateCheckboxGroup(form, checkboxes)
            : true;

        if (!fieldsValid || !checkboxValid) return;

        submitForm(form, submitBtn, checkboxes);
    });

    // Initial button state
    updateSubmitButton(form, submitBtn, checkboxes);
}

/**
 * Validates a single field and shows/clears its inline error
 *
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
 * @returns {boolean}
 */
function validateField(field) {
    // Skip checkboxes — handled separately
    if (field.type === 'checkbox' || field.type === 'radio') return true;

    const errorEl = field.dataset.error
        ? document.getElementById(field.dataset.error)
        : null;

    clearError(field, errorEl);

    if (field.validity.valueMissing) {
        showError(field, errorEl, field.dataset.msgRequired || 'This field is required');
        return false;
    }

    if (field.validity.typeMismatch || field.validity.patternMismatch) {
        showError(field, errorEl, field.dataset.msgInvalid || 'Please enter a valid value');
        return false;
    }

    if (field.validity.tooShort) {
        showError(field, errorEl, field.dataset.msgTooShort || `Minimum ${field.minLength} characters`);
        return false;
    }

    if (field.validity.tooLong) {
        showError(field, errorEl, field.dataset.msgTooLong || `Maximum ${field.maxLength} characters`);
        return false;
    }

    return true;
}

/**
 * Validates that at least one checkbox in a group is checked
 *
 * @param {HTMLFormElement} form
 * @param {HTMLInputElement[]} checkboxes
 * @returns {boolean}
 */
function validateCheckboxGroup(form, checkboxes) {
    if (!checkboxes.length) return true;

    const errorEl  = form.dataset.checkboxError
        ? document.getElementById(form.dataset.checkboxError)
        : null;
    const hasCheck = checkboxes.some(cb => cb.checked);

    if (!hasCheck) {
        if (errorEl) {
            errorEl.textContent = form.dataset.msgCheckboxRequired || 'Please select at least one option';
            errorEl.classList.add('form__error--visible');
        }
        return false;
    }

    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('form__error--visible');
    }
    return true;
}

/**
 * Enables or disables the submit button based on form state
 *
 * @param {HTMLFormElement} form
 * @param {HTMLButtonElement} submitBtn
 * @param {HTMLInputElement[]} checkboxes
 */
function updateSubmitButton(form, submitBtn, checkboxes) {
    const fieldsOk    = form.checkValidity();
    const checkboxOk  = checkboxes.length
        ? checkboxes.some(cb => cb.checked)
        : true;

    submitBtn.disabled = !(fieldsOk && checkboxOk);
}

/**
 * Submits the form to the endpoint defined in data-endpoint
 * Builds JSON payload from all named fields + checked checkbox values
 *
 * @param {HTMLFormElement} form
 * @param {HTMLButtonElement} submitBtn
 * @param {HTMLInputElement[]} checkboxes
 */
function submitForm(form, submitBtn, checkboxes) {
    const endpoint      = form.dataset.endpoint;
    const successModal  = form.dataset.successModal;
    const errorModal    = form.dataset.errorModal;
    const originalText  = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = submitBtn.dataset.loadingText || 'Sending...';
    submitBtn.disabled    = true;
    form.querySelectorAll('input, textarea, select').forEach(f => f.disabled = true);

    // Build payload from named form fields
    const payload = {};
    new FormData(form).forEach((value, key) => {
        payload[key] = value;
    });

    // Add checkbox group as array if present
    if (checkboxes.length) {
        const groupName = checkboxes[0].name || 'sections';
        payload[groupName] = checkboxes
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        // Remove individual checkbox entries FormData may have added
        delete payload[groupName + '[]'];
    }

    fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
    })
        .then(response => response.json().then(data => ({ status: response.status, data })))
        .then(result => {
            if (result.status === 200 || result.status === 201) {
                form.reset();
                updateSubmitButton(form, submitBtn, checkboxes);
                if (successModal) openModal(successModal);
            } else {
                const msg = result.data?.error || 'Submission failed. Please try again.';
                showModalError(errorModal, msg);
            }
        })
        .catch(err => {
            console.error('Form submission error:', err);
            showModalError(errorModal, 'Network error. Please check your connection and try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            form.querySelectorAll('input, textarea, select').forEach(f => f.disabled = false);
            updateSubmitButton(form, submitBtn, checkboxes);
        });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function showError(field, errorEl, message) {
    field.classList.add('is-invalid');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('form__error--visible');
    }
}

function clearError(field, errorEl) {
    field.classList.remove('is-invalid');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('form__error--visible');
    }
}

function showModalError(modalId, message) {
    const msgEl = document.getElementById('error-message');
    if (msgEl) msgEl.textContent = message;
    if (modalId) openModal(modalId);
}