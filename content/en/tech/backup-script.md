---
categories:
  - tech
tags:
  - open source
  - backup
  - rsync
date : 2012-08-08T13:54:19Z
draft : false
title : "Backup script"
---


I use rsync for all my backup scripts. It is fast and easy.

    #!/bin/bash 
    LOGFILE=/var/log/backup.log 
    EMAILID=Alfred Tuinman@xyz.com 
    NASDISK=192.168.x.x:/volume1/backup/myserver # the NAS station 
    ARGMNTS="-rptgoDLKve ssh --delete-excluded --safe-links --exclude-from=/path-to-my-file/rsync_exclude" 
    ERROR=0 log='' 
    # for a daily copy on weekdays (5 copies) 
    if [ `date +%u` -lt 6 ]; 
    then weekday=`date +%w-%A` 
    else weekday='5-Friday'; 
    fi 
    # for rotating every day (2 copies) uncomment the following line in lieu of the above 
    #if [ $(( `date +%w` % 2 )) -eq 0 ]; then weekday=1 else weekday=2 fi command="/var/vmail/ $NASDISK/$weekday/var/vmail/" 
    echo "syncing $command" 
    if rsync $ARGMNTS $command 
    then log="$log `date +%d-%m-%G\ %k:%M:%m` | `basename $0` | Synchronised | $command " 
    else 
    ERROR=1 log="$log `date +%d-%m-%G\ %k:%M:%m` | `basename $0` | Error | $command ($?) " 
    fi 
    if [ "x$ERROR" != "x0" ] ; 
      then echo "$log" | mailx -s "Error on gateway: `basename $0`" $EMAILID 
    fi 
    echo "$log" >> $LOGFILE 
    exit 0

Put this in your crontab

    vim crontab -e

and add something like the following for a working day of 9 to 6 only. The /dev/null prevents your mailbox to get flooded with useless mails. You only want to receive a mail when something goes wrong.

    10 10-19 * * 1-5 /path-to-my-file/backup-cron &> /dev/null

