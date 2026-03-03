---
date : 2023-07-24T01:00:00Z
title: "Vanilla JavaScript, best practices"
featured : true
featured_image :
read_more_copy : "Read more about Vanilla JS"
categories:
  - tech
tags:
  - JavaScript
  - Open Source
  - Vanilla JavaScript
  - best preactices
---

You start to work on a new project and you are happily coding away and seeing results until the number of functions, event listeners etc become too many and you have to clean up your own mess in a much more organized manner. You scratch yourself behind the ear and wonder why you did not do that right at the start… 

The problem is that you only realise certain shortcomings after having done a certain number of web pages. For example, master data is rather straightforward but more functional process oriented pages often require a slightly different approach yet you would not like to have to modify all the earlier pages already written.

I have listed some of my best practices. Best may not be the best as it depends on what applies best to your project. In that context, the size of the project and the number of developers matters a lot. 

Vanilla JavaScript often has multiple way to achieve something. None are wrong but some are more readable and others more compact. It depends on the position of your learning curve so feel free to use the one you are comfortable with. 

The following three loops is indicative of the options a developer has

```
// The original way 
for (var i = 0; i < Things.length; i++) {
    console.log(Things[i]);
}

// The slightly faster way
for (var i = Things.length - 1; i >= 0; i--) {
    console.log(Things[i]);
}

// The much more readable way
for (let Thing of Things) {
    console.log(Thing);
}

```

### Naming conventions
Camel case the function and variable names and don’t shorten them to save time. What is clear to you may not be clear to someone else. They have to be descriptive. Use function names with a verb as a prefix e.g. getSelected(){{< footnote-set "1" "https://www.30secondsofcode.org/js/s/naming-conventions/" "Angelos Chalaris" "https://www.30secondsofcode.org" >}}. 


### Use semi-colons in JavaScript

JavaScript will add invisible implied semicolons at the end of statements. This means you have to know and remember where to place semicolons! If you don’t you may receive an error like this

```
“TypeError (intermediate value)(...) is not a function in JS”
```
This error occurs when we forget to place a semicolon between a function declaration and an immediately invoked function expression. In my opinion it is better to add these semicolons as and where required but if you know better, be my guest!

## On the Server side 

### Routers
Routing is quite simple and is a matter of one large file with all the routes or one page for each category. How quickly can you find your route is what matters here.

Here is one example for a router that determines a consultant, where the suffix *_detail* indicated a single database row and, as the name indicates, *_list* will display multiples rows.  I have not been able to avoid the duplication between GET and POST which is a nuisance. I use POST a lot though as it avoids using url query strings which looks better and it limits potential data manipulation which is crucial.

```
import express from 'express';
import controller from '../../controllers/controller.mjs';

const router = express.Router();

router.get( '/consultant' , controller.Consultants_detail);
router.post('/consultant' , controller.Consultants_detail);
router.get( '/consultant/:id' , controller.Consultants_detail);
router.post('/consultant/:id' , controller.Consultants_detail);
router.get( '/consultants', controller.Consultants_list);
router.post('/consultants', controller.Consultants_list);

export default router;
```

### Controllers
There have been discussions what controllers are and should do. Basically I do everything to render a template, a view. I first retrieve the data passed by the router. That makes the definitions of controllers and views clear.

1. Each controller starts with the imports it requires.
2. Then initialise your template variable for the controller and perhaps some error handling e.g. if a database call failed or worse,the main server is down. 
3. All your controller functions in alphabetical order
4. Finally export all of them

Each individual controller function typically would have the following setup:

1. Retrieve any router parameters
2. Initialise variables
3. Calls to your data source (e.g. database). I have all my database calls in a single page with an export db function with a large list of switch statements, each representing the specific database function name. The advantage is that all database stuff is together. The drawback is that this limits somewhat the ease to call specific database fields. Personally, I think that is a minor issue. 
4. All the settings for input and select statements (dropdowns).
5. Add hamburgers and breadcrumbs if required
6. Render the page

const inputArray = [{key:0, field:'', minlength:’’, maxlength:’’, min:’’, label:'', value: ‘’, required: false, content:’’, type:'', step:1, readonly:true, placeholder:'', checked:false}]

const selectFilterArray = [{key:0, field:’', label:'’, value:’’, type:'', data:’’, optionField:'', border:’’, group:'', multiple:’’}]

If you create and pass more variables to the template you tend to forget what each was for. I usually have an object called *template* with a name of the function called, perhaps title, previousPage for a future template to revert back to the calling page, and whatever other variables I should have passed etc. 

## On the Client side

On the client side, the best way is to have a single file with all the client interface coding:

- first any initialisations – this could be setting the elements for essential table(s), archive, authentication, pathname etc.
- open your WebSocket. This is important if you need the client to access from an external source like a database.
- The many functions required
- Add the window.onerror method here for all your error handling
- iffe’s if any. This is for any modifcation of the DOM not done by the controller.  
- Event delegation with all the listeners for each event type like click, change, etc. This is really important and a major improvement upon having many separate event listeners. 


No doubt there may be more improvements to be made but as mentioned it really depends on the size of your project. Look at the best practices W3C recommends {{< footnote-set "2" "https://www.w3.org/wiki/JavaScript_best_practices" "W3C advise" "https://www.w3.org" >}}. 
 

{{< footnote-list "References" >}}