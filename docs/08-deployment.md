# Deployment Guide

Deploy your Hugo blog to production on various platforms.

## Pre-Deployment Checklist

Before deploying:

- [ ] Build works locally: `hugo --minify`
- [ ] No errors in build output
- [ ] All images load correctly
- [ ] Search works (test on `/search`)
- [ ] Newsletter form configured
- [ ] Comments configured
- [ ] Analytics configured
- [ ] Author bio appears
- [ ] Reading progress bar works
- [ ] Table of contents works
- [ ] Mobile responsive (test on phone)
- [ ] `baseURL` correct in config.toml
- [ ] `.gitignore` includes `/public/` and `/resources/`

---

## Netlify (Recommended)

**Why Netlify:**
- ✅ Free tier is generous
- ✅ Auto-deploy from Git
- ✅ Built-in CDN
- ✅ HTTPS automatic
- ✅ Custom domains free
- ✅ Form handling
- ✅ Easy rollbacks

### Setup Steps

1. **Push to GitHub:**
````bash
# Initialize Git (if not already)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/your-blog.git
git branch -M main
git push -u origin main
````

2. **Connect to Netlify:**

- Go to https://netlify.com
- Click "Add new site" → "Import an existing project"
- Choose GitHub
- Select your repository
- Configure build settings:
````
Build command: hugo --minify
Publish directory: public
````

3. **Environment Variables (if needed):**

Site settings → Environment variables → Add:
````
HUGO_VERSION = 0.154.5
CONVERTKIT_API_KEY = your_api_key_here
CONVERTKIT_FORM_ID = your_form_id_here
````

4. **Deploy:**

- Click "Deploy site"
- Wait 1-2 minutes
- Site is live!

5. **Custom Domain:**

Site settings → Domain management → Add custom domain
````
yourdomain.com
````

Follow DNS instructions (add A record or CNAME).

### Auto-Deploy

Every push to `main` branch triggers auto-deploy:
````bash
# Make changes
git add .
git commit -m "Update post"
git push

# Netlify auto-deploys
````

### Netlify Configuration File

**Create:** `netlify.toml`
````toml
[build]
  publish = "public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.122.0"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --buildFuture --buildDrafts --minify"

[[redirects]]
  from = "/old-url/*"
  to = "/new-url/:splat"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
````

---

## Vercel

**Why Vercel:**
- ✅ Similar to Netlify
- ✅ Great for Next.js (if you expand)
- ✅ Easy setup
- ✅ Free tier

### Setup Steps

1. **Push to GitHub** (same as Netlify)

2. **Import to Vercel:**

- Go to https://vercel.com
- Click "Add New..." → "Project"
- Import your GitHub repo
- Vercel auto-detects Hugo
- Override settings:
````
Framework Preset: Hugo
Build Command: hugo --minify
Output Directory: public
````

3. **Environment Variables:**
````
HUGO_VERSION = 0.122.0
````

4. **Deploy:**

- Click "Deploy"
- Wait 1-2 minutes
- Live!

### Vercel Configuration

**Create:** `vercel.json`
````json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.122.0"
    }
  }
}
````

---

## GitHub Pages

**Why GitHub Pages:**
- ✅ Completely free
- ✅ Integrated with GitHub
- ✅ Good for simple sites

**Why NOT:**
- ❌ More setup required
- ❌ No automatic HTTPS for custom domains
- ❌ Slower than Netlify/Vercel

### Setup Steps

1. **Create GitHub repo** (if not already)

2. **Create GitHub Actions workflow:**

**Create:** `.github/workflows/hugo.yml`
````yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.122.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
      
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      
      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
````

3. **Enable GitHub Pages:**

- Go to repo Settings
- Pages (left sidebar)
- Source: GitHub Actions
- Save

4. **Push to trigger deploy:**
````bash
git add .github/workflows/hugo.yml
git commit -m "Add GitHub Pages workflow"
git push
````

5. **Access site:**
````
https://yourusername.github.io/your-repo-name/
````

### Custom Domain on GitHub Pages

1. **Add CNAME file:**
````bash
echo "yourdomain.com" > static/CNAME
git add static/CNAME
git commit -m "Add custom domain"
git push
````

2. **Configure DNS:**

Add A records pointing to:
````
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
````

Or CNAME record:
````
yourusername.github.io
````

---

## Traditional Web Hosting

### Via FTP/SFTP

1. **Build locally:**
````bash
hugo --minify
````

2. **Upload `public/` folder:**

Use FileZilla, WinSCP, or command line:
````bash
# Using rsync
rsync -avz --delete public/ user@yourserver.com:/var/www/html/

# Using scp
scp -r public/* user@yourserver.com:/var/www/html/
````

3. **Configure web server:**

**Nginx:**
````nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
````

**Apache:**

**Create:** `.htaccess` in `static/`
````apache
# Redirect www to non-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Error pages
ErrorDocument 404 /404.html
````

---

## Deploy Script

**Create:** `deploy.sh`
````bash
#!/bin/bash

echo "🚀 Deploying blog..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf public

# Build site
echo "🔨 Building site..."
hugo --minify

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to server (adjust for your setup)
    echo "📤 Uploading to server..."
    rsync -avz --delete public/ user@yourserver.com:/var/www/html/
    
    if [ $? -eq 0 ]; then
        echo "✅ Deploy successful!"
        echo "🌍 Site live at: https://yourdomain.com"
    else
        echo "❌ Deploy failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
````

**Make executable:**
````bash
chmod +x deploy.sh
````

**Use:**
````bash
./deploy.sh
````

---

## CI/CD with GitLab

**Create:** `.gitlab-ci.yml`
````yaml
image: ubuntu:22.04

variables:
  HUGO_VERSION: "0.122.0"
  GIT_SUBMODULE_STRATEGY: recursive

before_script:
  - apt-get update
  - apt-get install -y wget
  - wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
  - dpkg -i hugo_extended_${HUGO_VERSION}_linux-amd64.deb

pages:
  script:
    - hugo --minify
  artifacts:
    paths:
      - public
  only:
    - main
````

---

## Docker Deployment

**Create:** `Dockerfile`
````dockerfile
FROM klakegg/hugo:0.122.0-ext-alpine AS builder

WORKDIR /src
COPY . .

RUN hugo --minify

FROM nginx:alpine

COPY --from=builder /src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
````

**Create:** `nginx.conf`
````nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 80;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ =404;
        }
        
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 1y;
            add_header Cache-Control "public";
        }
    }
}
````

**Build and run:**
````bash
# Build image
docker build -t my-blog .

# Run container
docker run -d -p 80:80 my-blog
````

---

## Post-Deployment

### Verify Deployment

- [ ] Site loads at production URL
- [ ] All pages accessible (no 404s)
- [ ] Images load correctly
- [ ] CSS/JS loads (check browser console)
- [ ] Search works
- [ ] Newsletter signup works
- [ ] Comments appear
- [ ] Analytics tracking (check dashboard)
- [ ] HTTPS works (if applicable)
- [ ] Custom domain works (if applicable)

### Performance Check
````bash
# Test with Google PageSpeed
https://pagespeed.web.dev/

# Test with GTmetrix
https://gtmetrix.com/

# Test with WebPageTest
https://www.webpagetest.org/
````

### Submit to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add site
3. Submit sitemap

---

## Rollback

### Netlify

- Deploys → Click on previous deploy → "Publish deploy"

### Vercel

- Deployments → Click previous → "Promote to Production"

### Git-based (All platforms)
````bash
# Find previous commit
git log --oneline

# Revert to previous commit
git revert HEAD

# Or reset (dangerous - rewrites history)
git reset --hard <commit-hash>
git push --force
````

---

## Deployment Troubleshooting

### Build Fails

**Check:**
1. Hugo version matches local
2. All dependencies available
3. No draft posts (unless `--buildDrafts`)
4. baseURL correct in config
5. Build logs for specific errors

### Site Loads But Broken

**Check:**
1. baseURL matches actual URL
2. Assets loading (check browser console)
3. Correct publish directory (should be `public`)
4. File permissions on server

### Images Not Loading

**Check:**
1. Images in correct location (page bundles)
2. Filenames match exactly (case-sensitive)
3. Using `{{< img >}}` shortcode
4. Images committed to Git

---

## Next Steps

✅ Site deployed to production  
✅ Custom domain configured  
✅ HTTPS enabled  
✅ Auto-deploy set up  

Continue to → [Performance Optimization](09-performance.md)