/**
 * Initializes a dark/light theme toggle with dynamic icon.
 * @param {string} toggleButtonId - ID of the button to attach toggle to.
 */

export function initThemeToggle(toggleButtonId = "theme-toggle") {
  const themeToggleBtn = document.getElementById(toggleButtonId);
  if (!themeToggleBtn) return;
  
  /**
   * Sets the theme and updates icon
   * @param {"light"|"dark"} theme
   */
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    // Update ONLY the icon, not the entire button content
    const icon = themeToggleBtn.querySelector('.nav__theme-icon');
    if (icon) {
      icon.textContent = theme === "dark" ? "🌙" : "☀️";
    }
  }
  
  // Apply saved theme or system preference on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
  
  // Listen for OS theme changes — only apply if user hasn't set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle on button click
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}