export function initUnsubscribe() {

    const UNSUBSCRIBE_API = '/api/unsubscribe';

    const form       = document.getElementById('unsubscribe-form');
    const emailInput = document.getElementById('unsubscribe-email');

    if (!form || !emailInput) return;

    const emailError = document.getElementById('unsubscribe-email-error');
    const submitBtn  = document.getElementById('submit-btn');
    const btnLabel   = document.getElementById('btn-label');
    const btnSpinner = document.getElementById('btn-spinner');
    const retryBtn   = document.getElementById('retry-btn');

    // Pre-fill email from URL query param e.g. /unsubscribe?email=user@example.com
    (function prefillFromURL() {
        const params = new URLSearchParams(window.location.search);
        const email  = params.get('email');
        if (email) {
            emailInput.value = decodeURIComponent(email);
            updateSubmitButton(); // enable button if prefilled with valid email
        }
    })();

    function validateEmail(value) {
        if (!value) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
        return null;
    }

    function showFieldError(message) {
        if (message) {
            emailError.textContent = message;
            emailInput.classList.add('is-invalid');
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('is-invalid');
        }
    }

    function updateSubmitButton() {
        submitBtn.disabled = validateEmail(emailInput.value.trim()) !== null;
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        btnLabel.hidden    = isLoading;
        btnSpinner.hidden  = !isLoading;
    }

    function showStep(stepId) {
        ['step-confirm', 'step-success', 'step-error'].forEach(id => {
            document.getElementById(id).hidden = (id !== stepId);
        });
    }

    function resetForm() {
        form.reset();
        showFieldError(null);
        showStep('step-confirm');
    }

    // Inline validation on blur
    emailInput.addEventListener('blur', () => {
        const err = validateEmail(emailInput.value.trim());
        showFieldError(err);
    });

    // Re-validate on input only if already marked invalid
    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('is-invalid')) {
            const err = validateEmail(emailInput.value.trim());
            showFieldError(err);
        }
        updateSubmitButton();
    });

    // Set initial button state
    updateSubmitButton();

    // Retry button wired up in JS, not via inline onclick
    if (retryBtn) {
        retryBtn.addEventListener('click', resetForm);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const err   = validateEmail(email);

        if (err) {
            showFieldError(err);
            emailInput.focus();
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(UNSUBSCRIBE_API, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || `Server error: ${response.status}`);
            }

            document.getElementById('confirmed-email').textContent = email;
            showStep('step-success');

        } catch (error) {
            console.error('Unsubscribe error:', error);
            document.getElementById('error-message').textContent =
                error.message || 'An unexpected error occurred. Please try again.';
            showStep('step-error');
        } finally {
            setLoading(false);
        }
    });
}