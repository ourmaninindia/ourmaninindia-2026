# Fixing Sticky Sidebar - Complete Guide

## Why Your Sticky Sidebar Wasn't Working

Looking at your HTML, the TOC sidebar likely wasn't sticking due to one or more of these common issues:

### Issue 1: Missing `position: sticky` and `top` Value ❌

```scss
// WRONG - No sticky properties
.toc {
    background: white;
    padding: 1rem;
}
```

```scss
// RIGHT - Sticky with top value
.toc {
    position: sticky;
    top: 20px;  // Distance from top when stuck
}
```

### Issue 2: Parent Container Has `overflow: hidden/auto` ❌

```scss
// WRONG - Parent blocks sticky
.legal-page__container {
    overflow: hidden;  // ❌ Breaks sticky!
}

.toc {
    position: sticky;
    top: 20px;
}
```

**Why?** Sticky positioning works within the parent's scroll context. If parent has `overflow: hidden`, there's no scroll context!

**Fix:**
```scss
// RIGHT - No overflow restrictions
.legal-page__container {
    overflow: visible;  // ✅ or just don't set it
}
```

### Issue 3: Container Not Tall Enough ❌

Sticky only works if there's **space to scroll**:

```
Short container (100vh):
┌─────────────────┐
│ Sticky Sidebar  │ ← No room to scroll
│ Content         │ ← Sidebar can't "stick"
└─────────────────┘
```

```
Tall container (200vh):
┌─────────────────┐
│ Sticky Sidebar  │ ← Sticks here!
│ Content         │
│                 │
│                 │ ← As you scroll down
│ More content    │ ← Sidebar stays at top
│                 │
└─────────────────┘
```

### Issue 4: Wrong Grid Setup ❌

```scss
// WRONG - Both columns stretch equally
.legal-page__container {
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: stretch;  // ❌ Sidebar stretches full height
}
```

When sidebar stretches to match content height, it can't "stick" - it's already filling the space!

**Fix:**
```scss
// RIGHT - Sidebar natural height
.legal-page__container {
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: start;  // ✅ Sidebar stays at natural height
}
```

## The Complete Solution

### SCSS:

```scss
.legal-page {
  min-height: 100vh;
  
  &__container {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    align-items: start;  // ✅ CRITICAL!
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
}

.toc {
  // ✅ STICKY MAGIC
  position: sticky;
  top: 2rem;
  align-self: start;
  
  // Prevent overflow if TOC is very long
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  
  // Styling
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
}

.legal-content {
  // Content must be tall enough for sticky to work
  min-height: 150vh;  // Example
}
```

## Visual Explanation

### Before (Not Sticky):

```
┌──────────────────────────────────┐
│ ┌─────────┐  ┌─────────────────┐ │
│ │   TOC   │  │   Content       │ │
│ │         │  │                 │ │
│ │ Link 1  │  │ Section 1       │ │
│ │ Link 2  │  │                 │ │
│ │ Link 3  │  │                 │ │
│ └─────────┘  │ Section 2       │ │
│              │                 │ │
│              │                 │ │
│              │ Section 3       │ │
│              │                 │ │
│              └─────────────────┘ │
└──────────────────────────────────┘
        ↓ Scroll down ↓
┌──────────────────────────────────┐
│              ┌─────────────────┐ │
│              │ Section 2       │ │ ← TOC scrolled away!
│              │                 │ │
│              │                 │ │
│              │ Section 3       │ │
│              │                 │ │
│              └─────────────────┘ │
└──────────────────────────────────┘
```

### After (Sticky):

```
┌──────────────────────────────────┐
│ ┌─────────┐  ┌─────────────────┐ │
│ │   TOC   │  │   Content       │ │
│ │         │  │                 │ │
│ │ Link 1  │  │ Section 1       │ │
│ │ Link 2  │  │                 │ │
│ │ Link 3  │  │                 │ │
│ └─────────┘  │ Section 2       │ │
│              │                 │ │
│              │                 │ │
│              │ Section 3       │ │
│              │                 │ │
│              └─────────────────┘ │
└──────────────────────────────────┘
        ↓ Scroll down ↓
┌──────────────────────────────────┐
│ ┌─────────┐  ┌─────────────────┐ │
│ │   TOC   │  │ Section 2       │ │ ← TOC stays!
│ │         │  │                 │ │
│ │ Link 1  │  │                 │ │
│ │ Link 2  │  │ Section 3       │ │
│ │ Link 3  │  │                 │ │
│ └─────────┘  └─────────────────┘ │
└──────────────────────────────────┘
```

## Common Pitfalls Checklist

### ❌ Don't Do This:

```scss
// DON'T: Flex parent with stretched items
.container {
    display: flex;
    align-items: stretch;  // ❌
}

// DON'T: Overflow on parent
.container {
    overflow: hidden;  // ❌
    overflow: auto;    // ❌
    overflow-y: scroll; // ❌
}

// DON'T: Height 100% on sticky element
.toc {
    position: sticky;
    height: 100%;  // ❌
}

// DON'T: Wrong positioning context
.container {
    position: relative;  // ← Sticky still works
    overflow: hidden;    // ❌ But this breaks it!
}
```

### ✅ Do This:

```scss
// DO: Grid with align-items: start
.container {
    display: grid;
    grid-template-columns: 280px 1fr;
    align-items: start;  // ✅
}

// DO: Sticky with top value
.toc {
    position: sticky;
    top: 20px;  // ✅
    align-self: start;  // ✅
}

// DO: Max-height to prevent overflow
.toc {
    max-height: calc(100vh - 40px);
    overflow-y: auto;
}
```

## Mobile Considerations

Sticky doesn't make sense on mobile with no side-by-side layout:

```scss
.toc {
    position: sticky;
    top: 20px;
    
    @media (max-width: 900px) {
        position: relative;  // ✅ Not sticky on mobile
        top: 0;
    }
}

.legal-page__container {
    grid-template-columns: 280px 1fr;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr;  // ✅ Single column
    }
}
```

## Testing Sticky

To verify sticky is working:

1. **Check in DevTools:**
   ```
   Element → Computed → position: sticky ✓
   Element → Computed → top: 20px ✓
   ```

2. **Scroll the page:**
   - Sidebar should "stick" at `top: 20px` from viewport
   - Should scroll with content until it reaches top position
   - Should stay there while you scroll

3. **Check parent:**
   ```
   Parent element → Computed → overflow: visible ✓
   ```

## Browser Support

`position: sticky` is supported in all modern browsers:
- ✅ Chrome 56+
- ✅ Firefox 59+
- ✅ Safari 13+
- ✅ Edge 16+

For older browsers, add fallback:

```scss
.toc {
    position: relative;  // Fallback
    position: sticky;    // Modern browsers
    top: 20px;
}
```

## Advanced: Sticky with Scroll Padding

If you have a fixed header, add scroll padding:

```scss
html {
    scroll-padding-top: 80px;  // Height of fixed header
}

.toc {
    position: sticky;
    top: 100px;  // Header height + spacing
}
```

This prevents content from hiding behind the header when jumping to anchors.

## Summary

**The 3 Essential Rules for Sticky:**

1. **Element:** `position: sticky` + `top: X`
2. **Parent:** `align-items: start` (not stretch)
3. **Parent:** No `overflow: hidden/auto/scroll`

Follow these and your sidebar will stick! 📌
