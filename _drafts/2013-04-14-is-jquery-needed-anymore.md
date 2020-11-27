---
layout: post
title: Is jQuery needed anymore ?
tags: [javascript, jquery]
comments: true
---

I’ve recently been thinking about completely ditching jQuery. The reason being its main purpose is no longer required. The reason jQuery came to be was to allow a single API to manipulate the DOM easily. Before we had to use a syntax like this:

```javascript
var table = document.getElementById('table');
var rows = table.getElementsByTagName('tr');
```

Now we can use jQuery and access the elements this way.

```javascript
var rows = $('#table tr');
```

However recently browsers implemented document.querySelector and document.querySelectorAll. What made jQuery great was we could access class selectors as well which meant we could assign CSS classes to several elements and attach plugins to them and work exactly the same. Previously we would need to walk the DOM and find the class attribute and then do string manipulation to find if the class was attached to that element. e.g.

```javascript
var elements = document.getElementsByTagName('*');
var matchedElements = [];
for (var i = 0, length = elements.length; i < length; i++) {
    var theClass = elements[i].getAttribute('class');
    if (theClass !== undefined) {
         var classes = theClasses.split(' ');
         for (var j = 0, classLength = classes.length; j < classLength; j++) {
             if (classes[j] === 'myClassName') {
                 matchedElements.push(elements[i]);
             }
        }
    }
}
```

As you can see this seems like a lot of code to go through to just get elements which match a class name, but this is pretty similar to what developers had to do. The jQuery code was just the 1 line similar to that of the table rows example. However as this became popular browsers implemented a standard version into Javascript which are querySelector and querySelectorAll. My preferred way of doing it is solely using the querySelectorAll method as this works similar to how jQuery works which returns an Array of objects or in querySelectorAll’s case a NodeList.

So using the first jQuery example of getting the rows within the table with a id of table, using the new native way.

```javascript
var rows = document.querySelectorAll('#table tr');
```

As you can see very similar. There are some selectors we cannot use due to browser compatibility issues, however you can see potential to create a minimal wrapper to make it work like jQuery.

So the question is, is jQuery needed anymore ? Yes, but we are getting pretty close to dropping it. Current major stumbling blocks are

* IE8 and only supporting CSS 2 selectors. To be honest I don’t find this too much of an issue since CSS 2 selectors are more efficient compared to CSS 3
* jQuery plugins. There are just so many of them at the moment and no other framework has come in close enough to replace them.

What will accelerate the move away from jQuery is the paradigm shift that the web has come under in the last year or so with MVVM frameworks such as [AngularJS](http://angularjs.org/) and [Emberjs](http://emberjs.com/?source=post_page---------------------------). This doesn’t mean jQuery will be dead it just means as the end developer you won’t be doing anything with jQuery or similar libraries as this work will be used internally by the MVVM framework.

I recommend reading about the [Selector’s API](http://www.w3.org/TR/selectors-api/) and further examples on the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/DOM/document.querySelectorAll).
