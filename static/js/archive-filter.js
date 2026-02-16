// Archive filtering functionality
(function() {
    'use strict';
    
    let currentFilter = null;
    
    // Get all archive links and posts
    const archiveLinks = document.querySelectorAll('.archive__link');
    const posts = document.querySelectorAll('.blog__post[data-post-date]');
    const clearButton = document.getElementById('clear-archive-filter');
    const pagination = document.querySelector('.blog__pagination');
    
    if (!archiveLinks.length || !posts.length) return;
    
    // Function to filter posts by date
    function filterByArchive(archiveDate) {
        let visibleCount = 0;
        
        posts.forEach(post => {
            const postDate = post.dataset.postDate;
            
            if (postDate === archiveDate || archiveDate === null) {
                post.style.display = '';
                post.classList.add('blog__post--filtering');
                visibleCount++;
            } else {
                post.style.display = 'none';
                post.classList.remove('blog__post--filtering');
            }
        });
        
        // Hide pagination when filtering
        if (pagination) {
            pagination.style.display = archiveDate ? 'none' : '';
        }
        
        // Show/hide clear button using BEM modifier
        if (clearButton) {
            if (archiveDate) {
                clearButton.classList.remove('archive__clear--hidden');
            } else {
                clearButton.classList.add('archive__clear--hidden');
            }
        }
        
        // Update active state on links using BEM modifier
        archiveLinks.forEach(link => {
            if (link.dataset.archive === archiveDate) {
                link.classList.add('archive__link--active');
            } else {
                link.classList.remove('archive__link--active');
            }
        });
        
        // Show message if no posts found
        showNoResultsMessage(visibleCount);
        
        currentFilter = archiveDate;
    }
    
    // Show/hide no results message
    function showNoResultsMessage(count) {
        let messageEl = document.querySelector('.archive__no-results');
        const postsContainer = document.querySelector('.blog__posts');
        
        if (count === 0 && currentFilter && postsContainer) {
            if (!messageEl) {
                messageEl = document.createElement('div');
                messageEl.className = 'archive__no-results';
                messageEl.textContent = 'No posts found for this period.';
                postsContainer.appendChild(messageEl);
            }
        } else if (messageEl) {
            messageEl.remove();
        }
    }
    
    // Add click handlers to archive links
    archiveLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const archiveDate = link.dataset.archive;
            
            // Scroll to posts section
            const postsContainer = document.querySelector('.blog__posts');
            if (postsContainer) {
                postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Filter posts
            filterByArchive(archiveDate);
            
            // Update URL hash (optional, for bookmarking)
            window.location.hash = `archive-${archiveDate}`;
        });
    });
    
    // Clear filter button
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            filterByArchive(null);
            window.location.hash = '';
            
            // Scroll to posts
            const postsContainer = document.querySelector('.blog__posts');
            if (postsContainer) {
                postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Check URL hash on load
    window.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash;
        if (hash.startsWith('#archive-')) {
            const archiveDate = hash.replace('#archive-', '');
            filterByArchive(archiveDate);
        }
    });
})();