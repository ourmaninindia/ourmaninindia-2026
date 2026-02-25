// ==========================================
// MAIN JAVASCRIPT
// Core functionality - all event listeners
// ==========================================

// Import all modules
import { initAccordions }     from './modules/accordions.js';
import { initArchive }        from './modules/archive-dropdown.js';
import { initCookie }         from './modules/cookie-consent.js';
import { initCodeTabs }       from './modules/code-tabs.js';
import { initCopyCode }       from './modules/copy-code.js';
import { initCyclingGallery } from './modules/cycling-gallery.js';
import { initDebug }          from './modules/debug.js';
import { initEscapeKey }      from './modules/escape-key.js';
import { initExternalLinks }  from './modules/external-links.js';
import { initForms }          from './modules/forms.js';
import { initImageGallery }   from './modules/image-gallery.js';
import { initLightbox }       from './modules/lightbox.js';
import { initMobileMenu }     from './modules/mobile-menu.js';
import { initModals }         from './modules/modals.js';
import { initNewsletterForm } from './modules/newsletter.js';
import { initProgressBar }    from './modules/reading-progress.js';
import { initPagination }     from './modules/pagination.js';
import { initSearch }         from './modules/search.js';
import { initSmartHeader }    from './modules/smart-header.js';
import { initSmoothScroll }   from './modules/smooth-scroll.js';
import { initThemeToggle }    from './modules/darkmode.js';
import { initTOC }            from './modules/toc.js';



// Firefox fix
if (document.documentElement.hasAttribute('style')) {
    document.documentElement.removeAttribute('style');
}

// Initialize all
function init() {
    initAccordions();
    initArchive();
    initCookie();
    initCodeTabs();
    initCopyCode();
    initCyclingGallery();
    initDebug();
    initEscapeKey();
    initExternalLinks();
    initForms();
    initImageGallery();
    initLightbox();
    initMobileMenu();
    initModals();
    initNewsletterForm();
    initPagination();
    initProgressBar();
    initSearch()
    initSmartHeader();
    initSmoothScroll();
    initThemeToggle();
    initTOC();
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Global modal helpers
window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('modal--open');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal--open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
};