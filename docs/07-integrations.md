# Third-Party Integrations

Set up newsletter, comments, analytics, and other services.

## Newsletter Integration

### ConvertKit (Recommended)

**Why ConvertKit:**
- ✅ Free up to 1,000 subscribers
- ✅ Easy signup forms
- ✅ Good automation
- ✅ Email sequences
- ✅ Tag-based organization

**Setup Steps:**

1. **Sign up:** https://convertkit.com

2. **Create a form:**
   - Go to Grow → Landing Pages & Forms
   - Click "Create New"
   - Choose "Inline" form type
   - Customize design
   - Save and publish

3. **Get form URL:**
   - Copy the form URL (e.g., `https://your-username.ck.page/form-id`)

4. **Add to config.toml:**
````toml
[params.newsletter]
  provider = "convertkit"
  formUrl = "https://your-username.ck.page/form-id"
  title = "Join the Journey"
  description = "Weekly insights on development and cycling. No spam, unsubscribe anytime."
````

5. **Test:**
   - Visit any page with sidebar
   - Submit test email
   - Check ConvertKit dashboard

**Customization:**

Edit `layouts/partials/newsletter-subscribe.html` to change:
- Title and description
- Button text
- Styling

---

### Buttondown (Alternative)

**Why Buttondown:**
- ✅ Free up to 100 subscribers
- ✅ Simple and clean
- ✅ Markdown emails
- ✅ Privacy-focused
- ✅ No ads

**Setup Steps:**

1. **Sign up:** https://buttondown.email

2. **Get your username** from dashboard

3. **Update form action:**

**Edit:** `layouts/partials/newsletter-subscribe.html`
````html
<form action="https://buttondown.email/api/emails/embed-subscribe/YOUR-USERNAME" 
      method="post" 
      class="newsletter-form" 
      target="_blank">
    <input type="email" name="email" placeholder="Your email" required>
    <button type="submit">Subscribe</button>
</form>
````

---

## Comments Integration

### Cusdis (Recommended)

**Why Cusdis:**
- ✅ Free and open source
- ✅ Privacy-friendly
- ✅ No account required for readers
- ✅ Lightweight
- ✅ Self-hosted (you control data)

**Setup Steps:**

1. **Fork Cusdis:**
   - Visit https://github.com/djyde/cusdis
   - Click "Fork"

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your Cusdis fork
   - Vercel auto-detects Next.js settings

3. **Create database:**
   - In Vercel project settings
   - Go to Storage → Create Database
   - Choose "Postgres"
   - Select free plan
   - Click Create

4. **Set environment variables:**

In Vercel project settings → Environment Variables:
````bash
NEXTAUTH_URL=https://your-cusdis.vercel.app
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
USERNAME=admin
PASSWORD=your-secure-password
````

5. **Deploy and access dashboard:**
   - Visit `https://your-cusdis.vercel.app/dashboard`
   - Login with USERNAME/PASSWORD
   - Create a website
   - Copy the App ID

6. **Add to config.toml:**
````toml
[params.cusdis]
  host = "https://your-cusdis.vercel.app"
  appId = "your-app-id"
````

7. **Test:**
   - Visit a blog post
   - Comments section should appear
   - Submit test comment
   - Check Cusdis dashboard

**Moderation:**

Comments require approval in Cusdis dashboard by default.

To auto-approve:
- Dashboard → Settings
- Disable "Moderate comments"

---

### Giscus (Alternative - Tech Blogs Only)

**Why Giscus:**
- ✅ Free and open source
- ✅ Uses GitHub Discussions
- ✅ Markdown support
- ✅ Reactions (👍👎❤️)

**Why NOT for mixed blogs:**
- ❌ Requires GitHub account
- ❌ Not suitable for non-tech readers

**Setup Steps:**

1. **Enable GitHub Discussions:**
   - Go to your GitHub repo
   - Settings → General
   - Features → Enable Discussions

2. **Install Giscus app:**
   - Visit https://github.com/apps/giscus
   - Click Configure
   - Select your repository

3. **Generate configuration:**
   - Go to https://giscus.app
   - Enter your repo (username/repo-name)
   - Choose discussion category
   - Copy the generated code

4. **Update comments partial:**

**Edit:** `layouts/partials/comments-giscus.html`
````html
<div class="comments">
    <h3 class="comments__title">Comments</h3>
    <div id="giscus-container"></div>
</div>

<script src="https://giscus.app/client.js"
        data-repo="yourusername/your-repo"
        data-repo-id="YOUR_REPO_ID"
        data-category="General"
        data-category-id="YOUR_CATEGORY_ID"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
````

---

## Analytics Integration

### Google Analytics 4

**Setup Steps:**

1. **Create GA4 property:**
   - Go to https://analytics.google.com
   - Create account/property
   - Copy Measurement ID (G-XXXXXXXXXX)

2. **Add to config.toml:**
````toml
[params]
  googleAnalytics = "G-XXXXXXXXXX"
````

3. **Verify:**
   - Visit your site
   - Check GA4 Realtime report
   - Should see your visit

**Privacy Note:**

Google Analytics only loads after cookie consent is given (built into cookie consent setup).

---

### Plausible (Privacy-Focused Alternative)

**Why Plausible:**
- ✅ Privacy-friendly (no cookies)
- ✅ GDPR compliant
- ✅ Lightweight script
- ✅ Simple dashboard

**Setup Steps:**

1. **Sign up:** https://plausible.io (paid after trial)

2. **Add domain** in Plausible dashboard

3. **Add script:**

**Edit:** `layouts/_default/baseof.html`
````html
<head>
    <!-- ... other head elements ... -->
    
    <!-- Plausible Analytics -->
    <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
</head>
````

**Self-Hosted Option:**
````bash
# Clone Plausible
git clone https://github.com/plausible/hosting
cd hosting

# Configure
nano plausible-conf.env

# Start with Docker
docker-compose up -d
````

---

## Search Integration

Already built-in! Just ensure:

**config.toml has:**
````toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
````

**index.json exists:**
`layouts/_default/index.json` ✅

**Search page exists:**
`content/search.md` ✅

**Fuse.js loads:**
`layouts/_default/search.html` loads from CDN ✅

---

## Social Sharing Integration

### Add Share Buttons

**Create:** `layouts/partials/share-buttons.html`
````html
{{ $url := .Permalink }}
{{ $title := .Title }}

<div class="share-buttons">
    <h4>Share this post</h4>
    <div class="share-buttons__grid">
        <!-- Twitter -->
        <a href="https://twitter.com/intent/tweet?url={{ $url }}&text={{ $title }}" 
           target="_blank" 
           rel="noopener"
           class="share-button share-button--twitter">
            🐦 Twitter
        </a>
        
        <!-- LinkedIn -->
        <a href="https://www.linkedin.com/sharing/share-offsite/?url={{ $url }}" 
           target="_blank" 
           rel="noopener"
           class="share-button share-button--linkedin">
            💼 LinkedIn
        </a>
        
        <!-- Facebook -->
        <a href="https://www.facebook.com/sharer/sharer.php?u={{ $url }}" 
           target="_blank" 
           rel="noopener"
           class="share-button share-button--facebook">
            👥 Facebook
        </a>
        
        <!-- Email -->
        <a href="mailto:?subject={{ $title }}&body={{ $url }}" 
           class="share-button share-button--email">
            ✉️ Email
        </a>
    </div>
</div>
````

**Add to post:**

**Edit:** `layouts/_default/single.html`
````html
<article class="post">
    {{ .Content }}
    
    <!-- Add share buttons -->
    {{ partial "share-buttons.html" . }}
    
    {{ partial "author-bio.html" . }}
</article>
````

---

## RSS Feed

Already built-in! Hugo auto-generates:

- Site feed: `/index.xml`
- Category feed: `/categories/tech/index.xml`
- Tag feed: `/tags/hugo/index.xml`

**Customize feed:**

**Create:** `layouts/_default/rss.xml`
````xml
{{- $pctx := . -}}
{{- if .IsHome -}}{{ $pctx = .Site }}{{- end -}}
{{- $pages := $pctx.RegularPages -}}
{{- $limit := .Site.Config.Services.RSS.Limit -}}
{{- if ge $limit 1 -}}
{{- $pages = $pages | first $limit -}}
{{- end -}}
{{- printf "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>" | safeHTML }}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ if eq  .Title  .Site.Title }}{{ .Site.Title }}{{ else }}{{ with .Title }}{{.}} on {{ end }}{{ .Site.Title }}{{ end }}</title>
    <link>{{ .Permalink }}</link>
    <description>Recent content {{ if ne  .Title  .Site.Title }}{{ with .Title }}in {{.}} {{ end }}{{ end }}on {{ .Site.Title }}</description>
    <generator>Hugo -- gohugo.io</generator>
    <language>{{ .Site.LanguageCode }}</language>{{ with .Site.Author.email }}
    <managingEditor>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</managingEditor>{{end}}{{ with .Site.Author.email }}
    <webMaster>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</webMaster>{{end}}{{ with .Site.Copyright }}
    <copyright>{{.}}</copyright>{{end}}{{ if not .Date.IsZero }}
    <lastBuildDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</lastBuildDate>{{ end }}
    {{ with .OutputFormats.Get "RSS" }}
        {{ printf "<atom:link href=%q rel=\"self\" type=%q />" .Permalink .MediaType | safeHTML }}
    {{ end }}
    {{ range $pages }}
    <item>
      <title>{{ .Title }}</title>
      <link>{{ .Permalink }}</link>
      <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</pubDate>
      {{ with .Site.Author.email }}<author>{{.}}{{ with $.Site.Author.name }} ({{.}}){{end}}</author>{{end}}
      <guid>{{ .Permalink }}</guid>
      <description>{{ .Summary | html }}</description>
    </item>
    {{ end }}
  </channel>
</rss>
````

---

## Webmentions (Advanced)

**What are Webmentions:**
Decentralized way to show when other sites link to you.

**Setup:**

1. **Sign up:** https://webmention.io

2. **Add to HTML:**

**Edit:** `layouts/_default/baseof.html`
````html
<head>
    <link rel="webmention" href="https://webmention.io/yourdomain.com/webmention" />
    <link rel="pingback" href="https://webmention.io/yourdomain.com/xmlrpc" />
</head>
````

3. **Display webmentions:**

Use their JavaScript widget or build custom display.

---

## Email Signup Forms

### Inline Form (Already Built)

Newsletter widget in sidebar ✅

### Popup Form

**Create:** `layouts/partials/popup-newsletter.html`
````html
<div class="newsletter-popup" id="newsletterPopup">
    <div class="newsletter-popup__content">
        <button class="newsletter-popup__close" onclick="closeNewsletterPopup()">×</button>
        <h3>📧 Never miss a post!</h3>
        <p>Get weekly updates on tech and cycling delivered to your inbox.</p>
        <form action="{{ .Site.Params.newsletter.formUrl }}" method="post" target="_blank">
            <input type="email" name="email" placeholder="Your email" required>
            <button type="submit" class="button">Subscribe</button>
        </form>
    </div>
</div>

<script>
// Show popup after 30 seconds
setTimeout(function() {
    const popup = document.getElementById('newsletterPopup');
    if (!localStorage.getItem('newsletterShown')) {
        popup.style.display = 'flex';
        localStorage.setItem('newsletterShown', 'true');
    }
}, 30000);

function closeNewsletterPopup() {
    document.getElementById('newsletterPopup').style.display = 'none';
}
</script>

<style>
.newsletter-popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.newsletter-popup__content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    position: relative;
}

.newsletter-popup__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
}
</style>
````

---

## Integration Checklist

Before going live:

- [ ] Newsletter form works (test subscription)
- [ ] Comments appear on posts
- [ ] Comments moderation working (if enabled)
- [ ] Analytics tracking (check realtime)
- [ ] RSS feed validates (use https://validator.w3.org/feed/)
- [ ] Social share buttons work
- [ ] All external scripts load (check console)
- [ ] Cookie consent blocks analytics until accepted

---

## Next Steps

✅ Newsletter configured  
✅ Comments working  
✅ Analytics tracking  

Continue to → [Deployment Guide](08-deployment.md)