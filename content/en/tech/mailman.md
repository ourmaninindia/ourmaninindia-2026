---
categories:
  - "tech"
tags:
  - "open source"
  - "mailman"
date : 2013-02-26T23:23:07Z
title : "Mailman"
---

I was looking at creating a simple alias to enable to send a mail out to everybody. My first thought was to set an alias in /etc/aliases but that didn’t work as the email is was not recognized by postfix. I use ISPconfig, the latest version of which is supposed to support mailman. Hence I thought to quickly install that but ran into some minor problems. The main problem being that Google shows very few posts related to my problems. The main issue was to find support though that is available on http://www.gnu.org/software/mailman.

I used yum to install mailman. Then the trick is to run check_perms with the f parameter. Yes f stands for force but it is quite save as directories are added and permissions changed.

    bin/check_perms -f

Then you have to proceed and edit the configuration file

    vi /etc/httpd/conf.d/mailman.conf

and comment out the following line and, of course, change the domain name

    RedirectMatch ^/mailman[/]*$ http://your.domain.com/mailman/listinfo

also modify the following section while you are here

    ScriptAlias /mailman/ /usr/lib/mailman/cgi-bin/ ScriptAlias /cgi-bin/mailman/ /usr/lib/mailman/cgi-bin/ <directory></directory> AllowOverride None Options ExecCGI Order allow,deny Allow from all Alias /pipermail /var/lib/mailman/archives/public/ # no backslash after pipermail! <directory> Options Indexes MultiViews FollowSymLinks AllowOverride None Order allow,deny Allow from all AddDefaultCharset Off </directory>

Restart apache, set your mailman password, and create a newlist and follow the prompts

    /etc/init.d/httpd restart 
    /usr/lib/mailman/bin/mmsitepass 
    /usr/lib/mailman/bin/newlist

Note that the last line will advise you to copy a whole lot of aliases to the /etc/aliases file

    vi /etc/aliases

Run newaliases and start mailman  
     
    newaliases  
    /etc/init.d/mailman start

Now you are ready to go to the web browser http://your.domain.com/mailman/listinfo and everything else can be created via the web gui. At least so I hoped as I got a message  
*Error: Unknown virtual host: 192.168.x.x* . This was fixed by editing the mm_cfg.py file

    vim /etc/mailman/mm_cfg.py

and add the command add_vitualhost to add the ip address or domain name

    add_virtualhost( '192.168.x.x' )

Next I did get an interesting message: *Bug in Mailman version 2.1.14. We’re sorry, we hit a bug! Please inform the webmaster for this site of this problem. Printing of traceback and other system information has been explicitly inhibited, but the webmaster can find this information in the Mailman error logs.*

Looking at the error it is a locking issue in /var/lock/mailman How does one fix this as permissions appear correct?

