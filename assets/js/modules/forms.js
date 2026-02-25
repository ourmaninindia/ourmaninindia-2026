/**
 * Generic Form Validation & Submission Module
 *
 * Handles validation and submission for all site forms.
 * Supports inline error messages, loading states, and inline success/error feedback.
 * Form-specific behaviour is configured via data attributes on the <form> element.
 *
 * @module forms
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

    const fields      = Array.from(form.querySelectorAll('input, textarea, select'));
    const checkboxCls = form.dataset.checkboxGroup;
    const checkboxes  = checkboxCls ? Array.from(form.querySelectorAll(`.${checkboxCls}`)) : [];

    // Debug warnings
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

    // Real-time validation
    fields.forEach(field => {
        field.addEventListener('blur', () => {
            if (field.value) validateField(field);
            updateSubmitButton(form, submitBtn, checkboxes);
        });

        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) validateField(field);
            updateSubmitButton(form, submitBtn, checkboxes);
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            validateCheckboxGroup(form, checkboxes);
            updateSubmitButton(form, submitBtn, checkboxes);
        });
    });

    // Submit
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

function validateField(field) {
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

function updateSubmitButton(form, submitBtn, checkboxes) {
    const fieldsOk   = form.checkValidity();
    const checkboxOk = checkboxes.length
        ? checkboxes.some(cb => cb.checked)
        : true;

    submitBtn.disabled = !(fieldsOk && checkboxOk);
}

function submitForm(form, submitBtn, checkboxes) {
    const endpoint     = form.dataset.endpoint;
    const originalText = submitBtn.textContent;

    submitBtn.textContent = submitBtn.dataset.loadingText || 'Sending...';
    submitBtn.disabled    = true;
    form.querySelectorAll('input, textarea, select').forEach(f => f.disabled = true);

    const payload = {};
    new FormData(form).forEach((value, key) => {
        payload[key] = value;
    });

    if (checkboxes.length) {
        const groupName = checkboxes[0].name || 'sections';
        payload[groupName] = checkboxes
            .filter(cb => cb.checked)
            .map(cb => cb.value);
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
                const msg = form.dataset.successMessage || 'Thank you! Your message has been sent.';
                showInlineMessage(form, msg, 'success');
            } else {
                const msg = result.data?.error
                    || form.dataset.errorMessage
                    || 'Something went wrong. Please try again.';
                showInlineMessage(form, msg, 'error');
                restoreForm(form, submitBtn, originalText, checkboxes);
            }
        })
        .catch(err => {
            console.error('[forms.js] Submission error:', err);
            const msg = form.dataset.errorMessage || 'Network error. Please check your connection and try again.';
            showInlineMessage(form, msg, 'error');
            restoreForm(form, submitBtn, originalText, checkboxes);
        });
}

function showInlineMessage(form, message, type) {
    const icon = type === 'success' ? '✅' : '❌';
    form.innerHTML = `
        <div class="form__feedback form__feedback--${type}" role="alert">
            <span class="form__feedback-icon">${icon}</span>
            <p class="form__feedback-message">${message}</p>
        </div>
    `;
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