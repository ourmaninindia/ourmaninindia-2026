/**
 * Debug Panel Module
 * 
 * Development-only feature that displays current Hugo template information.
 * Only runs on localhost/development environments.
 * Shows which template is rendering the current page.
 * 
 * @module debug
 * @requires .display-template - Hidden element with template name
 * @requires #template-name - Target element to display info
 * @requires .debug-panel__toggle - Toggle button
 * @environment Development only (localhost, 127.0.0.1, port 1313)
 * 
 * @example
 * // Hugo template includes:
 * // <div class="display-template hidden">layouts/_default/single.html</div>
 * // 
 * // Debug panel in footer:
 * // <div class="debug-panel">
 * //   <button class="debug-panel__toggle">🐛</button>
 * //   <span id="template-name"></span>
 * // </div>
 * 
 * // JavaScript usage:
 * import { initDebug } from './modules/debug.js';
 * initDebug(); // Automatically checks if dev environment
 */

/**
 * Initializes debug panel for development
 * Extracts template name and enables panel toggle
 * Only runs in development environment
 * 
 * @function initDebug
 * @returns {void}
 * 
 * @description
 * Development detection:
 * - hostname === 'localhost'
 * - hostname === '127.0.0.1'
 * - port === '1313' (Hugo default)
 * 
 * Features:
 * - Displays current Hugo template name
 * - Toggle panel visibility on click
 * - Helps developers identify which template is rendering
 */

export function initDebug() {
   
    // Only run in development environment
    const isDev = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.port === '1313';

    if (!isDev) return;

    // Parse debug info from hidden template indicator
    const source = document.querySelector('.display-template');
    const target = document.getElementById('template-name');

    if (source && target) {
        const debugInfo = source.textContent.trim();
        target.textContent = debugInfo;
    }

    // Toggle debug panel visibility on click
    const toggle = document.querySelector('.debug-panel__toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            this.parentElement.classList.toggle('debug-panel--open');
        });
    }
}