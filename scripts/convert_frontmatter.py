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
    
    # Check if conversion is needed
    original_frontmatter = frontmatter
    
    # Extract tags and keywords before conversion
    tags_set = set()
    
    # Extract existing tags (array format)
    tags_match = re.search(r'^tags\s*:\s*\[([^\]]+)\]', frontmatter, re.MULTILINE)
    if tags_match:
        tag_items = re.findall(r'["\']([^"\']+)["\']', tags_match.group(1))
        tags_set.update(item.strip() for item in tag_items if item.strip())
    
    # Extract existing tags (list format)
    tags_list_match = re.search(r'^tags:\s*\n((?:  - .+\n?)+)', frontmatter, re.MULTILINE)
    if tags_list_match:
        tag_items = re.findall(r'^\s*-\s*(.+)$', tags_list_match.group(1), re.MULTILINE)
        tags_set.update(item.strip() for item in tag_items if item.strip())
    
    # Extract keywords (array format)
    keywords_match = re.search(r'^keywords\s*:\s*\[([^\]]+)\]', frontmatter, re.MULTILINE)
    if keywords_match:
        keyword_items = re.findall(r'["\']([^"\']+)["\']', keywords_match.group(1))
        tags_set.update(item.strip() for item in keyword_items if item.strip())
    
    # Extract keywords (list format)
    keywords_list_match = re.search(r'^keywords:\s*\n((?:  - .+\n?)+)', frontmatter, re.MULTILINE)
    if keywords_list_match:
        keyword_items = re.findall(r'^\s*-\s*(.+)$', keywords_list_match.group(1), re.MULTILINE)
        tags_set.update(item.strip() for item in keyword_items if item.strip())
    
    # Remove keywords field entirely (we're merging into tags)
    frontmatter = re.sub(r'^keywords\s*:.*$', '', frontmatter, flags=re.MULTILINE)
    frontmatter = re.sub(r'^keywords:\s*\n((?:  - .+\n?)+)', '', frontmatter, flags=re.MULTILINE)
    
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
    
    # Convert categories array format
    def convert_categories(match):
        array_content = match.group(1)
        items = re.findall(r'["\']([^"\']+)["\']', array_content)
        items = [item.strip() for item in items if item.strip()]
        
        if not items:
            return match.group(0)
        
        result = "categories:\n"
        for item in items:
            result += f"  - {item}\n"
        return result.rstrip()
    
    frontmatter = re.sub(
        r'^categories\s*:\s*\[([^\]]+)\]',
        convert_categories,
        frontmatter,
        flags=re.MULTILINE
    )
    
    # Remove old tags field (we'll add merged version)
    frontmatter = re.sub(r'^tags\s*:.*$', '', frontmatter, flags=re.MULTILINE)
    frontmatter = re.sub(r'^tags:\s*\n((?:  - .+\n?)+)', '', frontmatter, flags=re.MULTILINE)
    
    # Add merged tags field (sorted alphabetically, or keep empty if none)
    if tags_set:
        tags_lines = "tags:\n"
        for tag in sorted(tags_set):
            tags_lines += f"  - {tag}\n"
        # Insert tags after categories if they exist, otherwise at the end of frontmatter
        if re.search(r'^categories:', frontmatter, re.MULTILINE):
            frontmatter = re.sub(
                r'(^categories:\n(?:  - .+\n)+)',
                r'\1' + tags_lines,
                frontmatter,
                flags=re.MULTILINE
            )
        else:
            frontmatter = frontmatter.rstrip() + '\n' + tags_lines
    else:
        # Keep empty tags field for manual addition
        if re.search(r'^categories:', frontmatter, re.MULTILINE):
            frontmatter = re.sub(
                r'(^categories:\n(?:  - .+\n)+)',
                r'\1tags:\n',
                frontmatter,
                flags=re.MULTILINE
            )
        else:
            frontmatter = frontmatter.rstrip() + '\ntags:\n'
    
    # Remove empty quoted fields EXCEPT tags (e.g., description : "", keywords: "")
    # Match field name, colon, whitespace, empty quotes, but not tags
    frontmatter = re.sub(
        r'^\s*(?!tags)(\w+)\s*:\s*["\'][\'"]\s*$',
        '',
        frontmatter,
        flags=re.MULTILINE
    )
    
    # Remove multiple consecutive blank lines (cleanup after removing fields)
    frontmatter = re.sub(r'\n\n+', '\n', frontmatter)
    
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
