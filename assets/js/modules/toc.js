/**
 * Table of Contents Module
 * 
 * Provides collapsible TOC and automatic highlighting of current section.
 * Uses IntersectionObserver to track which heading is currently visible.
 * 
 * @module toc
 * @requires .toc container in DOM
 * @requires .toc__toggle button for collapse/expand
 * @requires #tocNav for the navigation list
 * @requires .post__body h2/h3/h4 for observed headings
 * 
 * @example
 * // Used on blog posts with table of contents
 * // HTML structure in sidebar:
 * // <aside class="toc">
 * //   <button class="toc__toggle">
 * //     <span class="toc__toggle-icon">−</span>
 * //   </button>
 * //   <nav id="tocNav">
 * //     <a href="#heading-1">Heading 1</a>
 * //   </nav>
 * // </aside>
 */

/**
 * Initializes all TOC features (toggle and active section tracking)
 * 
 * @function initTOC
 * @returns {void}
 */

export function initTOC() {
    const toc = document.querySelector('.toc');
    if (!toc) return;
    
    initTOCToggle();
    initTOCActiveSection();
}

/**
 * Handles TOC collapse/expand functionality
 * Toggles visibility of TOC navigation on button click
 * 
 * @private
 * @function initTOCToggle
 * @returns {void}
 */

function initTOCToggle() {
    const tocNav = document.getElementById('tocNav');
    const toggleBtn = document.querySelector('.toc__toggle');
    const toggleIcon = document.querySelector('.toc__toggle-icon');
    
    if (!toggleBtn || !tocNav) return;
    
    let isExpanded = true;
    
    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        tocNav.classList.toggle('active');  // ✅ CSS controls display
        toggleIcon.textContent = isExpanded ? '−' : '+';
    });
}

/**
 * Tracks visible headings and highlights corresponding TOC links
 * Uses IntersectionObserver API for performance
 * 
 * @private
 * @function initTOCActiveSection
 * @returns {void}
 */

function initTOCActiveSection() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            const tocLink = document.querySelector(`.toc a[href="#${id}"]`);
            
            if (tocLink) {
                if (entry.intersectionRatio > 0) {
                    tocLink.classList.add('toc__link--active');
                } else {
                    tocLink.classList.remove('toc__link--active');
                }
            }
        });
    }, { 
        // Trigger when heading enters the top 20% of viewport
        rootMargin: '-20% 0px -80% 0px' 
    });
    
    // Observe all main content headings
    document.querySelectorAll('.post__body h2, .post__body h3, .post__body h4')
        .forEach(heading => observer.observe(heading));
}