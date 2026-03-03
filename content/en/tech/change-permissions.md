---
categories:
  - tech
tags:
  - open source
  - chmod
  - change permissions
date : 2012-08-07T10:22:57Z
title : "Change permissions on files only"
---


find . -type f -print0 | xargs -0 chmod 444

Change the type from f to d if you only want to change the permissions on the directories, Plus the permission of course.

    find . -type d -print0 | xargs -0 chmod 755

