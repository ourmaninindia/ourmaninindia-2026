---
categories:
  - "tech"
tags:
  - "html"
  - "perl"
date : 2012-04-22T14:13:00Z
title : "Strip HTML code"
---


Use the sed terminal command with an input file called say test.html

    sed 's/<[^>]*>//g' input.html

if you want to save the output just do the following

    sed 's/<[^>]*>//g' input.html > output.txt

