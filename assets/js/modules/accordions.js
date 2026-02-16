/**
 * Accordions Module
 * 
 * Provides collapsible/expandable accordion functionality.
 * Manages toggle state, aria attributes, and auto-scrolling to visible area.
 * Icons automatically update (+ for closed, − for open).
 * 
 * @module accordions
 * @requires .accordion__toggle - Button/heading to click
 * @requires .accordion__content - Content to show/hide (must be next sibling)
 * @optional .accordion__icon - Icon element that shows +/−
 * 
 * @example
 * // HTML structure:
 * // <div class="accordion">
 * //   <button class="accordion__toggle" aria-expanded="false">
 * //     <span class="accordion__icon">+</span>
 * //     Section Title
 * //   </button>
 * //   <div class="accordion__content" style="display: none;">
 * //     Content here...
 * //   </div>
 * // </div>
 * 
 * // JavaScript usage:
 * import { initAccordions } from './modules/accordions.js';
 * initAccordions();
 * 
 * @accessibility
 * - Uses aria-expanded attribute for screen readers
 * - Auto-scrolls newly opened accordion into view if off-screen
 * - Keyboard accessible (works with Enter/Space on buttons)
 */

/**
 * Initializes accordion toggle functionality
 * Sets up click handlers for all accordion toggles on the page
 * 
 * @function initAccordions
 * @returns {void}
 * 
 * @description
 * Features:
 * - Toggle content visibility on click
 * - Update aria-expanded attribute
 * - Switch icon between + (closed) and − (open)
 * - Auto-scroll into view when opening if partially off-screen
 * - 100ms delay before scroll to allow content to render
 */
export function initAccordions() {
    const toggles = document.querySelectorAll('.accordion__toggle');
    
    // Early exit if no accordions found
    if (toggles.length === 0) return;

    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            // Get the content panel (must be next sibling element)
            const content = this.nextElementSibling;
            
            // Check current state
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Get icon element if present
            const icon = this.querySelector('.accordion__icon');

            // Toggle aria-expanded attribute for accessibility
            this.setAttribute('aria-expanded', !isExpanded);

            // Toggle content visibility
            if (content && content.classList.contains('accordion__content')) {
                if (isExpanded) {
                    // CLOSING accordion
                    content.style.display = 'none';
                    if (icon) icon.textContent = '+';
                } else {
                    // OPENING accordion
                    content.style.display = 'block';
                    if (icon) icon.textContent = '−'; // Minus sign

                    // Auto-scroll into view if accordion is partially off-screen
                    // 100ms delay allows content to render and calculate height
                    setTimeout(function () {
                        const rect = toggle.getBoundingClientRect();
                        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                        if (!isVisible) {
                            toggle.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest' // Scroll minimum amount needed
                            });
                        }
                    }, 100);
                }
            }
        });
    });
}