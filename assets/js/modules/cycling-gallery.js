/**
 * Cycling Gallery Module
 * 
 * Alternates cycling photo positioning for visual variety in cycling blog posts.
 * Identical to image-gallery but targets .cycling-gallery containers.
 * 
 * @module cycling-gallery
 * @requires .cycling-gallery container in DOM
 * @requires .post-image class on images
 * @optional .post-image--wide class to reset alternation
 * 
 * @example
 * // Used in cycling/bike tour posts:
 * // <div class="cycling-gallery">
 * //   <img class="post-image" src="bike1.jpg" />
 * //   <img class="post-image" src="bike2.jpg" />
 * // </div>
 */

/**
 * Initializes cycling gallery alternating layout
 * Same logic as image gallery but for cycling-specific content
 * 
 * @function initCyclingGallery
 * @returns {void}
 */

export function initCyclingGallery() {
    const galleries = document.querySelectorAll('.cycling-gallery');
    if (galleries.length === 0) return; // Early exit

    galleries.forEach((container) => {
        const images = container.querySelectorAll('.post-image');
        let position = 0;
        
        images.forEach((img) => {
            if (img.classList.contains('post-image--wide')) {
                position = 0;
                return;
            }
            
            if (position % 2 === 0) {
                img.classList.add('post-image--left');
            } else {
                img.classList.add('post-image--right');
            }
            
            position++;
        });
    });
}