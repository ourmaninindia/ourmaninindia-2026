/**
 * Smart Header Module
 * 
 * Hides navigation header when scrolling down, shows when scrolling up.
 * Improves reading experience by maximizing content area while scrolling.
 * Always shows header when near top of page (within threshold).
 * 
 * @module smart-header
 * @requires .nav - Header/navigation element
 * @requires .nav--hidden - CSS class that hides header
 * 
 * @example
 * // HTML structure:
 * // <nav class="nav">
 * //   <!-- navigation content -->
 * // </nav>
 * 
 * // CSS:
 * // .nav {
 * //   position: fixed;
 * //   top: 0;
 * //   transition: transform 0.3s;
 * // }
 * // .nav--hidden {
 * //   transform: translateY(-100%);
 * // }
 * 
 * // JavaScript usage:
 * import { initSmartHeader } from './modules/smart-header.js';
 * initSmartHeader();
 * 
 * @ux
 * - Scroll down: header slides up (out of view)
 * - Scroll up: header slides down (back into view)
 * - Near top: header always visible (within 100px threshold)
 * - Provides more reading space while maintaining easy navigation access
 */

/**
 * Initializes smart header hide/show behavior
 * Tracks scroll direction and toggles header visibility
 * 
 * @function initSmartHeader
 * @returns {void}
 * 
 * @description
 * Behavior rules:
 * 1. If scrolled < 100px from top: always show header
 * 2. If scrolling down: hide header
 * 3. If scrolling up: show header
 * 
 * Constants:
 * - scrollThreshold: 100px - Always show header above this point
 * 
 * State tracking:
 * - lastScroll: Previous scroll position for direction detection
 * - currentScroll: Current scroll position
 * 
 * Performance:
 * - Passive event listener (won't call preventDefault)
 * - Simple class toggle (GPU-accelerated transform via CSS)
 */
export function initSmartHeader() {
    const header = document.querySelector('.nav');
    
    // Early exit if header element doesn't exist
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100; // Always show header within 100px of top

    /**
     * Scroll event handler
     * Compares current vs last scroll position to determine direction
     */
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // RULE 1: Always show header near top of page
        if (currentScroll <= scrollThreshold) {
            header.classList.remove('nav--hidden');
            return;
        }

        // RULE 2: Hide header when scrolling down
        if (currentScroll > lastScroll && !header.classList.contains('nav--hidden')) {
            header.classList.add('nav--hidden');
        } 
        // RULE 3: Show header when scrolling up
        else if (currentScroll < lastScroll && header.classList.contains('nav--hidden')) {
            header.classList.remove('nav--hidden');
        }

        // Store current position for next comparison
        lastScroll = currentScroll;
    }, { passive: true }); // Passive: improves scroll performance
}