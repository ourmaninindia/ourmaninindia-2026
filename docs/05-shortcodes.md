# Shortcodes Reference

Complete guide to all available shortcodes in your Hugo blog.

## What are Shortcodes?

Shortcodes are snippets you can use inside Markdown to add complex functionality.

**Syntax:**
````markdown
{{< shortcode-name param="value" >}}

{{< shortcode-name >}}
Content here
{{< /shortcode-name >}}
````

## Image Shortcodes

### Basic Image

**File:** `layouts/shortcodes/img.html`

**Usage:**
````markdown
{{< img src="photo.jpg" alt="Description" >}}
````

**With caption:**
````markdown
{{< img src="photo.jpg" alt="Description" caption="This is the caption" >}}
````

**Wide image (full width):**
````markdown
{{< img src="panorama.jpg" alt="Wide view" wide="true" >}}
````

**Features:**
- Automatic WebP generation with JPEG fallback
- Responsive images (400px, 800px, 1200px)
- Lazy loading
- Proper alt text for accessibility

**Parameters:**
- `src` - Image filename (required)
- `alt` - Alt text (required for accessibility)
- `caption` - Optional caption below image
- `wide` - Set to `"true"` for full-width images

**Example:**
````markdown
{{< img src="summit.jpg" alt="At the summit of Mont Blanc" caption="4,810m elevation - the highest point!" >}}
````

---

## Gallery Shortcodes

### General Gallery

**File:** `layouts/shortcodes/gallery.html`

**Usage:**
````markdown
{{< gallery >}}
{{< img src="image1.jpg" alt="First image" >}}
{{< img src="image2.jpg" alt="Second image" >}}
{{< img src="wide.jpg" alt="Panorama" wide="true" >}}
{{< img src="image3.jpg" alt="Third image" >}}
{{< /gallery >}}
````

**Features:**
- Images automatically alternate left/right on desktop
- Wide images break the alternating pattern
- Single column on mobile
- Hover effects

**Best for:**
- Tech tutorials with screenshots
- General photo collections
- Mixed content posts

---

### Cycling Gallery

**File:** `layouts/shortcodes/cycling-gallery.html`

**Usage:**
````markdown
{{< cycling-gallery >}}
{{< img src="start.jpg" alt="Morning start" caption="6 AM departure" >}}
{{< img src="climb.jpg" alt="The climb" caption="Gradient: 8%" >}}
{{< img src="elevation.jpg" alt="Elevation profile" wide="true" >}}
{{< img src="summit.jpg" alt="Summit" caption="Made it!" >}}
{{< /cycling-gallery >}}
````

**Features:**
- Same as general gallery
- Semantic naming for cycling content
- Integrates with cycling-story layout

**Best for:**
- Cycling trip reports
- Route documentation
- Race reports

---

## Cycling-Specific Shortcodes

### Ride Statistics

**File:** `layouts/shortcodes/ride-stats.html`

**Usage:**
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

**Parameters:**
- `distance` - Distance in km (required)
- `elevation` - Elevation gain in meters (optional)
- `time` - Moving time in H:MM format (optional)
- `avg-speed` - Average speed in km/h (optional)
- `max-speed` - Maximum speed in km/h (optional)
- `avg-hr` - Average heart rate in bpm (optional)

**Output:**
Displays a beautiful card with stats in a grid layout (2 columns on mobile, 3-4 on desktop).

**Example with minimal stats:**
````markdown
{{< ride-stats distance="82" elevation="1200" time="4:30" >}}
````

**Full example:**
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

---

### Elevation Chart

**File:** `layouts/shortcodes/elevation-chart.html`

**Usage:**
````markdown
{{< elevation-chart 
    data="800,950,1100,1300,1500,1800,2100,2400,2642,2400,2100,1800"
    labels="0,5,10,15,20,25,30,35,40,45,50,55"
    title="Col du Galibier Elevation Profile"
>}}
````

**Parameters:**
- `data` - Comma-separated elevation values in meters (required)
- `labels` - Comma-separated distance values in km (required)
- `title` - Chart title (optional)

**Features:**
- Interactive Chart.js visualization
- Hover to see exact elevation/distance
- Responsive design
- Smooth gradient fill
- Professional styling

**How to get data:**

**From Strava:**
1. Export GPX file
2. Use online GPX analyzer
3. Extract elevation points every 5km

**From Ride with GPS:**
1. View elevation profile
2. Record values manually

**Manual creation:**
1. Know start/end elevations
2. Estimate key points (summit, valley)
3. Create approximate profile

**Example with title:**
````markdown
{{< elevation-chart 
    data="1430,1550,1720,1950,2180,2420,2642"
    labels="0,5,10,15,20,25,30"
    title="Day 3: Valloire to Col du Galibier"
>}}
````

---

## Layout Shortcodes

### Newspaper Layout

**File:** `layouts/shortcodes/newspaper.html`

**Usage:**
````markdown
{{< newspaper >}}

Your content here flows in 2 columns on desktop.

## Section Heading

More content...

{{< img src="photo.jpg" alt="Description" >}}

Continues in columns...

{{< /newspaper >}}
````

**Features:**
- 2-column text flow on desktop (>1024px)
- Single column on mobile/tablet
- Images break columns (full width)
- Headings break columns
- Justified text with hyphenation
- Professional magazine/newspaper feel

**Best for:**
- Long-form articles
- Essays
- In-depth technical writing

---

### Cycling Story Layout

**File:** `layouts/shortcodes/cycling-story.html`

**Usage:**
````markdown
{{< cycling-story >}}

The morning started early at 5:30 AM...

## The Climb Begins

Content flows in 2 columns...

{{< ride-stats distance="127" elevation="2847" time="7:23" >}}

{{< img src="summit.jpg" alt="Summit photo" >}}

More story content...

{{< /cycling-story >}}
````

**Features:**
- 2-column newspaper layout
- Drop cap on opening paragraph
- Stats cards break columns
- Images break columns
- Elevation charts break columns
- Blockquotes styled for emphasis
- Mobile responsive

**Best for:**
- Cycling trip reports
- Long-form ride stories
- Tour diaries

---

### Flexible Columns

**File:** `layouts/shortcodes/columns.html`

**Usage:**

**2 columns:**
````markdown
{{< columns >}}
Text flows in 2 columns here.
{{< /columns >}}
````

**3 columns:**
````markdown
{{< columns count="3" >}}
Text flows in 3 columns here.
{{< /columns >}}
````

**Parameters:**
- `count` - Number of columns (default: "2")

**Best for:**
- Lists of items
- Comparison sections
- Dense information

---

## Built-in Hugo Shortcodes

Hugo includes several built-in shortcodes:

### Figure
````markdown
{{< figure src="/images/photo.jpg" title="Photo title" caption="Photo caption" >}}
````

### YouTube
````markdown
{{< youtube VIDEO_ID >}}
````

### Vimeo
````markdown
{{< vimeo VIDEO_ID >}}
````

### Tweet
````markdown
{{< tweet user="username" id="TWEET_ID" >}}
````

### Gist
````markdown
{{< gist username GIST_ID >}}
````

---

## Shortcode Combinations

### Tech Tutorial Example
````markdown
## Installation

{{< columns >}}

**Linux:**
```bash
sudo apt install hugo
```

**macOS:**
```bash
brew install hugo
```

{{< /columns >}}

{{< img src="terminal.jpg" alt="Terminal screenshot" caption="Hugo installation output" >}}
````

### Cycling Post Example
````markdown
## Day 3 Overview

{{< ride-stats distance="127.4" elevation="2847" time="7:23" avg-speed="25.4" >}}

{{< elevation-chart 
    data="1430,1720,2420,2642,1240,2764"
    labels="0,15,30,45,70,100,127"
    title="Double Col Challenge"
>}}

{{< cycling-story >}}

The alarm went off at 5:30 AM...

## The Route

{{< cycling-gallery >}}
{{< img src="start.jpg" alt="Morning start" caption="6 AM departure" >}}
{{< img src="climb.jpg" alt="The climb" >}}
{{< img src="summit.jpg" alt="Summit" caption="2,642m!" >}}
{{< /cycling-gallery >}}

Full story continues...

{{< /cycling-story >}}
````

### Photo Essay Example
````markdown
# Alpine Photography Journey

{{< gallery >}}
{{< img src="sunrise.jpg" alt="Alpine sunrise" caption="5:30 AM - First light" >}}
{{< img src="valley.jpg" alt="Morning valley" caption="Mist clearing" >}}
{{< img src="panorama.jpg" alt="Mountain panorama" wide="true" >}}
{{< img src="peak.jpg" alt="Mountain peak" caption="Mont Blanc massif" >}}
{{< img src="wildflowers.jpg" alt="Alpine wildflowers" >}}
{{< img src="sunset.jpg" alt="Evening light" caption="Golden hour magic" >}}
{{< /gallery >}}
````

---

## Creating Custom Shortcodes

### Simple Shortcode

**File:** `layouts/shortcodes/highlight.html`
````html
<div class="highlight-box">
    {{ .Inner | markdownify }}
</div>
````

**Usage:**
````markdown
{{< highlight >}}
This is important information!
{{< /highlight >}}
````

### Shortcode with Parameters

**File:** `layouts/shortcodes/note.html`
````html
{{ $type := .Get "type" | default "info" }}

<div class="note note--{{ $type }}">
    <strong>{{ $type | title }}:</strong>
    {{ .Inner | markdownify }}
</div>
````

**Usage:**
````markdown
{{< note type="warning" >}}
This is a warning message.
{{< /note >}}

{{< note type="tip" >}}
This is a helpful tip.
{{< /note >}}
````

---

## Shortcode Best Practices

### DO:
✅ Use descriptive alt text for images  
✅ Add captions to provide context  
✅ Mark elevation graphs as wide  
✅ Include all required parameters  
✅ Test on mobile before publishing  

### DON'T:
❌ Forget alt text on images  
❌ Use generic filenames (image1.jpg)  
❌ Nest galleries inside galleries  
❌ Mix newspaper and cycling-story layouts  
❌ Overuse wide images  

---

## Troubleshooting

### Image not appearing

**Check:**
1. Image is in same folder as `index.md`
2. Filename matches exactly (case-sensitive)
3. Using `{{< img >}}` not `![]()` markdown syntax
4. File extension correct (.jpg not .JPG)

### Shortcode not rendering

**Check:**
1. Using `{{< >}}` not `{{ }}`
2. Shortcode file exists in `layouts/shortcodes/`
3. Spelling is correct
4. All parameters provided

### Chart.js not loading

**Check:**
1. Internet connection (loads from CDN)
2. Browser console for errors
3. Script tags not blocked

### Gallery images not alternating

**Check:**
1. Using `{{< gallery >}}` wrapper
2. Images don't all have `wide="true"`
3. Viewing on desktop (>768px width)
4. JavaScript loaded (check browser console)

---

## Performance Tips

### Images
- Optimize before upload (TinyPNG, ImageOptim)
- Use WebP when possible
- Keep under 150KB per image
- Use appropriate sizes (no 4000px images)

### Charts
- Limit data points to reasonable number (<100)
- Don't use multiple charts on same page unnecessarily
- Chart.js loads from CDN (one-time download)

### Galleries
- Don't exceed 20-30 images per gallery
- Consider splitting into multiple posts
- Use thumbnails for large collections

---

## Next Steps

✅ Understand all available shortcodes  
✅ Know when to use each type  
✅ Can combine shortcodes effectively  

Continue to → [Customization Guide](06-customization.md)