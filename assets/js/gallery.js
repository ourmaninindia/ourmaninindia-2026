// ==========================================
// IMAGE GALLERY SCRIPTS
// Auto-alternating layout
// ==========================================

(function() {
  'use strict';
    
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleries);
  } else {
    initGalleries();
  }
    
 function init() {
    initImageGallery();
    initCyclingGallery();
    initTOCToggle();
    initTOCActiveSection();
    initCodeTabs(); 
}
    
  // ==========================================
  // Image Gallery (General)
  // ==========================================
  function initImageGallery() {
    const galleries = document.querySelectorAll('.image-gallery');
        
    galleries.forEach((container) => {
      const images = container.querySelectorAll('.post-image');
      let position = 0;
            
      images.forEach((img) => {
        if (img.classList.contains('post-image--wide')) {
          position = 0; // no images to show
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
    
  // ==========================================
  // Cycling Gallery
  // ==========================================
  function initCyclingGallery() {
    const galleries = document.querySelectorAll('.cycling-gallery');
        
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
    
  // ==========================================
// CODE TABS
// ==========================================
function initCodeTabs() {
    const tabContainers = document.querySelectorAll('.code-tabs');
    
    tabContainers.forEach(function(container) {
        const buttons = container.querySelectorAll('.code-tabs__button');
        const panels = container.querySelectorAll('.code-tabs__panel');
        
        buttons.forEach(function(button, index) {
            button.addEventListener('click', function() {
                // Remove active from all buttons and hide all panels
                buttons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                panels.forEach(function(panel) {
                    panel.style.display = 'none';
                });
                
                // Activate clicked button and show corresponding panel
                button.classList.add('active');
                if (panels[index]) {
                    panels[index].style.display = 'block';
                }
            });
        });
    });
}

  // ==========================================
  // Table of Contents Toggle
  // ==========================================
  function initTOCToggle() {
    const toc = document.querySelector('.toc');
    if (!toc) {
      return;
    }
        
    const tocNav = document.getElementById('tocNav');
    const toggleBtn = document.querySelector('.toc__toggle');
    const toggleIcon = document.querySelector('.toc__toggle-icon');
        
    if (!toggleBtn || !tocNav) {
      return;
    }
        
    // Store initial state
    let isExpanded = true;
        
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      tocNav.style.display = isExpanded ? 'block' : 'none';
      toggleIcon.textContent = isExpanded ? '−' : '+';
    });
  }
    
  // ==========================================
  // TOC Active Section Highlighting
  // ==========================================
  const observer = new IntersectionObserver(((entries) => {
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
  }), { 
    rootMargin: '-20% 0px -80% 0px' 
  });
    
  // Observe all headings in post body
  document.querySelectorAll('.post__body h2, .post__body h3, .post__body h4').forEach((heading) => {
    observer.observe(heading);
  });
    
})();