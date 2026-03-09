---
date : 2017-02-24T02:24:17Z
title : "PHP 5.6 with Nginx on AWS"
tags:
  - "php 56"
  - "nginx"
  - "aws"
catagories:
    - tech
---


Look whether the version you like is available. For a producion server you may not want to install the very latest.

```
yum search php56
```
Here I have gone for php56 i.e. php-5.6 as I needed it for the latest mediawiki I was looking to install for my documentation. 
```
sudo service php-fpm stop
sudo yum remove php-*
sudo yum install php56
yum list installed | grep php
```
You may want the following extenstions
```
sudo yum install php56-xml php56-xmlrpc php56-soap php56-gd
```
You may like to install the mysql server
```
sudo yum install php56-mysqlnd 
```
(NOTE: it is apparently not php56-mysql )
```
sudo vim /etc/php-fpm-5.6.d/www.conf
```
change the user and group to nginx. Then edit or create your nginx configuration file
```
sudo vim /etc/nginx/conf.d/yourserver.conf
```
This is mine.
```
server {
    listen 80;
    server_name your_domain_name;
    root /srv/sites/your_domain_name;
    index index.php index.html;

    client_max_body_size 5m;
    client_body_timeout 60;

    location ~ \.php$ {
        try_files $uri :404;
        fastcgi_pass 127.0.0.1:9000; 
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root/$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        try_files $uri /index.php;
        expires max;
        log_not_found off;
    }

    location : /_.gif {
        expires max;
        empty_gif;
    }

    location ^~ /cache/ {
        deny all;
    }

    location /dumps {
        root /srv/sites/Alfred Tuinman.odyssey.co.in;
        autoindex on;
    }
}
```

You need to verify permissions and ownership of the document root. It is best to create a small phpinfo.php page in your root for testing 
```
<?php
phpinfo();
?>
```

and then you can start testing
```
sudo service php-fpm-5.6 start
sudo service nginx restart
php -v
```

This highlighted again for me how great it would be if I would improve my knowledge of Chef, the DevOps tool, as I am certain I overlooked some steps that I would like to have recorded. After all a five minite job took me now 2 hours. In short, I have to do it again on a fresh server.

