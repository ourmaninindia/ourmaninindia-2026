---
categories:
  - tech
tags:
  - open source
  - encryption
  - ccrypt
date : 2014-07-13T15:26:58Z
title : "File encryption with ccrypt"
---


No doubt you have, like me, one or more documents that you would like extra protected. How can you remember all your passwords, access codes, urls etc which you know you should not have available in plain text. In Linux there are several tools that make file encrypting easy.

I like to use a little tool called **ccrypt** for its simplicity. Having said that, it uses an algorithm known as *AES*, with 256-bit considered an extremely powerful encryption method. You can encrypt any file including that picture that you would not like others to ever see. The reason I like it is that you have to remember virtually nothing but the encryption password. Here is what I mean:

You install via apt-get (in Ubuntu, I use 14.10) or yum.

    sudo apt-get install ccrypt

To encrypt

    ccrypt sensitive.file

Of course, you should replace the file name with the name of your own file and its path. Then it’ll ask for a password twice, and that is all there is to it. The file will be named the same with an additional “.cpt” extension.

To decrypt you’ll have to use the “-d” attribute:

    ccrypt -d sensitive.file.cpt

If you are really paranoia you could change the file name but it’s an easy way to know in what state a file is in. For more features just check out the man page. For me this did the job.

