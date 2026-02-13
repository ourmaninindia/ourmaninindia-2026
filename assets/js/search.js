// ==========================================
// SEARCH FUNCTIONALITY
// Client-side search with Fuse.js
// ==========================================

(function() {
  'use strict';
    
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchStats = document.getElementById('search-stats');
  const clearButton = document.getElementById('search-clear');
    
  if (!searchInput || !searchResults) {
    return;
  }
    
  let fuse = null;
  let searchData = [];
    
  // Load search index
  // Fuse.js v7 expects weights between 0–1 for better proportional ranking.
  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;
            
      // Initialize Fuse.js
      fuse = new Fuse(searchData, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'tags', weight: 0.2 },
    { name: 'categories', weight: 0.1 },
    { name: 'summary', weight: 0.15 },
    { name: 'content', weight: 0.05 }
  ],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
  shouldSort: true
});

            
      // Check URL for search query
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        searchInput.value = query;
        performSearch(query);
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Error loading search index',error);
      // console.error('Error loading search index:', error);
      searchResults.innerHTML = '<p class="search-error">Failed to load search index.</p>';
    });
    
  // Debounced search
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    const query = this.value.trim();
        
    if (query.length === 0) {
      clearResults();
      return;
    }
        
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });
    
  // Clear button
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      clearResults();
      searchInput.focus();
    });
  }
    
  function performSearch(query) {
    if (!fuse) {
      return;
    }
        
    const startTime = performance.now();
    const results = fuse.search(query);
    const endTime = performance.now();
    const searchTime = ((endTime - startTime) / 1000).toFixed(3);
        
    displayResults(results, query, searchTime);
  }
    
  function displayResults(results, query, searchTime) {
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
        
    if (searchStats) {
      searchStats.innerHTML = `Found <span>${results.length}</span> result${results.length !== 1 ? 's' : ''} in ${searchTime}s`;
    }
        
    const html = results.map(result => {
      const {item} = result;
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
                        ${highlightMatches(item.summary || `${item.content.substring(0, 200)  }...`, result.matches, 'summary', 'content')}
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
    
  function highlightMatches(text, matches, ...keys) {
    if (!matches) {
      return escapeHtml(text);
    }
    
    const relevantMatches = matches.filter(m => keys.includes(m.key));
    if (relevantMatches.length === 0) {
      return escapeHtml(text);
    }
    
    let highlightedText = text;
    const ranges = [];
    
    relevantMatches.forEach(match => {
      match.indices.forEach((index) => {
        const [start, end] = index;
        ranges.push({ start, end });
      });
    });
    
    // Sort and merge overlapping ranges
    ranges.sort((a, b) => a.start - b.start);
    const mergedRanges = [];
    // eslint-disable-next-line prefer-destructuring
    let current = ranges[0];
    
    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i].start <= current.end + 1) {
        current.end = Math.max(current.end, ranges[i].end);
      } else {
        mergedRanges.push(current);
        current = ranges[i];
      }
    }
    if (current) {
      mergedRanges.push(current);
    }
    
    // Apply highlights from end to start
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
    
  function clearResults() {
    searchResults.innerHTML = '';
    if (searchStats) {
      searchStats.textContent = '';
    }
  }
    
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
    
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
    
})();