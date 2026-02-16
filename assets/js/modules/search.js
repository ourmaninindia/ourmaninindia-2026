/**
 * Search Module
 * 
 * Client-side search functionality using Fuse.js for fuzzy matching.
 * Searches through posts by title, tags, categories, summary, and content.
 * Features debounced input, highlighted matches, and performance metrics.
 * 
 * @module search
 * @requires Fuse.js v7+ (loaded via CDN in search page template)
 * @requires /index.json - Hugo-generated search index
 * @requires #search-input - Search input field
 * @requires #search-results - Results container
 * @optional #search-stats - Performance/count display
 * @optional #search-clear - Clear button
 * 
 * @example
 * // Used on /search page
 * // Hugo template should include:
 * // <input type="search" id="search-input" />
 * // <div id="search-stats"></div>
 * // <div id="search-results"></div>
 * // <button id="search-clear">Clear</button>
 * 
 * // JavaScript usage:
 * import { initSearch } from './modules/search.js';
 * if (document.getElementById('search-input')) {
 *     initSearch();
 * }
 * 
 * @see https://fusejs.io/ - Fuse.js documentation
 */

/**
 * Initializes search functionality
 * Loads search index, configures Fuse.js, and sets up event listeners
 * 
 * @function initSearch
 * @returns {void}
 * 
 * @description
 * Search configuration:
 * - Title: 50% weight (most important)
 * - Tags: 20% weight
 * - Summary: 15% weight
 * - Categories: 10% weight
 * - Content: 5% weight (least important)
 * - Threshold: 0.35 (lower = stricter matching)
 * - Debounce: 300ms delay
 */
export function initSearch() {
  'use strict';

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchStats = document.getElementById('search-stats');
  const clearButton = document.getElementById('search-clear');

  // Early exit if required elements don't exist
  if (!searchInput || !searchResults) return;

  let fuse = null;
  let searchData = [];

  /**
   * Loads search index from /index.json
   * Initializes Fuse.js with weighted search keys
   * Checks URL for initial query parameter
   * 
   * @private
   */
  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;

      // Initialize Fuse.js with weighted keys
      // Weights are 0-1 for proportional ranking (v7+)
      fuse = new Fuse(searchData, {
        keys: [
          { name: 'title', weight: 0.5 },      // Highest priority
          { name: 'tags', weight: 0.2 },       // Tag matching
          { name: 'summary', weight: 0.15 },   // Summary/excerpt
          { name: 'categories', weight: 0.1 }, // Category matching
          { name: 'content', weight: 0.05 }    // Full content (lowest priority)
        ],
        threshold: 0.35,           // Match threshold (0 = perfect, 1 = match anything)
        includeScore: true,        // Include relevance score in results
        includeMatches: true,      // Include match positions for highlighting
        minMatchCharLength: 2,     // Minimum characters to match
        ignoreLocation: true,      // Ignore where in text the match occurs
        shouldSort: true           // Sort by relevance score
      });

      // Check URL for initial search query (?q=searchterm)
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        searchInput.value = query;
        performSearch(query);
      }
    })
    .catch(error => {
      console.log('Error loading search index', error);
      searchResults.innerHTML = '<p class="search-error">Failed to load search index.</p>';
    });

  /**
   * Debounced search input handler
   * Waits 300ms after user stops typing before searching
   * Clears results if input is empty
   * 
   * @listens input - On search input field
   */
  let searchTimeout;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    const query = this.value.trim();

    if (query.length === 0) {
      clearResults();
      return;
    }

    // Debounce: wait 300ms after user stops typing
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });

  /**
   * Clear button handler
   * Resets input, clears results, and returns focus
   * 
   * @listens click - On clear button
   */
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      clearResults();
      searchInput.focus();
    });
  }

  /**
   * Performs search using Fuse.js
   * Measures search performance and displays results
   * 
   * @private
   * @function performSearch
   * @param {string} query - Search query string
   * @returns {void}
   */
  function performSearch(query) {
    if (!fuse) return;

    const startTime = performance.now();
    const results = fuse.search(query);
    const endTime = performance.now();
    const searchTime = ((endTime - startTime) / 1000).toFixed(3);

    displayResults(results, query, searchTime);
  }

  /**
   * Displays search results with highlighted matches
   * Shows "no results" message if empty
   * 
   * @private
   * @function displayResults
   * @param {Array} results - Fuse.js search results
   * @param {string} query - Original search query
   * @param {string} searchTime - Search duration in seconds
   * @returns {void}
   */
  function displayResults(results, query, searchTime) {
    // No results found
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <div class="no-results__icon">🔍</div>
          <h3>No results found for "${escapeHtml(query)}"</h3>
          <p>Try different keywords or check the spelling.</p>
        </div>
      `;

      if (searchStats) {
        searchStats.textContent = `No results found in ${searchTime}s`;
      }
      return;
    }

    // Display result count and search time
    if (searchStats) {
      searchStats.innerHTML = `Found <span>${results.length}</span> result${results.length !== 1 ? 's' : ''} in ${searchTime}s`;
    }

    // Build results HTML
    const html = results.map(result => {
      const { item } = result;
      // Convert Fuse.js score (0=perfect, 1=poor) to percentage (100%=perfect, 0%=poor)
      const score = Math.round((1 - result.score) * 100);

      return `
        <article class="search-result">
          <div class="search-result__header">
            <h2 class="search-result__title">
              <a href="${item.permalink}">${highlightMatches(item.title, result.matches, 'title')}</a>
            </h2>
            <span class="search-result__score">${score}%</span>
          </div>
          <div class="search-result__meta">
            <span>${formatDate(item.date)}</span>
            ${item.categories ? `<span>${item.categories[0]}</span>` : ''}
            ${item.readingTime ? `<span>${item.readingTime} min read</span>` : ''}
          </div>
          <p class="search-result__summary">
            ${highlightMatches(item.summary || `${item.content.substring(0, 200)}...`, result.matches, 'summary', 'content')}
          </p>
          ${item.tags && item.tags.length > 0 ? `
            <div class="search-result__tags">
              ${item.tags.slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </article>
      `;
    }).join('');

    searchResults.innerHTML = html;
  }

  /**
   * Highlights matched text with <mark> tags
   * Handles overlapping matches and escapes HTML
   * 
   * @private
   * @function highlightMatches
   * @param {string} text - Text to highlight
   * @param {Array} matches - Fuse.js match data
   * @param {...string} keys - Keys to highlight (e.g., 'title', 'summary')
   * @returns {string} HTML string with highlighted matches
   */
  function highlightMatches(text, matches, ...keys) {
    if (!matches) {
      return escapeHtml(text);
    }

    // Filter matches to only include relevant keys
    const relevantMatches = matches.filter(m => keys.includes(m.key));
    if (relevantMatches.length === 0) {
      return escapeHtml(text);
    }

    let highlightedText = text;
    const ranges = [];

    // Collect all match ranges
    relevantMatches.forEach(match => {
      match.indices.forEach((index) => {
        const [start, end] = index;
        ranges.push({ start, end });
      });
    });

    // Sort and merge overlapping ranges to avoid nested <mark> tags
    ranges.sort((a, b) => a.start - b.start);
    const mergedRanges = [];
    let current = ranges[0];

    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i].start <= current.end + 1) {
        // Overlapping or adjacent - merge
        current.end = Math.max(current.end, ranges[i].end);
      } else {
        // Non-overlapping - save current and start new
        mergedRanges.push(current);
        current = ranges[i];
      }
    }
    if (current) {
      mergedRanges.push(current);
    }

    // Apply highlights from end to start (to preserve indices)
    for (let i = mergedRanges.length - 1; i >= 0; i--) {
      const range = mergedRanges[i];
      const { start, end } = range;
      const before = escapeHtml(highlightedText.substring(0, start));
      const match = escapeHtml(highlightedText.substring(start, end + 1));
      const after = escapeHtml(highlightedText.substring(end + 1));
      highlightedText = `${before}<mark>${match}</mark>${after}`;
    }

    return highlightedText;
  }

  /**
   * Clears search results and stats
   * 
   * @private
   * @function clearResults
   * @returns {void}
   */
  function clearResults() {
    searchResults.innerHTML = '';
    if (searchStats) {
      searchStats.textContent = '';
    }
  }

  /**
   * Formats ISO date string to readable format
   * 
   * @private
   * @function formatDate
   * @param {string} dateString - ISO date string (e.g., "2024-01-15T00:00:00Z")
   * @returns {string} Formatted date (e.g., "Jan 15, 2024")
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Escapes HTML special characters to prevent XSS
   * 
   * @private
   * @function escapeHtml
   * @param {string} text - Text to escape
   * @returns {string} HTML-safe text
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}