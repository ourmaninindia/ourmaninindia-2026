---
categories:
  - tech
tags:
  - open source
  - prompt colour
  - server
  - terminal
date : 2013-03-16T19:22:00Z
title : "prompt colour"
---


As I often work on multiple servers it is rather dangerous that one give a command on the wrong server. To minimise the risk it is good practise to colour the terminal prompt by adding this at the end of the ~/.bash_profile file.

    export PS1="\e[0;32m\u\e[m\e[0;32m@\h\w \$ \e[m"

and something like this in the root of the same server (i.e. you highlight root red vs home green)

    export PS1="\e[0;31m\u\e[m\e[0;32m@\h\w \$ \e[m"

The numericals for the various colours you can use are:  
 30 = Black  
 31 = Red  
 32 = Green  
 33 = Yellow  
 34 = Blue  
 35 = Purple  
 36 = Cyan  
 37 = White

# Background  
 40 = Black  
 41 = Red  
 42 = Green  
 43 = Yellow  
 44 = Blue  
 45 = Purple  
 46 = Cyan  
 47 = White

More information is available on [http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x329.html](http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x329.html)

