# Text Wrapping Layout Explanation

## What You Asked For

You want **text to wrap around the image**, like classic magazine/newspaper layout, not a grid.

## Visual Result

### Post 1 (Image floats LEFT):
```
┌───────────┐  This is the Post Title
│           │  
│   Image   │  📅 Jan 15, 2024  👤 Author
│           │  
│           │  This is the excerpt text that wraps
└───────────┘  around the image. The text flows
naturally beside and below the image, creating
a magazine-style layout. More text continues
here filling the available space...

Read More →
```

### Post 2 (Image floats RIGHT):
```
This is the Post Title  ┌───────────┐
                        │           │
📅 Jan 16, 2024         │   Image   │
                        │           │
This is the excerpt     │           │
text that wraps around  └───────────┘
the image on the right. The text flows
naturally beside and below the image,
creating a magazine-style layout...

Read More →
```

### Post 3 (Image floats LEFT again):
```
┌───────────┐  This is the Post Title
│   Image   │  
└───────────┘  📅 Jan 17, 2024
               
Text continues and wraps around naturally...

Read More →
```

## How It Works

### HTML Structure:
```html
<article class="list__post list__post--image-left">
    <!-- Image comes first in DOM -->
    <div class="list__post-image">
        <img src="..." />
    </div>
    
    <!-- Title and text wrap around the floated image -->
    <div class="list__post-title">
        <h2><a href="...">Title</a></h2>
        <div class="list__post-meta">Date • Author</div>
    </div>
    
    <p class="list__post-excerpt">Text that wraps...</p>
    
    <a class="list__read-more">Read More →</a>
</article>
```

### CSS Float Magic:
```scss
// Image floats left by default
.list__post-image {
    float: left;              // Float to the left
    margin-right: 1.5rem;     // Space between image and text
    width: 300px;
    max-width: 45%;
}

// Alternate posts: float right
.list__post--image-right .list__post-image {
    float: right;             // Float to the right
    margin-left: 1.5rem;      // Space on the left
    margin-right: 0;
}

// Clear floats
.list__post::after {
    content: "";
    display: table;
    clear: both;              // Prevents float overflow
}
```

## Key Points

### ✅ Advantages:
- Classic magazine/newspaper style
- Text flows naturally around image
- Responsive: On mobile, float is removed and image stacks
- Simple, battle-tested CSS technique

### 📐 Image Sizing:
```scss
.list__post-image {
    width: 300px;          // Fixed width
    max-width: 45%;        // But max 45% of container
}
```
This means:
- Desktop: 300px wide
- Tablet: 45% of container (proportional)
- Mobile: 100% width (float removed)

### 📱 Mobile Behavior:
```scss
@media (max-width: $breakpoint-mobile) {
    float: none;           // Remove float
    width: 100%;           // Full width
    max-width: 100%;
    margin-right: 0;
}
```
On mobile, images stack on top - no wrapping.

## object-fit: contain

You mentioned using `object-fit: contain`:

```scss
img {
    width: 100%;
    height: auto;          // Maintains aspect ratio
    object-fit: contain;   // Image fits inside box, shows all of it
}
```

**contain vs cover:**
- `contain`: Shows entire image, may have empty space (letterbox/pillarbox)
- `cover`: Fills entire space, may crop image

## Alternating Pattern

```go
{{ range $index, $post := $paginator.Pages }}
    {{ $imagePosition := "left" }}
    {{ if modBool $index 2 }}
        {{ $imagePosition = "right" }}
    {{ end }}
    
    <article class="list__post--image-{{ $imagePosition }}">
```

Creates:
- Post 0: `list__post--image-left` → Image floats left
- Post 1: `list__post--image-right` → Image floats right
- Post 2: `list__post--image-left` → Image floats left
- Post 3: `list__post--image-right` → Image floats right

## Common Issues & Solutions

### Issue: Text doesn't wrap properly
**Solution:** Make sure parent has `overflow: auto` or clearfix

### Issue: Image too large on mobile
**Solution:** Already handled with media query (100% width on mobile)

### Issue: Read More button appears beside image
**Solution:** Added `clear: both` to read-more link

### Issue: Float breaks out of container
**Solution:** `::after` pseudo-element clears the float

## Testing

After implementing:

1. **Desktop:** 
   - Images should be ~300px wide
   - Text wraps beside images
   - Alternates left/right

2. **Tablet:**
   - Images scale to 45% width
   - Text still wraps

3. **Mobile:**
   - Images full width
   - Images stack on top
   - No wrapping

4. **Hover:**
   - Card lifts
   - Image zooms slightly

This is classic, proven layout that's been used on blogs for decades! 📰