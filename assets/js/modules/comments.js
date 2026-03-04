// ── Helpers ──────────────────────────────────────────────────────────────────

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderComment(comment, replies) {
    const date = new Date(comment.created_at).toLocaleDateString('en-GB', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const childReplies = replies.filter(r => r.parent_id === comment.id);
    const repliesHtml = childReplies.map(r => renderComment(r, replies)).join('');

    return `
        <div class="comment" id="comment-${comment.id}">
            <div class="comment__header">
                <span class="comment__author">${escapeHtml(comment.name)}</span>
                <span class="comment__date">${date}</span>
                <button class="comment__reply-btn" data-id="${comment.id}" data-name="${escapeHtml(comment.name)}">
                    Reply
                </button>
            </div>
            <div class="comment__body">${escapeHtml(comment.message)}</div>
            ${repliesHtml ? `<div class="comment__replies">${repliesHtml}</div>` : ''}
        </div>
    `;
}

function renderComments(commentsList, comments) {
    if (!comments.length) {
        commentsList.innerHTML = '<p class="comments__empty">No comments yet. Be the first!</p>';
        return;
    }
    const topLevel = comments.filter(c => !c.parent_id);
    const replies = comments.filter(c => c.parent_id);
    commentsList.innerHTML = topLevel.map(c => renderComment(c, replies)).join('');
}

async function loadComments(commentsList, pageId) {
    try {
        const res = await fetch(`/api/comments?pageId=${encodeURIComponent(pageId)}`);
        if (!res.ok) throw new Error('Failed to fetch comments');
        const comments = await res.json();
        renderComments(commentsList, comments);
    } catch {
        commentsList.innerHTML = '<p class="comments__error">Could not load comments.</p>';
    }
}

// ── Validation ────────────────────────────────────────────────────────────────

function validateForm(form) {
    let valid = true;

    // Name
    const nameInput = form.querySelector('#comment-name');
    const nameError = form.querySelector('#contact-name-error');
    if (nameInput && !nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        if (nameError) nameError.textContent = 'Please enter your name';
        valid = false;
    } else if (nameInput) {
        nameInput.classList.remove('is-invalid');
        if (nameError) nameError.textContent = '';
    }

    // Message
    const messageInput = form.querySelector('#comment-message');
    const messageError = form.querySelector('#comment-message-error');
    if (messageInput && !messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        if (messageError) messageError.textContent = 'Please enter a message';
        valid = false;
    } else if (messageInput) {
        messageInput.classList.remove('is-invalid');
        if (messageError) messageError.textContent = '';
    }

    return valid;
}

// ── Main export ───────────────────────────────────────────────────────────────

export function initComments() {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;

    const pageId = commentsList.dataset.pageId;

    // ── Reply handling ────────────────────────────────────────────────────────
    const parentIdInput = document.getElementById('parent-id');
    const replyIndicator = document.getElementById('reply-indicator');
    const replyName = document.getElementById('reply-name');
    const cancelReply = document.getElementById('cancel-reply');

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('comment__reply-btn')) {
            const { id, name } = e.target.dataset;
            parentIdInput.value = id;
            replyName.textContent = name;
            replyIndicator.classList.remove('hidden');
            document.getElementById('comment-form').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('comment-name').focus();
        }
    });

    cancelReply?.addEventListener('click', () => {
        parentIdInput.value = '';
        replyIndicator.classList.add('hidden');
    });

    // ── Form submission ───────────────────────────────────────────────────────
    const form = document.getElementById('comment-form');
    const successMsg = document.getElementById('comment-success');
    const errorMsg = document.getElementById('comment-error');
    const submitBtn = form?.querySelector('[type="submit"]');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) return;

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        try {
            // Submit to Netlify Forms via URL-encoded POST
            const formData = new FormData(form);
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (res.ok) {
                form.reset();
                parentIdInput.value = '';
                replyIndicator?.classList.add('hidden');
                successMsg?.classList.remove('hidden');
                errorMsg?.classList.add('hidden');
            } else {
                throw new Error('Submission failed');
            }
        } catch {
            errorMsg?.classList.remove('hidden');
            successMsg?.classList.add('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    // ── Init ──────────────────────────────────────────────────────────────────
    loadComments(commentsList, pageId);
}