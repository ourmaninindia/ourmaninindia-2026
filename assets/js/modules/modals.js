/**
 * Modal Dialogs Module
 * 
 * Generic modal system supporting multiple modals per page.
 * Opens via data-modal attribute, closes via button/backdrop/ESC.
 * Prevents body scrolling when modal is open.
 * 
 * @module modals
 * @requires .modal - Modal container with unique ID
 * @requires [data-modal="modalId"] - Trigger buttons
 * @optional .modal__close - X close button
 * @optional [data-action="close-modal"] - Cancel/close buttons
 * 
 * @example
 * // HTML structure:
 * // <button data-modal="confirmModal">Open Modal</button>
 * // 
 * // <div class="modal" id="confirmModal">
 * //   <div class="modal__dialog">
 * //     <button class="modal__close">×</button>
 * //     <h2>Confirm Action</h2>
 * //     <p>Are you sure?</p>
 * //     <button data-action="close-modal">Cancel</button>
 * //     <button class="btn--primary">Confirm</button>
 * //   </div>
 * // </div>
 * 
 * // JavaScript usage:
 * import { initModals } from './modules/modals.js';
 * initModals();
 * 
 * @accessibility
 * - Disables body scroll when modal open
 * - ESC key closes modal (via escape-key module)
 * - Focus should be trapped within modal (consider adding)
 * - Background content should be aria-hidden (consider adding)
 */

/**
 * Initializes all modal functionality on the page
 * Sets up open/close handlers for all modals
 * 
 * @function initModals
 * @returns {void}
 * 
 * @description
 * Open triggers:
 * - Any element with data-modal="modalId" attribute
 * 
 * Close triggers:
 * 1. Close button (.modal__close)
 * 2. Cancel buttons ([data-action="close-modal"])
 * 3. Backdrop click (clicking modal overlay)
 * 4. ESC key (handled by escape-key module)
 * 
 * State changes:
 * - Adds .modal--open to modal
 * - Adds .modal-open to body (for styling)
 * - Sets body overflow: hidden (prevents scrolling)
 */
export function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    // Early exit if no modals found
    if (modals.length === 0) return;

    modals.forEach(function (modal) {
        const closeBtn = modal.querySelector('.modal__close');
        const openBtns = document.querySelectorAll(`[data-modal="${modal.id}"]`);
        const closeBtns = modal.querySelectorAll('[data-action="close-modal"]');

        /**
         * Open modal on trigger button click
         * Prevents default action and shows modal overlay
         */
        openBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modal.classList.add('modal--open');
                document.body.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
            });
        });

        /**
         * Close modal via X button
         */
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                closeModal(modal);
            });
        }

        /**
         * Close modal via cancel/close buttons
         * Any button with data-action="close-modal"
         */
        closeBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                closeModal(modal);
            });
        });

        /**
         * Close modal via backdrop click
         * Only closes if clicking directly on modal (not modal__dialog)
         */
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    /**
     * Helper function to close modal
     * Removes open classes and restores body scrolling
     * 
     * @private
     * @param {HTMLElement} modal - Modal element to close
     * @returns {void}
     */
    function closeModal(modal) {
        modal.classList.remove('modal--open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; // Restore scrolling
    }
}