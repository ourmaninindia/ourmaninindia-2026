/**
 * Image Lightbox Module
 * 
 * Full-screen image viewer that opens when clicking images with .lightbox-trigger class.
 * Dynamically creates lightbox overlay on first load.
 * Supports keyboard (ESC), click-to-close, and close button.
 * 
 * @module lightbox
 * @requires .lightbox-trigger class on clickable images
 * @see escape-key.js - Handles ESC key to close
 * 
 * @example
 * // HTML structure:
 * // <img src="photo.jpg" alt="Description" class="lightbox-trigger" />
 * 
 * // Lightbox is auto-created:
 * // <div class="lightbox">
 * //   <button class="lightbox__close">×</button>
 * //   <div class="lightbox__content">
 * //     <img class="lightbox__image" src="" alt="">
 * //   </div>
 * // </div>
 * 
 * // JavaScript usage:
 * import { initLightbox } from './modules/lightbox.js';
 * initLightbox();
 * 
 * @accessibility
 * - Close button has aria-label for screen readers
 * - Preserves image alt text for accessibility
 * - Keyboard navigation (ESC to close, handled by escape-key module)
 * - Disables body scroll when open to prevent background scrolling
 */

/**
 * Initializes image lightbox functionality
 * Creates lightbox element and sets up all event handlers
 * 
 * @function initLightbox
 * @returns {void}
 * 
 * @description
 * Features:
 * - Dynamically creates single lightbox element on page load
 * - Adds pointer cursor to all trigger images
 * - Click image: opens lightbox with full-size image
 * - Click close button: closes lightbox
 * - Click backdrop: closes lightbox
 * - ESC key: closes lightbox (via escape-key module)
 * 
 * Close methods:
 * 1. Close button (×)
 * 2. Click on lightbox backdrop
 * 3. Click on lightbox__content area
 * 4. ESC key (handled by initEscapeKey)
 */
export function initLightbox() {
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    // Early exit if no lightbox triggers found
    if (triggers.length === 0) return;

    // Create lightbox element dynamically (only once)
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox__close" aria-label="Close lightbox">×</button>
        <div class="lightbox__content">
            <img class="lightbox__image" src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox__image');
    const closeBtn = lightbox.querySelector('.lightbox__close');

    /**
     * Open lightbox on image click
     * Loads clicked image into lightbox and shows overlay
     */
    triggers.forEach(function (trigger) {
        // Visual indicator that image is clickable
        trigger.style.cursor = 'pointer';
        
        trigger.addEventListener('click', function () {
            // Load clicked image into lightbox
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            
            // Show lightbox and prevent body scroll
            lightbox.classList.add('lightbox--open');
            document.body.style.overflow = 'hidden';
        });
    });

    /**
     * Close lightbox via close button
     * Removes --open class and restores scrolling
     */
    closeBtn.addEventListener('click', function () {
        lightbox.classList.remove('lightbox--open');
        document.body.style.overflow = '';
    });

    /**
     * Close lightbox via backdrop click
     * Only closes if clicking on backdrop or content area (not image)
     */
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
            lightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';
        }
    });

    // Note: ESC key closing is handled by initEscapeKey module
}