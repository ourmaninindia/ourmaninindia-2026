---
categories:
  - tech
tags:
  - business
  - gmail
  - hacking
  - mail server
  - isync
date : 2013-09-29T22:13:18Z
title : "Moving mail to Google Apps"
---


After my server was attacked and brought down by the Chinese I wasn’t certain whether or not the machine was compromised. I decided though to move my mail to Google Apps instead, preferring a good sleep over worries of another more ferocious attack.

As my mail wasn’t on a live machine I could not use Google’s suggestion of using their API. Copying mail using both accounts in Thunderbird would have been a great manual effort but I also noticed it to be highly unreliable for large folders so I swiftly gave that up.

After looking around I decided to use **isync**, an odd name as the main command is actually called mbsync. It seems that isync is the name of the project and mbsync that of the executable.

The first step, obviously, is to enable IMAP in your GMail account. Then install mbsync which is well explained by [Chris Streeter](http://chrisstreeter.com/archive/2009/04/gmail-imap-backup-with-mbsync-on-ubuntu.html)

    sudo apt-get install libc6 libdb4.2 libssl0.9.8 libssl-dev sudo apt-get source isync sudo apt-get install ca-certificates

The following will show you the two certificates needed for you to cut and paste as separate files in your system

    openssl s_client -connect imap.gmail.com:993 -showcerts

The path of these two files you need to specify in the configuration file as CertificateFile. We now set up the mbsync configuration. I did mine as root, not ideal I guess but practical for a one time effort as my mail sits in /var/vmail/.

    vim  /root/.mbsyncrc

You can cut and past the following into it, modifying your user, pass, path etc. I set sync to *push* as I only want to push the mail to Google. You can use *Pull* if you want to backup your Google mail account. IMAPStore and MaildirStore names may be altered.

IMAP
Account      gmail 
Host             *imap.gmail.com* 
User             *your@email.com* 
Pass             *your_password* 
UseIMAPS         yes 
CertificateFile  *~/gmail-backup/*gmail.crt 
CertificateFile  *~/gmail-backup/*google.crt 
CertificateFile  /usr/share/ca-certificates/mozilla/Equifax_Secure_CA.crt 
IMAPStore  gmail-cloud 
Account    gmail MaildirStore  gmail-backup 
Path          */var/vmail/path/Maildir/* 
Inbox         */var/vmail/path/Maildir/* 
Channel   gmail 
Master    :gmail-cloud: 
Slave     :gmail-backup: 
Patterns * ![Gmail]* "[Gmail]/All Mail" 
Create    Master Expunge   None Sync      
Push SyncState *

mbsync creates a hidden folder in root called .mbsync to keep track of the synchronisation. So if something goes wrong, simple delete this directory and mbsync will test everything again.

What took me quite some time to figure out was that (1) it expects a mail directory called Maildir and (2) apparently either mbsync or Google doesn’t like hidden folders. So I first changed the folders by removing the dot prefixing each folder name.

    for f in .*; do mv $f "`echo $f | cut -c2- `"; done

To preserve hierarchy you may want to rename subsequent dots in the imap directory name to slashes. I didn’t bother and did that manually in gmail, delighted to have my mail again.

