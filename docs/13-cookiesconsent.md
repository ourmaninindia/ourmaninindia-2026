# Cookie Consent Implementation

## Overview

This document describes the cookie consent setup for *Our Man in India*, built using [vanilla-cookieconsent v3](https://github.com/orestbida/cookieconsent). The implementation is GDPR-compliant, privacy-focused, and fully self-hosted.

---

## Architecture

### Files

| File | Location | Purpose |
|------|----------|---------|
| `cookie-consent.html` | `layouts/partials/` | Main partial — loads CSS, runs CookieConsent.run() config |
| `cookie-consent.js` | `assets/js/modules/` | Handles footer button click event |
| `cookieconsent.esm.js` | `static/js/` | Self-hosted CookieConsent ESM library |
| `cookieconsent.css` | `static/css/` | Self-hosted CookieConsent base styles |
| `_cookieconsent.scss` | `assets/scss/overrides/` | Custom style overrides |

### How It Fits Together

```
baseof.html
  └── partial "cookie-consent.html"
        ├── loads /css/cookieconsent.css (static)
        ├── imports /js/cookieconsent.esm.js (static)
        └── runs CookieConsent.run({ ... })
            ├── categories: necessary, analytics, marketing
            ├── language: en, fr translations
            └── onAccept: loads Google Analytics dynamically

footer.html
  └── #cookie-settings-btn
        └── cookie-consent.js addEventListener → showPreferences()
```

---

## Self-Hosting

Both the JavaScript library and CSS are served locally from `static/` rather than loaded from a CDN.

### Why Self-Host?

**Privacy** — When loading from a CDN like jsdelivr.net, every visitor's browser makes a request to a third-party server before they have consented to anything. That request contains the visitor's IP address and browser fingerprint. Self-hosting eliminates this entirely.

**GDPR compliance** — No third-party requests are made without user consent. This is especially relevant since the site is hosted in the Netherlands and serves EU visitors.

**Reliability** — The site works even if the CDN is down or slow. There is no external dependency for a critical privacy component.

**Version control** — The exact tested version is locked in. CDN URLs like `@3` can silently serve newer versions that introduce breaking changes.

**Performance** — One less DNS lookup, TLS handshake and external connection on every page load.

### How to Update

When a new version of vanilla-cookieconsent is released:

```bash
# Download new versions
curl -o static/css/cookieconsent.css https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3/dist/cookieconsent.css
curl -o static/js/cookieconsent.esm.js https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3/dist/cookieconsent.esm.js
```

Test thoroughly before deploying as the CSS variable names or JS API may have changed.

---

## Google Analytics Integration

Google Analytics is loaded **only after the user explicitly accepts analytics cookies**. It is never loaded on page load without consent.

```javascript
services: {
    ga: {
        onAccept: () => { loadGoogleAnalytics(); },
        onReject: () => { /* GA not loaded */ }
    }
}
```

The `loadGoogleAnalytics()` function:
1. Checks if GA is already loaded to avoid duplicates
2. Dynamically injects the GA script tag
3. Initialises `gtag()` with `anonymize_ip: true`

If a returning visitor has previously accepted analytics, GA loads immediately on page load via:

```javascript
if (CookieConsent.acceptedCategory('analytics')) {
    loadGoogleAnalytics();
}
```

### GA ID Configuration

The GA measurement ID is stored in `params.toml`:

```toml
googleAnalytics = "G-XXXXXXXXXX"
```

And referenced in the partial via Hugo:

```javascript
script.src = 'https://www.googletagmanager.com/gtag/js?id={{ .Site.Params.googleAnalytics }}';
```

---

## Categories

| Category | Default | ReadOnly | Purpose |
|----------|---------|----------|---------|
| `necessary` | enabled | yes | Essential site functionality |
| `analytics` | disabled | no | Google Analytics 4 |
| `marketing` | disabled | no | Reserved for future use |

Marketing cookies are configured but disabled (`enabled: false`). They are kept in the config for future use but will not appear active until explicitly enabled.

---

## Styling

Base styles come from `static/css/cookieconsent.css` (self-hosted, untouched vendor file).

The only reason to put it in assets/ would be if you wanted Hugo to fingerprint it for cache busting — but since you're overriding it in your own SCSS anyway, that's not necessary.

Overrides are in `assets/scss/overrides/_cookieconsent.scss`:

```scss
#cc-main {
    --cc-toggle-on-bg: #22c55e;      /* green when accepted */
    --cc-toggle-off-bg: #ef4444;     /* red when rejected */
    --cc-btn-primary-bg: var(--color-primary);
    --cc-font-family: var(--font-family-base);
}
```

Key overrides:
- Toggle colours changed to green/red for clear accept/reject feedback
- Button colours aligned with site's design system via CSS variables
- `text-indent` used on section titles to shift text without affecting absolute-positioned toggle elements
- `margin-right` on badges to balance the layout

---

## Footer Button

The cookie preferences button in the footer reopens the preferences modal:

```html
<button type="button" id="cookie-settings-btn" class="button button--small button--secondary">
    🍪
</button>
```

The click handler is in `assets/js/modules/cookie-consent.js`:

```javascript
export function initCookie() {
    const cookieBtn = document.getElementById('cookie-settings-btn');
    if (cookieBtn) {
        cookieBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.cookieconsent && window.cookieconsent.showPreferences) {
                window.cookieconsent.showPreferences();
            }
        });
    }
}
```

---

## Languages

Translations are configured for English (`en`) and French (`fr`) inside `cookie-consent.html`. The language is auto-detected from the browser:

```javascript
language: {
    default: "{{ .Site.Language.Lang }}",
    autoDetect: "browser"
}
```

---

## The cc_cookie

The `cc_cookie` is a necessary cookie that stores consent preferences. It is never deleted — its `categories` array updates to reflect the user's choices:

- After **Accept all**: `["necessary", "analytics"]`
- After **Reject all**: `["necessary"]`

This cookie is documented in the site's privacy policy.