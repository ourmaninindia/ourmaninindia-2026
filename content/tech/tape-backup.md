---
categories:
  - tech
tags:
  - open source
  - tape
  - backup
  - fedora
date : 2012-10-23T08:20:36Z
title : "Tape Backup"
---


To make a tape backup, give the following two commands on the terminal of the Felicity Linux server. The first one rewinds the tape to the beginning and the second one makes the actual backup. Just cut and paste the following two lines, press enter, and leave it for the machine to do the backup.

    mt -f /dev/st0 rewind tar -cpzvf /dev/st0 /home/

So only the /home/ directory is being backed up. It is therefore important that any files outside the home directory should be copied to some home directory prior to the tape backup, unless you want to run two backups.

To see the status of the backup

    mt -f /dev/st0 rewind mt -f /dev/st0 status

This gives the following output

>drive type = 114 drive status = 1140850688 sense key error = 0 residue count = 0 file number = 0 block number = 0

Once we got an error which was a paid and finally turned out to be related to the firmware

    tar -xvf /dev/st0 /home/xxx/ 

tar (child): /dev/st0: Cannot read: Input/output error tar (child): At beginning of tape, quitting now tar (child): Error is not recoverable: exiting now gzip: stdin: unexpected end of file tar: Unexpected EOF in archive tar: Error is not recoverable: exiting now

