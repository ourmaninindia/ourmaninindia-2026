# Newspaper Two-Column Layout Explanation

## Visual Layout

### Mobile (< 768px):
```
┌─────────────────────────────────┐
│     HEADLINE IN LARGE FONT      │
│  By Author | Date | Reading Time│
│   TECH • PROGRAMMING            │
├─────────────────────────────────┤
│ T his is the first paragraph    │
│   with a drop cap. Text flows   │
│   in single column.              │
│                                  │
│ ┌────────┐ More text continues  │
│ │ Image  │ wrapping around the  │
│ │  30%   │ image on mobile it   │
│ └────────┘ becomes full width.  │
└─────────────────────────────────┘
```

### Desktop (≥ 768px):
```
┌───────────────────────────────────────────────────┐
│          HEADLINE IN LARGE FONT                   │
│        By Author | Date | Reading Time            │
│          TECH • PROGRAMMING                       │
├───────────────────────────────────────────────────┤
│ T his is the first    │ continues here in the    │
│   paragraph with a    │ second column. Text      │
│   drop cap and flows  │ justified, newspaper     │
│   in two columns.     │ style.                   │
│ ┌──────┐ text wraps  │                           │
│ │Image │ around the  │ More paragraphs flow     │
│ │ 30% │ small image │ naturally across both    │
│ └──────┘ naturally.  │ columns.                 │
│                       │                           │
│          HEADING SPANS BOTH COLUMNS               │
│ ═══════════════════════════════════════════════   │
│                       │                           │
│ New section starts    │ and continues in the     │
│ after the heading.    │ second column.           │
└───────────────────────────────────────────────────┘
```

## Key Features

### 1. **Two-Column Layout**
```scss
.newspaper__content {
    @media (min-width: 768px) {
        column-count: 2;
        column-gap: var(--spacing-xl);
        column-rule: 1px solid var(--color-border-light);
    }
}
```

**How it works:**
- CSS Multi-column layout (not grid/flexbox)
- Text flows naturally from left column to right column
- Single column on mobile for readability

### 2. **Floating Images (30% width)**
```scss
img {
    max-width: 30%;
    float: left;
    margin: 0.5rem 1rem 0.5rem 0;
    shape-margin: 1rem;
}
```

**Text wraps around images naturally!**

**Three image modes:**

#### a) Default (float left):
```
┌─────┐ Text wraps around
│Image│ the image on the
│ 30% │ right side and
└─────┘ continues below.
```

#### b) Float right (add "right" to alt text):
```html
![My image right](image.jpg)
```
```
Text wraps around ┌─────┐
the image on the  │Image│
left side.        │ 30% │
                  └─────┘
```

#### c) Full width (add "full" to alt text):
```html
![My image full](image.jpg)
```
```
┌─────────────────────────────┐
│    Full Width Image         │
│    Spans Both Columns       │
└─────────────────────────────┘
```

### 3. **Drop Cap (First Letter)**
```scss
p:first-of-type::first-letter {
    font-size: 3.5em;
    float: left;
    margin: 0.1em 0.1em 0 0;
    font-weight: 700;
    color: var(--color-primary);
}
```

**Result:**
```
T his is the first paragraph with a large
  decorative first letter, classic newspaper
  style from the early 1900s.
```

### 4. **Headings Span Both Columns**
```scss
h2, h3, h4 {
    column-span: all;
    break-after: column;
}
```

**Why?**
- Headings act as section breaks
- They span the full width for emphasis
- Forces a column break, starting new section fresh

**Example:**
```
│ Text in column 1  │ Text in column 2  │
│                   │                   │
├─────────────────────────────────────────┤
│         NEW SECTION HEADING             │
├─────────────────────────────────────────┤
│ New text starts   │ continues here    │
```

### 5. **Pull Quotes (Blockquotes)**
```scss
blockquote {
    column-span: all;
    font-size: 1.125rem;
    font-style: italic;
}
```

**Result:**
```
│ Regular text in   │ Regular text in   │
│ column 1          │ column 2          │
├─────────────────────────────────────────┤
│   "This is an important quote that      │
│    spans both columns for emphasis"     │
├─────────────────────────────────────────┤
│ Text continues    │ Text continues    │
```

### 6. **Code Blocks & Tables Span Both Columns**
```scss
pre, table {
    column-span: all;
}
```

**Why?**
- Code and tables need full width
- Hard to read if split across columns
- Maintains readability

### 7. **Newspaper Typography**
```scss
font-size: 1.0625rem;      // 17px, readable
line-height: 1.7;           // Generous spacing
text-align: justify;        // Even edges
hyphens: auto;              // Break long words
font-family: Georgia, serif; // Classic newsprint
```

**Creates classic newspaper feel:**
- Justified text (straight edges on both sides)
- Serif font (Georgia)
- Automatic hyphenation
- Generous line height

### 8. **Column Rule (Vertical Line)**
```scss
column-rule: 1px solid var(--color-border-light);
```

**Visual separator between columns:**
```
Text in left col  │  Text in right col
continues here    │  continues here
```

## Special Markdown Syntax

### Float Images Right:
```markdown
![My caption right](image.jpg)
```
The word "right" in the alt text makes it float right.

### Full-Width Images:
```markdown
![My caption full](image.jpg)
```
The word "full" in the alt text makes it span both columns.

### Default (Float Left):
```markdown
![My caption](image.jpg)
```
No special keyword = floats left.

## Avoiding Column Breaks

Certain elements should never split across columns:

```scss
blockquote, pre, table, ul, ol {
    break-inside: avoid-column;
}
```

**Prevents:**
```
// BAD (split blockquote)
│ "This quote     │ continues in    │
│  is broken      │ the next col"   │

// GOOD (intact blockquote)
├─────────────────────────────────────┤
│  "This quote stays in one column"  │
├─────────────────────────────────────┤
```

## Responsive Behavior

### Mobile (< 768px):
- ✅ Single column
- ✅ Images full width (no float)
- ✅ No drop cap (optional)
- ✅ Left-aligned text (not justified)

### Tablet/Desktop (≥ 768px):
- ✅ Two columns
- ✅ Images 30% with text wrap
- ✅ Drop cap on first paragraph
- ✅ Justified text
- ✅ Column rule (vertical line)

## Classic Newspaper Elements

### Masthead:
```
╔═══════════════════════════════════════╗
║     TECH INSIGHTS WEEKLY              ║
║                                       ║
║  The Future of Web Development        ║
║  By Jane Smith | Jan 15, 2024         ║
║  PROGRAMMING • JAVASCRIPT             ║
╚═══════════════════════════════════════╝
```

### Byline:
```
By Jane Smith | January 15, 2024 | 5 min read
```

### Section Labels (Categories):
```
TECH • PROGRAMMING
```
Uppercase, bold, classic newspaper style.

### Tags:
```
#javascript, #webdev, #tutorial
```
Hashtag style, like social media.

## Print Support (Bonus!)

```scss
@media print {
    .newspaper__content {
        column-count: 2;
        column-gap: 1.5cm;
    }
}
```

**Prints beautifully!**
- Two columns on paper
- Proper margins
- Black text on white
- Perfect for archiving articles

## Content Flow Example

```
┌───────────────────────────────────────────┐
│           Article Headline                │
│      By Author | Date | Time              │
├───────────────────────────────────────────┤
│ T he article starts   │ continues in the  │
│   with a drop cap.    │ right column.     │
│ ┌────┐ Image floats  │                   │
│ │Img │ and text wraps│ More text flows   │
│ └────┘ around it.    │ naturally here.   │
│                       │                   │
│        Section Heading                    │
├───────────────────────────────────────────┤
│ New section begins    │ and continues.    │
│                       │                   │
│  ┌──────────────────────────────┐        │
│  │  "Pull quote spans columns"  │        │
│  └──────────────────────────────┘        │
│                       │                   │
│ Text continues after  │ the blockquote.   │
└───────────────────────────────────────────┘
```

## Tips for Best Results

1. **Image sizes**: Keep images reasonably sized (not too large)
2. **Paragraph length**: Medium paragraphs work best
3. **Headings**: Use them to break long articles
4. **Alt text**: Use "right" or "full" keywords for special positioning
5. **Lists**: Keep them short to avoid awkward column breaks
6. **Code blocks**: They span both columns, so use sparingly

## Classic Newspaper Aesthetic

This layout recreates:
- ✅ 1920s-1950s newspaper style
- ✅ Magazine column layouts
- ✅ Academic journal formatting
- ✅ Professional newsletter design

Perfect for long-form articles, essays, reports, and feature stories! 📰