// ==========================================
// MAIN JAVASCRIPT
// Core functionality - all event listeners
// ==========================================

(function() {
    'use strict';
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.nav__toggle');
        const menuItems = document.querySelector('.nav__menu');
        
        if (menuToggle && menuItems) {
            menuToggle.addEventListener('click', function() {
                menuItems.classList.toggle('nav__menu--open');
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = menuToggle.contains(event.target) || menuItems.contains(event.target);
                
                if (!isClickInside && menuItems.classList.contains('nav__menu--open')) {
                    menuItems.classList.remove('nav__menu--open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && menuItems.classList.contains('nav__menu--open')) {
                    menuItems.classList.remove('nav__menu--open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // ==========================================
    // Smart Header (Hide on scroll down)
    // ==========================================
    function initSmartHeader() {
        const header = document.querySelector('.nav');
        if (!header) return;
        
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= scrollThreshold) {
                header.classList.remove('nav--hidden');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('nav--hidden')) {
                header.classList.add('nav--hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('nav--hidden')) {
                header.classList.remove('nav--hidden');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }
    
    // ==========================================
    // External Links
    // ==========================================
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(function(link) {
            if (link.hostname === window.location.hostname) return;
            
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    
    // ==========================================
    // Smooth Scroll
    // ==========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // ==========================================
    // Copy Code Button
    // ==========================================
    function initCopyCode() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(function(codeBlock) {
            const pre = codeBlock.parentElement;
            const button = document.createElement('button');
            button.className = 'code-copy-btn';
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            button.addEventListener('click', function() {
                navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                    button.textContent = 'Copied!';
                    button.classList.add('code-copy-btn--success');
                    
                    setTimeout(function() {
                        button.textContent = 'Copy';
                        button.classList.remove('code-copy-btn--success');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                    button.textContent = 'Error';
                });
            });
            
            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }
    
    // ==========================================
    // Image Lightbox
    // ==========================================
    function initLightbox() {
        const triggers = document.querySelectorAll('.lightbox-trigger');
        if (triggers.length === 0) return;
        
        // Create lightbox element
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
        
        // Open lightbox
        triggers.forEach(function(trigger) {
            trigger.style.cursor = 'pointer';
            trigger.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightbox.classList.add('lightbox--open');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox - button
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';
        });
        
        // Close lightbox - backdrop click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
                lightbox.classList.remove('lightbox--open');
                document.body.style.overflow = '';
            }
        });
        
        // Close lightbox - ESC key (handled in initEscapeKey)
    }
    
    // ==========================================
    // Modals
    // ==========================================

function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(function(modal) {
        const closeBtn = modal.querySelector('.modal__close');
        const openBtns = document.querySelectorAll(`[data-modal="${modal.id}"]`);
        const closeBtns = modal.querySelectorAll('[data-action="close-modal"]');
        
        // Open modal
        openBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('modal--open');
                document.body.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal - X button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeModal(modal);
            });
        }
        
        // Close modal - Cancel buttons
        closeBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                closeModal(modal);
            });
        });
        
        // Close modal - backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Helper function to close modal
    function closeModal(modal) {
        modal.classList.remove('modal--open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
}
    
    // ==========================================
    // Accordions
    // ==========================================

function initAccordions() {
    const toggles = document.querySelectorAll('.accordion__toggle');
    
    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const icon = this.querySelector('.accordion__icon');
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle content
            if (content && content.classList.contains('accordion__content')) {
                if (isExpanded) {
                    // Closing
                    content.style.display = 'none';
                    if (icon) icon.textContent = '+';
                } else {
                    // Opening
                    content.style.display = 'block';
                    if (icon) icon.textContent = '−';
                    
                    // Smooth scroll into view if needed
                    setTimeout(function() {
                        const rect = toggle.getBoundingClientRect();
                        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                        
                        if (!isVisible) {
                            toggle.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'nearest' 
                            });
                        }
                    }, 100);
                }
            }
        });
    });
}
    
    // ==========================================
    // Global ESC Key Handler
    // ==========================================

function initEscapeKey() {
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape') return;
        
        // Close mobile menu
        const menu = document.querySelector('.nav__menu--open');
        if (menu) {
            menu.classList.remove('nav__menu--open');
            const toggle = document.querySelector('.nav__toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
        
        // Close modals
        const openModal = document.querySelector('.modal--open');
        if (openModal) {
            openModal.classList.remove('modal--open');
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
        }
        
        // Close lightbox
        const openLightbox = document.querySelector('.lightbox--open');
        if (openLightbox) {
            openLightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';
        }
    });
}
    
    function initCookie() {
      document.addEventListener("DOMContentLoaded", function () {
        const cookieLink = document.getElementById("cookie-settings-link");

        if (cookieLink) {
          cookieLink.addEventListener("click", function (e) {
                e.preventDefault();

            if (window.cookieconsent && window.cookieconsent.showPreferences) {
              window.cookieconsent.showPreferences();
            }
          });
        }
      });
    };


    // ==========================================
    // Initialize All
    // ==========================================
    function init() {
        initMobileMenu();
        initSmartHeader();
        initExternalLinks();
        initSmoothScroll();
        initCopyCode();
        initLightbox();   
        initModals();
        initAccordions();
        initEscapeKey();
        initCookie()
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==========================================
// Modal Helper Functions (Global)
// ==========================================
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('modal--open');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
};
    
})();