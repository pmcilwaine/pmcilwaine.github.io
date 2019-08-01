---
layout: post
title: Understanding REST
tags: [rest, http, architecture]
---

As a developer you will probably have heard of the term REST, and after thinking about having some understanding of what REST is, you’ve created your own API labelled it RESTful and had clients developed to use it. But is what you really developed actually REST under its definition or something else?

## What is REST
REST stands for Representational State Transfer, and was described in Roy T. Fielding’s dissertation back in 2000[^1]. 

> [REST is an] architectural style for distributed hypermedia systems, describing the software engineering principles guiding REST and the interaction constraints chosen to retain those principles, while contrasting them to the constraints of other architectural styles.

This is a brief description of what REST is, but we should first discuss what hypermedia systems are as they are fundamental to understanding REST.

### Hypermedia
Understanding hypermedia requires further definition of that of HyperText

> Hypertext is basically the same as regular text - it can be stored, read, searched, or edited - with an important exception: hypertext is text with pointers to other text. The browsers let you deal with the pointers in a transparent way -- select the pointer, and you are presented with the text that is pointed to[^2]

Examples of hypertext are Microsoft Help, and Hyperstudio/Hypercard. Now that we understand that hypertext is text that contains pointers to other text (to be brief). Hypermedia is a superset of hypertext. This means that it has text, and pointers to other text but can also contain images, video, sound, etc. An example of hypermedia is the World Wide Web (WWW). 

Now that we know what hypermedia is, how is it related to REST? As stated in the dissertation[^1] describing REST, hypermedia is a constraint within the REST architecture. 

## Constraints
To ensure our architecture is well defined and has boundaries, we want to set some constraints. An interesting thing to know is that most cases you want to design from a blank canvas (no pre-existing system), however in respect to REST it started from a pre-existing system (the web). 

There are six constraints within REST as listed below.

1. Client-Server
2. Stateless
3. Cache
4. Uniform Interface
5. Layered System
6. Code-on-Demand (optional)

Each constraint listed adds something to the constraint above it as a whole this gives us the architectural style of REST.

### Client-Server
This is the first constraint to the architectural style. The main principle behind client-server is separation of concerns. 

The purpose of separation of concerns allows us to separate the user interface which improves portability and concerns of the server which improves the scalability of the service. 

As we have the principle of separation of concerns, we get evolvability. That means that client and server can evolve independently.[^1][^3]

### Stateless
This means that the client must send all the necessary information to the service to understand the request. This requires the client to store some state and it should be sent with the request.

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

Let’s describe what each of these interface constraints mean:

#### Resources & Resource Identifiers
Anything that can be named, can be a resource. A resource is a contextual mapping to a set of entities, it’s not the mapping of an entity at a particular point in time. This means that the entities can evolve over time but the resource does not.

#### Resource Representations
A representation consists of data, metadata describing the data, and, on occasion, metadata to describe the metadata. 

* Meta data is in key, value pairs. In the response message it may contain, representation metadata and resource metadata.
* Control data could be used if we want to get only a newer version than a one stored in cache.
* The data format of a representation is the media type. It must be sent so the client can understand the representation format.

#### Self-descriptive messages
In short this means it means the data format representation MUST always come with the media type. The media type must be well specified and that client and server both agree about the media type refers to.

This allows you to create your own media type, with specification and as long as both server and client agree then this constraint satisfied.

#### Hypermedia as the engine of application state 
This is generally where most REST APIs fail. The client does not need any prior knowledge of the service to use it other than an entry point, and understanding of the media type. All interactions thereafter are driven by hypermedia.

An example `application/json` is common media type used for services that claim to be following REST, however `application/json` does not have a concept of links so therefore you aren’t RESTful. You can create your own media type which is an extension of REST to incorporate this.

#### Layered System
This allows an architectural style to be composed of hierarchical layers by constraining component behaviour in that a layer cannot see beyond the immediate layer. This allows for easy encapsulation of legacy systems which can protect new clients from this legacy.

What this means in context of REST is that a client does not know that an intermediary server served the request, acted in the middle of the request such as Authentication/load balancer or if the end server served the request.

#### Code-on-Demand
The final constraint of REST is code-on-demand. This constraint is optional which might seem strange for constraints on an architecture. The server can send code to the client in the form of scripts, the client then can optionally handle this. 

This improves the system extensibility without the need for deployment. The reason for this being optional is that it reduces visibility in the case when clients do not trust the server, and that a script could be binary[^1].

## What is the purpose of REST?
The motivation as described by Fielding in his dissertation

> motivation for developing REST was to create an architectural model for how the Web should work, such that it could serve as the guiding framework for the Web protocol standards. REST has been applied to describe the desired Web architecture, help identify existing problems, compare alternative solutions, and ensure that protocol extensions would not violate the core constraints that make the Web successful[^1]

This allowed the Internet Engineering Task Force (IETF) and World Wide Web Consortium (W3C) to define architectural standards for the web: HTTP, URI and HTML as long as it followed the constraints of REST.

So how are the constraints implemented for the web. This is a rough walk through on a request with constraints tagged.

* A user using a web browser (Client/Server) has some URI (Uniform Identifier) to initiate a browsing session
* The browser translates this request into HTTP to the server
* The request goes through a proxy cache (Cache/Layered) and Load Balancer (Layered)
* The Web Server receives the request (Client/Server) and routes it to the appropriate application handler
* The application responds with an HTML representation of the resource (Uniform Identifier)
* The browser eventually receives the HTML representation and renders it to the browser, it styles the page using CSS and runs Javascript (Code-on-demand)
* A user submits a form (a login form) back to the server
* The server responds with HTML representation of the resource and a HTTP Session Cookie (Stateless)*.
* The browser receives the session cookie and stores it.

<sup>* Within this process the cookies could be considered to actually break the principles of REST[^1]. It is only mentioned here for demonstration purposes.</sup>

## Versioning
Many developers believe that they should version their API. There are various ways in which it has been proposed, below are 4 common examples:

* The URI e.g. /api/v1/some-resource
* Within the query string ?v=1
* The media type Content-Type: application/vnd.myname.v1+json
* Custom header: X-Version: 1

However following our growing understanding of what REST is, which is to be a set of constraints for the Web. The components that make up the web consist of

* HTTP
* URI
* HTML

Of the 3 components only 2 have versions and none of them are done via a URL or a media type. In fact from Roy Fielding:

> the reason to make a real REST API is to get evolvability … a "v1" is a middle finger to your API customers, indicating RPC/HTTP (not REST) [^5]

Having your client aware of the version breaks key principles of REST. We do not want the client aware of versioning sent from the server, this makes the separation of concerns a bit blurry. Also what does a version mean exactly? If it’s in the URI, path or query string then it means the resource is versioned. But this isn’t what you are really intending, as normally this is a breaking change in the representation not the resource. 

Let’s see how HTML and HTTP handle versioning.

### HTML
HTML standard specifies to the browser that any element that it does not recognise that it would just have the content[^6]. In HTML5 this changed so that the element would be parsed so that styling could be achieved[^7]. 

Irrespective of what your browser supports unknown elements will be handled in some way. So versioning is not really important hence why in HTML5 it is completely removed.

Unlike in proposed versioning methods for APIs, the client and server does not specify the HTML version it just requests text/html and returns a text/html document (HTML). Versioning is important in terms of setting a standard to follow for the client. If it’s not using the latest version it should at least know how to handle unknowns.

### HTTP
The client sends a HTTP/1.1 version but if the client supports HTTP/2 it will send an Upgrade header. If the server supports it the protocol will be switched to HTTP/2. From the server point of view it must always send the latest minor version e.g. If HTTP/1.0 is requested and it has support for HTTP/1.1 the response should be HTTP/1.1.

> The "Upgrade" header field is intended to provide a simple mechanism for transitioning from HTTP/1.1 to some other protocol on the same connection.  A client MAY send a list of protocols in the Upgrade header field of a request to invite the server to switch to one or more of those protocols, in order of descending preference, before sending the final response.  A server MAY ignore a received Upgrade header field if it wishes to continue using the current protocol on that connection.  Upgrade cannot be used to insist on a protocol change.[^8]

What we learn from the implementation of HTML and HTTP is that they are backwards and forwards compatible.

> Backward compatibility - Newer code can read data that was written by older code.
> Forward compatibility - Older code can read data that was written by newer code.[^4]

What we can learn from how the Web components HTTP and HTML work is that we should write a standard, this standard can change and this is what we version. Within the standard we need to ensure its explicitly stated how to handle unknown properties within the media type. This is to ensure backwards and forwards compatibility. 

## Why would I want a REST API

REST is simple but due to its simplicity, it's very difficult to implement. You need to assume clients know nothing other than an entry point, from here it requires hypermedia to allow transitions of state i.e. go from one page to another this allows the client to explore. There is no versioning i.e. we do not state we want to use URI version X, or HTML version Y. The architecture is designed so that implementation is able to handle the backward and forward compatibility and versioning is only there as how to implement the standard at a point in time as agreed. 

The benefits of REST is that the client cannot distinguish from an online banking website to a search engine, all whilst using the same client, and agreed upon media type (HTML). 

If you want to develop and API with a similar characteristic building a REST API might be the way to go. Such a reason would be to develop your own internal media type within your organisation. Once you have done that you could be a single client (or many) for the languages that wish to use this media type. This way you are not creating a client for each service thus potentially reducing specific code libraries. The trade-off is of course it will take time for the standard to be done and agreed upon.

### Richardson Maturity Model (RMM)  
Although building a REST API is difficult there is at least a 3 step approach originally developed by Leonard Richardson called the Richardson Maturity Model and outlined by Martin Fowler [https://martinfowler.com/articles/richardsonMaturityModel.html](https://martinfowler.com/articles/richardsonMaturityModel.html). It is important to know although there are 3 steps you do not have what would be considered REST until you reach step 3 which a prerequisite for REST.

I personally do not think the majority of people who claim to have a REST API would want to follow REST. However I do think that the majority of constraints and principles it gives you should be adhered to even if you do what is essentially RPC over HTTP.



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