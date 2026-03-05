## Comments System

The site uses **Netlify Forms** as the comment backend — submissions are stored in the Netlify dashboard and displayed via a Netlify Function that proxies the Netlify API.

### Architecture

```
User submits comment
    → POST to "/" (Netlify Forms)
    → Stored in Netlify dashboard

Page loads
    → GET /api/comments?pageId=/cycling/my-post/
    → Netlify Function fetches from Netlify API
    → Filters by pageId, returns JSON
    → comments.js renders threaded comments
```

### Files

| File | Purpose |
|------|---------|
| `layouts/partials/comments-netlify.html` | Hugo partial — comment form and display container |
| `assets/js/modules/comments.js` | Fetch, render and submit comments |
| `netlify/functions/comments.js` | Server-side proxy to Netlify Forms API |

### Environment Variables

Set these in Netlify dashboard → Site Settings → Environment Variables:

```
NETLIFY_ACCESS_TOKEN   Personal access token from app.netlify.com/user/applications
NETLIFY_SITE_ID        d00c3d1f-4fcd-445b-85c1-e1003d46e42d
```

### Netlify Function API endpoint

```
GET https://www.ourmaninindia.com/api/comments?pageId=/cycling/my-post/
```

Internally calls:
```
GET https://api.netlify.com/api/v1/sites/{SITE_ID}/submissions?form_name=comments&per_page=100
```

### Disabling comments on a page

Add to front matter:
```yaml
disable_comments: true
```

### Threaded replies

The form includes a hidden `parent_id` field. Clicking Reply on a comment sets this field. The `comments.js` module renders replies nested under their parent using recursive `renderComment()`.

### Moderation

All submissions are visible in **Netlify dashboard → Forms → comments**. Delete spam directly from the dashboard — deleted submissions will no longer appear on the site (on next page load).
