---
categories:
  - "tech"
tags:
  - "open source"
date : 2013-08-15T23:39:58Z
description : "500 error on uploading large images"
title : "500 error on uploading large images"
---

I noticed a strange error while uploading files. My server does not allow any file to be uploaded above the 128kb, even when the settings in /etc/php.ini are set to higher sizes.

After a lot of searching I managed to find the solution: add the following to the file /etc/httpd/conf.d/fcgid.conf :

    FcgidMaxRequestLen 1073741824

Don’t forget to restart the apache server.