---
categories : ["open-source"]
date : 2017-10-07T11:45:30Z
description : ""
tags : ["open-source"]
title : "Is your nfs working"

---


I use nfs quite a lot. It allows local access to remote files i.e. the remote folder is mounted locally so you can access the remote files locally.

Often overlooked, make sure the proper NFS RPC-based services are enabled for portmap (not required for nfs4). Issue the following command as root:

<pre>rpcinfo -p</pre>
This should list some lines mentioning mountd.

To install nfs (here on centos):
<pre>yum install nfs-utils nfs-utils-lib</pre>

Proper install details are descriped in  https://www.tecmint.com/how-to-setup-nfs-server-in-linux/

/etc/exports is the file that needs to list the folders accessible to nfs, for example this directory called photo on my nas:

<pre><i>/volume1/photo	*(rw,async,no_wdelay,no_root_s/pre>quash,insecure_locks,sec:sys,anonuid:0,anongid:0)</i></pre>

The showmount will list all the mount points at a parcticular ip address while the command mount will show them on your local machine, if any.

<pre>showmount -e <server ip> </pre>

You shouldn't need to restart NFS every time you make a change to /etc/exports. All that's required is to issue the appropriate command after editing the /etc/exports file:

<pre>exportfs -ra</pre>

To verify whether nfs is actually running you need to check two daemons

Type the following command:
<pre>ps aux | grep nfsd</pre>

On older system (NFSv3 and older), you also need to make sure portmap service is running:
<pre>ps aux | grep 'portmap</pre>

Finally I needed to check whether /etc/hosts was set properly on the server. On a windows machine that file is located in windows/system32/drivers/etc/hosts and translates an ip address to a server name e.g.
 
<i>192.168.0.100  nas </i>

Note that on a synology nas you need to set the permissions of the folder via the control panel. I initially tried via the terminal window but got stuck in no time.

