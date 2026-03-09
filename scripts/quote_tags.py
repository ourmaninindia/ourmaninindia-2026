#!/usr/bin/env python3
"""
Quotes all Hugo front matter tags and categories unless already quoted.
Supports both list-style and inline array style.

Usage:
    python quote_hugo_tags.py /path/to/hugo/content
    python quote_hugo_tags.py /path/to/hugo/content --dry-run
"""

import os
import re
import sys
import argparse


def quote_value(value: str) -> str:
    """Add double quotes to a value if not already quoted."""
    value = value.strip()
    if (value.startswith('"') and value.endswith('"')) or \
       (value.startswith("'") and value.endswith("'")):
        return value  # already quoted
    return f'"{value}"'


def process_inline_array(match_str: str) -> str:
    """Process inline array style: tags: [hugo, "already quoted", modules]"""
    # Extract content inside brackets
    inner = match_str.strip()[1:-1]  # remove [ and ]
    if not inner.strip():
        return match_str

    items = [item.strip() for item in inner.split(',')]
    quoted = [quote_value(item) for item in items if item.strip()]
    return '[' + ', '.join(quoted) + ']'


def process_front_matter(content: str) -> tuple[str, bool]:
    """
    Process YAML front matter and quote tags/categories.
    Returns (modified_content, was_changed).
    """
    # Match front matter block
    fm_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not fm_match:
        return content, False

    front_matter = fm_match.group(1)
    original_fm = front_matter
    lines = front_matter.split('\n')
    new_lines = []
    in_target_block = False  # are we inside tags/categories list?

    target_keys = {'tags', 'categories'}

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip()

        # Check if this line starts a target key
        key_match = re.match(r'^(\s*)(tags|categories)\s*:\s*(.*)', stripped, re.IGNORECASE)
        if key_match:
            indent = key_match.group(1)
            key = key_match.group(2)
            rest = key_match.group(3).strip()

            if rest.startswith('['):
                # Inline array style: tags: [hugo, modules]
                # Could span multiple lines — collect until ]
                full = rest
                while ']' not in full and i + 1 < len(lines):
                    i += 1
                    full += lines[i].strip()
                quoted_array = process_inline_array(full)
                new_lines.append(f'{indent}{key}: {quoted_array}')
                in_target_block = False
            elif rest == '' or rest is None:
                # List style on following lines
                new_lines.append(stripped)
                in_target_block = True
            else:
                # Single inline value: tags: hugo
                new_lines.append(f'{indent}{key}: {quote_value(rest)}')
                in_target_block = False
        elif in_target_block:
            # Check if this is a list item (starts with - )
            list_item_match = re.match(r'^(\s*)-\s+(.*)', stripped)
            if list_item_match:
                item_indent = list_item_match.group(1)
                item_value = list_item_match.group(2).strip()
                quoted = quote_value(item_value)
                new_lines.append(f'{item_indent}- {quoted}')
            else:
                # No longer in the list block
                in_target_block = False
                new_lines.append(stripped)
        else:
            new_lines.append(stripped)

        i += 1

    new_fm = '\n'.join(new_lines)
    if new_fm == original_fm:
        return content, False

    new_content = content.replace(fm_match.group(1), new_fm, 1)
    return new_content, True


def process_file(filepath: str, dry_run: bool = False) -> bool:
    """Process a single markdown file. Returns True if file was changed."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    # Normalise Windows line endings before processing
    normalised = original.replace('\r\n', '\n').replace('\r', '\n')
    modified, changed = process_front_matter(normalised)

    # If we normalised CRLF, that counts as a change too
    if normalised != original:
        changed = True

    if changed:
        if dry_run:
            print(f"[DRY RUN] Would update: {filepath}")
        else:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)
            print(f"Updated: {filepath}")

    return changed


def process_directory(directory: str, dry_run: bool = False):
    """Recursively process all .md files in a directory."""
    changed_count = 0
    total_count = 0

    for root, _, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                total_count += 1
                if process_file(filepath, dry_run):
                    changed_count += 1

    print(f"\n{'[DRY RUN] ' if dry_run else ''}Done. {changed_count}/{total_count} files {'would be' if dry_run else 'were'} updated.")


def main():
    parser = argparse.ArgumentParser(description='Quote Hugo front matter tags and categories.')
    parser.add_argument('path', help='Path to Hugo content directory or single .md file')
    parser.add_argument('--dry-run', action='store_true', help='Show what would change without modifying files')
    args = parser.parse_args()

    if not os.path.exists(args.path):
        print(f"Error: Path not found: {args.path}")
        sys.exit(1)

    if os.path.isfile(args.path):
        changed = process_file(args.path, args.dry_run)
        if not changed:
            print("No changes needed.")
    else:
        process_directory(args.path, args.dry_run)


if __name__ == '__main__':
    main()