---
categories:
  - "tech"
tags:
  - "open-source"
  - "cron"
  - "cronjob"
date : 2012-08-08T13:08:05Z
title : "Cron working but not executing?"
---


I was struggling to understand why cron, which was running ok, was not executing my file in /etc/cron.hourly/hourly.backup while if I would run this script by hand it was working file!

The reason is that cron doesn’t like a dot in a filename (at least in Ubuntu)

