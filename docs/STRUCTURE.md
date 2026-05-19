# Complete SCSS Folder Structure

```
scss-blog-structure/
│
├── .gitignore                          # Git ignore file
├── package.json                        # NPM configuration and build scripts
├── README.md                           # Documentation
│
├── scss/                               # Main SCSS directory
│   │
│   ├── main.scss                       # 🎯 Master import file
│   │
│   ├── abstracts/                      # 🛠️ Tools & Helpers (no CSS output)
│   │   ├── _variables.scss            # Design tokens (colors, spacing, etc.)
│   │   └── _mixins.scss               # Reusable mixins & functions
│   │
│   ├── base/                           # 🎨 Foundation styles
│   │   ├── _reset.scss                # CSS reset & normalize
│   │   └── _typography.scss           # Base typography rules
│   │
│   ├── components/                     # 🧩 Reusable UI components
│   │   ├── _buttons.scss              # Button styles & variations
│   │   ├── _cards.scss                # Card components (blog posts)
│   │   ├── _forms.scss                # Form inputs & search
│   │   ├── _widgets.scss              # Sidebar widgets
│   │   └── _pagination.scss           # Pagination components
│   │
│   ├── layout/                         # 📐 Major layout sections
│   │   ├── _navigation.scss           # Header & navigation
│   │   ├── _grid.scss                 # Main grid layouts
│   │   ├── _sidebar.scss              # Sidebar structure
│   │   └── _footer.scss               # Footer (placeholder)
│   │
│   ├── pages/                          # 📄 Page-specific styles
│   │   ├── _blog.scss                 # Blog listing page
│   │   └── _single-post.scss          # Single post page
│   │
│   ├── themes/                         # 🎭 Theme variations (optional)
│   │   └── (empty - for future themes)
│   │
│   └── vendors/                        # 📦 Third-party CSS (optional)
│       └── (empty - for external libraries)
│
└── static/                             # Compiled output (created after build)
    └── css/
        ├── style.css                   # Compiled CSS (gitignored)
        └── style.css.map               # Source map (gitignored)
```

## 📋 Import Order in main.scss

```scss
main.scss
  ↓
  1. abstracts/_variables.scss      (Variables first - used everywhere)
  2. abstracts/_mixins.scss         (Mixins second - use variables)
  ↓
  3. base/_reset.scss               (Foundation)
  4. base/_typography.scss          (Base typography)
  ↓
  5. layout/_navigation.scss        (Structure)
  6. layout/_grid.scss              
  7. layout/_sidebar.scss           
  8. layout/_footer.scss            
  ↓
  9. components/_buttons.scss       (UI Components)
 10. components/_cards.scss         
 11. components/_forms.scss         
 12. components/_widgets.scss       
 13. components/_pagination.scss    
  ↓
 14. pages/_blog.scss               (Page-specific)
 15. pages/_single-post.scss        
```

## 🎯 Component Relationships

```
Navigation
    ↓
Container (Grid Layout)
    ↓
    ├─→ Blog Posts (Cards)
    │       ├── Post Image
    │       ├── Post Meta
    │       ├── Post Title
    │       ├── Post Excerpt
    │       └── Read More Button
    │
    └─→ Sidebar (Widgets)
            ├── Search Widget (Form)
            ├── Recent Posts Widget
            ├── Categories Widget
            ├── Tags Widget
            ├── Archive Widget
            └── Newsletter Widget (Form)
    ↓
Pagination
    ↓
Footer
```

## 📊 Stylesheet Size Breakdown

| Category | Files | Total Lines | Purpose |
|----------|-------|-------------|---------|
| **Abstracts** | 2 | ~170 | Variables & mixins |
| **Base** | 2 | ~60 | Reset & typography |
| **Layout** | 4 | ~150 | Page structure |
| **Components** | 5 | ~300 | Reusable UI |
| **Pages** | 2 | ~100 | Page-specific |
| **Total** | 15 | ~780 | Complete system |

## 🔄 Build Process Flow

```
1. Edit .scss files
    ↓
2. Run: npm run scss:watch (or :dev or :build)
    ↓
3. Sass compiles main.scss
    ↓
4. Imports all partials in order
    ↓
5. Processes variables & mixins
    ↓
6. Outputs to static/css/style.css
    ↓
7. Link in HTML: <link rel="stylesheet" href="/static/css/style.css">
```

## 🎨 Design Token Hierarchy

```
_variables.scss
    ├── Layout Tokens
    │   └── $max-width
    │
    ├── Spacing Scale
    │   ├── $spacing-xs
    │   ├── $spacing-sm
    │   ├── $spacing-md
    │   ├── $spacing-lg
    │   └── $spacing-xl
    │
    ├── Color Palette
    │   ├── Primary Colors
    │   ├── Text Colors
    │   ├── Background Colors
    │   └── Border Colors
    │
    ├── Typography
    │   ├── Font Families
    │   ├── Line Heights
    │   └── Font Sizes (responsive)
    │
    ├── Effects
    │   ├── Border Radius
    │   ├── Shadows
    │   ├── Transitions
    │   └── Gradients
    │
    └── Breakpoints
        ├── Mobile
        ├── Tablet
        ├── Desktop
        └── Wide
```

## 🧩 Component Dependencies

```
All components depend on:
    ├── abstracts/_variables.scss (for tokens)
    └── abstracts/_mixins.scss (for patterns)

Specific dependencies:
    ├── components/_cards.scss
    │   └── Uses: _buttons.scss (read-more links)
    │
    ├── components/_widgets.scss
    │   ├── Uses: _cards.scss (recent posts)
    │   └── Uses: _forms.scss (search, newsletter)
    │
    └── pages/_single-post.scss
        ├── Uses: _cards.scss (post cards)
        ├── Uses: _buttons.scss (navigation)
        └── Uses: _pagination.scss (prev/next)
```
