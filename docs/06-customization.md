# Customization Guide

Customize colors, fonts, spacing, and styling for your Hugo blog.

## Understanding the Sass Architecture

Your blog uses a modular Sass structure:
````
assets/scss/
├── style.scss              # Main file (imports all)
├── _variables.scss         # Colors, spacing, breakpoints
├── _base.scss              # Reset, typography
├── _components.scss        # Reusable components
└── blocks/                 # BEM blocks
    ├── _nav.scss
    ├── _blog.scss
    ├── _post.scss
    └── ...
````

## Quick Customization

### Change Primary Color

**Edit:** `assets/scss/_variables.scss`
````scss
// From blue to green
$color-primary: #10b981;        // Green
$color-primary-hover: #059669;  // Darker green
````

### Change Font

**Edit:** `assets/scss/_variables.scss`
````scss
// System fonts (default - fast)
$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

// Or use custom font
$font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
````

**Add custom font:**

**Edit:** `layouts/_default/baseof.html`
````html
<head>
    <!-- Add before stylesheet -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Your stylesheet -->
    {{- $style := resources.Get "scss/style.scss" | toCSS | minify | fingerprint -}}
    <link rel="stylesheet" href="{{ $style.RelPermalink }}">
</head>
````

### Change Spacing

**Edit:** `assets/scss/_variables.scss`
````scss
// Tighter spacing
$spacing-xs: 6px;
$spacing-sm: 12px;
$spacing-md: clamp(12px, 2.5vw, 18px);
$spacing-lg: clamp(18px, 3vw, 24px);
$spacing-xl: clamp(24px, 5vw, 36px);

// Looser spacing
$spacing-xs: 10px;
$spacing-sm: 20px;
$spacing-md: clamp(20px, 3.5vw, 30px);
$spacing-lg: clamp(30px, 5vw, 40px);
$spacing-xl: clamp(40px, 7vw, 60px);
````

---

## Color Schemes

### Default (Blue)
````scss
$color-primary: #2563eb;
$color-primary-hover: #1d4ed8;
````

### Green (Nature/Cycling)
````scss
$color-primary: #10b981;
$color-primary-hover: #059669;
````

### Purple (Creative)
````scss
$color-primary: #8b5cf6;
$color-primary-hover: #7c3aed;
````

### Orange (Energetic)
````scss
$color-primary: #f59e0b;
$color-primary-hover: #d97706;
````

### Red (Bold)
````scss
$color-primary: #ef4444;
$color-primary-hover: #dc2626;
````

### Dark Mode Colors

**Edit:** `assets/scss/_variables.scss`
````scss
// Add dark mode variables
$color-bg-dark: #1f2937;
$color-text-dark: #f9fafb;
$color-border-dark: #374151;
````

**Edit:** `assets/scss/_base.scss`
````scss
// Add at the end
@media (prefers-color-scheme: dark) {
    body {
        background: $color-bg-dark;
        color: $color-text-dark;
    }
    
    .card, .post {
        background: lighten($color-bg-dark, 5%);
        border-color: $color-border-dark;
    }
}
````

---

## Typography Customization

### Font Sizes

**Edit:** `assets/scss/_base.scss`
````scss
html {
    // Smaller base size
    font-size: 15px;
    
    // Default
    font-size: 16px;
    
    // Larger base size
    font-size: 18px;
}
````

### Heading Styles

**Edit:** `assets/scss/_base.scss`
````scss
h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: 600;
    
    // Make headings bolder
    font-weight: 700;
    
    // Use different font for headings
    font-family: Georgia, serif;
    
    // Add letter spacing
    letter-spacing: -0.02em;
}
````

### Line Height

**Edit:** `assets/scss/_base.scss`
````scss
body {
    // Tighter line height
    line-height: 1.5;
    
    // Default
    line-height: 1.6;
    
    // Looser line height
    line-height: 1.8;
}
````

---

## Layout Customization

### Max Width

**Edit:** `assets/scss/_variables.scss`
````scss
// Narrower (better for reading)
$max-width: 1000px;

// Default
$max-width: 1200px;

// Wider
$max-width: 1400px;
````

### Sidebar Width

**Edit:** `assets/scss/blocks/_blog.scss`
````scss
.blog {
    &__grid {
        // Default: 320px sidebar
        grid-template-columns: 1fr 320px;
        
        // Wider sidebar
        grid-template-columns: 1fr 400px;
        
        // Narrower sidebar
        grid-template-columns: 1fr 280px;
    }
}
````

### Remove Sidebar

**Edit:** `assets/scss/blocks/_blog.scss`
````scss
.blog {
    &__grid {
        // Single column layout
        grid-template-columns: 1fr;
        grid-template-areas: "posts";
    }
    
    &__sidebar {
        display: none;
    }
}
````

---

## Component Customization

### Button Styles

**Edit:** `assets/scss/_components.scss`
````scss
.button {
    // Rounded buttons
    border-radius: $radius-full;
    
    // Sharp corners
    border-radius: 0;
    
    // Larger buttons
    padding: $spacing-md $spacing-xl;
    font-size: 1.125rem;
    
    // Outlined style
    background: transparent;
    color: $color-primary;
    border: 2px solid $color-primary;
    
    &:hover {
        background: $color-primary;
        color: white;
    }
}
````

### Card Styles

**Edit:** `assets/scss/_components.scss`
````scss
.card {
    // More shadow
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    
    // Outline instead of shadow
    box-shadow: none;
    border: 2px solid $color-border;
    
    // No borders
    border: none;
    box-shadow: none;
    background: transparent;
}
````

### Form Inputs

**Edit:** `assets/scss/_components.scss`
````scss
.form-input {
    // Rounded inputs
    border-radius: $radius-full;
    
    // Larger inputs
    padding: $spacing-md $spacing-lg;
    font-size: 1rem;
    
    // Underlined style
    border: none;
    border-bottom: 2px solid $color-border;
    border-radius: 0;
    
    &:focus {
        border-bottom-color: $color-primary;
    }
}
````

---

## Block Customization

### Navigation Bar

**Edit:** `assets/scss/blocks/_nav.scss`
````scss
.nav {
    // Transparent navigation
    background: transparent;
    backdrop-filter: blur(10px);
    
    // Colored navigation
    background: $color-primary;
    
    .nav__logo {
        color: white;
    }
    
    .nav__menu a {
        color: rgba(white, 0.9);
        
        &:hover {
            color: white;
        }
    }
    
    // Larger navigation
    &__container {
        min-height: 80px;
    }
}
````

### Blog Post Cards

**Edit:** `assets/scss/blocks/_blog.scss`
````scss
.blog__post {
    // Horizontal layout
    grid-template-columns: 240px 1fr;
    grid-template-areas: "image content";
    
    // No images
    grid-template-areas: "content";
    
    &-image {
        display: none;
    }
    
    // Minimal style
    box-shadow: none;
    border: 1px solid $color-border;
    border-radius: 0;
    
    &:hover {
        transform: none;
        border-color: $color-primary;
    }
}
````

### Reading Progress Bar

**Edit:** `assets/scss/blocks/_post.scss`
````scss
.reading-progress {
    // Thicker bar
    height: 5px;
    
    // Different color
    &__bar {
        background: linear-gradient(90deg, #f59e0b 0%, #ef4444 100%);
    }
    
    // Bottom instead of top
    top: auto;
    bottom: 0;
}
````

---

## Advanced Customization

### Add Custom CSS Class

**Create:** `assets/scss/blocks/_custom.scss`
````scss
// Your custom styles
.my-custom-class {
    background: $color-bg-secondary;
    padding: $spacing-lg;
    border-radius: $radius-lg;
    
    h2 {
        color: $color-primary;
    }
}

.highlight-box {
    background: linear-gradient(135deg, 
        rgba($color-primary, 0.1) 0%, 
        rgba($color-primary, 0.05) 100%);
    border-left: 4px solid $color-primary;
    padding: $spacing-md $spacing-lg;
    margin: $spacing-lg 0;
}
````

**Import in:** `assets/scss/style.scss`
````scss
@use 'blocks/cycling-story';
@use 'blocks/custom';  // Add this
````

**Use in Markdown:**
````html
<div class="my-custom-class">

## Special Section

This content has custom styling.

</div>
````

### Custom Shortcode Styling

**Create shortcode:** `layouts/shortcodes/callout.html`
````html
{{ $type := .Get "type" | default "info" }}

<div class="callout callout--{{ $type }}">
    {{ .Inner | markdownify }}
</div>
````

**Add styles:** `assets/scss/blocks/_custom.scss`
````scss
.callout {
    padding: $spacing-lg;
    border-radius: $radius-md;
    border-left: 4px solid;
    margin: $spacing-lg 0;
    
    &--info {
        background: rgba(#2563eb, 0.1);
        border-color: #2563eb;
    }
    
    &--warning {
        background: rgba(#f59e0b, 0.1);
        border-color: #f59e0b;
    }
    
    &--success {
        background: rgba(#10b981, 0.1);
        border-color: #10b981;
    }
    
    &--danger {
        background: rgba(#ef4444, 0.1);
        border-color: #ef4444;
    }
}
````

**Usage:**
````markdown
{{< callout type="info" >}}
This is an informational callout.
{{< /callout >}}

{{< callout type="warning" >}}
This is a warning!
{{< /callout >}}
````

---

## Responsive Customization

### Mobile-Specific Styles

**Edit any block file:**
````scss
.my-element {
    // Desktop styles
    padding: $spacing-xl;
    font-size: 1.25rem;
    
    // Mobile styles
    @media (max-width: $breakpoint-sm) {
        padding: $spacing-md;
        font-size: 1rem;
    }
}
````

### Breakpoint Customization

**Edit:** `assets/scss/_variables.scss`
````scss
// Make tablet breakpoint later
$breakpoint-md: 900px;  // Default: 768px

// Make desktop breakpoint earlier
$breakpoint-lg: 900px;  // Default: 1024px
````

---

## Testing Your Changes

### Development Server
````bash
# Start server
hugo server -D

# Changes auto-reload
# Visit http://localhost:1313
````

### Clear Cache
````bash
# If changes don't appear
rm -rf resources public
hugo server -D
````

### Production Build
````bash
# Test production build
hugo --minify

# Check file sizes
ls -lh public/css/
ls -lh public/js/
````

---

## Customization Checklist

Before deploying changes:

- [ ] Test on desktop (>1024px)
- [ ] Test on tablet (768-1024px)
- [ ] Test on mobile (<768px)
- [ ] Check color contrast (accessibility)
- [ ] Verify all links still work
- [ ] Check console for errors
- [ ] Test dark mode (if added)
- [ ] Verify fonts load correctly
- [ ] Check page load speed

---

## Common Customizations

### Remove Table of Contents

**Edit:** `layouts/partials/table-of-contents.html`

Delete or comment out the entire file, or:

**Edit your post:**
````yaml
---
toc: false  # Disable for this post
---
````

### Change Date Format

**Edit:** `assets/scss/blocks/_blog.scss`
````html
{{ .Date.Format "January 02, 2006" }}  <!-- Default -->
{{ .Date.Format "Jan 02, 2006" }}      <!-- Short -->
{{ .Date.Format "02/01/2006" }}        <!-- Numeric -->
{{ .Date.Format "2006-01-02" }}        <!-- ISO -->
````

### Hide Categories/Tags

**Edit:** `assets/scss/blocks/_post.scss`
````scss
.post__categories,
.post__tags {
    display: none;
}
````

---

## Next Steps

✅ Understand Sass structure  
✅ Can customize colors and fonts  
✅ Can modify layouts  

Continue to → [Third-Party Integrations](07-integrations.md)