/**
 * External Links Module
 * 
 * Automatically adds target="_blank" and security attributes to external links.
 * Prevents tabnabbing attacks with rel="noopener noreferrer".
 * Only affects links to different domains (leaves internal links unchanged).
 * 
 * @module external-links
 * @requires a[href^="http"] - Links starting with http/https
 * 
 * @example
 * // Before:
 * // <a href="https://example.com">External Site</a>
 * 
 * // After (automatically modified):
 * // <a href="https://example.com" target="_blank" rel="noopener noreferrer">
 * //   External Site
 * // </a>
 * 
 * // JavaScript usage:
 * import { initExternalLinks } from './modules/external-links.js';
 * initExternalLinks();
 * 
 * @security
 * - rel="noopener" prevents new page from accessing window.opener
 * - rel="noreferrer" prevents sending referrer information
 * - Protects against tabnabbing attacks
 * - See: https://owasp.org/www-community/attacks/Reverse_Tabnabbing
 * 
 * @accessibility
 * - Opens external links in new tab (expected behavior)
 * - Screen readers announce "opens in new window"
 * - Users can override with Shift+Click to open in same tab
 */

/**
 * Initializes external link handling
 * Adds target="_blank" and security attributes to all external links
 * 
 * @function initExternalLinks
 * @returns {void}
 * 
 * @description
 * Detection logic:
 * - Finds all links starting with http:// or https://
 * - Compares link hostname to current hostname
 * - If different: adds target="_blank" and rel="noopener noreferrer"
 * - If same: leaves unchanged (internal link)
 * 
 * Examples:
 * - https://example.com → External (modified)
 * - https://yourdomain.com → Internal (unchanged)
 * - /blog/post → Internal (unchanged, relative URL)
 * - #anchor → Internal (unchanged, hash link)
 */
export function initExternalLinks() {
    // Find all links with absolute URLs (http/https)
    const links = document.querySelectorAll('a[href^="http"]');
    
    // Early exit if no external links found
    if (links.length === 0) return;

    links.forEach(function (link) {
        // Skip if link is to same domain (internal link)
        if (link.hostname === window.location.hostname) return;

        // External link: add target and security attributes
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}