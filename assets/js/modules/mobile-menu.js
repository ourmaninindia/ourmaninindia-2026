/**
 * Mobile Menu Module
 * 
 * Hamburger menu toggle for mobile navigation.
 * Handles open/close via button, outside click, and ESC key.
 * Updates aria-expanded for accessibility.
 * 
 * @module mobile-menu
 * @requires .nav__toggle - Hamburger button
 * @requires .nav__menu - Menu container
 * 
 * @example
 * // HTML structure:
 * // <nav class="nav">
 * //   <button class="nav__toggle" aria-expanded="false">
 * //     ☰
 * //   </button>
 * //   <div class="nav__menu">
 * //     <a href="/">Home</a>
 * //     <a href="/about">About</a>
 * //   </div>
 * // </nav>
 * 
 * // JavaScript usage:
 * import { initMobileMenu } from './modules/mobile-menu.js';
 * initMobileMenu();
 * 
 * @accessibility
 * - aria-expanded attribute tracks open/closed state
 * - Keyboard accessible (Space/Enter on button)
 * - ESC key closes menu
 * - Focus management for screen readers
 */

/**
 * Initializes mobile menu toggle functionality
 * Sets up hamburger button, outside click, and ESC key handlers
 * 
 * @function initMobileMenu
 * @returns {void}
 * 
 * @description
 * Open/Close triggers:
 * 1. Click hamburger button: toggles menu
 * 2. Click outside menu: closes menu
 * 3. Press ESC key: closes menu
 * 
 * State management:
 * - Adds/removes .nav__menu--open class
 * - Updates aria-expanded="true"/"false"
 * 
 * Note: This module includes its own ESC handler. Consider
 * consolidating with global escape-key module if needed.
 */
export function initMobileMenu() {
    const menuToggle = document.querySelector('.nav__toggle');
    const menuItems = document.querySelector('.nav__menu');

    // Early exit if required elements missing
    if (!menuToggle || !menuItems) return;

    /**
     * Toggle menu on hamburger click
     * Toggles --open class and aria-expanded attribute
     */

    menuToggle.addEventListener('click', function () {
        menuItems.classList.toggle('nav__menu--open');

        // Update aria-expanded for accessibility
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    /**
     * Close menu when clicking outside
     * Detects clicks outside both toggle button and menu
     */

    document.addEventListener('click', function (event) {
        const isClickInside = menuToggle.contains(event.target) ||
            menuItems.contains(event.target);

        // If click is outside menu and menu is open, close it
        if (!isClickInside && menuItems.classList.contains('nav__menu--open')) {
            menuItems.classList.remove('nav__menu--open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    /**
     * Close menu on ESC key press
     * Only closes if menu is currently open
     * 
     * Note: Duplicates escape-key module functionality.
     * Consider using only the global handler instead.
     */

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuItems.classList.contains('nav__menu--open')) {
            menuItems.classList.remove('nav__menu--open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close the menu when the theme toggle is clicked
    const themeToggle = document.getElementById('theme-toggle'); 
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            menuItems.classList.remove('nav__menu--open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    }
}