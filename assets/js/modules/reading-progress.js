/**
 * Reading Progress Bar Module
 * 
 * Displays a visual progress bar showing how far user has scrolled through content.
 * Typically shown at top of page as a thin horizontal bar that fills as user scrolls.
 * Uses requestAnimationFrame for smooth, performance-optimized updates.
 * 
 * @module reading-progress
 * @requires .reading-progress__bar - Progress bar element
 * 
 * @example
 * // HTML structure:
 * // <div class="reading-progress">
 * //   <div class="reading-progress__bar"></div>
 * // </div>
 * 
 * // CSS (position at top of page):
 * // .reading-progress {
 * //   position: fixed;
 * //   top: 0;
 * //   left: 0;
 * //   width: 100%;
 * //   height: 4px;
 * //   background: #eee;
 * //   z-index: 9999;
 * // }
 * // .reading-progress__bar {
 * //   height: 100%;
 * //   width: 0%;
 * //   background: var(--color-primary);
 * //   transition: width 0.1s;
 * // }
 * 
 * // JavaScript usage:
 * import { initProgressBar } from './modules/reading-progress.js';
 * if (document.querySelector('.reading-progress__bar')) {
 *     initProgressBar();
 * }
 * 
 * @performance
 * - Uses requestAnimationFrame for smooth 60fps updates
 * - Throttles scroll events to prevent excessive calculations
 * - Passive event listener for better scroll performance
 * 
 * @see Used on blog posts and long-form content pages
 */

/**
 * Initializes reading progress bar
 * Sets up scroll listener with performance optimizations
 * 
 * @function initProgressBar
 * @returns {void}
 * 
 * @description
 * Calculation:
 * - Scroll position: how far user has scrolled
 * - Total height: document height minus viewport height
 * - Progress %: (scrolled / total) × 100
 * 
 * Performance optimizations:
 * - requestAnimationFrame: syncs with browser repaint (60fps)
 * - Ticking flag: prevents multiple RAF calls per frame
 * - Passive listener: tells browser scroll won't call preventDefault
 * 
 * Updates:
 * - On scroll: throttled via RAF
 * - On load: initial progress calculation
 */

export function initProgressBar() {
  'use strict';
    
  const longReadingPages = ['page-blog', 'page-cycling', 'page-tech', 'section-about', 'page-legal'];
  
  if (!longReadingPages.some(cls => document.body.classList.contains(cls))) return;

  const progressBar = document.querySelector('.reading-progress__bar');
  if (!progressBar) return;

  /**
   * Calculates and updates progress bar width
   * 
   * @private
   * @function updateProgressBar
   * @returns {void}
   * 
   * @description
   * Calculation breakdown:
   * - winScroll: current scroll position from top
   * - height: total scrollable height (document - viewport)
   * - scrolled: percentage of page scrolled (0-100)
   */

  function updateProgressBar() {
    // Get current scroll position (cross-browser)
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    
    // Calculate total scrollable height
    const height = document.documentElement.scrollHeight - 
                   document.documentElement.clientHeight;
    
    // Calculate scroll percentage
    const scrolled = (winScroll / height) * 100;
        
    // Update progress bar width
    progressBar.style.width = `${scrolled}%`;
  }
    
  /**
   * Throttle scroll events using requestAnimationFrame
   * Ensures smooth updates while preventing excessive calculations
   * 
   * Pattern: RAF throttling with ticking flag
   * - First scroll: schedules RAF, sets ticking=true
   * - Subsequent scrolls: ignored while ticking=true
   * - RAF callback: runs update, sets ticking=false
   * - Result: Maximum one update per frame (60fps)
   */
  
  let ticking = false;
    
  window.addEventListener('scroll', () => {
    if (!ticking) {
      // Schedule update on next animation frame
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false; // Allow next scroll event to schedule RAF
      });
      ticking = true; // Prevent additional RAF calls this frame
    }
  }, { passive: true }); // Passive: won't call preventDefault
    
  // Calculate initial progress on page load
  updateProgressBar();
}