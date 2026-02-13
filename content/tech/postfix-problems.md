---
categories : ["open-source"]
date : 2012-09-24T20:06:13Z
description : ""
tags : ["open-source"]
title : "Postfix problems"

---


For some reason my postfix installation went totally wrong. I don’t know why other that I suspect that my IT manager may have given the wrong command and in his enthusiasm messed things up.

I didn’t see much of an option but to reinstall postfix but that turned to be a lot harder than expected as aptitude insisted to install exim as a replacement which it couldn’t do. No matter what purge postfix etc I tried, I was stuck. In the end the solution was simple: install sendmail, which removes postfix, and then to install postfix which removes sendmail.

Later I came across *sudo dpkg-reconfigure postfix* which may have done this instead.

Do ensure to kill the sendmail process. To check that run

    ps aux| grep sendmail

Then the mail arrived but it was delivered to /var/mail/user  rather that to the user’s Maildir. The culprit was the line in /etc/postfic/main.cf

    mailbox_command = procmail -a "$EXTENSION"

For the time being I have commented it out as procmail is not essential though I like the helpful logs it generates.

What to do with the mail in /var/mail/user file? There is a neat little program that you can run as the user, i.e. not as root:

    mb2md -m

This generated the following response

Converting /var/mail/alfred to maildir: /home/alfred/Maildir Source Mbox is /var/mail/alfred Target Maildir is /home/alfred/Maildir 123 messages.

That copies all mail to the default Maildir. Should you get a message */var/mail/user is not an mbox* do not despair. Check the first line and verify that the line starts with “From “. I was foxed why I kept receiving that message. The fix: the first line was a blank which I had to delete manually!

To test the mail going out you may want to run the following commands:

    telnet localhost 25
>Trying 127.0.0.1... Connected to localhost.localdomain. Escape character is '^]'. 220 emmanuelle.csindiasteel.co.in ESMTP Postfix (Ubuntu) 

     HELO alfred.csindiasteel.co.in
>250 emmanuelle.csindiasteel.co.in 

    MAIL FROM:<it></it>

>250 2.1.0 Ok 

    RCPT TO:<alfred></alfred>

>250 2.1.5 Ok 

    DATA

>354 End data with <cr><lf>.<cr><lf>

    test .

>250 2.0.0 Ok: queued as 17120650196D 

    QUIT 

>221 2.0.0 Bye Connection closed by foreign host. 

To test your imap setting you can give the following command replacing user and password with your own. The authtest command may be used to verify that the authentication library is working:

    authtest user password

This generates

>Authentication succeeded. Authenticated: alfred (system username: alfred) Home Directory: /home/alfred Maildir: (none) Quota: (none) Encrypted Password: 6$8NU.6ORW$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXzGd5VEK Cleartext Password: xxxxxx Options: (none)

