#!/bin/bash

echo "Generating archive pages..."

# Create archives directory
mkdir -p content/blog/archive

# Get unique year-month from blog posts
find content/blog -name "*.md" -type f | while read file; do
    # Skip archive files themselves
    if [[ "$file" == *"/archive/"* ]]; then
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
        
        # Create directory
        archivedir="content/blog/archive/$yearmonth"
        mkdir -p "$archivedir"
        
        # Create/update index.md
        cat > "$archivedir/index.md" << EOF
---
title: "Archive $yearmonth"
date: ${date}
layout: archive
year: "$year"
month: "$month"
url: "/blog/archive/$yearmonth/"
---
EOF
        echo "Created: $archivedir/index.md"
    fi
done

echo "Archive generation complete!"
