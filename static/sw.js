// ── Config ────────────────────────────────────────────────────────────────────

const VERSION        = 'v1';
const CACHE_STATIC   = `static-${VERSION}`;   // CSS, JS, fonts — long lived
const CACHE_PAGES    = `pages-${VERSION}`;     // HTML pages — medium lived
const CACHE_IMAGES   = `images-${VERSION}`;    // Images — long lived
const OFFLINE_URL    = '/offline/';

// Static assets to pre-cache on install
const PRECACHE_ASSETS = [
    OFFLINE_URL,
    '/manifest.json',
];

// ── Install — pre-cache critical assets ───────────────────────────────────────

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then(cache => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// ── Activate — clean up old caches ────────────────────────────────────────────

self.addEventListener('activate', event => {
    const currentCaches = [CACHE_STATIC, CACHE_PAGES, CACHE_IMAGES];

    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => !currentCaches.includes(key))
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

// ── Fetch — routing strategies ────────────────────────────────────────────────

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignore non-GET, cross-origin, and Netlify function requests
    if (
        request.method !== 'GET' ||
        url.origin !== self.location.origin ||
        url.pathname.startsWith('/.netlify/') ||
        url.pathname.startsWith('/api/')
    ) return;

    // ── Images: cache-first, fallback to network ──────────────────────────────
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request, CACHE_IMAGES));
        return;
    }

    // ── Static assets (CSS, JS, fonts): cache-first ───────────────────────────
    if (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'font'
    ) {
        event.respondWith(cacheFirst(request, CACHE_STATIC));
        return;
    }

    // ── HTML pages: network-first, fallback to cache, then offline page ───────
    if (request.destination === 'document') {
        event.respondWith(networkFirst(request));
        return;
    }
});

// ── Strategies ────────────────────────────────────────────────────────────────

// Cache-first: serve from cache, update cache in background
async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return new Response('', { status: 408 });
    }
}

// Network-first: try network, fall back to cache, then offline page
async function networkFirst(request) {
    const cache = await caches.open(CACHE_PAGES);

    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        if (cached) return cached;

        // Last resort — serve the offline page
        const offline = await caches.match(OFFLINE_URL);
        return offline || new Response('You are offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}