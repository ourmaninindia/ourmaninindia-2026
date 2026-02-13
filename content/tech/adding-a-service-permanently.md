---
categories : ["open-source"]
date : 2012-11-15T11:03:03Z
description : ""
draft : false
tags : ["open-source"]
title : "Adding a service permanently"
---


systemctl enable name-of-the-service

To use Samba as an example

    systemctl enable smb.service systemctl enable nmb.service systemctl start smb.service systemctl start nmb.service

All that the first command does is create a symlink  
 
    ln -s ‘/usr/lib/systemd/system/smb.service’ ‘/etc/systemd/system/multi-user.target.wants/smb.service’

Thus /etc/systemd/system/multi-user.target.wants contains all services that need to start automatically.

