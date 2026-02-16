/**
 * Code Tabs Module
 * 
 * Creates tabbed code block interfaces for showing multiple code examples
 * (e.g., same functionality in different languages/frameworks).
 * 
 * @module code-tabs
 * @requires .code-tabs container in DOM
 * @requires .code-tabs__button for tab buttons
 * @requires .code-tabs__panel for tab content panels
 * 
 * @example
 * // HTML structure:
 * // <div class="code-tabs">
 * //   <div class="code-tabs__buttons">
 * //     <button class="code-tabs__button active">JavaScript</button>
 * //     <button class="code-tabs__button">Python</button>
 * //   </div>
 * //   <div class="code-tabs__panel" style="display: block;">
 * //     <pre><code>console.log('Hello');</code></pre>
 * //   </div>
 * //   <div class="code-tabs__panel" style="display: none;">
 * //     <pre><code>print('Hello')</code></pre>
 * //   </div>
 * // </div>
 */

/**
 * Initializes code tab switching functionality
 * Handles click events to show/hide code panels
 * 
 * @function initCodeTabs
 * @returns {void}
 */

export function initCodeTabs() {
    const tabContainers = document.querySelectorAll('.code-tabs');
    if (tabContainers.length === 0) return; // Early exit

    tabContainers.forEach((container) => {
        const buttons = container.querySelectorAll('.code-tabs__button');
        const panels = container.querySelectorAll('.code-tabs__panel');
        
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Deactivate all tabs and panels
                buttons.forEach(btn => btn.classList.remove('active'));
                panels.forEach(panel => panel.style.display = 'none');
                
                // Activate clicked tab and corresponding panel
                button.classList.add('active');
                if (panels[index]) {
                    panels[index].style.display = 'block';
                }
            });
        });
    });
}