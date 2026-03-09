---
categories:
  - "tech"
tags:
  - "open source"
  - "apache"
  - "server"
date : 2012-08-08T17:36:21Z
title : "HTTP not working"
---


I was surprised that apache didn’t work out of the box. Thanks to [DoomDeathMetal](http://forums.fedoraforum.org/member.php?u:191367) (what a name!) this was easily solved:

    rm -rf /etc/httpd yum -y reinstall httpd systemctl start httpd.service

