/**
 * Copy Code Button Module
 * 
 * Automatically adds a "Copy" button to all code blocks.
 * Uses Clipboard API to copy code to clipboard.
 * Shows success/error feedback with temporary state changes.
 * 
 * @module copy-code
 * @requires pre code - Code blocks in the DOM
 * @requires Clipboard API - Modern browser clipboard support
 * 
 * @example
 * // HTML structure (auto-generated):
 * // <pre>
 * //   <code>const x = 42;</code>
 * //   <button class="code-copy-btn">Copy</button>
 * // </pre>
 * 
 * // JavaScript usage:
 * import { initCopyCode } from './modules/copy-code.js';
 * initCopyCode();
 * 
 * @accessibility
 * - aria-label provides button description for screen readers
 * - Visual feedback on success/error states
 * - Works with keyboard navigation (button is focusable)
 */

/**
 * Initializes copy buttons for all code blocks
 * Creates and appends copy button to each <pre> element containing <code>
 * 
 * @function initCopyCode
 * @returns {void}
 * 
 * @description
 * Behavior:
 * - Adds "Copy" button to top-right of code blocks
 * - On click: copies code text to clipboard
 * - On success: shows "Copied!" for 2 seconds
 * - On error: shows "Error" and logs to console
 * - Button returns to "Copy" after timeout
 * 
 * @requires navigator.clipboard - May not work on insecure (non-HTTPS) sites
 */
export function initCopyCode() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    // Early exit if no code blocks found
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach(function (codeBlock) {
        const pre = codeBlock.parentElement;
        
        // Create copy button
        const button = document.createElement('button');
        button.className = 'code-copy-btn';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');

        // Handle copy action
        button.addEventListener('click', function () {
            // Use Clipboard API to copy code text
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(function () {
                    // Success: Show "Copied!" feedback
                    button.textContent = 'Copied!';
                    button.classList.add('code-copy-btn--success');

                    // Reset after 2 seconds
                    setTimeout(function () {
                        button.textContent = 'Copy';
                        button.classList.remove('code-copy-btn--success');
                    }, 2000);
                })
                .catch(function (err) {
                    // Error: Show error state and log
                    console.error('Failed to copy:', err);
                    button.textContent = 'Error';
                });
        });

        // Position button in top-right of code block
        pre.style.position = 'relative';
        pre.appendChild(button);
    });
}