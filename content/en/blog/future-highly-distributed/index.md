---
autoThumbnailImage : false
categories:
  - "blog"
tags:
  - "Information Technology"
  - "open-source"
  - "hugo"
  - "jamstack"
  - "static website generators"
featured_image : "jamstack-v1.png"
date : 2020-10-06T22:00:00Z
cover : "cover-jamstack.png"
title : "The future is highly distributed"
featured : true
theme : "darkblue"
read_more_copy : "Read more about this session"
---
In any business environment these days you almost invariably have all your data in different systems. A single ERP may be the driving force behind your organisation but having a monolithic system also limits you.

This is the reason I am very enthusiastic about Jamstack, a new standard architecture for the web. It relies on microservices, APIs to various sites to get the data from plain text files. So often you have data available but it is a pain to link it. Microservices does not necessarily mean small. Rather, it is built to be lean as each service has a very specific role and its own codebase.

This so-called headless architecture (also called “decoupled”) is part of a broader trend in software and internet services toward linking specialized elements together. The proliferation of mobiles has really enhanced this trend as companies are struggling to deliver their data fast across different platforms.

Rather than building content at runtime for each request, content is pre-built and optimized during a build setup using a site generator and other build tools. A Jamstack deployment doesn’t run on a traditional setup of origin servers. Instead, automated deployments are used to push sites directly to your content delivery network (_CDN_). These are very fast.

{{< img src="bottle.jpg" alt="Feeling relaxed using JAMstack" caption="Feeling relaxed using JAMstack" class="small right" >}}

The virtual conference was, as promised, a dynamic day of keynotes, interactive sessions, live Q&A and 1:1 networking. Or should I say evening as, due to time zones, it was from 6 to midnight for me.

Henri of the Toronto Jamstack community gave a fab explanation of the Lighthouse scores. Having used it extensively, it was good to learn the weight of the various parameters behind it. Interestingly, the mean score of sites on the web is a meager 49. Yes out of 100! Above 90 is considered good.

Angie Jones gave a great talk on adding eyes to your automation framework. This is image recognition to ensure the display still looks alright after a commit. I do not need it immediately but it is great to know that it's there.

The Atlantic's {{< link href="https://covidtracking.com/" title="The Atlantic Covid tracking app" >}}Covid Tracking{{< /link >}} was impressive as they went from 0 to 2million API requests in 3 months. I was not the only one who shared that view as later in the day it won one of the Jammies award.

## For the techies amongst us

JAMstack stands for Javascript-API-Markup. Using Git workflows and modern build tools, pre-rendered content is served to a CDN and made dynamic through APIs and serverless functions. Technologies in the stack include JavaScript frameworks, Static Site Generators, Headless CMSs, and CDNs.

A JAMstack architecture provides better performance - as most of it is pre-compiled and therefore it has higher security. It is also cheaper with easier scaling through its use of CDNs.

I have been working with {{< link href="https://gohugo.io/" title="Hugo" >}}Hugo{{< /link >}} lately, a static site generator based on Google's Go, and I am very happy with it as it is lightning fast. It has a wide range of possibilities and requires relatively little coding. The learning curve is a bit steep as it works totally different from typical database systems.

In case you are interested, all the sessions can be viewed again {{< link href="https://www.youtube.com/c/JAMstackConf/videos" title="JAMstackConf" >}}here{{< /link >}}.  Great stuff!