#!/bin/bash

# Convert Hugo frontmatter from old format to new format
# Usage: ./convert_frontmatter.sh [directory]
# Default directory: current directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-.}"
BACKUP_DIR="${TARGET_DIR}/.frontmatter_backup_$(date +%Y%m%d_%H%M%S)"

echo "==================================="
echo "Hugo Frontmatter Converter"
echo "==================================="
echo "Target directory: $TARGET_DIR"
echo "Backup directory: $BACKUP_DIR"
echo ""

# Create backup
mkdir -p "$BACKUP_DIR"
echo "Creating backups..."

converted_count=0
skipped_count=0

# Find all markdown files
find "$TARGET_DIR" -type f \( -name "*.md" -o -name "*.markdown" \) | while read -r file; do
    # Skip files in backup directory
    if [[ "$file" == *"$BACKUP_DIR"* ]]; then
        continue
    fi
    
    # Create backup
    rel_path="${file#$TARGET_DIR/}"
    backup_file="$BACKUP_DIR/$rel_path"
    mkdir -p "$(dirname "$backup_file")"
    cp "$file" "$backup_file"
    
    # Convert using Python script
    python3 "$SCRIPT_DIR/convert_frontmatter.py" "$file"
done

echo ""
echo "==================================="
echo "Conversion complete!"
echo "Backups saved to: $BACKUP_DIR"
echo "==================================="
echo ""
echo "To verify changes, run:"
echo "  diff -r $BACKUP_DIR $TARGET_DIR"
echo ""
echo "To restore from backup if needed:"
echo "  cp -r $BACKUP_DIR/* $TARGET_DIR/"
