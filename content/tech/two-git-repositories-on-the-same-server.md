---
categories : ["open-source"]
date : 2015-07-19T02:08:54Z
description : ""
tags : ["open-source"]
title : "Two git repositories on the same server for a single user"

---


I discovered that it is not possible, at least not for the same user, to have two git projects in the same account as github uses the ssh key to identify your repository. Once I realized that this was the problem, the quick fix was to clone the repository in another account. I created a new user and set it up from there. I created a ssh key which I copied across onto the github site. Voila, it worked instantly. BUT …

in this instance I wanted to run my perlbrew server which would entail setting that all up which is not a five minute job. I had not thought of that.

Searching further I came across a good [example](http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/) of how to use .ssh/config to link multiple github repositories. The problem it did not work for me plus I was confused as to the correct commend to us to clone a repo. This is how to set it up. This was also not a five minute job plus it increases the risk of pulling the wrong repo so judge for yourself what may be easier for you.

*Create keys*  
  
 First of all, you need to create a key for each git repo but give it a different name from the standard id_rsa. The first one is of course your default ~/.ssh/id_rsa. So you could copy and rename that one. The naming is not very important as long as it’s different from the default id_rsa.

    cp ~/.ssh/id_rsa ~/.ssh/id_rsa_project1 cp ~/.ssh/id_rsa.pub ~/.ssh/id_rsa_project1.pub

Then generate a new key for your second project but instead of the default enter a new name eg id_rsa_project2

    ~/.ssh/ssh-keygen -t rsa -C "Key for Project2"

So now you have the following two keys in ~/.ssh, of course each with their public key  
 id_rsa_project1  
 id_rsa_project2

Add the public keys (e.g. id_rsa_project1.pub) to your respective repository on github.com

**Create ~/.ssh/config**  
 Create the config file in ~/.ssh ensuring the ownership is that of the user, not root.

    touch ~/.ssh/config chmod 600 ~/.ssh/config

If you do not use the chmod 600 command then you may get the error *Bad owner or permissions on /home/tpcom/.ssh/config*

Once config is created cut and paste the following code. Replace project1, project2 and yourdomainname with your details, not the user.

    vim .ssh/config 
    Host yourdomainname.com 
    ForwardAgent yes 
    Host project1 
    User git 
    Hostname github.com 
    IdentityFile ~/.ssh/id_rsa_project1 
    Host project2 
    User git 
    Hostname github.com 
    IdentityFile ~/.ssh/id_rsa_project2

You may like to test this already

    ssh -T git@github.com

*Hi gitusername/project1! You’ve successfully authenticated, but GitHub does not provide shell access.git clone git@project1:gitusername/git-repo.git*

In my case it came up with an error and that was because [ssh-agent](https://developer.github.com/guides/using-ssh-agent-forwarding/) was not running. I had never heard of it let alone knew how to test it. To test that it is running type the following

    use ssh-add
  
 To list keys held by the ssh-agent you can give this command

    ssh-add -L

*Could not open a connection to your authentication agent.*

    echo "$SSH_AUTH_SOCK"

Mine came up with a blank instead of a pid. It was not running. The following command conflicted with my thinking

    ssh-agent

*SSH_AUTH_SOCK=/tmp/ssh-tsYnI11095/agent.11095; export SSH_AUTH_SOCK;  
 SSH_AGENT_PID=11097; export SSH_AGENT_PID;  
 echo Agent pid 11097;*

This did the [trick](https://coderwall.com/p/rdi_wq/fix-could-not-open-a-connection-to-your-authentication-agent-when-using-ssh-add) though

      eval $(ssh-agent)

If you now give the the echo command again you will get the pid.

then, add these two keys as follows

     ssh-add ~/.ssh/id_rsa_project1 ssh-add ~/.ssh/id_rsa_project2

In case ssh-agent was up and running before you can delete all cached keys before

    ssh-add -D

You can check your saved keys. This should list both the project keys

    ssh-add -l

Finally time for the magic

    git clone git@project1:yourgitusername/yourgitrepo.git

*Initialized empty Git repository in /home/user/project1/.git/  
 remote: Counting objects: 318, done.  
 remote: Compressing objects: 100% (251/251), done.  
 remote: Total 318 (delta 84), reused 293 (delta 60), pack-reused 0  
 Receiving objects: 100% (318/318), 1.69 MiB | 1.09 MiB/s, done.  
 Resolving deltas: 100% (84/84), done.*

What a pleasure to see this result!

HOWEVER

When I reconnected to the server I had to do the eval and adding of the keys again! You have to add the [following](http://askubuntu.com/questions/36255/why-wont-ssh-agent-save-my-unencrypted-key-for-later-use) in .bash_profile

    source ~/.profile, 
    if available 
    if [[ -r ~/.profile ]]; 
    then . ~/.profile fi 
    # start agent and set environment variables, if needed     
    agent_started=0 if ! env | grep -q SSH_AGENT_PID >/dev/null; 
     then echo "Starting ssh agent" eval $(ssh-agent -s) agent_started=1 fi 
    # ssh become a function, adding identity to agent when needed 
    if ! ssh-add -l >/dev/null 2>&-; 
    then ssh-add ~/.ssh/id_rsa_something ssh-add ~/.ssh/id_rsa_somethingelse 
    fi

and this in .bash_logout

    if ((agent_started)); then echo "Killing ssh agent" ssh-agent -k fi

incidentally, while working you may get confused and accidentally pull the wrong repo. Cancel that with the reset command

    git reset HEAD@{1}

