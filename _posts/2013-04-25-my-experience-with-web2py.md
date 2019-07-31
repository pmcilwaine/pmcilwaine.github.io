---
layout: post
title: My experience with Web2py
tags: [python, web2py]
comments: true
---

I have been using [Web2py](http://www.web2py.com/) for over a year at the place I work, and I believe its time to give my thoughts on it. I believe I am in a unique position to give my thoughts on this working on small projects, high traffic sites, and larger scale projects.

When I first started my job I had very little Python experience, my only experience in a commercial environment was fixing bugs in Cherrypy/SQLObject/Mako and Django, never actually on start to finish or any long term stuff.

## The Good

Now that you know my background coming in, my first project was a fairly large piece of work with the start of migrating a site from Expression Engine into web2py. Potentially I could have gone against the suggested framework however, it came with several important features for this project such as impersonating users, which is actually quite vital in this site. What we migrated were:

* Members area to handle sending out Emails to send out postcards, thank you messages as well as donations
* Administrative interface to update Postcards copy, donations, and member management
* Public interface for Tours, Teams and most importantly handling donations, last year we had over $2m+ in donations so you can see its quite important.
* Online shop for purchasing gear.

Our original timeframe if my memory serves me correctly was for a Nov 2011 begin and Jan 2012 release, I think we released early Feb 2012 due to various circumstances none of which were framework related. Developers involved were 2 front end developers 1 for the Member/Admin and 1 for the public interface, 2 backend developers 1 doing the shop, and myself doing the rest. Actually although the shop was done by another developer I was still involved for lots of this development, and in fact Im in total control of this now.

At the time web2py was the perfect framework, and I will admit for this it still is. It allowed for rapid development, easy way to create API for the frontend to interact with and generally it was very easy to learn and quickly get something up in time. To be honest there were no real stumbling blocks in development and this looking at it later on was more due to the fact there was no unit testing, or doctests.

Another project this one which was high traffic, was given to us during this timeframe and had an even more outrageous development timeframe to work with. In fact from initial contact to release date we had approximately 3 weeks. This was a campaign project working with Facebook which ultimately was required to help get more followers, in fact I think from the day it was released to the day it was closed we helped attract 70–80k followers, this was during a 4–6 week online period. Overall the mechanic was simple, users liked the page before progressing, they could enter by filling out a form and uploading a photo, and users were able to vote once per day. Admin was required to export and also view entries to get the final winner(s).

Due to the short time frame some issues came up which were easily resolved. Our most pressing issue was that the suggested way file uploads work is to store files in the uploads folder which requires a request into web2py to retrieve. I cannot recall exactly how we resolved this but the end result was, files were static that is we had nginx simply go directly to the files rather than going through web2py. This was actually one of our most important fixes for the traffic we were getting, our next fix was the fact we needed a more powerful machine to host this but this was simple using EC2 and we had quite minimal downtime considering.

Overall this project was quite successful, so successful in fact we have used this same mechanic with very little modification several times. This I believe shows the power of web2py in developing high traffic websites quickly and easily and also being able to recover from issues very fast due to the flexibility it gives you. I’d almost go as far to say we wouldn’t have achieved quite as much success as we did using any other framework.

I won’t go into all the other projects I’ve worked on as they have been campaigns similar to the above, some requiring multiple interfaces e.g. Facebook and microsite which this framework as allowed to be done quite easily and very quickly. But its not all good for this framework and I go back to my original project to explain the shortcomings of web2py.

## The Bad

Another part of our migration process which was done long after the original development was the CMS. Key requirements for this were:

* Easily create various page types (I believe we have approx 10 page types in this CMS)
* File Management
* Share the Shop and Member applications
* SEO friendly URLs
* Multiple User Roles
* Staging

Unfortunately the last 2 items were missed in my initial release, however I have since extended this CMS concept in another project which basic staging was developed but ultimately was never used. Firstly lets discuss point 3, I feel this is the most important issue with web2py.

If you follow the recommended path for models in web2py you’ll create a model file in the models folder which is then is made accessible globally like various other functionality that web2py gives. Unless I’ve missed something this means you cannot share models with other applications. For me this was unacceptable, thankfully Bruno Rocha has solved this problem in his own way, here is the [example of the model less approach](https://github.com/rochacbruno/web2py_model_less_app). I hope to soon release my own extension on this later with how I’ve allowed this approach to help with test driven development.

My next major issue was SEO friendly URLs, this may seem like a small issue as you can already achieve SEO friendly URLs. My issue was doing this in a way that:

* Worked similarly to that of Expression Engine e.g. /index.php/pages/my/url/goes/here
* Content Editor could easily create them

Web2py works like this /application/controller/function/arg1/arg2/…/argn which is not quite the same. My first approach to was to push these URLs onto the error routes and have that handle it (Yes I realised at the time this was a bad way to do it). My reasoning with limited development time sounded great, I had little to update in routes and minimal work required for me to determine what the URL was. The major issue with this of course is the fact that I now have to handle real HTTP errors myself rather then pass them back to web2py to determine what to do. My next approach was to use the proper routes setting up several rules (I believe my next approach to this will have to be simplified), although it works well and I can now pass errors back to web2py to be handled appropriately I still believe it has issues, this maybe from lack of understanding the web2py routes, but I think its more to do with routes in web2py are not its strong point.

After this experience I believe I can say that web2py is not truly developed for the bigger projects. In some ways this is quite disappointing especially if you build several smaller projects then want to move them into a larger architecture and find that although they can work together (with some work) you do not have the feeling of full control which I really believe is required for these projects to come to suitable solutions rather than solutions that work with the framework in use.

The big issue of concern and is brought up quite frequently when comparisons are done with web2py, is the fact that your controllers/models are injected into the global namespace as well as various other helper function/classes. For smaller projects this is terrific, however, for larger projects you will find yourself feel like your hitting a padded wall. For me, I use extremely little of these function/classes on the global namespace for the larger projects. What I would like to see and perhaps I need to do this myself is a web2py setup in which everything is done the pythonic way rather than the web2py way. However I do not think this is possible.

## Conclusion

I think web2py is a great framework but I obviously I do not think its the framework for everyone. In my experience its very much aimed for projects with quick turn arounds, and projects of the small to medium sized. Its highly aimed at novice programmers, but thats not to say that you must only be a novice programmer to use it. More advanced programmers will see how powerful it can be. When you start working on bigger projects you’ll see limitations of the architecture, which I hope can be resolved by community members (or even myself) which will truly make web2py a tremendous framework.

My next article on web2py I want to show my method for unit testing, and issues involved in it.
