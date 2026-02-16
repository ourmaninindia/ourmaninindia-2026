---
categories:
  - tech
tags:
  - open source
  - git
  - ssh
  - secure shell
  - github
date : 2013-04-11T10:57:41Z
title : "How to use GIT"
---


Set up a git account on github.com. Upload your ssh key. To verify this is done click on top right Account Settings, then ssh keys on left. Then proceed to create a repository on Github. Don’t add a README.  
  
 On your local machine, go into your application folder. Type

    git init

This creates a .git folder inside the application folder.

    git commit -m "Initial Commit"

This will come back with *nothing added to commit but untracked files present (use “git add” to track)*. Then type

    git add .

This may take some time if the application is large. In the meantime go to github and copy the SSH link git@github.com:your_git_account/your_repo.git into memory (Ctrl-c) and in your local application folder type:

    git remote add origin    
    git@github.com:your_git_account/your_repo.git

Now you need to decide. Do you want images to be backed up too? Unless it’s small better not to. In the application folder create a simple text file called .gitignore (note the dot at the beginning) and add a single line to it. That line should say this:

public/images (where public/images would be the path to your images)

Now say:

    git commit -m "Ignored Images"

Now you are ready to push

    git push -u origin master

for a lot more assistance see [https://help.github.com/articles/](https://help.github.com/articles/ "https://help.github.com/articles/")

