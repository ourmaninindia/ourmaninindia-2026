---
categories : ["open-source"]
date : 2015-10-04T17:29:25Z
description : ""
tags : ["open-source"]
title : "Search for a text string within files"

---


At times you see that a particular image or so is not found when loading a web page and you are at a loss where the call came from. At least I had that today when I noticed that a menu image was called. The command to search for that is actually really straight forward:

    grep -rnw 'directory' -e "string pattern"

e.g. *grep -rnw ‘public/’ -e mobile-menu.png*

