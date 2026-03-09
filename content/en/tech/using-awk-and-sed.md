---
categories:
  - "tech"
tags:
  - "open source"
  - "awk"
  - "sed"
  - "prepend"
  - "append"
  - "htaccess"
  - "dos2unix"
date : 2015-08-28T13:19:48Z
title : "Prepend and append example of a redirect file using awk and sed"
---


I needed to generate a .htaccess redirect file where each line has a simple command

    redirect 301 old-file new-file

The file called crawl-error.txt with all the required urls that needed a redirect was quite long so I did the following in no time. First ensure that the file is really a proper text file as otherwise whatever you want to append will be prepended instead.

    dos2unix crawl-error.txt

Then prepend the text, in my case “redirect 301 “, and output the result to .htaccess

    awk '{print "redirect 301 " $0}' crawl-error.txt > .htaccess

then append the required text, in my case ‘http://www.travellers-palm.com’

    sed -i "s|$| http://www.travellers-palm.com|" .htaccess

Voila that was all.

