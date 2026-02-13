---
categories: ["open-source"]
date: 2012-08-07T10:23:36Z
description: ""
tags: ["open-source"]
title: "MySQL backup and restore"
---


To backup a single database:

    mysqldump --user=root --password=password mydb > mydb.sql

Yes it is no typo, there is no space between the -p and the password!

You may like to add this to the my.cfg file in etc to avoid      

    [mysqldump]  
    events  
    ignore-table=mysql.events

If you didn’t use the –all-databases option but instead selectively backed up one or more tables or databases, you need to tell MySQL which database to place them in when restoring them. We do that by adding the -D option to the command line above. Here’s an example which restores the tables in the file mydb.sql to the database named mydb:

    mysql --user=root --password=secret -D mydb < mydb.sql

To backup all databases:

    mysqldump --user=root --password=password --all-databases > mydump.sql

Assuming you backed up all your databases to a file named mydump.sql with the mysqldump –all-databases command, you can restore them as follows:

    mysql --user=root --password=password < mydump.sql

A shorter version is to use -uroot and -psecret in lieu of –user=root and –password=secret

