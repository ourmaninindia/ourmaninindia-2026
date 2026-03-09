---
categories:
  - "tech"
tags:
  - "open-source"
  - "postfix"
  - "amavisd"
date : 2013-08-28T13:50:57Z
draft : false
slug : "amavisd-connection-refused"
title : "Error: Postfix/amavisd - connect to 127.0.0.1[127.0.0.1]:10024: Connection refused"
---


You use a Postfix setup with amavisd-new and get the following errors in your mail log:

>status=deferred (connect to 127.0.0.1[127.0.0.1]:10024 Connection refused)

The solution is to restart both amavisd-new and Postfix and then check with

    netstat -tap

that both are running on the ports 25 and 10025 (postfix) and 10024 (amavisd-new).

