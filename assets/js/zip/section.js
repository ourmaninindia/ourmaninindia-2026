// ==========================================
// SECTION.JS — LIST/SECTION PAGES ONLY
// Deferred — loads only on list pages
// ==========================================

import { initArchive }         from './modules/archive-dropdown.js';
import { initPagination }      from './modules/pagination.js';
import { initCyclingGallery }  from './modules/cycling-gallery.js';

function init() {
    initArchive();
    initPagination();
    initCyclingGallery();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
