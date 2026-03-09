---
categories:
  - "tech"
tags:
  - "open source"
  - "rcode"
  - "spam"
  - "apache"
  - "mail server"
date : 2013-08-28T13:47:36Z
title : "Error: unexpected RCODE REFUSED"
---


If you get many of these in your massages log, it is as a result of spammers hitting the mail server with bogus domains and the DNS is trying to resolve the IP to the domain, it is coming back false, and the mail server drops the message as designed.

To avoid these message, though I like knowing what happens, add the following in the logging section of named.conf

    category lame-servers {null;};

