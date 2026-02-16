/**
 * Escape Key Handler Module
 * 
 * Global keyboard handler that closes UI elements when ESC key is pressed.
 * Handles mobile menu, modals, and lightbox in priority order.
 * Restores body scroll state when closing overlays.
 * 
 * @module escape-key
 * @listens keydown - Global ESC key press
 * @affects .nav__menu--open - Mobile menu
 * @affects .modal--open - Modal dialogs
 * @affects .lightbox--open - Image lightbox
 * 
 * @example
 * // JavaScript usage:
 * import { initEscapeKey } from './modules/escape-key.js';
 * initEscapeKey();
 * 
 * // Automatically handles:
 * // - ESC closes open mobile menu
 * // - ESC closes open modal
 * // - ESC closes open lightbox
 * 
 * @accessibility
 * - Standard ESC key behavior expected by users
 * - Works with screen readers and keyboard navigation
 * - Updates aria-expanded attributes appropriately
 */

/**
 * Initializes global ESC key handler
 * Sets up single keydown listener to handle all ESC key presses
 * 
 * @function initEscapeKey
 * @returns {void}
 * 
 * @description
 * Priority order when ESC is pressed:
 * 1. Close mobile menu (if open)
 * 2. Close modal (if open)
 * 3. Close lightbox (if open)
 * 
 * State restoration:
 * - Removes --open modifier classes
 * - Restores body overflow (re-enables scrolling)
 * - Updates aria-expanded for mobile menu toggle
 * - Removes modal-open class from body
 */
export function initEscapeKey() {
    document.addEventListener('keydown', function (e) {
        // Only handle ESC key
        if (e.key !== 'Escape') return;

        // PRIORITY 1: Close mobile menu
        const menu = document.querySelector('.nav__menu--open');
        if (menu) {
            menu.classList.remove('nav__menu--open');
            const toggle = document.querySelector('.nav__toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        }

        // PRIORITY 2: Close modal
        const openModal = document.querySelector('.modal--open');
        if (openModal) {
            openModal.classList.remove('modal--open');
            document.body.classList.remove('modal-open');
            document.body.style.overflow = ''; // Restore scrolling
        }

        // PRIORITY 3: Close lightbox
        const openLightbox = document.querySelector('.lightbox--open');
        if (openLightbox) {
            openLightbox.classList.remove('lightbox--open');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}