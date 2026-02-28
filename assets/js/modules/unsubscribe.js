export function initUnsubscribe() {

    const UNSUBSCRIBE_API = '/api/unsubscribe';
    const REASON_API      = '/api/unsubscribe-reason';

    const form       = document.getElementById('unsubscribe-form');
    const emailInput = document.getElementById('unsubscribe-email');

    if (!form || !emailInput) return;

    const emailError  = document.getElementById('unsubscribe-email-error');
    const submitBtn   = document.getElementById('submit-btn');
    const btnLabel    = document.getElementById('btn-label');
    const btnSpinner  = document.getElementById('btn-spinner');
    const retryBtn    = document.getElementById('retry-btn');

    // Reason survey elements
    const reasonForm       = document.getElementById('unsubscribe-reason-form');
    const otherReasonGroup = document.getElementById('other-reason-group');
    const otherReasonInput = document.getElementById('other-reason');
    const reasonSubmitBtn  = document.getElementById('reason-submit-btn');
    const reasonSkipBtn    = document.getElementById('reason-skip-btn');
    const surveyDone       = document.getElementById('survey-done');

    // Track the confirmed email for reason submission
    let confirmedEmail = '';

    // ── Pre-fill email from URL query param ──────────────────────────
    (function prefillFromURL() {
        const params = new URLSearchParams(window.location.search);
        const email  = params.get('email');
        if (email) {
            emailInput.value = decodeURIComponent(email);
            updateSubmitButton();
        }
    })();

    // ── Validation ───────────────────────────────────────────────────
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

    // ── Loading state ────────────────────────────────────────────────
    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        btnLabel.hidden    = isLoading;
        btnSpinner.hidden  = !isLoading;
    }

    // ── Step visibility ──────────────────────────────────────────────
    function showStep(stepId) {
        ['step-confirm', 'step-success', 'step-error'].forEach(id => {
            document.getElementById(id).hidden = (id !== stepId);
        });
    }

    function resetForm() {
        form.reset();
        showFieldError(null);
        updateSubmitButton();
        showStep('step-confirm');
    }

    // ── Email field listeners ────────────────────────────────────────
    emailInput.addEventListener('blur', () => {
        const err = validateEmail(emailInput.value.trim());
        showFieldError(err);
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('is-invalid')) {
            showFieldError(validateEmail(emailInput.value.trim()));
        }
        updateSubmitButton();
    });

    // Set initial button state
    updateSubmitButton();

    // ── Retry button ─────────────────────────────────────────────────
    if (retryBtn) {
        retryBtn.addEventListener('click', resetForm);
    }

    // ── Main unsubscribe submit ──────────────────────────────────────
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

            confirmedEmail = email;
            document.getElementById('confirmed-email') &&
                (document.getElementById('confirmed-email').textContent = email);
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

    // ── Reason survey ────────────────────────────────────────────────
    if (reasonForm) {
        // Show/hide "other" textarea when "Other" radio is selected
        reasonForm.addEventListener('change', (e) => {
            if (e.target.name === 'reason') {
                otherReasonGroup.hidden = e.target.value !== 'other';
                if (e.target.value === 'other') otherReasonInput.focus();
            }
        });

        // Submit reason
        reasonForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const selected = reasonForm.querySelector('input[name="reason"]:checked');
            const reason   = selected ? selected.value : null;
            const other    = reason === 'other' ? otherReasonInput.value.trim() : null;

            // Silently skip if nothing selected — survey is optional
            hideSurvey();

            if (!reason) return;

            try {
                await fetch(REASON_API, {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({ email: confirmedEmail, reason, other }),
                });
            } catch (err) {
                // Reason submission is best-effort — don't surface errors to user
                console.warn('Reason submission failed (non-critical):', err);
            }
        });

        // Skip button — hide survey without submitting
        if (reasonSkipBtn) {
            reasonSkipBtn.addEventListener('click', hideSurvey);
        }
    }

    function hideSurvey() {
        if (reasonForm)  reasonForm.hidden  = true;
        if (surveyDone)  surveyDone.hidden  = false;
    }
}