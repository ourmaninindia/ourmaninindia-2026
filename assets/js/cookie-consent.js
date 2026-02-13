import * as CookieConsent from './cookieconsent.esm.js';

function initCookieConsent() {
  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom right',
        equalWeightButtons: false,
        flipButtons: false
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        equalWeightButtons: false,
        flipButtons: false
      }
    },

    categories: {
      necessary: {
        readOnly: true,
        enabled: true
      },
      analytics: {
        autoClear: {
          cookies: [
            { name: /^_ga/ },
            { name: '_gid' }
          ]
        }
      }
    },

    language: {
      default: document.documentElement.lang || 'en',
      autoDetect: 'browser',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description: 'We use cookies to enhance your browsing experience.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences'
          }
        }
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}
