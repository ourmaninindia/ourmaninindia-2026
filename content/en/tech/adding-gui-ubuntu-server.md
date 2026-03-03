---
categories:
  - tech
tags:
  - open source
date : 2012-08-08T13:10:55Z
description : "Adding a GUI to your Ubuntu server"
title : "Adding a GUI to your Ubuntu server"
---

I know that you don’t need a GUI op a server but sometimes you are in a small business environment where the people having to use it are not that familiar with a terminal. If you install ubuntu-desktop you overkill it by installing all user software packages like office, some games,gimp, etc which of course will also take ages. The following will set us a basic gui quickly.

    sudo aptitude install --without-recommends ubuntu-desktop