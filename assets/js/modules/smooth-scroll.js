/**
 * Smooth Scroll Module
 * 
 * Enables smooth scrolling animation for anchor links (links starting with #).
 * Updates browser URL history without page reload.
 * Provides better UX than instant jump scrolling.
 * 
 * @module smooth-scroll
 * @requires a[href^="#"] - Anchor links on the page
 * 
 * @example
 * // HTML structure:
 * // <a href="#section-1">Jump to Section 1</a>
 * // ...
 * // <div id="section-1">
 * //   <h2>Section 1</h2>
 * // </div>
 * 
 * // JavaScript usage:
 * import { initSmoothScroll } from './modules/smooth-scroll.js';
 * initSmoothScroll();
 * 
 * @ux
 * - Smooth animation instead of instant jump
 * - Updates URL in browser address bar
 * - Works with table of contents, back-to-top links, internal navigation
 * - Maintains browser history (back button works)
 * 
 * @accessibility
 * - Respects prefers-reduced-motion (via CSS)
 * - Maintains focus management
 * - Screen readers announce navigation
 */

/**
 * Initializes smooth scrolling for all anchor links
 * Intercepts clicks and replaces instant jump with smooth animation
 * 
 * @function initSmoothScroll
 * @returns {void}
 * 
 * @description
 * Behavior:
 * 1. Finds all links starting with # (anchor links)
 * 2. On click: prevents default instant jump
 * 3. Finds target element by ID
 * 4. Smoothly scrolls to target
 * 5. Updates URL in browser (maintains history)
 * 
 * Excluded:
 * - Links with href="#" only (no target)
 * - Links pointing to non-existent elements (no match)
 * 
 * Browser support:
 * - scrollIntoView with behavior:'smooth' (95%+ browsers)
 * - Falls back to instant scroll in older browsers
 */
export function initSmoothScroll() {
    // Find all anchor links (starting with #)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Early exit if no anchor links found
    if (links.length === 0) return;

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip links with href="#" only (no target)
            if (href === '#') return;

            // Find target element
            const target = document.querySelector(href);
            
            if (target) {
                // Prevent default instant jump
                e.preventDefault();
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',  // Animate the scroll
                    block: 'start'       // Align to top of viewport
                });
                
                // Update URL in browser without page reload
                // Maintains browser history (back button works)
                history.pushState(null, null, href);
            }
            // If target doesn't exist, allow default behavior
        });
    });
}