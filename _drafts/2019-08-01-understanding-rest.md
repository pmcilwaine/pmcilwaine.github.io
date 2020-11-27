---
layout: post
title: Understanding REST
tags: [rest, http, architecture]
comments: true
---

As a developer you may have heard of the term REST, you may have worked with or created an API that was called RESTful. However was it actually REST or was it missing some requirements? Below I will walk through what REST is to the best of my knowledge.

## What is REST?
REST stands for Representational State Transfer, and was described in Roy T. Fielding’s dissertation back in 2000[^1]. 

> [REST is an] architectural style for distributed hypermedia systems, describing the software engineering principles guiding REST and the interaction constraints chosen to retain those principles, while contrasting them to the constraints of other architectural styles.

This is a brief description of what REST is and also contains a lot of information, so I first feel I need to explain what hypermedia is.

### Hypermedia
The term hypermedia is actually a superset of the term Hypertext, so before I give a definition of hypermedia, below is a definition of hypertext. The distinction between the two is small. 

> Hypertext is basically the same as regular text - it can be stored, read, searched, or edited - with an important exception: hypertext is text with pointers to other text. The browsers let you deal with the pointers in a transparent way -- select the pointer, and you are presented with the text that is pointed to[^2]

Examples of hypertext are Microsoft Help, and Hyperstudio/Hypercard.

Like I said Hypermedia is superset to hypertext, so what are the additions to hypermedia that are not in the underlying term? Well, as the name suggests its media. Media can be in form of images, video, sound etc. So hypermedia although very important to understand, is quite a simple concept.

Now that we know what hypermedia is, we should go over the constraints as stated previously REST is an architectural style for distributed hypermedia systems.

## Constraints
To ensure our architecture is well defined and has boundaries, we want to set some constraints. What differs REST to other architectural styles is that they usually are created first, however REST started against a pre-existing system.

There are six constraints within REST as listed below.

1. Client-Server
2. Stateless
3. Cache
4. Uniform Interface
5. Layered System
6. Code-on-Demand (optional)

Each constraint listed adds to the constraint above it as a whole this gives us as a whole, the architectural style of REST.

### Client-Server
This is the first constraint to the architectural style. The main principle behind client-server is separation of concerns. 

The purpose of separation of concerns requires us to separate the user interface which improves portability and concerns of the server which improves the scalability of the service. 

The principle of separation of concerns gives us evolvability. For a client server architecture to really work well and in the case of REST we want both the client and server to evolve independently from each other[^1][^3]. This evolvability is important and I'll discuss it again in how we can attempt to ensure this.

### Stateless
This means that the client must send all the necessary information to the service to understand the request. This requires the client to store some state and it should be sent with the request to ensure the request is fulfilled correctly.

Advantages of this constraint are visibility, reliability, and scalability. It has a drawback as each request needs to contain all the information in the request thus reduces network performance, it also reduces server control of consistent application behaviour as part of the application state is now stored on the client. [^1]

### Cache
The cache constraint extends on from the stateless constraint. With the requirement of each request needing all the information from the client sent to the server to understand it. The cache constraint requires the response to tag it with either being cacheable or not. If it is cacheable the client can now reuse that response for later on equivalent requests, rather than perform that request again.

The advantages of this constraint partially or completely remove interactions to the server, as well as improve efficiency, scalability and most importantly user perceived performance, a problem with this constraint is that data cached can be stale.

### Uniform Interface
This constraint is fundamental within REST, and is probably where you have gone wrong in calling your API, RESTful. It defines a uniform interface between components and comprises the following interface constraints:

* Identification of resources
* manipulation of resources through representations
* self-descriptive messages
* hypermedia as the engine of application state

We apply the software engineering principle of generality to achieve this. The trade-off of this is that we degrade efficiency as we are building to a standard rather than something specific to the applications needs.

So let me explain more about these interface constraints.

#### Resources & Resource Identifiers
Anything that can be named, can be a resource. A resource is a contextual mapping to a set of entities, it’s not the mapping of an entity at a particular point in time. This means that the entities can evolve over time but the resource does not. An example of this is todays weather which might have a URI like below.

> /weather/today

This URI will always be the same, however as we know today will change. If the todays date is January 1st then tomorrow the URI will point to data for January 2nd. As stated the URI stays the same, but the data is different.

#### Resource Representations
A representation consists of data, metadata describing the data, and, on occasion, metadata to describe the metadata. 

* Meta data is in key value pairs. In the response message it may contain, representation metadata and resource metadata.
* Control data could be used if we want to get only a newer version than a one stored in cache.
* The data format of a representation is the media type. It must be sent, so the client can understand the representation format.

#### Self-descriptive messages
In short this means it means the data format representation MUST always come with the media type. The media type must be well specified and that client and server both agree about what the media type refers to.

This allows you to create your own media type, with specification and as long as both server and client agree then this constraint is satisfied.

#### Hypermedia as the engine of application state 
This is generally where most REST APIs fail. The client does not need any prior knowledge of the service to use it other than an entry point, and understanding of the media type. All interactions thereafter are driven by hypermedia. As prevously stated in the explanation of hypermedia, this demonstrates the importance of hypermedia as it is to REST. Without being able to link to other data, you wouldn't get much use out of the API, and your client would need prior knowledge of the system to retrieve more information.

An example: `application/json` is common media type used for services that claim to be following REST, however `application/json` does not have a concept of links so therefore you aren’t RESTful with this media type. To solve this you can still use JSON as your syntax, but a schema must be designed and agreed upon (see Self-descriptive messages), which includes how the client has knowledge of what a link is (or a text pointer) as described in hypermedia.

### Layered System
This allows an architectural style to be composed of hierarchical layers by constraining component behaviour in that a layer cannot see beyond the immediate layer. This allows for easy encapsulation of legacy systems which can protect new clients from this legacy.

What this means in context of REST is that a client does not know that an intermediary server served the request, acted in the middle of the request such as Authentication/load balancer or if the end server served the request.

This constraint can tie into the Cache constraint as intermediaries can cache content and serve it directly rather than the server, this is typically the responsibility of Proxies and Content delivery networks.

### Code-on-Demand
The final constraint of REST is code-on-demand. This constraint is optional which might seem strange for constraints on architecture. The server can send code to the client in the form of scripts, the client then can optionally handle this. 

This improves the system extensibility without the need for deployment. The reason for this being optional is that it reduces visibility in the case when clients do not trust the server, and that a script could be binary[^1].

I hope this gives you brief understanding of the constraints that make REST. Unfortuantely without examples it can seem a bit abstract, this is the point to an architectural style, and perhaps a failing in given a concrete explanation of REST within a dissertation. Let's now discuss why did REST architectural style came about. Hopefully this gives us more clarify on what the constraints are about.

## What is the motiviation of REST?
The motivation as described by Fielding in his dissertation.

> motivation for developing REST was to create an architectural model for how the Web should work, such that it could serve as the guiding framework for the Web protocol standards. REST has been applied to describe the desired Web architecture, help identify existing problems, compare alternative solutions, and ensure that protocol extensions would not violate the core constraints that make the Web successful[^1]

This gives us the motivation of having REST at least in the context of how the Web is, however this was not always the case. As I mentioned when discussing constraints that REST came about after the Web actually existed. This meant that REST has attempted to fit existing components into an architectural style. Although it has attempted to fit all exisitng components within REST, not all components that existed fit REST. An example of this is HTTP Cookies.

So now we know what that REST is an architectural style and its primary purpose was for ensuring the web technologies (HTTP, URI and HTML), didn't break the architecture. Let's discuss why would I want to use REST.

## Why would I want a REST API?
There are quite a few benefits to REST but the main one comes from software engineering principle of generality. This principle forces our API design to be generalised. So rather than create our API to a specific purpose we need to make it work with as many use cases as possible. Doing this correctly and creating a media type, you can then create a single client that understands this media type against any service that responds with that media type. 

In practice this is not so easy to accomplish. Most so called REST APIs I worked with/on have failed this miserably. I have created specific clients for a service, that means if I had to work against 2 services, that were 2 clients I needed to create. This does not include the fact that each programming language is essentially a client so its not even a 1:1 mapping in some cases.

The alternative and more gradual way to create a REST API is to follow the Richardson Maturity Model. 

### Richardson Maturity Model (RMM)  
Although building a REST API is difficult there is at least a 3 step approach originally developed by Leonard Richardson called the Richardson Maturity Model and outlined by Martin Fowler [https://martinfowler.com/articles/richardsonMaturityModel.html](https://martinfowler.com/articles/richardsonMaturityModel.html). It is important to know although there are 3 steps you do not have what would be considered REST until you reach step 3 which a prerequisite for REST.

Well that was quite a lot of information. In a future article Id like to describe versioning and how it works with REST.

## Footnotes
[^1]: Fielding, R. (2000). Architectural Styles and the Design of Network-based Software Architectures. Retrieved from [https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
[^2]: Rodney Campbell (1995, May 7). What is Hypertext and Hypermedia? Retrieved from [http://www.rc.au.net/papers/www-0595/wwwhype2.html](http://www.rc.au.net/papers/www-0595/wwwhype2.html)
[^3]: InfoQ (2014, December 17). Roy Fielding on Versioning, Hypermedia, and REST. Retrieved from [https://www.infoq.com/articles/roy-fielding-on-versioning/](https://www.infoq.com/articles/roy-fielding-on-versioning/)
[^4]: Kleppmann, M. (2017). Designing Data-Intensive Applications:  O'Reilly Media, Inc.
[^5]: fielding. (2013, September 9). The reason to make a real REST API is to get evolvability … a "v1" is a middle finger to your API customers, indicating RPC/HTTP (not REST) [Tweet]. Retrieved from URL [https://mobile.twitter.com/fielding/status/376835835670167552?lang=en](https://mobile.twitter.com/fielding/status/376835835670167552?lang=en)
[^6]: W3C (1995, September 22). HTML as an Internet Media Type. Retrieved from [https://www.w3.org/MarkUp/html-spec/html-spec_4.html#SEC4.2.1](https://www.w3.org/MarkUp/html-spec/html-spec_4.html#SEC4.2.1)
[^7]: Mozilla (2019, March 19). HTMLUnknownElement. Retrieved from [https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement)
[^8]: IETF (June 2014). Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing. Retrieved from [https://tools.ietf.org/html/rfc7230#section-6.7](https://tools.ietf.org/html/rfc7230#section-6.7)
[^9]: 99s (2018) REST principles. Retrieved from [https://ninenines.eu/docs/en/cowboy/2.6/guide/rest_principles/](https://ninenines.eu/docs/en/cowboy/2.6/guide/rest_principles/)