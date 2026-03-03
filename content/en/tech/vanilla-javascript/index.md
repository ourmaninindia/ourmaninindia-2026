---
date : 2023-07-30T15:00:00Z
title: "Vanilla JavaScript, extremely good reasons you should use this to create a lean web!"
featured : true
featured_image : "js-tax.png"
read_more_copy : "Read more about Vanilla JS"
categories:
  - tech
tags:
  - JavaScript
  - Open Source
  - Vanilla JavaScript
---

Let me start with a bold statement: knowing HTML and CSS helps write much better JavaScript! Why you may ask.  Well, you need to grasp the whole medium to appreciate the best approach. The what, where, how, issues etc. Vanilla JavaScript may appear daunting but it is not. Instead it is faster, more secure, and more manageable. 

For the novices, JavaScript is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Vanilla JavaScript has been coined for the basic form of JavaScript used to create web applications. It involves writing pure JavaScript code without using any pre-written libraries or frameworks. 

Frameworks send developers in the wrong direction: taking library short cuts to speed up work in the beginning only to get totally dependant on it in the long run and making changes at a later stage more complex. When you start a project don't even think of frameworks, opt for single-purpose tools that don’t lock you into a broader ecosystem e.g. Hugo for static pages, EJS for templating sql data, Trachyons for css or better write it yourself or use what you need!

Build tools and processes that include large amounts of NPM dependencies create a tool chain that is a nightmare to maintain not to mention a huge security risk. The less dependencies the less you have to worry about the latest security patches and bug fixes. For example, you can use vanilla JavaScript to toggle some classes instead of jQuery. If you need to call an API, using the fetch() method instead of Axios{{< footnote-set "1" "https://gomakethings.com/about/" "Chris Ferdinandi">}}. Overall you will reduce your JavaScript cost significantly.{{< footnote-set "2" "https://www.youtube.com/@AddyOsmani" "Addy Osmani">}}

At first glance CSS can have a steep learning curve that you want to skip. Most people would opt for a framework like Bootstrap and get on with JavaScript. However, investing time in CSS can reduce your JavaScript effort a lot and create custom CSS much easier. CSS is actually very complex, and writing good-quality CSS is hard and producing bad quality is easy. Frameworks like Bootstrap exist so we don’t have to write CSS at all. They use pre-existing classes instead and make our CSS customizations a lot harder. Keep in mind, in CSS we have naming conventions like BEM to avoid we run into issues with the cascade, specificity, and scalability{{< footnote-set "3" "https://www.kevinpowell.co/articles/" "Kevin Powell">}}. 

The web platform is really powerful but at times you either need to write your own custom code or reach for a third-party tool. When you do, favor tools that are small, modular, and dependency-free. For example, if you need state-based UI in your project, Preact or SolidJS are better choices than React or Vue. They’re a fraction of the size, have fewer abstractions, and render faster too!

Managing dependencies is an essential part of software development though. If your code depends on a package with a security vulnerability, this can cause a range of problems for your project or the people who use it. You should upgrade to a secure version of the package as soon as possible. This easier said than done though and often it is beyond your company’s control.

To realise the risks of web projects, you only need to have a look at the OWASP Top 10{{< footnote-set "4" "http://www.owasp.com" >}}, a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications. It is globally recognized by developers as the first step towards more secure coding. 

The Lean Web is an approach to web development that focuses on fast, resilient experiences that work for everyone.  The Lean Web is all about resilience. That means using HTML and CSS instead of JavaScript when the platform provides an appropriate solution. So embrace the platform! Simpler web development approaches are better for your developers, too!

Aug 12: After writing the above I found a recent video by Kevin Powell making the same point that *it's really important to understand the core languages that all of those things are built on top of* and with 'those things' he refers to frameworks like React, Tailwind etc.  
{{< youtube id="HuI4fDxDM0g" title="Why I only use vanilla HTML, CSS, and JS" autoplay="true" >}}

{{< footnote-list "References" >}}