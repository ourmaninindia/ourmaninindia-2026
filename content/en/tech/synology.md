---
categories:
  - tech
tags:
  - open source
  - synology
date : 2012-08-07T10:54:49Z
title : "Synology"
---


The SynologyAssistant had worked out of the box on Ubuntu but for FC17 I had to do some extra work. First of all I had to add quite a few packages:

    yum install libXt.so.6 libXext.so.6 libfontconfig.so.1 libXrender.so.1 libSM.so.6 libgobject-2.0.so.0 libfreetype.so.6 libstdc* glib glib-devel glib2 libqwt

In the firewall I added eth0 as a trusted device.

FC17 uses bios device names like p17p1 rather than NIC names as eth0. Not sure whether that matters but I changed it to the old nic name by appending ”biosdevname=0” in the command line starting with the word kernel in grub.conf.

    vim /etc/grub.conf

I then also copied network script and edited that accordingly.

    cp /etc/sysconfig/network-scripts/ifcfg-p17p1 /etc/sysconfig/network-scripts/ifcfg-eth0

To complete it all I added an icon in the application list so that next time I don’t have to remember the complate path and command. I created a file in the shared applications folder

    vim /usr/share/applications/synology.desktop

and added the following contents. The icon I had to add of course to the /usr/share/icons/hicolor/48x48/ folder

    [Desktop Entry] 
    Type=Application Encoding=UTF-8 
    Name=Synology 
    Comment=Synology Assistant 
    Exec=/usr/local/SynologyAssistant/SynologyAssistant 
    Icon=synology.png 
    Terminal=false 
    Categories=GNOME;Application;Development; 
    StartupNotify=true

