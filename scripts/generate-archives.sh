#!/bin/bash

echo "Generating archive pages..."

# Language → sections mapping
declare -A lang_sections
lang_sections["en"]="blog cycling tech"
lang_sections["nl"]="post"

for lang in "${!lang_sections[@]}"; do
    for section in ${lang_sections[$lang]}; do
        content_dir="content/$lang/$section"

        # Skip if section directory doesn't exist
        if [ ! -d "$content_dir" ]; then
            continue
        fi

        echo "Processing: $lang/$section"

        mkdir -p "content/$lang/archives/$section"

        declare -A archives

        while read file; do
            # Skip archive files
            if [[ "$file" == *"/archives/"* ]]; then
                continue
            fi

            # Skip draft posts (handles both YAML and TOML front matter)
            is_draft=$(grep -m1 "^draft" "$file" | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]')
            if [[ "$is_draft" == "draft:true" ]] || [[ "$is_draft" == "draft=true" ]]; then
                continue
            fi

            # Extract date from front matter (handles both YAML "date:" and TOML "date =")
            date=$(grep -m1 "^date" "$file" | sed 's/date[[:space:]]*[=:][[:space:]]*//' | tr -d '"' | tr -d "'")

            if [ ! -z "$date" ]; then
                yearmonth=$(echo "$date" | cut -d'T' -f1 | cut -d'-' -f1,2)
                year=$(echo "$yearmonth" | cut -d'-' -f1)
                month=$(echo "$yearmonth" | cut -d'-' -f2)

                if [ "$year" = "0001" ] || [ -z "$year" ]; then
                    continue
                fi

                archives["$yearmonth"]+="$file"$'\n'
            fi
        done < <(find "$content_dir" -name "*.md" -type f)

        for yearmonth in "${!archives[@]}"; do
            year=$(echo "$yearmonth" | cut -d'-' -f1)
            month=$(echo "$yearmonth" | cut -d'-' -f2)

            archivedir="content/$lang/archives/$section/$yearmonth"
            mkdir -p "$archivedir"

            cat > "$archivedir/index.md" << EOF
---
title: "${section^} Archive $yearmonth"
layout: archive
year: "$year"
month: "$month"
url: "/$lang/$section/archive/$yearmonth/"
posts:
EOF

            while read post; do
                [[ -z "$post" ]] && continue
                postslug=$(basename "$(dirname "$post")")
                echo "  - $postslug" >> "$archivedir/index.md"
            done <<< "${archives[$yearmonth]}"

            echo "---" >> "$archivedir/index.md"
            echo "Created/updated: $archivedir/index.md"
        done

        unset archives
    done
done

echo "Archive generation complete!"
