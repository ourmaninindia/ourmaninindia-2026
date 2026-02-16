---
categories:
  - tech
tags:
  - open-source
  - fedora
  - ubuntu
date : 2012-08-07T08:12:17Z
title : "Change to Fedora 17"
---


Recently I installed Ubuntu 12.04 server only to find that the samba server was horribly slow. I replaced it with Fedora 15 and it runs like a train. Yes, I know 15 is an old version but for a production site you don’t want the latest bugs. Also, [howtoforge](http://www.howtoforge.com/perfect-server-fedora-15-x86_64-ispconfig-3) has a stunningly good article on how to set up a perfect server.

##### Minimize and re-size buttons

So I have been working with older Fedora desktop versions before but FC17 threw me a bit. First of all I missed the minimize and re-size buttons. Re-sizing is now done with a simple double click on the top bar. A hint in that direction would have been useful! To minimize you have to right click the bar bar for a menu to appear.

##### shut down?

Similarly, if you want to shut down the desktop. There is no button to do so! I was totally bewildered wondering whether the installation had gone wrong somewhere. This turns out to be a matter of holding down the Alt button as that makes the ”Suspend” option change to ”Power off”. Handy to know…

##### Error messages

Also I have a few error messages in the syslog which may not be Fedora 17 specific.

**Postfix error**

Failed at step EXEC spawning /etc/postfix/chroot-update: No such file or directory

This is a bug as a result of the changeover from init to systemd – see [http://www.digipedia.pl/usenet/thread/19341/39160/](http://www.digipedia.pl/usenet/thread/19341/39160/)

**Bluetooth error**

Parsing /etc/bluetooth/input.conf failed: No such file or directory

Not that I care about bluetooth on my desktop, not certain it even has the capability, but this means I should install the addiional bluez packages i.e.

    yum install bluez*

It solved that problem but got another one in return from bluetoothd

Parsing /etc/bluetooth/audio.conf is missing

**Avahi error**

WARNING: No NSS support for mDNS detected, consider installing nss-mdns!

This comes from the avahi-deamon. I did what it suggested:

     yum install nss-mdns

**Clamd error**

systemd-tmpfiles: Two or more conflicting lines for /var/run/clamd.amavisd configured, ignoring

This is the daemon that creates tmp files on start up. There is indeed a conflict so I adhere to the howtoforge instructions and move the troubled configuration file out of the way.

     mv /etc/tmpfiles.d/amavisd-new.conf /root/.

Then there was another issue:

/etc/init.d/clamd.amavisd: line 7: /usr/share/clamav/clamd-wrapper: No such file or directory

As [Jan Slupski](http://juljas.net/lpt/ "Jan Slupski") suggested adding the following package appeared to have solved this

    yum install clamav-server-sysvinit

**tcsd error**

tcsd: Starting tcsd: [FAILED]

An old bug. You can either disable it (systemctl disable tcsd.service), or ignore it because it doesn’t harm your system. Odd actually as I do not have tcsd enabled in ntsysv.

**hp error**  
 hp-check reported that I needed libnetsnmp-devel which was provided by net-snmp-devel, reportlab, and some sane packages

    yum install net-snmp-devel python-reportlab sane*

**Ruby error**

/etc/httpd/conf.d/ruby.conf: Cannot load /etc/httpd/modules/mod_ruby.so into server: /etc/httpd/modules/mod_ruby.so: undefined symbol: ruby_dln_librefs

systemctl start httpd.service gave me an error  
 
At a loss here

**nisplus error**

lookup_read_master: lookup(nisplus): couldn't locate nis+ table auto.master

This occurs in particular whenever the autofs service is started/restarted/reloaded. It appears to be an old unresolved bug [https://bugzilla.redhat.com/show_bug.cgi?id:425968](https://bugzilla.redhat.com/show_bug.cgi?id:425968)

