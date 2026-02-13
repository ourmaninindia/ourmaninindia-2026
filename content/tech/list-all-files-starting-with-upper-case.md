---
categories : ["open-source"]
date : 2012-08-07T10:22:25Z
description : ""
tags : ["open-source"]
title : "List all files starting with upper case"

---


find . -type f -name '[[:upper:]]*'

If you want to change files to all lower case, e.g. your mp3 music files then run the following script. The -i option for the mv command stands for interactive, i.e. it will prompt for your approval.

    #!/bin/sh 
    if [ $# -eq 0 ] ; 
    then 
       echo Usage: $0 Files exit 0 
    fi 
    for f in $* ; 
      do g:`echo $f | tr "[A-Z]" "[a-z]"` 
      echo mv -i $f $g mv -i $f $g 
    done

*Thanks to Anil Awasare for this script*

