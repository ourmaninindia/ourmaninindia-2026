/**
 * Image Gallery Module
 * 
 * Automatically alternates image positioning (left/right) in gallery containers.
 * Images marked as 'wide' reset the alternation pattern.
 * 
 * @module image-gallery
 * @requires .image-gallery container in DOM
 * @requires .post-image class on images
 * @optional .post-image--wide class for full-width images
 * 
 * @example
 * // HTML structure:
 * // <div class="image-gallery">
 * //   <img class="post-image" src="..." alt="..." />
 * //   <img class="post-image post-image--wide" src="..." alt="..." />
 * //   <img class="post-image" src="..." alt="..." />
 * // </div>
 * 
 * // JavaScript usage:
 * import { initImageGallery } from './modules/image-gallery.js';
 * initImageGallery();
 */

/**
 * Initializes image gallery alternating layout
 * Applies left/right positioning classes to gallery images
 * 
 * @function initImageGallery
 * @returns {void}
 */

export function initImageGallery() {
    const galleries = document.querySelectorAll('.image-gallery');
    if (galleries.length === 0) return; // Early exit

    galleries.forEach((container) => {
        const images = container.querySelectorAll('.post-image');
        let position = 0;
        
        images.forEach((img) => {
            // Wide images reset the position counter
            if (img.classList.contains('post-image--wide')) {
                position = 0;
                return;
            }
            
            // Alternate between left and right positioning
            if (position % 2 === 0) {
                img.classList.add('post-image--left');
            } else {
                img.classList.add('post-image--right');
            }
            
            position++;
        });
    });
}