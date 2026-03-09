---
categories:
  - "tech"
tags:
  - "open source"
  - "mediawiki"
date : 2012-08-07T08:27:09Z
title : "Update a Mediawiki"
---


Download the new mediawiki from their website to the html directory

    wget http://download.wikimedia.org/mediawiki/1.17/mediawiki-1.17.0.tar.gz

Extract the download and type
 
     tar -zxvf mediawiki-1.17.0.tar.gz to extract the file to the current directory.

Rename the extracted directory to something easier

    mv mediawiki-1.17.0 update

Copy the images directory and LocalSettings.php from the old to the new wiki

    rsync old_directory/images/ update/images/ cp old_directory/LocalSettings.php update/LocalSettings.php

Backup the old directory

    tar -zcvf archive-name.tar.gz directory-name

Remove the old directory

    rm -rf old_directory

Rename the new directory

    mv update old_directory

Update the database

    php old_directory/maintenance/update.php

If need be, change the logo setting in LocalSettings.php. If required, check if the site is still password protected

