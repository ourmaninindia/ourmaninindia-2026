Here's what might still be missing:

**SEO & Meta**
- Open Graph tags (Facebook/LinkedIn sharing previews)
- Twitter/X card meta tags
- Structured data / JSON-LD (Article, BreadcrumbList)
- Canonical URLs for multilingual pages
- `robots.txt`
- XML sitemap verification

**Performance**
- Image lazy loading audit
- Core Web Vitals check (LCP, CLS, FID)
- Preload for critical fonts
- `<link rel="preconnect">` for external domains

**Accessibility**
- Skip to main content link
- ARIA landmarks audit
- Colour contrast audit with new HSL colours
- Focus visible styles for keyboard navigation

**Security**
- Content Security Policy headers in `netlify.toml`
- `X-Frame-Options`, `X-Content-Type-Options` headers
- Rate limiting on Netlify Functions

**Missing pages**
- `offline/index.html` for the service worker
- 404 page
- Privacy policy (referenced in footer)
- About page

**Multilingual**
- `nl.toml` parity with `en.toml` — all new comment/PWA keys added?
- `hreflang` tags for Dutch/English pages

