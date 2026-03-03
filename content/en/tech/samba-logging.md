---
categories:
  - tech
tags:
  - open source
  - samba
  - logging
  - server
date : 2012-12-10T15:42:37Z
title : "Samba logging"
---


A staff member came to me to state that his Yahoo account had been hacked from our company account, or so he claimed. This made me look at the samba logs and realise that user logging was not actually implemented while it is relatively easy to do so.

This is used on Ubuntu 11.04 but the same should more or less work on any other system.

Edit the Samba configuration file and add the following

    vfs objects = full_audit 
    full_audit:prefix = %u|%I|%m|%s 
    full_audit:success = open read pwrite unlink rmdir delete 
    full_audit:failure = none 
    full_audit:facility = LOCAL7     
    full_audit:priority = ALERT

I have set failure at none as I am only worried about if people gain access and the logs generated are rather huge.

Then edit the syslog configuration file

    vim /etc/rsyslog.d/50-default.conf

and add

    local7.* /var/log/samba/audit.log

Note that the audit log needs to be owned by syslog.adm without which no logging to another file but syslog will take place.

    chmod 640 /var/log/samba/audit.log chown syslog.adm /var/log/samba/audit.log

Don’t forget to restart the services for the changes to take effect

    service smbd restart 
    service nmbd restart 
    service rsyslog restart

The above staff member had accused our IT manager who has full access to the system. In such a case perhaps it may be an idea to make such a file a hidden one by prefixing the file name with a full-stop.

