import re
import os
import glob

# Pattern to match the old figure shortcode block
pattern = re.compile(
    r'\{\{<\s*figure'           # opening {{< figure
    r'([^>]*)'                  # figure attributes (class, figcaption etc)
    r'>\}\}'                    # closing >}}
    r'\s*'                      # whitespace
    r'\{\{<\s*img'              # opening {{< img
    r'([^>]*)'                  # img attributes (src, alt etc)
    r'>\}\}'                    # closing >}}
    r'\s*'                      # whitespace
    r'\{\{<\s*/figure\s*>\}\}', # closing {{< /figure >}}
    re.DOTALL
)

def parse_attrs(attr_string):
    """Parse key=value pairs from shortcode attributes"""
    attrs = {}
    for match in re.finditer(r'(\w+)\s*=\s*"([^"]*)"', attr_string):
        attrs[match.group(1)] = match.group(2)
    return attrs

def convert_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    def replace_match(m):
        figure_attrs = parse_attrs(m.group(1))
        img_attrs = parse_attrs(m.group(2))

        # Build Hugo figure shortcode
        parts = ['{{< figure']
        if 'src' in img_attrs:
            parts.append(f'src="{img_attrs["src"]}"')
        if 'alt' in img_attrs:
            parts.append(f'alt="{img_attrs["alt"]}"')
        if 'figcaption' in figure_attrs:
            parts.append(f'caption="{figure_attrs["figcaption"]}"')
        if 'class' in figure_attrs:
            parts.append(f'class="{figure_attrs["class"]}"')
        parts.append('>}}')

        return ' '.join(parts)

    new_content, count = re.subn(pattern, replace_match, content)

    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Converted {count} figure(s) in: {filepath}")

    return count

# Find all markdown files
total = 0
for filepath in glob.glob('/path/to/your/content/**/*.md', recursive=True):
    total += convert_file(filepath)

print(f"\nDone! Total conversions: {total}")