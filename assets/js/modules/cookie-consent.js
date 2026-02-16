export function initCookie() {
    document.addEventListener("DOMContentLoaded", function () {
        const cookieLink = document.getElementById("cookie-settings-link");

        if (cookieLink) {
            cookieLink.addEventListener("click", function (e) {
                e.preventDefault();

                if (window.cookieconsent && window.cookieconsent.showPreferences) {
                    window.cookieconsent.showPreferences();
                }
            });
        }
    });
};