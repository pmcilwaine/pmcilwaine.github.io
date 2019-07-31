---
layout: post
title: Understanding REST
tags: [rest, http, architecture]
---

As a developer you will probably have heard of the term REST, and after thinking about having some understanding on what REST is, you’ve created your own API labelled it RESTful and had clients developed to use it. But is what you really developed actually REST under its definition or something else?

## What is REST

REST stands for Representational State Transfer, and was described in Roy T. Fielding’s dissertation back in 2000[^1]

> [REST is an] architectural style for distributed hypermedia systems, describing the software engineering principles guiding REST and the interaction constraints chosen to retain those principles, while contrasting them to the constraints of other architectural styles.

This is a brief description of what REST is, but we should firstly discuss what hypermedia systems are as they are fundamental in understanding REST.

### Hypermedia
Understanding hypermedia requires further definition of that of HyperText

> Hypertext is basically the same as regular text - it can be stored, read, searched, or edited - with an important exception: hypertext is text with pointers to other text. The browsers let you deal with the pointers in a transparent way -- select the pointer, and you are presented with the text that is pointed to[^2]

An example of hypertext would be something like Microsoft Help. Now that we understand that hypertext is text that contains pointers to other text (to be brief). Hypermedia is a superset of hypertext. This means that it has text, and pointers to other text but can also contain images, video, sound, etc. An example of hypermedia is the World Wide Web (WWW). 

Now that we know what hypermedia is, how is it related to REST? As stated in the dissertation[^1] describing REST, hypermedia is related to rest as its one of the constraints.

## Constraints

To ensure our architecture is well defined and has boundaries, we want to set some constraints. An interesting thing to know is that most cases you want to design from a blank canvas, however in respect to REST it started from an architecture pre-existing system. 

There are six constraints within REST as listed below.

1. Client-Server
2. Stateless
3. Cache
4. Uniform Interface
5. Layered System
6. Code-on-Demand (optional)

These constraints are built on top of each other to give us the architectural style of REST.

### Client-Server
This is the first constraint to the architectural style. The main principle behind client-server is separation of concerns. 

![Client-Server](/assets/images/Client-Server.png "Client Server Architecture")

The purpose of separation of concerns allows us to separate the user interface which improves portability and concerns of the server which improves the scalability of the service. 

The most significant thing to take note of is that because the client and server concerns are separated we can allow both to evolve independently of each other. [^1] [^3]

### Stateless
This means that the client must send all the necessary information to the service to understand the request. That means session state is stored on the client.

Advantages of this constraint visibility, reliability, and scalability, its drawback is that because each request needs to contain all the information in the request thus reduces network performance, it also reduces server control of consistent application behaviour as part of the application state is now stored on the client. [^1]

### Cache
The cache constraint extends on from the stateless constraint. With the requirement of each request needing all the information from the client sent to the server to understand it. The cache constraint requires the response to tag it with either being cacheable or not. If it is the client can now reuse that response for later on equivalent requests. 

The advantages of this constraint partially or completely remove interactions to the server, as well as improve efficiency, scalability and most importantly user perceived performance, a problem with this constraint is that data cached can be stale.

### Uniform Interface

### Layered System

### Code-on-Demand
The final constraint of REST is code-on-demand. This constraint is optional which might seem strange for constraints on an architecture. The server can optional send code to the client in the form of scripts. This improves the system extensibility without the need for deployment. The reason for this being optional is that it reduces visibility in the case when clients do not trust the server[^1].

## Footnotes

[^1]: Fielding, R. (2000). Architectural Styles and the Design of Network-based Software Architectures. Retrieved from [https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
[^2]: Rodney Campbell (1995, May 7). What is Hypertext and Hypermedia? Retrieved from [http://www.rc.au.net/papers/www-0595/wwwhype2.html](http://www.rc.au.net/papers/www-0595/wwwhype2.html)
[^3]: InfoQ (2014, December 17). Roy Fielding on Versioning, Hypermedia, and REST. Retrieved from [https://www.infoq.com/articles/roy-fielding-on-versioning/](https://www.infoq.com/articles/roy-fielding-on-versioning/)
