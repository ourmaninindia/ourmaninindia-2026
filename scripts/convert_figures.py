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
for filepath in glob.glob('/home/alfred/webapps/ourmaninindia-2026/content/**/*.md', recursive=True):
    total += convert_file(filepath)

print(f"\nDone! Total conversions: {total}")

~/webapps/ourmaninindia-2026/scripts$ python3 convert_figures.py
Converted 2 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/spotme-at-the-strategic-growth-forum-india/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/2013-world-economic-forum-report-on-global-risks/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/vietnam/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/world-picture/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/leaders-in-india/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/innovation-machine/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/adding-value-in-a-low-market/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/modern-druids/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/world-boutique-award/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/the-lokpal-bill/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/economic-and-political-dimension/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/creating-alliances/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/assocham-sets-up-european-headquarters-in-amsterdam/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/klm-off-target/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/travel-in-india/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/the-republic-of-technology/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/the-book-is-out/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/eclectic-thoughts/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/selecting-software-for-a-greenfield/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/asias-rise-how-and-when/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/meat-loaf/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/masterclass-china/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/not-outsourcing-to-increase-own-skill-sets/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/overcoming-the-global-innovation-trade-off/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/face-to-face/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/cultural-differences/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/the-future-is-highly-distributed/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/wikileaks/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/leadership-in-the-21st-century/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/large-scale-integrator/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/big-history/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/blog/to-quit-or-not-to-quit/index.md
Converted 8 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/cycling/tour-de-tolerance/index.md
Converted 6 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/cycling/tour-de-tolerance-2021/index.md
Converted 17 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/cycling/a-solo-bicycle-ride-in-portugal/index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/tech/_index.md
Converted 1 figure(s) in: /home/alfred/webapps/ourmaninindia-2026/content/tech/support-net-neutrality/index.md

Done! Total conversions: 66