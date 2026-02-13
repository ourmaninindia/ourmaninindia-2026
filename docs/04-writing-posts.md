# Writing Posts

Complete guide to creating and organizing content.

## Creating a New Post

### Using Hugo Command
````bash
# Create page bundle (recommended)
hugo new blog/my-post-title/index.md

# Creates:
# content/blog/my-post-title/
# └── index.md
````

### Manual Creation
````bash
# Create directory
mkdir -p content/blog/my-post-title

# Create index file
touch content/blog/my-post-title/index.md
````

## Page Bundles vs Single Files

### Page Bundle (Recommended)
````
content/blog/my-post/
├── index.md           # Post content
├── featured.jpg       # Featured image
├── image1.jpg         # Content images
└── image2.jpg
````

**Advantages:**
- ✅ Images stay with post
- ✅ Easy to move/reorganize
- ✅ Automatic image optimization
- ✅ No path issues

### Single File (Old Way)
````
content/blog/
├── my-post.md
└── ...
````

**Disadvantages:**
- ❌ Images separate from content
- ❌ Harder to organize
- ❌ Path management complex

**Use page bundles!**

## Front Matter

Every post starts with front matter (metadata).

### Minimal Front Matter
````yaml
---
title: "My Post Title"
date: 2026-02-01T10:00:00+01:00
---
````

### Complete Front Matter
````yaml
---
# Required
title: "Building a Hugo Blog in 2026"
date: 2026-02-01T10:00:00+01:00

# Optional but recommended
description: "Complete guide to building a modern Hugo blog with advanced features."
author: "alfred-tuinman"  # Uses defaultAuthor if omitted
image: featured.jpg        # Featured image

# Taxonomies
categories: ["Tech"]
tags: ["hugo", "tutorial", "web-development", "blogging"]

# Features
toc: true                  # Enable table of contents
draft: false               # Set to true while writing

# SEO (optional - auto-generated if omitted)
keywords: ["hugo blog", "static site", "tutorial"]

# Social sharing (optional)
images: ["featured.jpg"]   # For social media cards

# Advanced (optional)
aliases: ["/old-url/"]     # Redirects from old URLs
weight: 10                 # For sorting
featured: true             # Mark as featured post
---
````

### Front Matter for Cycling Posts
````yaml
---
title: "Day 3: Col du Galibier and Col de l'Iseran"
date: 2026-01-15T08:00:00+01:00
description: "The hardest day: two legendary cols, 127km, and 2,847m of climbing."
author: "alfred-tuinman"
image: featured-galibier.jpg

categories: ["Cycling"]
tags: ["alps", "touring", "col-hunting", "route-guide"]

toc: true
draft: false

# Cycling-specific
ride_distance: 127.4
ride_elevation: 2847
ride_time: "7:23"
---
````

## Writing Content

### Basic Markdown
````markdown
# Heading 1 (Don't use - reserved for title)

## Heading 2 (Main sections)

### Heading 3 (Subsections)

#### Heading 4 (Rarely needed)

**Bold text**

*Italic text*

[Link text](https://example.com)

![Image alt text](image.jpg)
````

### Paragraphs
````markdown
This is a paragraph. Leave blank lines between paragraphs.

This is another paragraph. Multiple spaces     don't matter.
They're    collapsed    to    single    spaces.
````

### Lists

**Unordered:**
````markdown
- First item
- Second item
  - Nested item
  - Another nested
- Third item
````

**Ordered:**
````markdown
1. First step
2. Second step
3. Third step
````

**Task lists:**
````markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
````

### Links
````markdown
# External link
[Hugo Documentation](https://gohugo.io)

# Internal link
[About page](/about/)

# Link to another post
[My other post]({{< ref "other-post" >}})

# Link with title
[Hugo](https://gohugo.io "Hugo Static Site Generator")
````

### Code

**Inline code:**
````markdown
Use `hugo server` to start the development server.
````

**Code blocks:**
````markdown
```bash
# This is a bash script
hugo new blog/my-post/index.md
hugo server -D
```
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```
```python
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
```
````

### Blockquotes
````markdown
> This is a quote.
> It can span multiple lines.
>
> Even multiple paragraphs.

> **Pro Tip:** You can use formatting in quotes.
````

### Tables
````markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

# Alignment
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
````

### Horizontal Rules
````markdown
---

Three or more hyphens, asterisks, or underscores.

***

___
````

## Using Shortcodes

### Images

**Basic image:**
````markdown
{{< img src="photo.jpg" alt="Description of photo" >}}
````

**Image with caption:**
````markdown
{{< img src="photo.jpg" alt="Description" caption="This is the caption" >}}
````

**Wide image:**
````markdown
{{< img src="panorama.jpg" alt="Wide panorama" wide="true" >}}
````

### Image Gallery
````markdown
{{< gallery >}}
{{< img src="image1.jpg" alt="First image" >}}
{{< img src="image2.jpg" alt="Second image" >}}
{{< img src="wide.jpg" alt="Wide image" wide="true" >}}
{{< img src="image3.jpg" alt="Third image" >}}
{{< /gallery >}}
````

### Cycling-Specific Shortcodes

**Ride statistics:**
````markdown
{{< ride-stats 
    distance="127.4" 
    elevation="2847" 
    time="7:23" 
    avg-speed="25.4"
    max-speed="67.2"
    avg-hr="152"
>}}
````

**Elevation chart:**
````markdown
{{< elevation-chart 
    data="800,1000,1200,1500,1800,2100,2400,2642"
    labels="0,10,20,30,40,50,60,70"
    title="Day 3 Elevation Profile"
>}}
````

**Cycling gallery:**
````markdown
{{< cycling-gallery >}}
{{< img src="start.jpg" alt="Starting point" caption="6 AM departure" >}}
{{< img src="climb.jpg" alt="The climb begins" >}}
{{< /cycling-gallery >}}
````

**Newspaper layout:**
````markdown
{{< cycling-story >}}

Your entire post content goes here.
Text flows in 2 columns on desktop.
Images break the columns.

{{< /cycling-story >}}
````

## Content Organization

### Recommended Structure
````
content/
├── blog/
│   ├── tech/              # Optional: organize by category
│   │   └── hugo-guide/
│   │       └── index.md
│   └── cycling/
│       └── alps-day1/
│           └── index.md
├── _index.md              # Blog listing page
├── about.md
├── contact.md
└── search.md
````

### Categories vs Tags

**Categories:** Broad topics (2-4 max)
- Tech
- Cycling
- Travel
- Reviews

**Tags:** Specific topics (unlimited)
- hugo
- javascript
- alps
- route-guide
- gear-review

Example:
````yaml
categories: ["Tech"]
tags: ["hugo", "static-site", "tutorial", "web-development"]
````

## Content Types

### Tech Post Template
````markdown
---
title: "Building Feature X with Technology Y"
date: 2026-02-01T10:00:00+01:00
description: "Learn how to build X using Y with step-by-step examples."
categories: ["Tech"]
tags: ["technology", "tutorial", "guide"]
toc: true
---

Introduction paragraph explaining what the reader will learn.

## Prerequisites

What you need before starting:
- Requirement 1
- Requirement 2

## Step 1: Setup

Detailed explanation...
```bash
# Code example
command here
```

## Step 2: Implementation

More details...

{{< img src="screenshot.jpg" alt="Screenshot of result" >}}

## Conclusion

Summary and next steps.
````

### Cycling Post Template
````markdown
---
title: "Day X: Route Name"
date: 2026-01-15T08:00:00+01:00
description: "Brief description of the day's ride."
categories: ["Cycling"]
tags: ["location", "touring", "route-guide"]
toc: true
---

{{< ride-stats distance="127" elevation="2847" time="7:23" >}}

Opening paragraph setting the scene.

## The Route

{{< elevation-chart data="..." labels="..." title="Elevation Profile" >}}

Route description...

## The Day in Pictures

{{< cycling-gallery >}}
{{< img src="photo1.jpg" alt="Description" caption="Caption" >}}
{{< img src="photo2.jpg" alt="Description" >}}
{{< /cycling-gallery >}}

## Detailed Account

Full story of the ride...

## Conclusion

Reflections and takeaways.
````

## Draft Workflow

### Writing a Draft
````yaml
---
title: "Work in Progress"
date: 2026-02-01
draft: true  # Won't appear in production
---
````

### Preview Drafts
````bash
# Include drafts in dev server
hugo server -D

# Build including drafts
hugo --buildDrafts
````

### Publishing

Change `draft: false` when ready to publish.

## Best Practices

### Writing Style

1. **Start strong** - Hook readers in first paragraph
2. **Be specific** - Use concrete examples
3. **Use headings** - Break up long content
4. **Add visuals** - Images every 2-3 paragraphs
5. **Be concise** - Shorter is better
6. **Link internally** - Connect related posts

### SEO Optimization
````yaml
# Good title (specific, includes year)
title: "Building a Hugo Blog: Complete 2026 Guide"

# Good description (150-160 chars, includes keywords)
description: "Learn how to build a fast, modern Hugo blog with search, comments, and newsletter. Complete guide with code examples."

# Assign categories and tags
categories: ["Tech"]
tags: ["hugo", "static-site", "tutorial"]
````

### Image Guidelines

**Featured image:**
- Size: 1200x600px (2:1 ratio)
- Format: JPG or WebP
- Max size: 200KB
- Name: `featured.jpg`

**Content images:**
- Max width: 1200px
- Format: JPG, PNG, or WebP
- Max size: 150KB each
- Descriptive filenames: `alps-summit.jpg` not `img123.jpg`

### Checklist Before Publishing

- [ ] Title is descriptive and specific
- [ ] Description is 150-160 characters
- [ ] Featured image added
- [ ] All images have alt text
- [ ] Categories assigned (1-2)
- [ ] Tags assigned (3-5)
- [ ] TOC enabled (if long post)
- [ ] Links work (no 404s)
- [ ] Code blocks have language specified
- [ ] Spell check done
- [ ] Preview looks good (`hugo server -D`)
- [ ] `draft: false`

## Next Steps

✅ Understand post structure  
✅ Know front matter options  
✅ Can write in Markdown  

Continue to → [Shortcodes Reference](05-shortcodes.md)