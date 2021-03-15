---
layout: post
title: Ports and Adapters
tags: [testing agile]
comments: true
---

The ports and adapters software architecture pattern is becoming a well-used pattern in a lot of business 
applications. It's quite a good architecture to use, and I am going to explain how to use it, and in situations in 
which it could be used for.

## What is Ports and Adapters?

The ports and adapters (or hexagonal) architectural pattern aims at creating a loosely coupled application, which can 
easily 
connect software to their environment by means of ports and adapters. The benefit of doing so makes it easier to 
test each layer of the application in isolation.

A port is an interface, ports can be both incoming and outgoing. An adapter is an implementation of a port. Let's 
think of a very typical business application. The application is served from the web and connects to a database.

In the above example the incoming port could be for adding a customer, our adapter is HTTP in which we implement, 
this adapter calls some business logic. The application layer may require to pass this information to some other 
system in our case a database, so we ensure that we can an adapter for the database, which is outgoing.

![Architecture](/assets/Hexagonal-Web.png)

The above looks rather simple, in fact it doesn't really say anything with respects to how things work. But so far 
our diagram demonstrates with description that we have;

- concept of incoming (HTTP) and outgoing (database) adapters (implementations of our port)
- an application layer which drives the application.

The second point is of interest this is where this layered architecture starts to make sense. The application layer 
drives what happens, we actually call it a use case. As its used for a typical case, in the above example is adding 
a customer, there are many things that might be required when we create a customer such as

- Address record added
- Login details stored

This happens every time we add a customer, perhaps we need a way for another system to add a customer but 
the system is internal, and we expose a different mechanism such as a Queue to add them. We could have the 
architecture appear like this

![Architecture](/assets/IMG_20210315_094240.jpg)

We have several actors here

- A user, which is coming from the UI and sending an HTTP request
- Another service, which sends a message to a Queue
- A use case, which handles the request regardless of the incoming adapter
- A database, which the use case uses

The business logic (the use case), is isolated from the incoming port and uses an interface to determine 
the outgoing port, we can concentrate on how it works, we can mock it correctly in our unit tests/integration tests,
and most importantly we can ensure it works regardless of if we change how the request comes in or where the data is 
stored.

### Learnings

During my time using this pattern I have come across various questions and misconceptions, some which I'll go 
through in my own experience

1. Do I need an interface for an incoming port?
2. Can a use case reference another use case?
3. We are doing DDD, we use the ports and adapters architecture.

#### Do I need an interface for an incoming port?

During my using of this, I have never created an interface in a language that supports them for incoming ports (or 
incoming adapters). There is simply no reason to as the PORT in this case is the interface of the protocol e.g. HTTP.
Interfaces should only be used (if available), where the usage of them will ensure switching out implementation 
means changes don't bubble up into other parts of the system e.g., outgoing adapters where we go from MySQL to a 
NoSQL database for storing data.

#### Can a use case reference another use case?

I have done this, and although I haven't read it in articles etc. saying you should or shouldn't, I really see no 
reason why it shouldn't be used.

A good example of this is in an application I am working on currently in which we require authentication information,
this authentication information is required by 2 use cases. If we implement it in both, its possible we at some 
point make a mistake, and we have an inconsistency. When we create a use case to do this for us we hide completely 
any implementation logic and remove this duplication.

#### We are doing DDD, we use the ports and adapters architecture.

I have actually heard this a few times, Domain Driven Design or DDD is not just a implementation of the ports and 
adapters architecture. This misconception seems to have happened as this pattern is regularly used in projects which 
do DDD, it then becomes an assumption that to do DDD you. 

## When should I use this pattern?

Business applications are a very good candidate for implementing this pattern. Business applications usually need to 
evolve over time and various technologies come and go, but hte business logic usually remains the same or at least 
changes irrespective of other changes, meaning these changes shouldn't happen due infrastructure changes.

I have to admit, outside business applications there aren't a great deal of good cases for using it, so happy to 
hear what others have done.
