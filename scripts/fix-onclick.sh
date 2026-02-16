#!/bin/bash

echo "🔍 Searching for onclick attributes..."

# Find all HTML files with onclick
find layouts/ -name "*.html" -type f -exec grep -l "onclick=" {} \;

echo ""
echo "📝 Files with onclick found above."
echo ""
echo "⚠️  Manual review required for each file."
echo ""
echo "Common patterns to replace:"
echo "  onclick=\"functionName()\" → class=\"action-name\" + event listener"
echo "  onclick=\"this.method()\" → data-action=\"method\" + event listener"
echo ""