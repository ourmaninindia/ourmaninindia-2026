export function initPagination() {
    const pagination = document.querySelector('.pagination');
    const container = document.querySelector('.pagination__numbers');
    if (!container || !pagination) return;
    
    const allPages = Array.from(container.querySelectorAll('.pagination__number'));
    const currentPage = allPages.find(p => p.classList.contains('active'));
    if (!currentPage) return;
    
    const current = parseInt(currentPage.dataset.page);
    const total = allPages.length;
    
    // Determine which pages to show
    const pagesToShow = new Set();
    
    // Always show first and last
    pagesToShow.add(1);
    pagesToShow.add(total);
    
    // Show current ± 2
    for (let i = current - 2; i <= current + 2; i++) {
        if (i >= 1 && i <= total) {
            pagesToShow.add(i);
        }
    }
    
    // Show every 10th page (10, 20, 30, etc.)
    for (let i = 10; i <= total; i += 10) {
        pagesToShow.add(i);
    }
    
    // Convert to sorted array
    const showPages = Array.from(pagesToShow).sort((a, b) => a - b);
    
    // Hide all pages first
    allPages.forEach(p => p.style.display = 'none');
    
    // Show selected pages and add ellipsis
    let lastShown = 0;
    showPages.forEach(pageNum => {
        const pageEl = allPages[pageNum - 1];
        if (pageEl) {
            if (lastShown > 0 && pageNum - lastShown > 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination__ellipsis';
                ellipsis.textContent = '…';
                container.insertBefore(ellipsis, pageEl);
            }
            pageEl.style.display = 'inline-flex';
            lastShown = pageNum;
        }
    });
    
    // Hide Prev/Next if adjacent page is already visible
    const prevBtn = pagination.querySelector('.pagination__prev');
    if (prevBtn && (pagesToShow.has(1) || pagesToShow.has(current - 1))) {
        prevBtn.style.display = 'none';
    }
    
    const nextBtn = pagination.querySelector('.pagination__next');
    if (nextBtn && (pagesToShow.has(total) || pagesToShow.has(current + 1))) {
        nextBtn.style.display = 'none';
    }
}

