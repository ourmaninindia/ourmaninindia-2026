---
categories:
  - "tech"
tags:
  - "open source"
  - "perlbrew"
  - "dancer"
  - "plack"
  - "template toolkit"
date : 2013-04-11T13:19:55Z
title : "Set up Perlbrew"
---


HTML development work often is done remotely with all dangers of messing up a production version. My friend Gurunandan Bhat suggested I set up a local development environment. As always all credit goes to him for his support.

This is therefore a howto for anyone eager to set up a local development environment for a dynamic web site. For that we use Perlbrew, Dancer, Plack, Template Toolkit, Memcached.

- Perlbrew is a tool to manage multiple perl installations in your $HOME directory. They are completely isolated from your system.
- [Task::Kensho](http://search.cpan.org/~ether/Task-Kensho-0.33/lib/Task/Kensho.pm "Task::Kensho") is a first cut at building a list of recommended modules for Enlightened Perl development. CPAN is wonderful, but there are too many wheels and you have to pick and choose amongst the various competing technologies.
- [Plack](http://plackperl.org/ "Plack"): PSGI is an interface between Perl web applications and web servers, and Plack is a Perl module and toolkit that contains PSGI middleware, helpers and adapters to web servers.
- The [Template Toolkit](http://www.template-toolkit.org/ "Template Toolkit") is a fast, flexible and highly extensible template processing system. It’s written in Perl
- [Memcached](http://memcached.org/ "memcached") is a high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.

Install Perlbrew as a local user (don’t use cpan as root as I initially did!). To set up perlbrew from scratch type the following as a developer user:

    curl -kL http://install.perlbrew.pl | bash

now copy the source line to .bashrc (source ~/perl5/perlbrew/etc/bashrc)

    echo "source ~/perl5/perlbrew/etc/bashrc" >> .bashrc

Then close the current terminal and open a new one so that this line gets read. Then check for the latest version on [www.perl.org](https://www.perl.org/get.html#unix_like)

    perlbrew install perl-5.22.0

This will fetch perl 5.22.0 and install it. This could take a while. You can run the following command on another shell to track the status:

    tail -f ~/perl5/perlbrew/build.perl-5.22.0.log

Once that is finished, open a new terminal and check the version of perl that you are using now

    which perl

It will most likely show /usr/bin/perl/. You then change the default version

    perlbrew switch perl-5.22.0 which perl

This should be something like

    ~/perl5/perlbrew/perls/perl-5.22.0/bin/perl

If that is showing the correct perl version we can install cpanminus

     curl -L http://cpanmin.us | perl - App::cpanminus

Now install a module to update any changes since the release

     cpanm App::cpanoutdated

All of this goes to perlbrew folder, in the subfolder for that version of perl that you are currently on. It goes into the perl5 folder in your home. Now update any outdated stuff.

    cpan-outdated | cpanm

Install some useful libraries. This will take time but you can ignore the terminal while it does whatever it needs to do.

cpanm Task::Kensho Task::Plack Task::Catalyst Dancer cpanm Date::Manip::Date Dancer::Session::Storable Data::FormValidator Dancer::Plugin::Database Dancer::Plugin::MemcachedFast

This is a lot more than is required. But it’s always good to have more than you need on a development machine. Do go and get yourself a cup of tea two now as this takes a while.

If you want to set up a server without a database you can skip the following.

To link the server to your database you need to install the ODBC drivers and the cross platform SQL server library. First you need to install the database drivers.

    cpanm DBD::ODBC

If it fails you may need, as root, to install freetds. On Centos/Fedora etc do

    yum install freetds-devel unixODBC-devel

On Ubuntu it’s a bit more work. As a user, here called ‘user’, (i.e. no root except the last line) do the following:

    sudo apt-get install unixodbc-dev cd /tmp wget ftp://ftp.astron.com/pub/freetds/stable/freetds-stable.tgz gunzip -c freetds-stable.tgz | tar -xvf - mv freetds-0.91/ /home/user/ ./configure --prefix=/usr/local/freetds --with-tdsver=8.0 --with-unixodbc=/usr make su make install

More on the db connections later.

Now about the framework. There are two components: one is the HTTP server and the second is the application. Ideally these are separate in principle but to make development easier – I have “embedded” a small HTTP server inside the application which is in myApp/bin and called *app.pl* and of course made executable.

 

You first need to set up the library structure in your home folder

    dancer2 -a myapp && cd myapp

Once the library structure has been created you need to create a app.pl (ap.psgi in Dancer2) in your lib folder

     #!/usr/bin/env perl 
     use Dancer; 
     use myApp; 
     start;

To run the server enter

    plackup -s Starman -E deployment app.pl

If you run it you may get messages that some perl packes are still missing. Just add them with the command cpanm

    cpanm missing::perl::module

However you may also get the following:

>Can't locate Dancer.pm in @INC (@INC contains: /usr/local/lib64/perl5 /usr/local/share/perl5 /usr/lib64/perl5/vendor_perl /usr/share/perl5/vendor_perl /usr/lib64/perl5 /usr/share/perl5 .) at ./app.pl line 2. BEGIN failed--compilation aborted at ./app.pl line 2.

In that case you need to run a script before you do that to activate our personal perl sandbox. In private (my document root as I use ISPconfig) you will find a script called “set_perlenv.sh”. Don’t run it, source it:

    source set_perlenv.sh

(You can run it as many times as you want)

Now go to myApp/bin and run

   ./app.pl

This will give the following output. You won’t get the prompt back because the app is running and is not a daemon. If you press Ctrl-C the application (and the website) will die.

> Dancer 1.3111 server 26623 listening on http://0.0.0.0:3000 >> Dancer::Plugin::MemcachedFast (0.130500) >> Dancer::Plugin::Database (2.04) >> Dancer::Plugin::Database::Handle (0.12) == Entering the development dance floor ...

Now you can access the application at http://your-domain:3000

To check if the Dancer application is running – you should first check whether there is any activity on port 5000. For example, my nas browser interface runs on port 5000 and could block this. You do this by running

   netstat -tanp | grep 5000

>*LISTEN 26559/starman master*

The second way to check is to type

    ps aux | grep starman

Among the list of services you will see one is a “master” and there are 6 workers. If you want to stop the server (or want to stop and then start it again) You have to do

    kill -15 25891

(where 25891 is the process id listed in the output of ps aux for the master process). It’s important that you kill only the master process – that will kill all the workers too. Now if you run *ps aux | grep starman* you will get nothing. You could write a small script that does this so you don’t have to know the PID of the master process.

All this is good for development, not for production. For production we must do a few things:  
 1 Use a really good HTTP server  
 2 Run it as a daemon  
 3 Log all activity to a file

What we need is a HTTP server that is capable of running a single perl script or a library of functions written in perl. One such server is called Starman. So what we do is start starman and tell it to run our application. To do that we use a program called plackup (runs PSGI application). The command for that is:

    plackup -s Starman -E deployment -D app.pl

-s is for which server to use, -E is for deployment/production -D is for daemonize and app.pl is the application that must be run

Plackup is the program that starts the server AND points it to run your script which is app.pl (in our case in the myApp/bin folder). You have to run this command in myApp/bin. It runs the server on port 5000.

First in a shell enter

    source set_perlenv.sh

and then in a new shell enter

    plackup -s Starman -E deployment -D myApp/bin/app.pl

You don’t get the prompt back as Starman is in deamon mode. If it is started with -D is a daemon – you will get the prompt back immediately.

Starman has no configuration except what options you provide on the command line. E.g. later on one would not want visitors to enter 5000. That would not be a redirect but a reverse proxy which will also server us as a load balancer. If the load goes high and there are lots of visitors.

Now about the application configuration for app.pl, that is in myApp/config.yml. TT, DB, Memcached – everything is configured from here. So starman configuration from command line (read man starman) and application config in config.yml. Starman is the HTTP server. app.pl is the application and plackup joins them together. You don’t need starman in development – just use the toy server like Dancer.

In the yml file we say where the windows server is. Look at the DB config: dbi:ODBC:myappDB  

Use the ODBC driver to connect to the myappDB database

Now where is the myappDB database defined? It’s done in two levels: 
 
 First go to /etc/odbc.ini. You will see an entry for myappDB there. Inside the myappDB definition there you will see an entry called Servername (myapp). That is defined in /etc/freetds.conf which is a cross platform library to connect to SQL server from Unix

    [myapp] 
    host = x.x.x.x 
    port = 2302 
    tds version = 7.0 
    client charset = UTF-8

Our app uses ODBC on unix which uses a cross platform ODBC driver to talk to windows. That’s all.

If you want to change the windows server – you change /etc/freetds.conf. If you want to change from ODBC to something else you change config.yml. If you want to use ODBC but want to connect to a different Server (say running Oracle) you change /etc/odbc.ini.

If the db connection fails (eg one changed the password) the application will give an error.

Go to myApp/lib/myapp.pm, the data db calls and the template associations  
 Each route is a get ….. {} It defines what to do for each URL request. Which template to use for which request as well as template names – use this template with that data. And the layouts are in view/layouts/main.tt

Data call templates got here. For static pages there is an even simpler way, just copy them to myApp/public and they will appear.

E.g. a file called test: Go to myApp.pm and add a route:

    get '/test' => sub { template 'test'};

which means whenever the request is for test, run this subroutine. This subroutine just returns the template called test. The only issue is you need to restart the starman server. So kill -15 and then run plackup again.

If you were running the development server then there is no need to restart – but in production (-E deployment) you have to explicitly restart if you add a new route. The development server senses the change and restarts but not in production.

Which brings us to the last question – how do we set up the reverse proxy?  

To set up a working development environment on the desktop takes a long time to install everything but with very few commands.

You have to use perlbrew.  
       
     perlbrew list

If this only shows perl-5.16.3 it’s not configured.

    perlbrew switch perl-5.16.3

should give a proper response. To verify perl is installed you can type

    perl -v

Your should get something like <ins datetime="2013-04-11T07:28:26+00:00">This is perl 5, version 16, subversion 0 (v5.16.0) built for x86_64-linux</ins><ins datetime="2013-04-11T07:28:26+00:00"></ins>

After perlbrew has been installed type

    perlbrew init

*Happy brewing!*. It would have asked you to copy a line to your .bashrc. Exit this shell and open a new one and type

    which perl

If this shows */usr/bin/perl* its the wrong one (e.g. when you would have installed perlbrew as root) as it should show the home directory. You should never install perlbrew as root. It’s meant to provide you with a personal sandbox not root. Become the user you develop as. If it is installed with cpan, the perlbrew executable should be installed as /usr/bin/perlbrew or /usr/local/bin/perlbrew. Don’t install with cpan – that’s meant for root only.

Back to the database connection: once cpanm DBD::ODBC is installed successfully, copy the files /etc/freetds.conf from the remote server and overwrite the same file on your desktop – or create a new one. Then change the IP address there to point to the local SQL server. (The same are on the server under /usr/etc)

    [myapp] host = x.x.x.x 
    port = 1433     
    tds version = 7.2 
    client charset = ISO8859-1 
    text size = 64512

Also copy odbc.ini from the web server

     [myapp] 
     Database = your_db_name 
     Server = x.x.x.x 
     TDS_Version = 8.0 
     Port = 1433 
     Driver = /usr/lib64/libtdsodbc.so

Now copy the remote web application to your desktop, if there is one.

