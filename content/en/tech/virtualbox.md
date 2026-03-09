---
categories:
  - "tech"
tags:
  - "open source"
  - "virtualbox"
date : 2012-08-08T13:10:04Z
title : "Virtualbox"
---


I did try to in vain install vmware so I changed to virtualbox. There I got the following error:

>"Windows failed to start. A recent hardware or software change might be the cause. To fix the problem: 1. Insert your windows install disk and restart the computer. 2. Choose your language settings, and then click NEXT 3. Click repair the computer.

To avoid this, click on Settings tab of the Virtualbox. Then go to systems and you will see an check box called “Enable IO APIC”. This needs to be enabled.

