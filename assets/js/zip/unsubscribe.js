// ==========================================
// UNSUBSCRIBE.JS — UNSUBSCRIBE PAGE ONLY
// ==========================================

import { initUnsubscribe } from './modules/unsubscribe.js';
import { initForms }       from './modules/forms.js';

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initUnsubscribe();
        initForms();
    });
} else {
    initUnsubscribe();
    initForms();
}
