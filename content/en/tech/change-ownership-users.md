---
categories:
  - "tech"
tags:
  - "open source"
  - "ownership"
  - "new user"
date : 2012-12-11T11:42:43Z
title : "Change ownership among users"
---


When an employee leaves you may want to pass on the ownership of his/her files to someone else. To do that simply give the following command:

    chown -cR --from:olduser newuser:newgroup *

