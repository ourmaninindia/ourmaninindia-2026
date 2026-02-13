# Performance Optimization

Make your Hugo blog blazing fast with these optimization techniques.

## Current Performance

Your blog should already achieve excellent scores:

**Target Lighthouse Scores:**
- Performance: 95-100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Current Optimizations:**
- ✅ Static site (no server processing)
- ✅ Minified CSS/JS
- ✅ Fingerprinted assets
- ✅ WebP images with JPEG fallback
- ✅ Responsive images
- ✅ Lazy loading
- ✅ System fonts (no font loading)

---

## Measure Performance

### Tools

**Google PageSpeed Insights:**
````
https://pagespeed.web.dev/
````

**GTmetrix:**
````
https://gtmetrix.com/
````

**WebPageTest:**
````
https://www.webpagetest.org/
````

**Chrome DevTools:**
````bash
# Open Chrome
# Right-click → Inspect
# Lighthouse tab → Generate report
````

### Key Metrics

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

**Additional:**
- **FCP** (First Contentful Paint): <1.8s
- **TTI** (Time to Interactive): <3.8s
- **Speed Index**: <3.4s

---

## Image Optimization

### Before Upload

**Resize images:**
````bash
# Install ImageMagick
sudo apt install imagemagick

# Resize to max 1200px width
mogrify -resize 1200x\> *.jpg

# Optimize JPEG quality
mogrify -quality 85 *.jpg
````

**Compress images:**

**Using TinyPNG CLI:**
````bash
# Install
npm install -g tinypng-cli

# Compress
tinypng your-image.jpg
````

**Using ImageOptim (GUI):**
````bash
# Install
sudo apt install imageoptim

# Use GUI or:
imageoptim --quality=85 *.jpg
````

### Hugo Image Processing

Already configured! When you use:
````markdown
{{< img src="photo.jpg" alt="Description" >}}
````

Hugo automatically:
- Generates WebP version
- Creates 3 sizes (400px, 800px, 1200px)
- Adds lazy loading
- Creates responsive srcset

### Image Best Practices

**Featured images:**
- Size: 1200x600px
- Format: JPG or WebP
- Quality: 80-85
- Max size: 200KB

**Content images:**
- Max width: 1200px
- Format: JPG for photos, PNG for graphics
- Quality: 80-85
- Max size: 150KB

**Icons/logos:**
- Format: SVG (vector)
- Or PNG with transparency
- Max size: 50KB

---

## CSS Optimization

### Already Optimized

✅ Sass compiled to CSS  
✅ Minified in production  
✅ Fingerprinted (cache busting)  
✅ Single CSS file (no imports)  

### Further Optimization

**Remove unused CSS:**
````bash
# Install PurgeCSS
npm install -g purgecss

# Analyze
purgecss --css public/css/style.*.css --content public/**/*.html
````

**Critical CSS (Advanced):**

Extract above-the-fold CSS and inline it:
````bash
# Install critical
npm install -g critical

# Generate critical CSS
critical public/index.html --base public --inline --minify > critical.css
````

---

## JavaScript Optimization

### Already Optimized

✅ Minified in production  
✅ Fingerprinted  
✅ Loaded at end of body  
✅ Conditional loading (only when needed)  

### Defer Non-Critical Scripts

**Edit:** `layouts/_default/baseof.html`
````html
<!-- Defer non-critical scripts -->
<script src="{{ $main.RelPermalink }}" defer></script>

<!-- Async for analytics -->
<script src="analytics.js" async></script>
````

### Reduce JavaScript Size

**Check bundle size:**
````bash
ls -lh public/js/
````

**If too large:**
- Remove unused functions
- Split into multiple files
- Load conditionally

---

## Font Optimization

### System Fonts (Current - Fastest)
````scss
$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
````

**Advantages:**
- ✅ Zero load time
- ✅ No extra requests
- ✅ Familiar to users
- ✅ Perfect performance

### Custom Fonts (If Needed)

**Self-host fonts:**
````bash
# Download font files
mkdir -p static/fonts

# Add to CSS
@font-face {
    font-family: 'Inter';
    src: url('/fonts/inter.woff2') format('woff2');
    font-display: swap;
}
````

**Use `font-display: swap`:**
Prevents invisible text while loading.

**Preload critical fonts:**
````html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
````

---

## Caching Strategy

### Browser Caching

**Netlify/Vercel:**
Auto-configured ✅

**Custom server (Nginx):**
````nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
````

**Apache (.htaccess):**
````apache
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
````

### Service Worker (PWA)

**Create:** `static/sw.js`
````javascript
const CACHE_NAME = 'blog-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
````

**Register in baseof.html:**
````html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
````

---

## CDN Usage

### Netlify/Vercel

Built-in global CDN ✅

### Cloudflare (Free)

1. Sign up: https://cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable:
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - HTTP/2
   - Image optimization

---

## Lazy Loading

### Images

Already configured! Using `loading="lazy"` attribute.
````html
<img src="photo.jpg" loading="lazy" alt="Description">
````

### YouTube Embeds

**Replace:**
````html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
````

**With lazy version:**
````html
<div class="youtube-embed" data-id="VIDEO_ID" onclick="loadYouTube(this)">
    <img src="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg" alt="Video thumbnail">
    <div class="play-button">▶</div>
</div>

<script>
function loadYouTube(div) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${div.dataset.id}?autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    div.replaceWith(iframe);
}
</script>
````

---

## HTTP/2 & HTTP/3

### Netlify/Vercel

Enabled by default ✅

### Custom Server

**Nginx (HTTP/2):**
````nginx
listen 443 ssl http2;
````

**Enable HTTP/3 (QUIC):**
````nginx
listen 443 quic reuseport;
add_header Alt-Svc 'h3=":443"; ma=86400';
````

---

## Compression

### Gzip/Brotli

**Netlify/Vercel:**
Auto-enabled ✅

**Nginx:**
````nginx
# Gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;

# Brotli (if installed)
brotli on;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
````

---

## Reduce Third-Party Scripts

### Audit External Scripts
````bash
# Check what's loading
# Chrome DevTools → Network → Filter: 3rd-party
````

**Current external scripts:**
- Fuse.js (search) - 23KB gzipped
- Chart.js (elevation charts) - 58KB gzipped
- Cusdis (comments) - lazy loaded
- Cookie Consent - 13KB gzipped

**All reasonable!**

### Optimize Loading

**Delay non-critical scripts:**
````javascript
// Load after page load
window.addEventListener('load', function() {
    // Load analytics
    // Load comments
    // Load other non-critical scripts
});
````

---

## Database Queries

**N/A** - Static site, no database! ✅

---

## Build Optimization

### Faster Builds
````bash
# Use build cache
hugo --gc --minify

# Skip unused taxonomies
# In config.toml:
disableKinds = ["taxonomy", "taxonomyTerm"]  # If not using
````

### Parallel Processing

Hugo already uses parallel processing ✅

---

## Monitoring Performance

### Real User Monitoring

**Add to Google Analytics:**

Already sends Core Web Vitals ✅

**Or use SpeedCurve:**
````
https://speedcurve.com/
````

### Continuous Monitoring

**Lighthouse CI:**

**Create:** `.github/workflows/lighthouse.yml`
````yaml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g @lhci/cli
      - run: hugo --minify
      - run: lhci autorun
````

---

## Performance Budget

Set performance budgets:

**Create:** `lighthouse-budget.json`
````json
{
  "resourceSizes": [
    {
      "resourceType": "total",
      "budget": 500
    },
    {
      "resourceType": "script",
      "budget": 150
    },
    {
      "resourceType": "image",
      "budget": 200
    },
    {
      "resourceType": "stylesheet",
      "budget": 50
    }
  ],
  "resourceCounts": [
    {
      "resourceType": "third-party",
      "budget": 5
    }
  ]
}
````

---

## Checklist

### Pre-Optimization

- [ ] Measure current performance
- [ ] Note all metrics
- [ ] Identify bottlenecks

### Image Optimization

- [ ] All images under 200KB
- [ ] Using WebP format
- [ ] Responsive images (srcset)
- [ ] Lazy loading enabled
- [ ] No oversized images

### Code Optimization

- [ ] CSS minified
- [ ] JS minified
- [ ] No unused CSS
- [ ] Scripts deferred/async
- [ ] Conditional loading

### Caching

- [ ] Browser caching configured
- [ ] CDN enabled
- [ ] Asset fingerprinting
- [ ] Service worker (optional)

### Third-Party

- [ ] Minimal external scripts
- [ ] Scripts lazy loaded
- [ ] No render-blocking resources

### Monitoring

- [ ] Performance monitoring set up
- [ ] Regular testing scheduled
- [ ] Performance budget set

---

## Target Results

After optimization:

**PageSpeed Insights:**
- Mobile: 95-100
- Desktop: 100

**Load Times:**
- First Contentful Paint: <1s
- Largest Contentful Paint: <2s
- Time to Interactive: <2s

**Page Size:**
- HTML: <50KB
- CSS: <30KB
- JS: <100KB
- Images: <200KB per page
- Total: <500KB

---

## Next Steps

✅ Understand performance metrics  
✅ Images optimized  
✅ Code minified  
✅ Caching configured  

Continue to → [Troubleshooting Guide](10-troubleshooting.md)