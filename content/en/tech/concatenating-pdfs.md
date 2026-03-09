---
categories:
  - "tech"
tags:
  - "open source"
  - "contatenate"
  - "pdf"
  - "Ghostscript"
date : 2012-10-08T15:55:30Z
title : "Concatenating pdfs"
---


Use Ghostscript to contatenate pdf files:

    gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=finished.pdf file1.pdf file2.pdf

