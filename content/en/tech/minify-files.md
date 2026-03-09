---
categories:
  - "tech"
tags:
  - "open source"
  - "minify"
  - "yui"
  - "ubuntu"
date : 2015-10-04T17:21:27Z
title : "Minify files"
---


I use yui-compressor to minify my files. It’s so easy. In Ubuntu (15.04) it’s available via apt-get.

To install it (on Ubuntu) type the following in your terminal window

    apt-get install yui-compressor

The command structure to run it is

    yui-compressor SOURCE > TARGET

e.g.  
*yui-compressor public/css/custom.css > public/css/custom.min.css*

