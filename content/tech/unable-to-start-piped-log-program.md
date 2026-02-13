---
categories : ["open-source"]
date : 2012-08-07T21:21:16Z
description : ""
tags : ["open-source"]
title : "Unable to start piped log program"

---


>unable to start piped log program ' /usr/local/ispconfig/server/scripts/vlogger -s access.log -t "%Y%m%d-access.log" -d "/etc/vlogger-dbi.conf" /var/log/ispconfig/httpd': No such file or directory Unable to open logs

This happened after I deleted ISPConfig3 which for unknown reasons I could not get to work out of the box. I checked the contents off all the other apache files and bingo I found the culprit.

    cat /etc/apache2/sites-enabled/000-ispconfig.conf |grep vlogger

> ISPConfig Logfile configuration for vlogger CustomLog “| /usr/local/ispconfig/server/scripts/vlogger -s access.log -t \”%Y%m%d-access.log\” -d \”/etc/vlogger-dbi.conf\” /var/log/ispconfig/httpd” combined_ispconfig  

 Remove the file

    rm sites-enabled/000-ispconfig.conf

and don’t forget to restart apache.

    /etc/apache2# /etc/init.d/apache2 restart

