---
categories:
  - tech
tags:
  - open source
  - public key
  - keygen
  - key generating
  - ssh
date : 2013-09-29T09:50:40Z
title : "Public key without a password as a non root user"
---


After the Chinese attacked my system trice recently I am a bit paranoid about securing my system. I used to sync data using rsync which uses ssh. However, using this as root is not a good idea hence I decided to use rsync as a non-root user without a prompt for a password. This post is therefore an update from the one I wrote almost exactly two years ago.

**First the essentials**  
 First we create a dummy user called mybackup on both machines and lock the password

    useradd mybackup passwd -l mybackup

Check that ssh does not allow root logon.

    vim /etc/ssh/sshd_config

edit the relevant line as follows (this may already be set correctly)

    PermitRootLogin : no

if you changed a setting here you need to restart the deamon

    /etc/init.d/sshd restart

**Avoid password prompts**  
 For all the backups to occur automatically it is essential that the public key of the server running a backup program, usually stored in ~/.ssh/, is copied and appended to the authorized_keys2 (or authorized_keys depending on distribution) file of the server it connects to, being to copy data to or from.

Should you get a message ”Host key verification failed” this means that your machine has lost or changed the key. You can regenerate this using *sudo ssh-add *or

    ssh-keygen -t rsa

Instead of rsa you may like to use dsa which is another algorithm. If you happen to have a Synology NAS you should use the latter!

When prompted for a password, do not enter one. This will generate a password-less key called id_rsa, and a public key id_rsa.pub. Copy the id_rsa.pub key over to the machine you want to ssh to. NOTE: you may want to change the filename first or you may overwrite your existing RSA key for your remote host. Like this: on the local machine do the following where ip_address means the actual ip such as 192.168.x.x

    scp /root/.ssh/id_rsa.pub ip_address:/root/.

You then log on to the remote machine

    ssh root@ip_address

and then on the remote you append the key to the authorized_keys2 file. Note that authorized_keys is being deprecated and replaced with authorized_keys2. Check therefore which of the two is present and you may like to delete the old key from the file.

    cat id_rsa.pub >> /root/.ssh/authorized_keys2

Make sure the authorized_keys file has only rw access, otherwise it will still ask you for a password!

At this point, your remote machine should accept a password-less login from the local machine. Yes, you then have to repeat the last actions for each and every remote machine you want it to connect to.

test the above using the simple command

    ssh mybackup@remote-ip

If you get access to the remote machine without a prompt it works. Now there are a few interesting tweaks as mybackup does not have permission to the actual data.

First, copy the public key of root on the local machine to the authorized_keys2 on the remote machine. On the remote server add the mybackup user to the sudoers file, so that it can execute rsync with no password. Open /etc/sudoers as follows

    sudo visudo

Add a line as follows

     mybackup ALL: NOPASSWD:/usr/bin/rsync

Then we need to use the –rsync-path option to make rsync on the source run as root
    
     rsync -av -e "ssh" --rsync-path:"sudo rsync" mybackup@remote

If this works you can add it, as mybackup user, to the cron

     crontab -e

I generally use the following string which excludes a number of files or directories such as trash, logs etc.

     sudo rsync -rptgoDLKve ssh --delete-excluded --safe-links --exclude-from:/home/myself/etc/rsync_exclude --rsync-path:"sudo rsync" mybackup@mydomain.com:/source/path/ /dest/path/

