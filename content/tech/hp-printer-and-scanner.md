---
categories:
  - tech
tags:
  - open source
  - yum
  - fedora
  - hp scanner
date : 2012-08-07T10:54:19Z
title : "HP printer and scanner"
---


I use xsane which needs to be added as well as some other development packages

    yum install xsane gcc cups-devel python-devel libusb-devel libtool libjpeg-turbo-devel qt4 qt4-devel pyqt4 pyqt4-devel dbus-devel

Run hp-check to see if you have all the required packages covered

    hp-check

I still haven’t got my scanner to work 

