---
categories:
  - tech
tags:
  - Vanilla Javascript
  - javascript
date : 2023-03-21T13:10:55Z
description : "Highlight JavaScript"
title : "Using Vanilla JavaScript"
draft: true
---

This is a sample to highlight JavaScript in Hugo

```bash {linenos=true, lineNumbersInTable=false, hl_lines="1-4"}
/** 
* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar 
* @function ready
**/

function ready() {
  var prevScrollpos = window.pageYOffset;

  const width  = window.innerWidth;
  let   height = 70;

  /* the height of the navbar header depending on the screen size */
  if (width < 960 )  height = 117;
  if (width < 767 )  height = 255;

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
   
    if (prevScrollpos > currentScrollPos) {
      navbar.style.top = 0 ;
    } else {
      navbar.style.top = "-" + height + "px";
    }
    
    prevScrollpos = currentScrollPos;
  };
}

const navbar = document.getElementById('navbar');
const btn    = document.getElementById('btn-open');
const drop   = document.getElementById('drop');

/* the dropdown of the navbar menu if clicked */
btn.addEventListener('click',(e) => {

  if (drop.style.display == '' )  drop.style.display = "none";

  drop.style.display = (drop.style.display === "none" ) ? "block" : "none";
});

document.addEventListener("DOMContentLoaded", ready);
```