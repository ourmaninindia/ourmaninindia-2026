# Project Structure

Understanding how your Hugo blog is organized.

## Directory Tree
```
my-blog/
├── assets/                 # Processed files (Sass, JS)
│   ├── scss/              # Stylesheets
│   │   ├── style.scss
│   │   ├── _variables.scss
│   │   ├── _base.scss
│   │   ├── _components.scss
│   │   └── blocks/
│   └── js/                # JavaScript
│       ├── main.js
│       ├── reading-progress.js
│       ├── search.js
│       └── gallery.js
│
├── content/               # Your content (Markdown)
│   ├── blog/             # Blog posts
│   │   └── example-post/
│   │       ├── index.md
│   │       └── *.jpg
│   ├── about.md
│   ├── contact.md
│   └── search.md
│
├── data/                  # Data files (YAML/JSON)
│   └── authors/
│       └── alfred-tuinman.yaml
│
├── layouts/               # HTML templates
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── single.html
│   │   ├── list.html
│   │   ├── index.json
│   │   └── 404.html
│   ├── partials/
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── ...
│   └── shortcodes/
│       ├── img.html
│       ├── gallery.html
│       └── ...
│
├── static/                # Static files (served as-is)
│   └── images/
│       └── author/
│
├── i18n/                  # Translations
│   ├── en.toml
│   └── fr.toml
│
├── public/                # Generated site (DO NOT EDIT)
├── resources/             # Hugo cache (DO NOT EDIT)
├── config.toml            # Site configuration
└── README.md
```

## Key Directories Explained

### `/assets` - Processed Files

Files here are processed by Hugo Pipes:
- **Minified** in production
- **Fingerprinted** for cache busting
- **Optimized** automatically

**Sass Structure:**
```
assets/scss/
├── style.scss              # Main file (imports all)
├── _variables.scss         # Colors, spacing, breakpoints
├── _base.scss              # Reset, typography
├── _components.scss        # Reusable components
└── blocks/                 # BEM blocks
    ├── _nav.scss           # Navigation
    ├── _blog.scss          # Blog listing
    ├── _post.scss          # Single post
    ├── _sidebar.scss       # Sidebar widgets
    ├── _search.scss        # Search page
    ├── _contact.scss       # Contact page
    ├── _comments.scss      # Comments
    ├── _cookie-consent.scss # Cookie banner
    ├── _error.scss         # 404 page
    ├── _about.scss         # About page
    ├── _newsletter.scss    # Newsletter widget
    ├── _galleries.scss     # Image galleries
    ├── _newspaper.scss     # Newspaper layout
    └── _cycling-story.scss # Cycling stories
```

**JavaScript Structure:**
```
assets/js/
├── main.js                 # Core functionality
├── reading-progress.js     # Progress bar
├── search.js               # Search logic
└── gallery.js              # Gallery scripts
```

### `/content` - Your Content

All your Markdown files live here.

**Page Bundles (Recommended):**
```
content/blog/my-post/
├── index.md                # Post content
├── featured.jpg            # Featured image
├── image1.jpg              # Content images
└── image2.jpg
```

**vs. Single Files (Old way):**
```
content/blog/
└── my-post.md              # Post content
```

Page bundles keep images with their posts.

### `/data` - Structured Data

YAML or JSON files for structured content.

**Example - Author Data:**
```yaml
# data/authors/alfred-tuinman.yaml
name: "Alfred Tuinman"
bio: "Developer and cyclist"
avatar: /images/author/alfred.jpg
github: ourmaninindia
linkedin: ourmaninindia
```

Access in templates:
```html
{{ $author := index .Site.Data.authors "alfred-tuinman" }}
{{ $author.name }}
```

### `/layouts` - Templates

HTML templates that define structure.

**Template Hierarchy:**
```
layouts/
├── _default/
│   ├── baseof.html         # Base template (header/footer)
│   ├── single.html         # Single post
│   ├── list.html           # Blog listing
│   └── index.html          # Homepage
├── partials/               # Reusable components
│   ├── header.html
│   ├── footer.html
│   ├── sidebar.html
│   └── ...
└── shortcodes/             # Content snippets
    ├── img.html
    ├── gallery.html
    └── ...
```

### `/static` - Static Assets

Files served exactly as-is (no processing).

**Use for:**
- Images that don't need optimization
- Fonts
- Favicon
- robots.txt

**Don't use for:**
- CSS (use `/assets/scss/`)
- JavaScript (use `/assets/js/`)
- Post images (use page bundles)

### `/i18n` - Translations

Translation strings for multilingual sites.

**Example - English:**
```toml
# i18n/en.toml
[readMore]
other = "Read More"

[tags]
other = "Tags"
```

**Example - French:**
```toml
# i18n/fr.toml
[readMore]
other = "Lire la suite"

[tags]
other = "Étiquettes"
```

Use in templates:
```html
{{ i18n "readMore" }}
```

### `/public` - Generated Site

**DO NOT EDIT FILES HERE**

This is where Hugo builds your site. It's regenerated every build.

Add to `.gitignore`:
```
/public/
/resources/
```

## File Types

### Markdown Files (`.md`)

Your content:
```markdown
---
title: "My Post"
date: 2026-02-01
---

Content here...
```

### HTML Templates (`.html`)

Layout structure:
```html
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}
{{ end }}
```

### Sass Files (`.scss`)

Styles:
```scss
.my-class {
    color: $color-primary;
    padding: $spacing-md;
}
```

### TOML Files (`.toml`)

Configuration:
```toml
baseURL = "https://example.com/"
title = "My Blog"
```

### YAML Files (`.yaml`)

Data and front matter:
```yaml
name: Alfred
role: Developer
```

## Important Files

### `config.toml`

Main site configuration. Controls:
- Site settings (URL, title, language)
- Menus
- Parameters
- Build options

### `baseof.html`

Base template that wraps all pages. Contains:
- `<head>` section
- Header
- Main content area
- Footer

### `style.scss`

Main stylesheet that imports all other styles.

## Working with Files

### Create New Post
```bash
# Page bundle (recommended)
hugo new blog/my-post/index.md

# Single file (old way)
hugo new blog/my-post.md
```

### Add Images

**For page bundles:**
```bash
# Place in same folder as index.md
cp ~/Downloads/photo.jpg content/blog/my-post/
```

**For static images:**
```bash
# Place in static/images/
cp ~/Downloads/logo.png static/images/
```

### Edit Styles
```bash
# Edit Sass variables
nano assets/scss/_variables.scss

# Edit specific block
nano assets/scss/blocks/_post.scss

# Main stylesheet
nano assets/scss/style.scss
```

### Edit Templates
```bash
# Edit base template
nano layouts/_default/baseof.html

# Edit post template
nano layouts/_default/single.html

# Edit partial
nano layouts/partials/header.html
```

## File Permissions

Ensure correct permissions:
```bash
# Fix permissions on entire blog
sudo chown -R $USER:$USER ~/your-blog

# Make scripts executable
chmod +x deploy.sh
```

## Ignored Files

`.gitignore` should include:
```
# Hugo
/public/
/resources/

# OS
.DS_Store
Thumbs.db

# Editors
.vscode/
.idea/
*.swp
*.swo

# Temporary
*~
.#*
```

## Next Steps

✅ Understand directory structure  
✅ Know where to put files  
✅ Understand file types  

Continue to → [Configuration](03-configuration.md)