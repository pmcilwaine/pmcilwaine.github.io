---
layout: post
title: REST and Versioning
tags: [rest, http, architecture]
comments: true
---
There are many ways in which we attempt to version our REST APIs. In my previous article I covered this but lets go into more depth on the issue.

## The URI Path or URI Query String
We can do versioning within the URI path it will look something like this.

> /api/v1/path/to/my/resource

We can also do it via the query string

> /api/path/to/my/resource?v=1

Both examples are equivalent and so to most people this appears to be fine, but semantically what are we actually versioning.

From a REST standpoint this appears as though we are versioning the resource itself. A resource is usually an entity or entities that can make a resource. So if we have an example of say an e-commerce website. It typically has a product page, on the product page it may contain product information, images, sales price, recommendations and even reviews of the product.

In our example and using versioning in the URI path or query string, this would imply any change to the resource should up the version number. So if we have 3 changes to the sales price in 1 day, the resource should change versions 3 times, what about recommendations, reviews. As you can see this quickly gets out of hand. You now need to do version control within your resource, which means snapshots of time. This is not what REST is. An entity can change over time BUT the resource should not change. So according to REST this way of versioning is completely incorrect, not to mention difficult to manage.

## Versioning the Media Type

This typically looks like this

> Content-Type: application/vnd.myname.v1+json

This to some people appears correct, in fact at my current company this is the preferred way to version your API. So in this case we are versioning our media type which is the representation of the resource. The resource itself has not changed. Perhaps we have made a breaking change in what a property means, or perhaps we do it whenever we add a new property even if its not a breaking change. It doesn't really matter which way it's done, it still fails with REST.

So why does it fail? 

1. Lack of visibility, typically you will try and test a REST API on basic things within your browser before testing within a client such as postman.
2. Is it only valid for this resource OR is the representation entirely changed for all resources? 
3. You now need to support multiple versions on the server and potentially the client depending on how point 2 is handled.
4. Most importantly you fail to separate concerns, the server upstream is now dictating to the client how it must work. 

Lets go into more depth on point 4, this is where you are really failing REST. One of the constraints to REST is Client/Server so you have client and server concerns separated, allowing both to independently evolve. But when you version this way, the server is typically dictating to the client how it should work, thus there is no true agreement, failing part of the Uniform Identifier constraint. You also fail the part of Uniform Identifier constraint in that this constraints requires the principle of generality. If you are constants changing versions, it means you probably didn't design your API correctly the first time. I'll go into more detail on how you can do this further in the article.

The argument against what I have stated is that you could support both versions. But you are still coupling client and server this way. Now the server cannot remove the deprecated version until all clients use the new version, and the client cannot use the resource in the new intended way until it upgrades to the new version.

## Custom Version Header

This will typically look like this

> X-Version: 1

Of the examples shown so far, I consider this to be the worst of them, so lets look at why. 

Firstly what is being versioned here? It is unclear, is it the resource, the representation or the resource and representation. You also have the issue like before regarding it not being very visible, so doing this purely in the browser is not an option without extensions. You also now have an additional header to send, REST is by design not very good at this and its why we have the cache constraint. 

Secondly from my view point you inherit all the issues from the previous ways of doing versioning. 

  


