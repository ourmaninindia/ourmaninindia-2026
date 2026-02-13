// ==========================================
// READING PROGRESS BAR
// ==========================================

(function() {
  'use strict';
    
  const progressBar = document.querySelector('.reading-progress__bar');
    
  if (!progressBar) {
    return;
  }
    
  function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
        
    progressBar.style.width = `${scrolled  }%`;
  }
    
  // Throttle scroll events for performance
  let ticking = false;
    
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
    
  // Initial update
  updateProgressBar();
    
})();