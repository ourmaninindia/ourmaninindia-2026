---
categories:
  - tech
tags:
  - open source
  - odbc
  - plack
  - mssql server
  - database
date: 2015-06-10T14:26:44Z
title: "ODBC link with a database"
---


I have a web server which needs to link to a MS SQL server (not my choice). In my case I use Plack which calls the database in four steps. The catch I often struggle with is that some other files with the same name may float around and which you may not be aware off.

Run therefore a “find / -name odbc.ini” to double check this. Ditto for the others. Also check the proper location of the driver libtdsodbc.so and modify the path accordingly.

First ensure you installed the following modules using yum or apt-get

    apt-get install odbc odbc-devel freetds-dev freetds-bin tdsodbc unixodbc

1) /home/user/path/config.yml  
This is the plack configuration file which you may skip and/or change should you use a different web server.

[..] 
plugins: 
Database: 
connections: 
sqlserver: 
dsn: 'dbi:ODBC:DB_reference' 
username: xxxx 
password: xxxx 
dbi_params: 
RaiseError: 1 
AutoCommit: 1 
PrintError: 1 
LongReadLen: 102400 
[..]

2) /etc/ODBC.ini

[DB_reference] 
Driver = FreeTDS 
Servername = DB_reference 
Port = 1433 
Database = your_DB_name

3) /etc/ODBCinst.ini

[FreeTDS] 
Description = TDS driver (Sybase/MS SQL) 
Driver = /usr/lib/x86_64-linux-gnu/odbc/libtdsodbc.so 
Setup = /usr/lib/x86_64-linux-gnu/odbc/libtdsS.so CP
Timeout = 
CPReuse =

4) /etc/freetds/freetds.conf

[global] 
tds version = 7.0 ; 
dump file = /tmp/freetds.log ; 
debug flags = 0xffff ; 
timeout = 10 ; 
connect timeout = 10 
text size = 64512 

[yourServerName] 
host = 192.168.x.x 
port = 1433 
client charset = UTF-8

