# Troubleshooting Guide

Common issues and how to fix them.

## Build Issues

### Hugo Build Fails

**Error:** `Error: Unable to locate config file or config directory`

**Solution:**
````bash
# Ensure you're in the correct directory
ls config.toml  # Should exist

# Or check for config directory
ls config/_default/config.toml
````

---

**Error:** `failed to resolve @use`

**Cause:** Using `@use` syntax without Dart Sass

**Solution 1 - Install Dart Sass:**
````bash
# Ubuntu
wget https://github.com/sass/dart-sass-embedded/releases/download/1.69.5/sass_embedded-1.69.5-linux-x64.tar.gz
tar -xzf sass_embedded-1.69.5-linux-x64.tar.gz
sudo mv sass_embedded /usr/local/bin/
````

**Solution 2 - Use @import instead:**

Change all `@use 'file';` to `@import 'file';` in Sass files.

---

**Error:** `TOCSS: failed to transform "scss/style.scss"`

**Cause:** Sass syntax error

**Solution:**
````bash
# Check error message for line number
# Common issues:
# - Missing semicolon
# - Unclosed bracket
# - Undefined variable

# Test which file or variable is missing
cd assets/scss
sass main.scss

# Test Sass compilation
hugo server -D --verbose
````

---

**Error:** `Image not found`

**Cause:** Image file missing or incorrect path

**Solution:**
````bash
# Check image exists
ls content/blog/my-post/photo.jpg

# Check filename matches exactly (case-sensitive)
# "photo.jpg" ≠ "Photo.jpg"

# Ensure using shortcode
{{< img src="photo.jpg" alt="Description" >}}

# Not markdown image syntax
![Description](photo.jpg)  # Won't work with processing
````

---

### Build Works Locally But Fails on Netlify/Vercel

**Cause:** Different Hugo version or missing files

**Solution:**

**Set Hugo version:**

Netlify - `netlify.toml`:
````toml
[build.environment]
  HUGO_VERSION = "0.122.0"
````

Vercel - Environment Variables:
````
HUGO_VERSION = 0.122.0
````

**Ensure all files committed:**
````bash
git status  # Check for uncommitted files
git add .
git commit -m "Add missing files"
git push
````

---

## Content Issues

### Post Not Appearing

**Check:**
````yaml
---
draft: false  # Not true
---
````

**Check date:**
````yaml
---
date: 2026-02-01  # Not in future
---
````

**Check content type:**
````bash
# Post should be in blog/
content/blog/my-post/index.md  ✅
content/my-post.md             ❌
````

---

### Table of Contents Not Showing

**Check front matter:**
````yaml
---
toc: true  # Must be set
---
````

**Check content length:**

TOC only shows if content has headings:
````markdown
## Heading 1  # H2 required
### Subheading
````

**Check TOC partial:**
````bash
ls layouts/partials/table-of-contents.html  # Should exist
````

---

### Author Bio Not Appearing

**Check author file exists:**
````bash
ls data/authors/alfred-tuinman.yaml  # Should exist
````

**Check defaultAuthor in config:**
````toml
[params]
  defaultAuthor = "alfred-tuinman"  # Matches filename
````

**Check author in post:**
````yaml
---
author: "alfred-tuinman"  # Matches filename (without .yaml)
---
````

---

## Image Issues

### Images Not Loading

**Diagnosis:**
````bash
# 1. Check browser console for 404 errors
# Right-click → Inspect → Console

# 2. Check file exists
ls content/blog/my-post/photo.jpg

# 3. Check using page bundle
content/blog/my-post/
├── index.md     ✅
└── photo.jpg    ✅

# Not single file:
content/blog/
└── my-post.md   ❌
````

**Solution:**

Convert to page bundle:
````bash
# Create directory
mkdir content/blog/my-post

# Move file
mv content/blog/my-post.md content/blog/my-post/index.md

# Move images
mv content/blog/photo.jpg content/blog/my-post/
````

---

### Images Not Optimizing

**Check using shortcode:**
````markdown
# Correct
{{< img src="photo.jpg" alt="Description" >}}

# Won't optimize
![Description](photo.jpg)
````

**Check Hugo version:**
````bash
hugo version  # Should show "extended"
````

---

### WebP Not Working

**Check browser support:**
- Chrome/Edge: ✅
- Firefox: ✅
- Safari 14+: ✅
- IE: ❌ (JPEG fallback works)

**Check image shortcode:**

Should have both WebP and JPEG sources:
````html
<source type="image/webp" srcset="...">
<source type="image/jpeg" srcset="...">
<img src="fallback.jpg">
````

---

## Search Issues

### Search Not Working

**Check index.json exists:**
````bash
# Visit in browser
https://yourdomain.com/index.json

# Should show JSON with posts
````

**Check config.toml:**
````toml
[outputs]
  home = ["HTML", "RSS", "JSON"]  # JSON required
````

**Check Fuse.js loading:**

Browser console should show no errors loading:
````
https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js
````

# If you have openssl check for the integrity code to be mentioned after 'sha256-'
````bash
curl -s https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js | openssl dgst -sha256 -binary | openssl base64 -A
````

**Check search.js:**
````bash
ls assets/js/search.js  # Should exist
````

---

### Search Returns No Results

**Check index has content:**

Visit `/index.json` - should see posts with:
- title
- content
- summary
- tags
- categories

**Check search threshold:**

Edit `assets/js/search.js`:
````javascript
fuse = new Fuse(searchData, {
    threshold: 0.4,  // Try 0.6 for more lenient matching
    // ...
});
````

---

## Styling Issues

### CSS Not Loading

**Check build output:**
````bash
hugo server -D --verbose

# Should see:
# Processing scss/style.scss
````

**Check public directory:**
````bash
ls public/css/  # Should have style.*.css
````

**Check browser console:**
````
Right-click → Inspect → Console
# Should show no CSS errors
````

**Check baseof.html:**
````html
{{- $style := resources.Get "scss/style.scss" | toCSS | minify | fingerprint -}}
<link rel="stylesheet" href="{{ $style.RelPermalink }}">
````

---

### Styles Not Updating

**Clear cache:**
````bash
# Clear Hugo cache
rm -rf resources

# Rebuild
hugo server -D
````

**Hard refresh browser:**
````
Ctrl + Shift + R (Linux/Windows)
Cmd + Shift + R (Mac)
````

---

### Sass Variables Not Working

**Check import order:**

`style.scss` should import `_variables.scss` first:
````scss
@use 'variables' as *;  // First
@use 'base';            // Then others
````

**Check variable defined:**

In `_variables.scss`:
````scss
$color-primary: #2563eb;  // Should exist
````

**Check syntax:**
````scss
// Correct
color: $color-primary;

// Wrong
color: color-primary;  // Missing $
````

---

## JavaScript Issues

### Scripts Not Loading

**Check browser console:**
````
Right-click → Inspect → Console
````

Common errors:
- `404` - File not found
- `Syntax error` - JavaScript syntax error
- `... is not defined` - Variable/function not found

**Check file exists:**
````bash
ls assets/js/main.js
````

**Check baseof.html:**
````html
{{- $main := resources.Get "js/main.js" | minify | fingerprint -}}
<script src="{{ $main.RelPermalink }}"></script>
````

---

### Gallery Not Alternating

**Check wrapper:**
````markdown
# Must have wrapper
{{< gallery >}}
{{< img src="1.jpg" alt="1" >}}
{{< img src="2.jpg" alt="2" >}}
{{< /gallery >}}
````

**Check JavaScript loaded:**

Browser console → Sources → search for `gallery.js`

**Check browser width:**

Alternating only works on desktop (>768px)

---

## Deployment Issues

### Site Builds But Shows Blank Page

**Check baseURL:**

`config.toml`:
````toml
baseURL = "https://yourdomain.com/"  # With trailing slash
````

**Check browser console:**

Assets might be loading from wrong URL.

---

### Assets Not Loading (404)

**Check publish directory:**

Should be `public`:
````toml
# Netlify
publishDir = "public"
````

**Check asset paths:**

All assets should be relative or absolute from root:
````html
<!-- Correct -->
/css/style.css
{{ .RelPermalink }}

<!-- Wrong -->
css/style.css  # Missing leading slash
````

---

### Newsletter Form Not Submitting

**Check form URL:**
````toml
[params.newsletter]
  formUrl = "https://convertkit.com/..."  # Correct URL
````

**Check browser console:**

Look for CORS or network errors.

**Test form directly:**

Visit form URL in browser - should show signup page.

---

### Comments Not Appearing

**Check Cusdis configuration:**
````toml
[params.cusdis]
  host = "https://your-cusdis.vercel.app"  # Correct URL
  appId = "your-app-id"                     # Correct ID
````

**Check Cusdis is running:**

Visit `https://your-cusdis.vercel.app/dashboard`

Should load dashboard.

**Check browser console:**

Look for errors loading Cusdis script.

---

## Performance Issues

### Slow Page Load

**Check image sizes:**
````bash
# Find large images
find content -name "*.jpg" -size +500k
find content -name "*.png" -size +500k
````

Optimize large images:
````bash
mogrify -resize 1200x\> -quality 85 large-image.jpg
````

**Check total page size:**

Browser DevTools → Network → Check total size

Target: <500KB per page

---

### High Memory Usage

**Check number of images:**

Too many images on one page can use memory.

**Solution:** Split into multiple pages or use pagination.

---

## Common Error Messages

### `command not found: hugo`

**Solution:**
````bash
# Reinstall Hugo
sudo apt install hugo

# Or check PATH
echo $PATH
which hugo
````

---

### `permission denied`

**Solution:**
````bash
# Fix permissions
sudo chown -R $USER:$USER ~/your-blog

# Make script executable
chmod +x deploy.sh
````

---

### `port already in use`

**Solution:**
````bash
# Find process using port 1313
lsof -i :1313

# Kill process
kill <PID>

# Or use different port
hugo server -p 8080
````

---

## Getting Help

### Check Hugo Documentation

https://gohugo.io/documentation/

### Hugo Discourse Forum

https://discourse.gohugo.io/

### Search GitHub Issues

https://github.com/gohugoio/hugo/issues

### Enable Verbose Logging
````bash
hugo server -D --verbose --debug
````

### Create Minimal Reproducible Example

1. Create new test site
2. Add minimal code to reproduce issue
3. Test if issue persists
4. Share on forum with code

---

## Debug Checklist

When something doesn't work:

- [ ] Check browser console for errors
- [ ] Run `hugo server -D --verbose`
- [ ] Check file exists and in correct location
- [ ] Check file permissions
- [ ] Clear cache (`rm -rf resources public`)
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Test in incognito/private window
- [ ] Check recent changes (git log)
- [ ] Revert to last working version
- [ ] Ask for help with specific error messages

---

## Next Steps

✅ Understand common issues  
✅ Know how to debug  
✅ Can fix most problems  

Continue to → [Advanced Features](11-advanced.md)