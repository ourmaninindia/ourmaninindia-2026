---
categories : ["open-source"]
date : 2015-09-09T15:46:39Z
description : ""
tags : ["open-source"]
title : "Reduce the size of a pdf"

---


A somewhat weird but simple way to reduce a pdf is to concert it to a ps and back e.g.

    pdf2ps input.pdf output.ps && ps2pdf output.ps output.pdf

