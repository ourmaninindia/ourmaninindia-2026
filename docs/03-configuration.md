# Configuration Guide

Complete guide to configuring your Hugo blog.

## Main Configuration File

All settings are in `config.toml` at the root of your project.

## Basic Settings
````toml
# Site Settings
baseURL = "https://yourdomain.com/"
languageCode = "en-us"
title = "Your Blog Name"
theme = ""  # Empty - we use custom layouts

# Enable Git info (last modified dates)
enableGitInfo = true

# Pagination
paginate = 10

# Output formats (JSON needed for search)
[outputs]
  home = ["HTML", "RSS", "JSON"]
  section = ["HTML", "RSS"]

# Permalinks
[permalinks]
  blog = "/blog/:slug/"

# Taxonomies
[taxonomies]
  tag = "tags"
  category = "categories"
````

## Site Parameters
````toml
[params]
  description = "Tech and Cycling Adventures"
  defaultAuthor = "alfred-tuinman"  # Matches data/authors/alfred-tuinman.yaml
  
  # Contact
  email = "hello@yourdomain.com"
  
  # Social Media (for meta tags)
  twitter = "yourhandle"
  github = "yourhandle"
  
  # Google Analytics (optional)
  googleAnalytics = "G-XXXXXXXXXX"
  
  # Newsletter
  [params.newsletter]
    provider = "convertkit"  # or "buttondown"
    formUrl = "https://your-username.ck.page/your-form-id"
    title = "Join the Journey"
    description = "Weekly insights on development and cycling. No spam, unsubscribe anytime."
  
  # Comments (Cusdis)
  [params.cusdis]
    host = "https://your-cusdis.vercel.app"
    appId = "your-app-id"
````

## Menu Configuration
````toml
[menu]
  [[menu.main]]
    name = "Home"
    url = "/"
    weight = 1
  
  [[menu.main]]
    name = "Blog"
    url = "/blog/"
    weight = 2
  
  [[menu.main]]
    name = "About"
    url = "/about/"
    weight = 3
  
  [[menu.main]]
    name = "Contact"
    url = "/contact/"
    weight = 4
  
  [[menu.main]]
    name = "Search"
    url = "/search/"
    weight = 5

  # Footer menu (optional)
  [[menu.footer]]
    name = "Privacy Policy"
    url = "/privacy/"
    weight = 1
  
  [[menu.footer]]
    name = "Terms"
    url = "/terms/"
    weight = 2
````

## Language Configuration

### Single Language
````toml
languageCode = "en-us"
defaultContentLanguage = "en"
````

### Multiple Languages
````toml
defaultContentLanguage = "en"

[languages]
  [languages.en]
    languageName = "English"
    weight = 1
    title = "My Blog"
    
    [languages.en.params]
      description = "Tech and Cycling Adventures"
    
    [[languages.en.menu.main]]
      name = "Home"
      url = "/"
      weight = 1
    
    [[languages.en.menu.main]]
      name = "Blog"
      url = "/blog/"
      weight = 2
  
  [languages.fr]
    languageName = "Français"
    weight = 2
    title = "Mon Blog"
    
    [languages.fr.params]
      description = "Aventures Technologiques et Cyclistes"
    
    [[languages.fr.menu.main]]
      name = "Accueil"
      url = "/"
      weight = 1
    
    [[languages.fr.menu.main]]
      name = "Blog"
      url = "/blog/"
      weight = 2
````

## Markup Configuration
````toml
[markup]
  # Table of contents
  [markup.tableOfContents]
    endLevel = 4
    ordered = false
    startLevel = 2
  
  # Goldmark (Markdown processor)
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true  # Allow HTML in Markdown
  
  # Syntax highlighting
  [markup.highlight]
    anchorLineNos = false
    codeFences = true
    guessSyntax = true
    hl_Lines = ""
    lineAnchors = ""
    lineNoStart = 1
    lineNos = false
    lineNumbersInTable = true
    noClasses = true
    style = "monokai"  # or dracula, github, etc.
    tabWidth = 4
````

## Build Configuration
````toml
[build]
  # Use Dart Sass for modern @use syntax
  [build.buildStats]
    enable = true

# Minification (production only)
[minify]
  disableCSS = false
  disableHTML = false
  disableJS = false
  disableJSON = false
  disableSVG = false
  disableXML = false
  
  [minify.tdewolff]
    [minify.tdewolff.html]
      keepWhitespace = false
````

## Security
````toml
[security]
  enableInlineShortcodes = false
  
  [security.exec]
    allow = ['^dart-sass-embedded$', '^go$', '^npx$', '^postcss$']
  
  [security.funcs]
    getenv = ['^HUGO_', '^CI$']
  
  [security.http]
    methods = ['(?i)GET|POST']
    urls = ['.*']
````

## Module Configuration

For Hugo Modules (advanced):
````toml
[module]
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  
  [[module.mounts]]
    source = 'static'
    target = 'static'
  
  [[module.mounts]]
    source = 'layouts'
    target = 'layouts'
  
  [[module.mounts]]
    source = 'content'
    target = 'content'
  
  [[module.mounts]]
    source = 'data'
    target = 'data'
  
  [[module.mounts]]
    source = 'i18n'
    target = 'i18n'
````

## Author Configuration

**Create:** `data/authors/alfred-tuinman.yaml`
````yaml
name: "Alfred Tuinman"
bio: "Former Finance Controller turned full-stack developer and global cyclist. Dutch national with experience across Europe, India, and Australia."
avatar: /images/author/alfred-tuinman.jpg
role: Full-Stack Developer & World Cyclist

# Social Media
github: ourmaninindia
linkedin: ourmaninindia
strava: ourmaninindia
facebook: ourmaninindia
website: https://alfredtuinman.com
email: alfred@alfredtuinman.com

# Optional
followers: 500
````

## Environment Variables

Create `.env` (add to `.gitignore`):
````bash
HUGO_ENV=development
HUGO_VERSION=0.122.0
````

For production:
````bash
HUGO_ENV=production
````

## Development vs Production

### Development (Local)
````bash
# Run with drafts
hugo server -D

# Run on specific port
hugo server -p 8080

# Build for development
hugo --buildDrafts --buildFuture
````

### Production (Deploy)
````bash
# Build for production
hugo --minify

# Build and clean public directory first
rm -rf public && hugo --minify
````

## Configuration by Environment

**config/_default/config.toml** (base config)
````toml
baseURL = "/"
title = "My Blog"
````

**config/production/config.toml** (production overrides)
````toml
baseURL = "https://yourdomain.com/"
googleAnalytics = "G-XXXXXXXXXX"
````

**config/development/config.toml** (development overrides)
````toml
baseURL = "http://localhost:1313/"
````

Use with:
````bash
# Development
hugo server --environment development

# Production
hugo --environment production --minify
````

## Testing Your Configuration
````bash
# Check configuration
hugo config

# List all configuration settings
hugo config --format json | jq

# Check specific value
hugo config | grep baseURL
````

## Common Configuration Patterns

### Blog with Multiple Authors
````toml
[params]
  defaultAuthor = "main-author"
````

Then in posts:
````yaml
---
author: "guest-author"  # Override default
---
````

### Category-Based Styling
````toml
[params]
  [params.categories]
    tech = "#2563eb"    # Blue
    cycling = "#10b981" # Green
````

Use in templates:
````html
{{ $color := index .Site.Params.categories .Params.categories }}
````

### Custom Date Formats
````toml
[params]
  dateFormat = "January 02, 2006"
  dateFormatShort = "Jan 02"
````

Use in templates:
````html
{{ .Date.Format .Site.Params.dateFormat }}
````

## Verification Checklist

After configuration:

- [ ] `baseURL` is correct (with trailing slash)
- [ ] `defaultAuthor` matches author file
- [ ] Menu items work (no 404s)
- [ ] Search enabled (`outputs` includes JSON)
- [ ] Language settings correct
- [ ] Newsletter URL configured
- [ ] Comments configured
- [ ] Analytics ID set (if using)

## Next Steps

✅ Site configured  
✅ Author data set up  
✅ Menus working  

Continue to → [Writing Posts](04-writing-posts.md)