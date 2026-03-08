/**
 * Generic Form Validation & Submission Module
 *
 * Handles validation and submission for all site forms.
 * Supports inline error messages, loading states, and inline success/error feedback.
 * Form-specific behaviour is configured via data attributes on the <form> element.
 *
 * @module forms
 *
 * @description
 * Data attributes on <form>:
 *   data-endpoint              — required. POST URL (Netlify Function or any API)
 *   data-checkbox-group        — CSS class of checkbox group (e.g. "newsletter__section-checkbox")
 *   data-checkbox-error        — ID of element to show checkbox group error in
 *   data-msg-checkbox-required — override default checkbox error message
 *   data-success-modal         — ID of modal to open on success (alternative to inline message)
 *   data-error-modal           — ID of modal to open on error (alternative to inline message)
 *   data-error-modal-msg       — ID of element inside error modal to inject error text into
 *   data-confirmed-email       — ID of element inside success modal to inject submitted email into
 *   data-success-message       — inline success message (used when no data-success-modal)
 *   data-error-message         — fallback error message
 *   data-loading-text          — override submit button text during submission
 *   data-name-fields           — comma-separated IDs of firstname/lastname fields to combine
 *                                e.g. data-name-fields="newsletter-firstname,newsletter-lastname"
 *
 * Data attributes on <input> / <textarea> / <select>:
 *   data-error                 — ID of element to show field error in
 *   data-msg-required          — override "field required" message
 *   data-msg-invalid           — override "invalid value" message
 *   data-msg-too-short         — override "too short" message
 *   data-msg-too-long          — override "too long" message
 *
 * @example Newsletter form
 *   <form
 *     data-endpoint="/.netlify/functions/subscribe"
 *     data-checkbox-group="newsletter__section-checkbox"
 *     data-checkbox-error="newsletter-sections-error"
 *     data-success-modal="successModal"
 *     data-error-modal="errorModal"
 *     data-error-modal-msg="error-message"
 *     data-confirmed-email="confirmed-email"
 *     data-name-fields="newsletter-firstname,newsletter-lastname"
 *   >
 *     <input type="text" id="newsletter-firstname" name="firstname" />
 *     <input type="text" id="newsletter-lastname" name="lastname" />
 *     <input type="email" id="newsletter-email" data-error="newsletter-email-error" required />
 *     <span id="newsletter-email-error"></span>
 *     <input type="checkbox" class="newsletter__section-checkbox" value="blog" />
 *     <span id="newsletter-sections-error"></span>
 *     <button type="submit">Subscribe</button>
 *   </form>
 *
 * @example Contact form (inline feedback, no modal)
 *   <form
 *     data-endpoint="/.netlify/functions/contact"
 *     data-success-message="Message sent!"
 *     data-name-fields="contact-firstname,contact-lastname"
 *   >
 *     <input type="text" id="contact-firstname" name="firstname" />
 *     <input type="text" id="contact-lastname" name="lastname" />
 *     <input type="email" name="email" data-error="email-error" required />
 *     <span id="email-error"></span>
 *     <textarea name="message" data-error="message-error" required></textarea>
 *     <span id="message-error"></span>
 *     <button type="submit">Send</button>
 *   </form>
 */

export function initForms() {
    document.querySelectorAll('form[data-endpoint]').forEach(form => {
        initForm(form);
    });
}

function initForm(form) {
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

    if (!submitBtn) {
        console.warn(`[forms.js] No submit button found in form`, form);
        return;
    }

    const fields = Array.from(form.querySelectorAll('input, textarea, select'));
    const checkboxCls = form.dataset.checkboxGroup;
    const checkboxes = checkboxCls ? Array.from(form.querySelectorAll(`.${checkboxCls}`)) : [];

    // ── Debug warnings ──────────────────────────────────────────────
    if (checkboxCls && checkboxes.length === 0) {
        console.warn(`[forms.js] data-checkbox-group="${checkboxCls}" declared but no matching elements found`);
    }

    form.querySelectorAll('[data-error]').forEach(field => {
        if (!document.getElementById(field.dataset.error)) {
            console.warn(`[forms.js] Error element #${field.dataset.error} not found for field`, field);
        }
    });

    if (form.dataset.checkboxError && !document.getElementById(form.dataset.checkboxError)) {
        console.warn(`[forms.js] Checkbox error element #${form.dataset.checkboxError} not found`);
    }

    // ── Real-time field validation ───────────────────────────────────
    fields.forEach(field => {
        // Validate on blur if field has content
        field.addEventListener('blur', () => {
            if (field.required || field.value) validateField(field);
            updateSubmitButton(form, submitBtn, checkboxes);
        });

        // Re-validate on input only if already marked invalid
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) validateField(field);
            updateSubmitButton(form, submitBtn, checkboxes);
        });

        // On focusing an email field, immediately validate checkbox group
        // so user sees the "please select a topic" hint before typing
        if ((field.type === 'email' || field.name === 'firstname') && checkboxes.length) {
            field.addEventListener('focusin', () => {
                validateCheckboxGroup(form, checkboxes);
            });
        }
    });

    // ── Initcap name fields on blur ─────────────────────────────────
    const particles = new Set(
        (form.dataset.nameParticles || '')
            .split(',')
            .map(p => p.trim())
            .filter(Boolean)
    );

    fields.forEach(field => {
        if (['firstname', 'lastname', 'name'].includes(field.name)) {
            field.addEventListener('blur', () => {
                if (!field.value.trim()) return;
                field.value = field.value.trim()
                    .split(' ')
                    .map(word => {
                        const lower = word.toLowerCase();
                        if (particles.has(lower)) return lower;
                        return lower.charAt(0).toUpperCase() + lower.slice(1);
                    })
                    .join(' ');
            });
        }
    });

    // ── Checkbox group validation ────────────────────────────────────
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            validateCheckboxGroup(form, checkboxes);
            updateSubmitButton(form, submitBtn, checkboxes);
        });
    });

    // ── Submit ───────────────────────────────────────────────────────
    form.addEventListener('submit', e => {
        e.preventDefault();

        const fieldsValid = fields
            .filter(f => f.type !== 'checkbox' && f.type !== 'radio')
            .map(f => validateField(f))
            .every(Boolean);

        const checkboxValid = checkboxes.length
            ? validateCheckboxGroup(form, checkboxes)
            : true;

        if (!fieldsValid || !checkboxValid) return;

        submitForm(form, submitBtn, checkboxes);
    });

    updateSubmitButton(form, submitBtn, checkboxes);
}

// ── Validation helpers ───────────────────────────────────────────────

function validateField(field) {
    if (field.type === 'checkbox' || field.type === 'radio') return true;

    // Skip optional fields with no value — only validate if filled in
    if (!field.required && !field.value.trim()) return true;

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

    if (field.type === 'email' && field.value) {
        const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(field.value)) {
            showError(field, errorEl, field.dataset.msgInvalid || 'Please enter a valid email address (e.g. name@example.com)');
            return false;
        }
    }

    return true;
}

function validateCheckboxGroup(form, checkboxes) {
    if (!checkboxes.length) return true;

    const errorEl = form.dataset.checkboxError
        ? document.getElementById(form.dataset.checkboxError)
        : null;

    const hasCheck = checkboxes.some(cb => cb.checked);

    if (!hasCheck) {
        if (errorEl) {
            errorEl.textContent = form.dataset.msgCheckboxRequired || 'Please select at least one option';
            errorEl.classList.add('visible');
        }
        return false;
    }

    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
    }
    return true;
}

function updateSubmitButton(form, submitBtn, checkboxes) {
    const fieldsOk = form.checkValidity();
    const checkboxOk = checkboxes.length
        ? checkboxes.some(cb => cb.checked)
        : true;

    // Toggle is-ready class — CSS uses this to activate hover effect
    submitBtn.classList.toggle('is-ready', fieldsOk && checkboxOk);
    // never disable — submit handler validates everything
}

// ── Submission ───────────────────────────────────────────────────────

function submitForm(form, submitBtn, checkboxes) {
    const endpoint = form.dataset.endpoint;
    const originalText = submitBtn.textContent;

    // Build payload BEFORE disabling fields
    const payload = {};
    new FormData(form).forEach((value, key) => {
        const trimmed = typeof value === 'string' ? value.trim() : value;

        // Lowercase email
        if (key === 'email') {
            payload[key] = trimmed.toLowerCase();
            return;
        }

        // Initcap name fields (firstname, lastname, name)
        // Particles like van, de, der, den, het stay lowercase (Dutch tussenvoegsel)
        if (['firstname', 'lastname', 'name'].includes(key) && trimmed) {
            const particleList = form.dataset.nameParticles
                ? form.dataset.nameParticles.split(',')
                : [];
            const particles = new Set(particleList);
            payload[key] = trimmed
                .split(' ')
                .map((word, index) => {
                    const lower = word.toLowerCase();
                    // Always capitalise first word, leave particles lowercase elsewhere
                    if (index === 0 || !particles.has(lower)) {
                        return lower.charAt(0).toUpperCase() + lower.slice(1);
                    }
                    return lower;
                })
                .join(' ');
            return;
        }

        payload[key] = trimmed;
    });

    // Replace checkbox values with array
    if (checkboxes.length) {
        const rawName = checkboxes[0].name || 'sections[]';
        const groupName = rawName.replace('[]', '');
        payload[groupName] = checkboxes
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        delete payload[rawName]; // remove the brackets version
    }

    // Loading state AFTER payload is captured
    submitBtn.textContent = submitBtn.dataset.loadingText || 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.remove('is-ready');
    form.querySelectorAll('input, textarea, select').forEach(f => f.disabled = true);

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(response => response.json().then(data => ({ status: response.status, data })))
        .then(result => {
            if (result.status === 200 || result.status === 201) {
                handleSuccess(form, submitBtn, payload);
            } else {
                const msg = result.data?.error
                    || form.dataset.errorMessage
                    || 'Something went wrong. Please try again.';
                handleError(form, submitBtn, originalText, checkboxes, msg);
            }
        })
        .catch(err => {
            console.error('[forms.js] Submission error:', err);
            const msg = form.dataset.errorMessage
                || 'Network error. Please check your connection and try again.';
            handleError(form, submitBtn, originalText, checkboxes, msg);
        });
}

function handleSuccess(form, submitBtn, payload) {
    const successModal = form.dataset.successModal;

    if (successModal && typeof openModal === 'function') {
        // Inject confirmed email into modal if element id provided
        const confirmedEmailEl = form.dataset.confirmedEmail
            ? document.getElementById(form.dataset.confirmedEmail)
            : null;
        if (confirmedEmailEl && payload.email) {
            confirmedEmailEl.textContent = payload.email;
        }

        form.reset();
        updateSubmitButton(form, form.querySelector('button[type="submit"], input[type="submit"]'), []);
        openModal(successModal);
    } else {
        const msg = form.dataset.successMessage || 'Thank you! Your message has been sent.';
        showInlineMessage(form, msg, 'success');
    }
}

function handleError(form, submitBtn, originalText, checkboxes, message) {
    const errorModal = form.dataset.errorModal;

    if (errorModal && typeof openModal === 'function') {
        // Inject error message into modal if element id provided
        const errorMsgEl = form.dataset.errorModalMsg
            ? document.getElementById(form.dataset.errorModalMsg)
            : null;
        if (errorMsgEl) errorMsgEl.textContent = message;

        restoreForm(form, submitBtn, originalText, checkboxes);
        openModal(errorModal);
    } else {
        showInlineMessage(form, message, 'error');
        restoreForm(form, submitBtn, originalText, checkboxes);
    }
}

// ── UI helpers ───────────────────────────────────────────────────────

function showInlineMessage(form, message, type) {
    const icon = type === 'success' ? '✅' : '❌';
    const extra = type === 'error'
        ? `<button type="button" class="button button--ghost button--small" data-reload>Try again</button>`
        : '';

    form.innerHTML = `
        <div class="form__feedback form__feedback--${type}" role="alert">
            <p class="form__feedback-message">
                <span class="form__feedback-icon">${icon}&nbsp;</span>
                ${message}
            </p>
            ${extra}
        </div>
    `;

    if (type === 'error') {
        form.querySelector('[data-reload]').addEventListener('click', () => {
            location.reload();
        });
    }
}

function restoreForm(form, submitBtn, originalText, checkboxes) {
    submitBtn.textContent = originalText;
    form.querySelectorAll('input, textarea, select').forEach(f => f.disabled = false);
    updateSubmitButton(form, submitBtn, checkboxes);
}

function showError(field, errorEl, message) {
    field.classList.add('is-invalid');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
    }
}

function clearError(field, errorEl) {
    field.classList.remove('is-invalid');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
    }
}