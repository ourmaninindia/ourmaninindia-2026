// ==========================================
// MAIN.JS — CRITICAL CORE ONLY
// Loads on every page, immediately
// ==========================================

import { initThemeToggle }   from './modules/darkmode.js';
import { initMobileMenu }    from './modules/mobile-menu.js';
import { initSmartHeader }   from './modules/smart-header.js';
import { initEscapeKey }     from './modules/escape-key.js';
import { initExternalLinks } from './modules/external-links.js';
import { initCookie }        from './modules/cookie-consent.js';
import { initSmoothScroll }  from './modules/smooth-scroll.js';

// Firefox flash-of-style fix
if (document.documentElement.hasAttribute('style')) {
    document.documentElement.removeAttribute('style');
}

function init() {
    initThemeToggle();    // must be first — prevents theme flash
    initMobileMenu();
    initSmartHeader();
    initEscapeKey();
    initExternalLinks();
    initCookie();
    initSmoothScroll();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Global modal helpers (used site-wide via onclick attributes)
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
