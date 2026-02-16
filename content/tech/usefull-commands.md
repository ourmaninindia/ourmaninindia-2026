---
date : 2012-08-07T08:21:43Z
title : "Find and delete files"
categories: 
  - tech
tags: 
  - find files
  - delete files
  - fedora
---


find . -type f -iname "file(s)-to-delete" -exec rm -f {} \;

The -iname makes it case insensitive, otherwise use -name. Of course you can also move them to say /tmp rather than deleting

find . -type f -iname "file(s)-to-delete" -exec mv {} /tmp/ \;

