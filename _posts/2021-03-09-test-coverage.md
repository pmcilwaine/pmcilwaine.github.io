---
layout: post
title: 100% Test Coverage
tags: [testing agile]
comments: true
---

You may often hear that you need to ensure to get the test coverage up, or that only 100% coverage is acceptable. I 
am here to say that although there is some truth to this, there is more to it then simply this.

## What is code coverage
Let's firstly discuss what code coverage is. 

Code coverage simply put is source code of an application that is "executed" under test. The measurement is taken 
from instrumenting code and then creating a percentage of code executed under tests and what is not. Some tools even 
give information where code is not executed under test conditions.

As we can measure it we can also break these measurements down to get a good understanding on certain aspects, 
commonly known metrics are:

- Statements — An expression to be carried out
- Branches — Usually understood with if/else statements these branch off
- Functions — What percentage of functions have/n't been tested
- Lines — Each line of source code.

There are of course more, but these are the common ones that I believe most are familiar with to some degree. 
Although these metrics are useful to understand, they don't really tell you a lot. You'll never go to a meeting 
saying our <q>coverage is low overall, but at least our branches have high coverage.</q>


## How should you use it?

Code coverage in my opinion is useful for both unit and integration tests, however predominately I use them only for 
unit tests as that is where most of the value in automated testing lies. 

It should be said, although code coverage is useful, and may give you confidence going forward. It needs to be 
understood it is just a metric, you can easily prove that although you have high coverage your defect rate can be 
the same without.

The question is how should you use it? Firstly I think to answer this you need to understand your testing strategy, 
at least with respects to automation, after all code coverage is part of the automated testing repertoire.

My advice would be to link the coverage to unit and integration, with a strong focus on unit testing. What I mean by 
this is if a bug is spotted, the first point should be to write a unit test, not an End-to-End or integration test, 
although they maybe required, the unit test is where you demonstrate the failure and perform the fix to prove its 
resolved.

Before performing to fix, you could use code coverage as a way to demonstrate the bug was because of lack of tests 
executing a certain aspect of code, but this is not always the case.

With that said, I view code coverage simply as a way to build confidence in the team. Confidence to make changes and 
ensure that those changes remain isolated, and don't break other parts of the system, and if they do the tests will 
demonstrate this due to covering large enough parts of the code base. To ensure the team has confidence metric 
targets should be kept to ensure the system remains at an agreed level of coverage.

A big part to having confidence is ensuring your tests are actually good. Unfortunately good is quite subjective, 
but my take on good tests ensure you follow the basic principles of unit testing as well as ensuring your tests are 
easy to understand and change. 

Another thing to note is that although code coverage does give confidence, the confidence should be realistic, and 
thats because code coverage does not guarantee you'll catch all errors. In fact this is just a limitation on testing 
itself, you cannot guarantee 100% errors are caught.

## What now?

Code coverage is but one tool to use for tests, and ensuring quality with regards to reducing defects. But like all 
tools, it has limitations so understand why you use it. In my view code coverage is simply a way;

- Increase confidence of the system within the team, so changes can be made
- A way to drive an agreed upon coverage of tests within the system to maintain that confidence.

This is circular, that is you keep the coverage high, you ensure confidence in the system is high (or at least good).
Like all things continually review this an ensure what is good previously is good now, or ensure you change to 
reflect the changes you face.
