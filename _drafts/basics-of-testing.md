---
layout: post
title: Basics of testing
tags: [testing]
comments: true
---

Testing is one of the most important aspects in software development. The fact its so important belies how developers know very little around writing good tests.

I am not expert software tester, or have ever had a title of Software Tester, but over the years have picked a few things up which I wish to share.

## Perfect Software Illusion!

It should be first mentioned that testing is not going to ensure you have perfect software. Do not fall into the trap that writing automated tests, and doing some manual tests will ensure your software is bug free. There is a famous quote around testing;

> Program testing can be used to show the presence of bugs, but never to show their absence!
> <small>Edsger Dijkstra</small>

Software testing is a science and just like science we can only prove existence not non-existence. Does this mean the more tests we have the more bugs we will find? The answer to that is simply, it depends. There are good tests and bad tests. Good tests have some basic principles, which I'll get too shortly. There are many types of testing, and the types you use to test your software is dependent on what you are developing.

- Isolated
- Deterministic
- Predictable
- Minimal maintenance
- Understandable
