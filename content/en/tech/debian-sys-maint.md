---
categories:
  - "tech"
tags:
  - "open-source"
  - "mysql"
  - "debian-sys-maint"
  - "database"
  - "maintenance"
  - "configuration"
  - "access denied"
date : 2012-08-07T21:22:31Z
title : "Access denied for user ‘debian-sys-maint’@'localhost’"
---


debian-sys-maint is a system MySQL user created to be able to start/stop the databases and to carry out maintenance operations. The above error message is therefore due to a mismatch between the mysql debian-sys-maint password in the mysql database and that in the configuration file /etc/debian.cnf. Check and copy the password on file:

    cat /etc/debian.cnf

log into mysql

    mysql -u root -p

set the mysql database password for debian-sys-maint to that as on file in the /etc/debian.cnf

    GRANT ALL PRIVILEGES ON *.* TO 'debian-sys-maint'@'localhost' IDENTIFIED BY 'the password in /etc/mysql/debian.cnf ';

restart the mysql service

