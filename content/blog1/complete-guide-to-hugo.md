---
title: "Complete Guide to Hugo"
---

This guide is comprehensive, so we've organized it into collapsible sections.

<div class="accordion-list">

<div class="accordion">
<button class="accordion__toggle" aria-expanded="false">
<span class="accordion__title">📦 Installation & Setup</span>
<span class="accordion__icon">+</span>
</button>
<div class="accordion__content">

First, install Hugo Extended:
```bash
sudo apt install hugo
```

Then create your site:
```bash
hugo new site my-blog
cd my-blog
```

</div>
</div>

<div class="accordion">
<button class="accordion__toggle" aria-expanded="false">
<span class="accordion__title">⚙️ Configuration</span>
<span class="accordion__icon">+</span>
</button>
<div class="accordion__content">

Edit your `config.toml`:
```toml
baseURL = "https://example.com/"
title = "My Blog"
```

</div>
</div>

<div class="accordion">
<button class="accordion__toggle" aria-expanded="false">
<span class="accordion__title">✍️ Creating Content</span>
<span class="accordion__icon">+</span>
</button>
<div class="accordion__content">

Create your first post:
```bash
hugo new posts/my-first-post.md
```

</div>
</div>

</div>