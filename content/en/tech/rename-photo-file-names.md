---
categories:
  - "tech"
tags:
  - "open source"
  - "rename file"
  - "photos"
  - "jhead"
  - "file name"
date : 2013-03-16T19:36:46Z
title : "Rename photo file names"
---


Normally your photos in your digital camera are saved with some number which says very little and may conflict with the next batch after you clear your memory. One of the best programs I have ever used to rename my photos is jhead. This takes the date when the picture was actually taken. Fabulous! Try it out, I promise you won’t regret it.

    jhead -n%Y%m%d-%H%M%S *

One improvement would be to add the gps coordinates but my camera is not that fancy as yet.

you may have to install jhead with yum or apt-get e.g.

    apt-get install jhead

