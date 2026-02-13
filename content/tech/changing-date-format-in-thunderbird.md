---
categories : ["open-source"]
date : 2012-08-15T16:52:38Z
description : ""
tags : ["open-source"]
title : "Changing date format in Thunderbird"
---


Create a small bash file

    vi ~/thunder

and cut and paste the following in it.

    #!/bin/sh 
    export LC_TIME=en_GB 
    exec /usr/bin/thunderbird "$@

Then make the file executable and edit the launcher

    chmod 774 ~/thunder gnome-desktop-item-edit /usr/share/applications/mozilla-thunderbird.desktop

and replace the command with ~/thunder i.e. the path of the above file.

*Note:* unfortunately you will have to repeat the last command after each upgrade

