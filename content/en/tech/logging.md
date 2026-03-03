---
categories:
  - tech
tags:
  - open source
  - vim
  - logging
  - rsyslog
date : 2012-08-08T13:07:26Z
title : "Logging"
---


It is handy to have cron log to /var/log/cron.log. You can change this setting in

    sudo vim /etc/rsyslog.d/50-default.conf

You will need to restart the services

     sudo service rsyslog restart sudo service cron restart

