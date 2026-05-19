# Setup Instructions

## 🚀 First Time Setup

After extracting the ZIP file, follow these steps:

### 1. Create the output directory
```bash
mkdir -p static/css
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start developing
```bash
npm run scss:watch
```

That's it! Your SCSS will now compile automatically whenever you make changes.

---

## 📁 Expected Folder Structure After Setup

```
scss-blog-structure/
├── assets/                  # Assets directory
│   └── scss/               # Your SCSS source files (edit these)
├── static/                  # Created automatically
│   └── css/
│       ├── style.css       # Compiled CSS (generated)
│       └── style.css.map   # Source map (generated)
├── node_modules/           # Created by npm install
└── package.json
```

---

## 🔧 Troubleshooting

### Error: "no such file or directory"
**Solution:** Make sure you're in the correct directory
```bash
cd scss-blog-structure
ls assets/scss/main.scss  # Should show the file exists
```

### Error: "command not found: sass"
**Solution:** Install dependencies first
```bash
npm install
```

### Changes not reflecting in browser?
**Solution:** 
1. Make sure `npm run scss:watch` is running
2. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check that your HTML links to `static/css/style.css`

---

## 🎯 Quick Commands

| Command | What it does |
|---------|-------------|
| `npm install` | Install Sass compiler |
| `npm run scss:watch` | Watch and auto-compile (development) |
| `npm run scss:dev` | Compile once (development) |
| `npm run scss:build` | Compile minified (production) |

---

## 📝 Next Steps

1. ✅ Run setup commands above
2. 📖 Read `QUICKSTART.md` for usage guide
3. 🎨 Start editing files in `assets/scss/` folder
4. 🚀 Watch your changes compile automatically!
