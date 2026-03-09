---
categories:
  - "tech"
tags:
  - "open source"
  - "mediawiki"
  - "uploading"
  - "server"
date : 2012-09-18T07:55:18Z
title : "Uploading a file in Mediawiki"
---


Uploading a file is easy if you see the upload link. I didn’t.

To ensure you see it you have to change the setting in LocalSettings.php

     $wgEnableUploads = true; 

You may get an error **Could not create directory “mwstore://local-backend/local-public/ **and some more alpha characters.  This turned out a simple permission problem. You have to set the permission of your images directory to 777

     chmod 777

