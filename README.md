# Hugo Blog - Documentation

A modern, high-performance Hugo blog with advanced features built on Ubuntu Linux.

## 🚀 Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/your-blog.git
cd your-blog

# Install dependencies (see Installation Guide)
sudo apt update
sudo apt install hugo

# Run development server
hugo server -D

# Open browser to http://localhost:1313
```

## 📚 Documentation Guide

# Hugo Blog - Documentation

...

## 📚 Documentation Guide

### Getting Started
1. **[Installation Guide](01-installation.md)** - Set up Hugo and dependencies on Ubuntu
2. **[Project Structure](02-project-structure.md)** - Understand the file organization
3. **[Configuration](03-configuration.md)** - Configure your blog settings

### Content Creation
4. **[Writing Posts](04-writing-posts.md)** - Create and organize content
5. **[Shortcodes](05-shortcodes.md)** - Use advanced content features
6. **[Customization](06-customization.md)** - Style and theme your blog

### Advanced Topics
7. **[Integrations](07-integrations.md)** - Newsletter, comments, analytics
8. **[Deployment](08-deployment.md)** - Deploy to production
9. **[Performance](09-performance.md)** - Optimize for speed
10. **[Troubleshooting](10-troubleshooting.md)** - Fix common issues
11. **[Advanced Features](11-advanced.md)** - Deep dives into features
12. **[Forms & Submissions](12-forms-and-submissions.md)** - ← NEW: Form handling guide

...

## ✨ Features

- ✅ **Blazing Fast** - Static site generation with sub-second build times
- ✅ **Bilingual Support** - English and French (easily extensible)
- ✅ **Full-Text Search** - Client-side search with Fuse.js
- ✅ **Newsletter Integration** - ConvertKit/Buttondown support
- ✅ **Privacy-Friendly Comments** - Cusdis (no account required)
- ✅ **Cookie Consent** - GDPR-compliant
- ✅ **Reading Progress Bar** - Visual scroll indicator
- ✅ **Table of Contents** - Auto-generated with active highlighting
- ✅ **Image Optimization** - WebP, responsive, lazy loading
- ✅ **Cycling Post Support** - Strava-style stats and galleries
- ✅ **Newspaper Layout** - Multi-column text flow
- ✅ **SEO Optimized** - Meta tags, Open Graph, Schema.org

## 🎯 Use Cases

### Tech Blog
- Code syntax highlighting
- Multi-column layouts for tutorials
- Image galleries for screenshots
- Full-text search

### Cycling Blog
- Ride statistics cards
- Interactive elevation charts
- Photo galleries with captions
- Route documentation

### Mixed Content Blog
- Flexible layouts for different post types
- Category-based styling
- Author bio system
- Newsletter integration

## 🛠️ Tech Stack

- **Hugo Extended** - Static site generator
- **Sass/SCSS** - CSS preprocessor (modular architecture)
- **Vanilla JavaScript** - No frameworks, pure performance
- **Fuse.js** - Client-side search
- **Chart.js** - Data visualization
- **Cusdis** - Privacy-friendly comments
- **ConvertKit** - Email newsletter

## 📖 Quick Reference

### Create New Post
```bash
hugo new blog/my-post/index.md
```

### Add Images
```markdown
{{< img src="image.jpg" alt="Description" >}}
```

### Ride Statistics
```markdown
{{< ride-stats distance="127" elevation="2847" time="7:23" >}}
```

### Build for Production
```bash
hugo --minify
```

## 🤝 Contributing

Contributions welcome! Please read the documentation first, then:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

**Alfred Tuinman**
- Website: [alfredtuinman.com](https://alfredtuinman.com)
- GitHub: [@ourmaninindia](https://github.com/ourmaninindia)
- LinkedIn: [@ourmaninindia](https://linkedin.com/in/ourmaninindia)

---

**Need Help?** Start with the [Installation Guide](01-installation.md) →# template
