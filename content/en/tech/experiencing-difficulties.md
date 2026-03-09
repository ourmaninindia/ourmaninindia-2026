---
categories:
  - "tech"
tags:
  - "wiki"
  - "mysql"
date : 2012-08-07T21:22:59Z
title : "Sorry! This site is experiencing technical difficulties."
---


This error happened to the mysql user and password not being correct on file. Change the setting in LocalSettings.php. You can verify whether the details you have are correct by logging into the mysql database

    mysql -u ''wikiuser'' -p ''wikipassword''

where of course you have to replace the user name and password with your own details.

