# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd scss-blog-structure
npm install
```

### 2. Start Development
```bash
# Watch for changes and auto-compile
npm run scss:watch
```

### 3. Make Changes
Edit any `.scss` file in the `scss/` folder. Your changes will automatically compile to `static/css/style.css`.

### 4. Build for Production
```bash
# Compile compressed CSS without source maps
npm run scss:build
```

---

## 📝 Common Tasks

### Adding a New Color
1. Open `scss/abstracts/_variables.scss`
2. Add your color variable:
```scss
$color-accent: #ff6b6b;
```
3. Use it anywhere:
```scss
.my-element {
  color: $color-accent;
}
```

### Creating a New Component
1. Create file: `scss/components/_my-component.scss`
2. Add styles:
```scss
// components/_my-component.scss
.my-component {
  padding: $spacing-md;
  background: $color-bg;
}
```
3. Import in `main.scss`:
```scss
@import 'components/my-component';
```

### Using Mixins
```scss
.my-element {
  // Add responsive breakpoint
  @include respond-to(tablet) {
    display: block;
  }
  
  // Add hover effect
  @include hover-state {
    color: $color-primary;
  }
  
  // Add transition
  @include transition(color, background);
}
```

### Changing Spacing
Edit `scss/abstracts/_variables.scss`:
```scss
$spacing-md: clamp(20px, 3vw, 28px); // Adjust as needed
```

---

## 🎨 Customization Examples

### Change Primary Color
```scss
// In _variables.scss
$color-primary: #your-color-here;
$color-primary-dark: darken($color-primary, 10%);
```

### Adjust Font Sizes
```scss
// In _variables.scss
$font-size-xl: clamp(1.5rem, 3vw, 2rem);
```

### Add New Breakpoint
```scss
// In _variables.scss
$breakpoint-large: 1400px;

// In _mixins.scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == large {
    @media (min-width: $breakpoint-large) {
      @content;
    }
  }
  // ... existing breakpoints
}
```

---

## 🔍 Troubleshooting

### "Command not found: sass"
```bash
npm install
```

### Changes not reflecting
1. Make sure `npm run scss:watch` is running
2. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
3. Check console for Sass errors

### Compilation errors
- Check syntax in your `.scss` files
- Ensure all variables are defined before use
- Verify import paths in `main.scss`

---

## 📚 File Reference

| Need to... | Edit this file... |
|------------|------------------|
| Change colors | `abstracts/_variables.scss` |
| Change spacing | `abstracts/_variables.scss` |
| Add helper functions | `abstracts/_mixins.scss` |
| Style navigation | `layout/_navigation.scss` |
| Style blog cards | `components/_cards.scss` |
| Style buttons | `components/_buttons.scss` |
| Style sidebar | `layout/_sidebar.scss` |
| Add page styles | `pages/_your-page.scss` |

---

## 🎯 Best Practices Checklist

- ✅ Use variables instead of hardcoded values
- ✅ Use mixins for repeated patterns
- ✅ Keep components small and focused
- ✅ Follow the import order in `main.scss`
- ✅ Prefix partial files with underscore (`_file.scss`)
- ✅ Use BEM or consistent naming convention
- ✅ Comment complex code
- ✅ Test responsive behavior
- ✅ Compile with `--style=compressed` for production

---

## 🎓 Next Steps

1. **Customize Variables**: Make it yours by changing colors, spacing, and fonts
2. **Add Components**: Create new reusable components as needed
3. **Optimize**: Use mixins to reduce code duplication
4. **Document**: Comment your custom code for team members
5. **Test**: Check all breakpoints and browsers

---

## 💡 Pro Tips

### Use CSS Custom Properties for Runtime Changes
```scss
:root {
  --dynamic-color: #{$color-primary};
}

.element {
  color: var(--dynamic-color); // Can be changed with JavaScript
}
```

### Organize with Sections
```scss
// ========================================
// Hero Section
// ========================================

.hero {
  // styles
}
```

### Use Nesting Wisely
```scss
// ✅ Good (2-3 levels max)
.card {
  .card-title {
    color: $color-text;
  }
}

// ❌ Bad (too deep)
.card {
  .card-body {
    .card-content {
      .card-title {
        color: $color-text;
      }
    }
  }
}
```

---

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `STRUCTURE.md` for architecture overview
- Look at existing components for examples
- Sass documentation: https://sass-lang.com/documentation

Happy styling! 🎨
