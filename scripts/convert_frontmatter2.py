#!/usr/bin/env python3
import sys
import re

def convert_frontmatter(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split frontmatter and content
    parts = content.split('---', 2)
    if len(parts) < 3:
        # No frontmatter, skip
        return False
    
    frontmatter = parts[1]
    body = parts[2]
    
    # Convert categories: ["blog"] to categories:\n  - blog
    def convert_array_to_list(match):
        key = match.group(1)
        array_content = match.group(2)
        
        # Extract items from array
        items = re.findall(r'["\']([^"\']+)["\']', array_content)
        
        # Filter out empty strings
        items = [item.strip() for item in items if item.strip()]
        
        if not items:
            return match.group(0)  # Keep original if no valid items
        
        # Build new format
        result = f"{key}:\n"
        for item in items:
            result += f"  - {item}\n"
        
        return result.rstrip()
    
    # Check if conversion is needed
    original_frontmatter = frontmatter
    
    # Convert both categories and tags
    frontmatter = re.sub(
        r'^(categories|tags)\s*:\s*\[([^\]]+)\]',
        convert_array_to_list,
        frontmatter,
        flags=re.MULTILINE
    )
    
    # Only write if something changed
    if frontmatter != original_frontmatter:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write('---')
            f.write(frontmatter)
            f.write('---')
            f.write(body)
        return True
    
    return False

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: convert_frontmatter.py <file>")
        sys.exit(1)
    
    filename = sys.argv[1]
    if convert_frontmatter(filename):
        print(f"✓ Converted: {filename}")
    else:
        print(f"- Skipped: {filename}")
