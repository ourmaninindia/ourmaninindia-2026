# Advanced Features

Advanced techniques and features for your Hugo blog.

## Advanced Sass Techniques

### Mixins

Create reusable CSS patterns.

**Edit:** `assets/scss/_mixins.scss` (create file)
````scss
// Responsive typography
@mixin responsive-text($min, $max, $min-vw: 320px, $max-vw: 1200px) {
    font-size: clamp($min, calc($min + ($max - $min) * (100vw - $min-vw) / ($max-vw - $min-vw)), $max);
}

// Card with hover effect
@mixin card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    }
}

// Centered container
@mixin container($max-width: 1200px) {
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
    padding-left: $spacing-md;
    padding-right: $spacing-md;
}

// Truncate text
@mixin truncate($lines: 1) {
    @if $lines == 1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    } @else {
        display: -webkit-box;
        -webkit-line-clamp: $lines;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
````

**Use mixins:**
````scss
@use 'mixins' as *;

.post__title {
    @include responsive-text(1.5rem, 2.5rem);
}

.card {
    @include card-hover;
}

.excerpt {
    @include truncate(3);  // 3 lines
}
````

---

## Custom Shortcodes

### Info Box

**Create:** `layouts/shortcodes/info.html`
````html
{{ $type := .Get "type" | default "info" }}
{{ $title := .Get "title" }}

<div class="info-box info-box--{{ $type }}">
    {{ with $title }}
        <div class="info-box__title">{{ . }}</div>
    {{ end }}
    <div class="info-box__content">
        {{ .Inner | markdownify }}
    </div>
</div>
````

**Styles:** `assets/scss/blocks/_custom.scss`
````scss
.info-box {
    padding: $spacing-lg;
    border-radius: $radius-md;
    border-left: 4px solid;
    margin: $spacing-lg 0;
    background: rgba(0,0,0,0.02);
    
    &__title {
        font-weight: 700;
        margin-bottom: $spacing-sm;
        font-size: 1.125rem;
    }
    
    &__content {
        p:last-child {
            margin-bottom: 0;
        }
    }
    
    &--info {
        border-color: #2563eb;
        background: rgba(#2563eb, 0.05);
        
        .info-box__title {
            color: #2563eb;
        }
    }
    
    &--warning {
        border-color: #f59e0b;
        background: rgba(#f59e0b, 0.05);
        
        .info-box__title {
            color: #f59e0b;
        }
    }
    
    &--success {
        border-color: #10b981;
        background: rgba(#10b981, 0.05);
        
        .info-box__title {
            color: #10b981;
        }
    }
    
    &--danger {
        border-color: #ef4444;
        background: rgba(#ef4444, 0.05);
        
        .info-box__title {
            color: #ef4444;
        }
    }
}
````

**Usage:**
````markdown
{{< info type="warning" title="Important Note" >}}
This is a warning message with **Markdown** support.
{{< /info >}}

{{< info type="success" title="Pro Tip" >}}
This is a helpful tip.
{{< /info >}}
````

---

### Code Tabs

**Create:** `layouts/shortcodes/tabs.html`
````html
<div class="code-tabs">
    <div class="code-tabs__nav">
        {{ range $index, $tab := split (.Get "tabs") "," }}
            <button class="code-tabs__button{{ if eq $index 0 }} active{{ end }}" 
                    onclick="showTab({{ $index }})">
                {{ trim $tab " " }}
            </button>
        {{ end }}
    </div>
    <div class="code-tabs__content">
        {{ .Inner }}
    </div>
</div>

<script>
function showTab(index) {
    const tabs = event.target.closest('.code-tabs');
    const buttons = tabs.querySelectorAll('.code-tabs__button');
    const contents = tabs.querySelectorAll('.code-tabs__panel');
    
    buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
    
    contents.forEach((content, i) => {
        content.style.display = i === index ? 'block' : 'none';
    });
}
</script>
````

**Create:** `layouts/shortcodes/tab.html`
````html
<div class="code-tabs__panel"{{ if ne (.Get "index") "0" }} style="display:none"{{ end }}>
    {{ .Inner }}
</div>
````

**Usage:**
````markdown
{{< tabs tabs="JavaScript,Python,Go" >}}

{{< tab index="0" >}}
```javascript
console.log("Hello, World!");
```
{{< /tab >}}

{{< tab index="1" >}}
```python
print("Hello, World!")
```
{{< /tab >}}

{{< tab index="2" >}}
```go
fmt.Println("Hello, World!")
```
{{< /tab >}}

{{< /tabs >}}
````

---

## Advanced Templating

### Related Posts

**Create:** `layouts/partials/related-posts.html`
````html
{{ $related := .Site.RegularPages.Related . | first 3 }}

{{ with $related }}
<section class="related-posts">
    <h3 class="related-posts__title">You might also like</h3>
    <div class="related-posts__grid">
        {{ range . }}
            <article class="related-post">
                {{ with .Params.image }}
                    {{ $img := $.Page.Resources.GetMatch . }}
                    {{ if $img }}
                        {{ $thumb := $img.Fill "400x200 webp q85" }}
                        <img src="{{ $thumb.RelPermalink }}" 
                             alt="{{ $.Title }}" 
                             class="related-post__image">
                    {{ end }}
                {{ end }}
                
                <div class="related-post__content">
                    <h4 class="related-post__title">
                        <a href="{{ .RelPermalink }}">{{ .Title }}</a>
                    </h4>
                    <p class="related-post__date">
                        {{ .Date.Format "January 02, 2006" }}
                    </p>
                </div>
            </article>
        {{ end }}
    </div>
</section>
{{ end }}
````

**Add to:** `layouts/_default/single.html`
````html
{{ .Content }}

{{ partial "related-posts.html" . }}
{{ partial "author-bio.html" . }}
````

---

### Reading Time

**Add to post template:**
````html
<div class="post__meta">
    <span>{{ .Date.Format "January 02, 2006" }}</span>
    <span>•</span>
    <span>{{ .ReadingTime }} min read</span>
</div>
````

---

### Series Navigation

For multi-part posts.

**Create:** `layouts/partials/series-nav.html`
````html
{{ if .Params.series }}
    {{ $series := .Params.series }}
    {{ $posts := where .Site.RegularPages "Params.series" $series }}
    {{ $posts = $posts.ByParam "series_order" }}
    
    <nav class="series-nav">
        <h4>Part {{ .Params.series_order }} of {{ len $posts }}: {{ $series }}</h4>
        <ol class="series-nav__list">
            {{ range $posts }}
                <li class="{{ if eq .RelPermalink $.RelPermalink }}active{{ end }}">
                    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
                </li>
            {{ end }}
        </ol>
    </nav>
{{ end }}
````

**Usage in posts:**
````yaml
---
title: "Hugo Guide Part 1"
series: "Complete Hugo Guide"
series_order: 1
---
````

---

## Advanced Hugo Features

### Custom Taxonomies

**Add to config.toml:**
````toml
[taxonomies]
  tag = "tags"
  category = "categories"
  series = "series"       # Custom
  difficulty = "difficulty"  # Custom
````

**Use in posts:**
````yaml
---
tags: ["hugo", "tutorial"]
categories: ["Tech"]
series: ["Hugo Mastery"]
difficulty: ["Intermediate"]
---
````

---

### Content Organization

**Section-specific templates:**
````
layouts/
├── blog/
│   ├── single.html      # Blog posts
│   └── list.html        # Blog listing
├── projects/
│   ├── single.html      # Projects
│   └── list.html
└── _default/
    ├── single.html      # Fallback
    └── list.html
````

---

### Cascade in Front Matter

Set defaults for all posts in a section.

**Create:** `content/blog/_index.md`
````yaml
---
title: "Blog"
cascade:
  type: blog
  layout: single
  toc: true
  author: "alfred-tuinman"
---
````

Now all blog posts inherit these values.

---

## Progressive Web App (PWA)

### Service Worker

**Create:** `static/sw.js`
````javascript
const CACHE_VERSION = 'v1';
const CACHE_NAME = 'blog-cache-' + CACHE_VERSION;

const STATIC_CACHE = [
    '/',
    '/offline/',
    '/css/style.css',
    '/js/main.js'
];

// Install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => caches.match('/offline/'));
            })
    );
});
````

### Web App Manifest

**Create:** `static/manifest.json`
````json
{
  "name": "Your Blog Name",
  "short_name": "Blog",
  "description": "Tech and Cycling Adventures",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
````

**Add to baseof.html:**
````html
<head>
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#2563eb">
    
    <script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
    </script>
</head>
````

---

## Advanced Search

### Fuzzy Search with Highlighting

Already implemented! ✅

### Filter by Category

**Add to search.js:**
````javascript
// Add category filter
const categoryFilter = document.getElementById('category-filter');

categoryFilter.addEventListener('change', function() {
    const category = this.value;
    
    if (category === 'all') {
        filteredData = searchData;
    } else {
        filteredData = searchData.filter(post => 
            post.categories && post.categories.includes(category)
        );
    }
    
    // Re-initialize Fuse with filtered data
    fuse = new Fuse(filteredData, fuseOptions);
    
    // Re-run search
    if (searchInput.value) {
        performSearch(searchInput.value);
    }
});
````

---

## Multilingual Advanced

### Language Switcher

**Create:** `layouts/partials/language-switcher.html`
````html
{{ if .IsTranslated }}
<nav class="language-switcher">
    {{ range .Translations }}
        <a href="{{ .RelPermalink }}" 
           lang="{{ .Language.Lang }}"
           class="language-switcher__link">
            {{ .Language.LanguageName }}
        </a>
    {{ end }}
</nav>
{{ end }}
````

### Translated Strings

**i18n/en.toml:**
````toml
[readingTime]
other = "{{ .Count }} min read"

[relatedPosts]
other = "Related Posts"

[sharePost]
other = "Share this post"
````

**i18n/fr.toml:**
````toml
[readingTime]
other = "{{ .Count }} min de lecture"

[relatedPosts]
other = "Articles connexes"

[sharePost]
other = "Partager cet article"
````

**Use in templates:**
````html
<span>{{ i18n "readingTime" .ReadingTime }}</span>
````

---

## Advanced Analytics

### Custom Event Tracking

**Add to main.js:**
````javascript
// Track outbound links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
        link.addEventListener('click', () => {
            gtag('event', 'click', {
                'event_category': 'outbound',
                'event_label': link.href
            });
        });
    }
});

// Track newsletter signups
document.querySelector('.newsletter-form').addEventListener('submit', () => {
    gtag('event', 'conversion', {
        'event_category': 'newsletter',
        'event_label': 'signup'
    });
});

// Track search queries
searchForm.addEventListener('submit', () => {
    gtag('event', 'search', {
        'search_term': searchInput.value
    });
});
````

---

## API Integration

### Strava API for Real Stats

**Create:** `assets/js/strava.js`
````javascript
async function fetchStravaData(activityId) {
    const response = await fetch(`/api/strava/${activityId}`);
    const data = await response.json();
    
    document.getElementById('distance').textContent = data.distance;
    document.getElementById('elevation').textContent = data.elevation_gain;
    document.getElementById('time').textContent = formatTime(data.moving_time);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}
````

---

## Automation

### Auto-Generate Posts from Data

**Create:** `scripts/generate-posts.js`
````javascript
const fs = require('fs');
const yaml = require('js-yaml');

// Read data
const rides = yaml.load(fs.readFileSync('data/rides.yaml', 'utf8'));

// Generate posts
rides.forEach(ride => {
    const frontMatter = `---
title: "${ride.title}"
date: ${ride.date}
categories: ["Cycling"]
tags: ${JSON.stringify(ride.tags)}
---

## Overview

${ride.description}

{{< ride-stats distance="${ride.distance}" elevation="${ride.elevation}" time="${ride.time}" >}}
`;

    const filename = `content/blog/${ride.slug}/index.md`;
    fs.mkdirSync(`content/blog/${ride.slug}`, { recursive: true });
    fs.writeFileSync(filename, frontMatter);
});
````

---

## Conclusion

You now have a complete, production-ready Hugo blog with:

✅ Modern Sass architecture  
✅ Image optimization  
✅ Full-text search  
✅ Newsletter integration  
✅ Privacy-friendly comments  
✅ Reading progress  
✅ Table of contents  
✅ Author bio system  
✅ Cycling-specific features  
✅ SEO optimization  
✅ Performance optimization  
✅ Deployment ready  

**Next Steps:**
- Write great content
- Build your audience
- Iterate and improve
- Share your knowledge

Happy blogging! 🚀