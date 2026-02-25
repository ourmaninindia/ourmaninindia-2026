# JavaScript Modules

## Core Modules (Always Loaded)
- `mobile-menu.js` - Mobile navigation toggle
- `smart-header.js` - Hide header on scroll down
- `external-links.js` - Auto-add target="_blank" to external links
- `smooth-scroll.js` - Smooth scrolling for anchor links
- `copy-code.js` - Copy button for code blocks
- `archive-dropdown.js` - Archive navigation dropdown

## Content Modules (Loaded as Needed)
- `image-gallery.js` - Alternating image layout for `.image-gallery`
- `cycling-gallery.js` - Alternating image layout for `.cycling-gallery` (cycling posts)
- `code-tabs.js` - Tabbed interface for code examples
- `toc.js` - Table of contents toggle and active section tracking

## UI Components
- `lightbox.js` - Full-screen image viewer
- `modals.js` - Modal dialog functionality
- `accordions.js` - Collapsible content sections

## Utility Modules
- `cookie-consent.js` - Cookie consent banner integration
- `debug.js` - Development-only template info display

## Usage
```javascript
// Import in main.js
import { initImageGallery } from './modules/image-gallery.js';

// Initialize conditionally
if (document.querySelector('.image-gallery')) {
    initImageGallery();
}
```

## Adding New Modules

1. Create file in `assets/js/modules/`
2. Export main function(s)
3. Add JSDoc comments
4. Import and initialize in `main.js`
5. Update this README