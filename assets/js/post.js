// ==========================================
// POST.JS — SINGLE POST/PAGE ONLY
// Deferred — loads only on single posts
// ==========================================

import { initComments }      from './modules/comments.js';
import { initProgressBar }   from './modules/reading-progress.js';
import { initTOC }           from './modules/toc.js';
import { initLightbox }      from './modules/lightbox.js';
import { initImageGallery }  from './modules/image-gallery.js';
import { initCopyCode }      from './modules/copy-code.js';
import { initCodeTabs }      from './modules/code-tabs.js';
import { initAccordions }    from './modules/accordions.js';
import { initModals }        from './modules/modals.js';

function init() {
    initProgressBar();
    initTOC();
    initLightbox();
    initImageGallery();
    initCopyCode();
    initCodeTabs();
    initAccordions();
    initModals();
    initComments();   // last — least critical
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
