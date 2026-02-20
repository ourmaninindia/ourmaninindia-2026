#!/bin/bash

echo "Generating archive pages..."

# Array of sections
sections=("blog" "cycling" "tech")

# Create base archives directory
mkdir -p "content/archives"

for section in "${sections[@]}"; do
    echo "Processing section: $section"

    # Create archive directory for this section in root archives
    mkdir -p "content/archives/$section"

    # Declare associative array to collect posts per month
    declare -A archives

    # Process files in current shell
    while read file; do
        # Skip archive files themselves (now checking for archives/ in path)
        if [[ "$file" == *"/archives/"* ]]; then
            continue
        fi

        # Skip draft posts
        is_draft=$(grep -m1 "^draft:" "$file" | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]')
        if [[ "$is_draft" == "draft:true" ]]; then
            continue
        fi

        # Extract date from front matter
        date=$(grep -m1 "^date" "$file" | sed 's/date[[:space:]]*:[[:space:]]*//' | tr -d '"' | tr -d "'")

        if [ ! -z "$date" ]; then
            # Extract year-month
            yearmonth=$(echo "$date" | cut -d'T' -f1 | cut -d'-' -f1,2)
            year=$(echo "$yearmonth" | cut -d'-' -f1)
            month=$(echo "$yearmonth" | cut -d'-' -f2)

            # Skip invalid dates
            if [ "$year" = "0001" ] || [ -z "$year" ]; then
                continue
            fi

            # Add file path to the archive for this month
            archives["$yearmonth"]+="$file"$'\n'
        fi
    done < <(find "content/$section" -name "*.md" -type f)

    # Loop through collected year-month keys to create/update index.md
    for yearmonth in "${!archives[@]}"; do
        year=$(echo "$yearmonth" | cut -d'-' -f1)
        month=$(echo "$yearmonth" | cut -d'-' -f2)
        
        # NEW: Archives now go in content/archives/$section/$yearmonth
        archivedir="content/archives/$section/$yearmonth"
        mkdir -p "$archivedir"

        # Start YAML front matter
        cat > "$archivedir/index.md" << EOF
---
title: "${section^} Archive $yearmonth"
layout: archive
section: "$section"
year: "$year"
month: "$month"
url: "/$section/archive/$yearmonth/"
posts:
EOF

        # Append list of posts to front matter
        while read post; do
            [[ -z "$post" ]] && continue
            # Get the parent directory name (the post slug)
            postslug=$(basename "$(dirname "$post")")
            echo "  - $postslug" >> "$archivedir/index.md"
        done <<< "${archives[$yearmonth]}"

        # Close front matter
        echo "---" >> "$archivedir/index.md"
        echo "Created/updated: $archivedir/index.md"
    done

    # Unset associative array for next section
    unset archives
done

echo "Archive generation complete!"
echo "Archives created in: content/archives/{blog,cycling,tech}/"