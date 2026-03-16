// see the cookie-consent.html partial

export function initCookie() {
    document.addEventListener("DOMContentLoaded", function () {
        const cookieBtn = document.getElementById("cookie-settings-btn");

        if (cookieBtn) {
            cookieBtn.addEventListener("click", function (e) {
                e.preventDefault();

                if (window.cookieconsent && window.cookieconsent.showPreferences) {
                    window.cookieconsent.showPreferences();
                }
            });
        }
    });
};