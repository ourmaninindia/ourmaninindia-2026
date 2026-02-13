# Installation Guide

Complete guide to installing Hugo and all dependencies on Ubuntu Linux.

## Prerequisites

- Ubuntu 20.04 LTS or later
- Terminal access
- Internet connection

## 1. Install Hugo Extended

Hugo Extended is required for Sass/SCSS support.

### Method 1: Using APT (Recommended)
```bash
# Update package list
sudo apt update

# Install Hugo Extended
sudo apt install hugo

# Verify installation
hugo version
```

You should see output like:
```
hugo v0.122.0+extended linux/amd64 BuildDate=unknown
```

⚠️ **Important:** Ensure you see `+extended` in the version output.

### Method 2: Download Latest Release

If APT version is outdated:
```bash
# Download latest Hugo Extended
wget https://github.com/gohugoio/hugo/releases/download/v0.122.0/hugo_extended_0.122.0_linux-amd64.deb

# Install package
sudo dpkg -i hugo_extended_0.122.0_linux-amd64.deb

# Verify installation
hugo version

# Clean up
rm hugo_extended_0.122.0_linux-amd64.deb
```

### Method 3: Using Snap
```bash
# Install Hugo Extended via Snap
sudo snap install hugo --channel=extended

# Verify installation
hugo version
```

## 2. Install Dart Sass (Optional)

Dart Sass enables modern `@use` syntax instead of deprecated `@import`.
```bash
# Download Dart Sass Embedded
wget https://github.com/sass/dart-sass-embedded/releases/download/1.69.5/sass_embedded-1.69.5-linux-x64.tar.gz

# Extract archive
tar -xzf sass_embedded-1.69.5-linux-x64.tar.gz

# Move to system path
sudo mv sass_embedded /usr/local/bin/

# Verify installation
dart-sass-embedded --version

# Clean up
rm sass_embedded-1.69.5-linux-x64.tar.gz
```

## 3. Install Git

For version control and deployment:
```bash
# Install Git
sudo apt install git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify installation
git --version
```

## 4. Install Node.js (Optional)

Only needed if you want to use npm packages:
```bash
# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

## 5. Clone the Blog Repository
```bash
# Clone your blog
git clone https://github.com/yourusername/your-blog.git

# Navigate to directory
cd your-blog

# Check structure
ls -la
```

## 6. Verify Installation

Test that everything works:
```bash
# Run development server
hugo server -D

# You should see:
# Web Server is available at http://localhost:1313/
```

Open your browser to `http://localhost:1313` - you should see your blog!

Press `Ctrl+C` to stop the server.

## 7. Install VS Code (Recommended Editor)
```bash
# Download VS Code
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Install
sudo apt update
sudo apt install code

# Clean up
rm -f packages.microsoft.gpg

# Launch VS Code
code
```

### Recommended VS Code Extensions

Install these for the best experience:
```bash
# Open VS Code
code

# Then install extensions:
# 1. "Hugo Language and Syntax Support"
# 2. "Markdown All in One"
# 3. "SCSS IntelliSense"
# 4. "Better TOML"
```

Or install via command line:
```bash
code --install-extension budparr.language-hugo-vscode
code --install-extension yzhang.markdown-all-in-one
code --install-extension mrmlnc.vscode-scss
code --install-extension bungcip.better-toml
```

## 8. Troubleshooting

### Hugo not found
```bash
# Check if Hugo is in PATH
which hugo

# If not found, add to PATH
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc
```

### Hugo version is old
```bash
# Remove old version
sudo apt remove hugo

# Use Method 2 above to install latest
```

### Permission denied errors
```bash
# Fix permissions on blog directory
sudo chown -R $USER:$USER ~/your-blog
```

### Sass compilation errors
```bash
# Ensure you have Hugo Extended
hugo version | grep extended

# If not, reinstall Hugo Extended (see Method 2)
```

## Next Steps

✅ Hugo installed and working  
✅ Development server runs  
✅ Editor configured  

Continue to → [Project Structure](02-project-structure.md)