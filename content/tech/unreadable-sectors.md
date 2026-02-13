---
categories : ["open-source"]
date : 2013-03-17T11:43:28Z
description : ""
tags : ["open-source"]
title : "Currently unreadable (pending) sectors"

---


I have been receiving alerts from root that “Device: /dev/sda [SAT], 4 Currently unreadable (pending) sectors”. As all my data is backup properly I don’t worry about it. Googling it, I didn’t find a straight answer for this.

>smartctl --all /dev/sda | grep -e "Reallocated_Sector_Ct" -e "Current_Pending_Sector" -e "Offline_Uncorrectable" -e "UDMA_CRC_Error_Count" -e "Hardware_ECC_Recovered"

The output is as follows:

>[root@myhome ~]# smartctl --all /dev/sda | grep -e "Reallocated_Sector_Ct" -e "Current_Pending_Sector" -e "Offline_Uncorrectable" -e "UDMA_CRC_Error_Count" -e "Hardware_ECC_Recovered" 5 Reallocated_Sector_Ct 0x0033 200 200 140 Pre-fail Always - 0 197 Current_Pending_Sector 0x0032 200 200 000 Old_age Always - 4 198 Offline_Uncorrectable 0x0030 200 200 000 Old_age Offline - 0 199 UDMA_CRC_Error_Count 0x0032 200 200 000 Old_age Always - 0

