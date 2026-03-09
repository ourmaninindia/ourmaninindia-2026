---
categories:
  - "tech"
tags:
  - "open source"
  - "ubuntu 14.04"
  - "wireless"
date : 2014-10-07T06:59:16Z
description : "Wireless not working in Ubuntu 14.04"
title : "Wireless not working in Ubuntu 14.04"
---
I did a fresh install the other day of Ubuntu 14.04 on a little notebook for my daughter. All worked out of the box with the exception of the wireless which had worked before using version 12.

The following terminal commands may give you a clue as to which network controller you have.

    iwconfig lspci -vnn | grep Network

All I had to do was install a driver and reboot

    sudo apt-get install linux-firmware-nonfree sudo reboot

There are diffrent drivers depending on your network controller. See the following link for more details

[http://askubuntu.com/questions/55868/installing-broadcom-wireless-drivers](http://askubuntu.com/questions/55868/installing-broadcom-wireless-drivers "http://askubuntu.com/questions/55868/installing-broadcom-wireless-drivers")