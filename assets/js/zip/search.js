// ==========================================
// SEARCH.JS — SEARCH PAGE ONLY
// Deferred — loads only on search page
// ==========================================

import { initSearch } from './modules/search.js';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}
