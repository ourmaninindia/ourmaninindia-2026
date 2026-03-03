---
categories:
  - tech
tags:
  - google speed
  - hugo
  - seo
  - static web site
  - static webpages
date : 2020-06-16T22:00:00Z
title : "Static site generators"
---
Due to my busy work schedule my personal web site was dated. So much so that it was a few releases behind schedule. I had built it using Ghost (headless Node.js CMS) and by quickly  building some Docker containers I managed to upgrade the database relatively fast.

I have built many data driven dynamic sites most based on PHP or Perl. However, it was also time to re-evaluate whether to continue with Ghost. My eye fell on static site generators. There is not much difference with database driven sites other than that the site is generated in advance which for a blog like my site is no issue. Of course there is no feedback but contact forms are done through third party. Similarly, if you like to add comment pages one has the option to add Discus.

The most popular static site generators are Jekyll (based on Ruby), Gatsby (based on React) and Hugo (based on Go) and definitely not necessarily in that order. I tried out Jekyll and got lost. It may have something to do with the learning curve but if you cannot install it fast to try it out it offers little hope. 

So I tried out Hugo and was pleasantly surprised as it worked out of the box. It was still a journey trying to grasp how the system worked. For example, the thing that threw me initially was that the system displays pages depending on a set default order of templates. You may have a template in your theme, but if you have a template with the same name in your base directory then that will be the one displayed.

Once you get the hang of it though, the system is well thought out, very flexible and really fast. I have nothing but admiration for the creator, the Norwegian Bjørn Erik Pedersen.

My github repository is linked with Netlify that hosts the site. I use Forestry.io to create and edit pages though of course, I could do that using Git. Web hooks ensures that all are linked and updates take place automatically. Brilliant! Life has become so much easier that writing a page is a breeze. 

### P.S.
Bootstrap 5 has been released this week and they have named Hugo as the static site generator of choice.

My laptop crashed and, after cloning my site again, I was wondering why images did not show properly. They were ok on github. Turned out I had forgotten to again install git LFS and I had not activated it in the actual directory where I clone my repositories.