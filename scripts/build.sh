#!/bin/bash
set -e

npm install

# Add node_modules/.bin to PATH for this process and all children
export PATH="$PWD/node_modules/.bin:$PATH"

# Verify sass is found and executable
echo "Using sass: $(which sass)"
sass --version

hugo --gc --minify
