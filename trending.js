// =============================================
// DISCOVER — Live Movie Explorer (OMDb API)
// =============================================

let currentPage = 1;
let lastQuery = {};

function buildExplorerCard(movie) {
    // Skip cards with no poster — don't show them at all
    if (!movie.Poster || movie.Poster === 'N/A') return '';

    return `
        <div class="exp-card">
            <div class="exp-card-img-wrap">
                <img src="${movie.Poster}" alt="${movie.Title}"
                     class="exp-card-img" loading="lazy"
                     onerror="this.closest('.exp-card').remove();">
                <div class="exp-card-overlay">
                    <span class="exp-card-type">${movie.Type}</span>
                </div>
            </div>
            <div class="exp-card-body">
                <h3 class="exp-card-title">${movie.Title}</h3>
                <div class="exp-card-meta">
                    <span class="exp-card-year">📅 ${movie.Year}</span>
                    <span class="exp-card-imdb">
                        <a href="https://www.imdb.com/title/${movie.imdbID}"
                           target="_blank" class="exp-imdb-link">IMDb ↗</a>
                    </span>
                </div>
            </div>
        </div>`;
}

function renderPagination(totalResults, page) {
    const totalPages = Math.min(Math.ceil(totalResults / 10), 100);
    if (totalPages <= 1) {
        document.getElementById('explorer-pagination').innerHTML = '';
        return;
    }
    let html = `<div class="pagination-bar">`;
    if (page > 1) html +=
        `<button class="page-btn" onclick="goToPage(${page - 1})">← Prev</button>`;
    html += `<span class="page-info">Page ${page} of ${totalPages}</span>`;
    if (page < totalPages) html +=
        `<button class="page-btn" onclick="goToPage(${page + 1})">Next →</button>`;
    html += `</div>`;
    document.getElementById('explorer-pagination').innerHTML = html;
}

async function fetchExplorer(query, type, year, page) {
    const grid = document.getElementById('explorer-grid');
    const meta = document.getElementById('explorer-meta');
    const pagination = document.getElementById('explorer-pagination');

    grid.innerHTML = `<div class="explorer-loading">
        <div class="exp-spinner"></div>
        <p>Fetching results...</p></div>`;
    meta.innerHTML = '';
    pagination.innerHTML = '';

    // Always force type=movie since we only show movies
    let url = `http://www.omdbapi.com/?s=${encodeURIComponent(query)}`
        + `&type=movie&apikey=${key}`;
    if (year) url += `&y=${year}`;
    url += `&page=${page}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.Response === 'True') {
            const total = parseInt(data.totalResults);
            meta.innerHTML = `<span class="meta-count">
                Found <strong>${total.toLocaleString()}</strong> results
                for "<em>${query}</em>"
                ${year ? `· Year: <strong>${year}</strong>` : ''}
            </span>`;

            const cardsHTML = data.Search.map(buildExplorerCard).join('');
            grid.innerHTML = cardsHTML || `<div class="explorer-empty">
                <div class="explorer-empty-icon">😕</div>
                <h3>No posters available</h3>
                <p>Results found but none had poster images. Try a different search.</p></div>`;

            renderPagination(total, page);
        } else {
            grid.innerHTML = `<div class="explorer-empty">
                <div class="explorer-empty-icon">😕</div>
                <h3>No Results Found</h3>
                <p>${data.Error || 'Try a different search term or filters.'}</p></div>`;
        }
    } catch (e) {
        grid.innerHTML = `<div class="explorer-empty">
            <div class="explorer-empty-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>Check your connection and try again.</p></div>`;
    }
}

function runSearch(page) {
    page = page || 1;
    const query = document.getElementById('exp-query').value.trim();
    const year = document.getElementById('exp-year').value.trim();
    if (!query) {
        document.getElementById('exp-query').focus();
        document.getElementById('exp-query').style.borderColor = '#ff4444';
        setTimeout(function () {
            document.getElementById('exp-query').style.borderColor = '';
        }, 1500);
        return;
    }
    currentPage = page;
    lastQuery = { query: query, year: year };
    fetchExplorer(query, 'movie', year, page);
}

function goToPage(page) {
    currentPage = page;
    fetchExplorer(lastQuery.query, 'movie', lastQuery.year, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function quickExplore(term) {
    document.getElementById('exp-query').value = term;
    runSearch(1);
}

// Store the default empty-state HTML so Clear can restore it
let defaultEmptyHTML = '';

document.addEventListener('DOMContentLoaded', function () {
    const emptyEl = document.getElementById('explorer-empty');
    if (emptyEl) defaultEmptyHTML = emptyEl.outerHTML;

    document.getElementById('exp-search-btn')
        .addEventListener('click', function () { runSearch(1); });

    document.getElementById('exp-clear-btn')
        .addEventListener('click', function () {
            document.getElementById('exp-query').value = '';
            document.getElementById('exp-year').value = '';
            document.getElementById('explorer-grid').innerHTML = defaultEmptyHTML;
            document.getElementById('explorer-meta').innerHTML = '';
            document.getElementById('explorer-pagination').innerHTML = '';
        });

    document.getElementById('exp-query')
        .addEventListener('keypress', function (e) {
            if (e.key === 'Enter') runSearch(1);
        });
});
