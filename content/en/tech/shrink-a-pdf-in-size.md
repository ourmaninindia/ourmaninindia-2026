---
categories:
  - "tech"
tags:
  - "pdf"
  - "reduce size"
  - "pdf2ps"
date : 2015-09-09T15:46:39Z
title : "Reduce the size of a pdf"
---


A somewhat weird but simple way to reduce a pdf is to concert it to a ps and back e.g.

    pdf2ps input.pdf output.ps && ps2pdf output.ps output.pdf

