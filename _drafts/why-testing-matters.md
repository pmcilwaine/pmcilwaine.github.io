---
layout: post
title: A brief intro to Software Testing
tags: [testing, programming]
comments: true
---

I have been recently doing a lot of reading into software testing. Unfortunately, I feel that many developers lack a solid understanding of testing and its importance. So let me give a quick introduction to software testing.

# Why do we test?

I doubt there is a software developer out there, that has not in some way shape or form tested, an application. We do this all the time, a simple way to test the application especially code we have just written is, to run the application. We do this because we as developers want to confirm what we have just written works. 

The very simple reason to why, is because we want to reduce defects in our software. We want to reduce defects because;

- Defects are costly
- Software defects could cause potential harm
- Keep customer/user trust

The above is not an exhaustive list by any means, but I believe it outlines commonly understood reasons and demonstrates at a very high level the importance of testing. 

Most of all what many developers may not understand is that testing has roots in science. Testing can only find defects (bugs), but demonstrating that software is bug free is just not possible, this demonstrates that testing has the same issue that science has, proving non-existence.

> Program testing can be used to show the presence of bugs, but never to show their absence! <sub>Edsger Dijkstra</sub>

The lack of understanding, I think can be demonstrated in this article ["Why Testing is No Longer Sufficient for Today’s Software Delivery Pipelines"](https://blog.overops.com/why-testing-is-no-longer-sufficient-for-todays-software-delivery-pipelines/) which attempts to articulate that software testing is insufficient, but for me demonstrates a lack of knowledge on the subject.

Hopefully you now understand the very basic reason to why we test software, which is to reduce defects. Now lets look at some forms of testing. 

## Forms of Testing

Understanding the basic forms of testing is crucial (The term basic is just my opinion). 

- Technology Facing
- Support Programming
- Business Facing
- Critique Product 

![Agile Testing Quadrants](/assets/images/Agile-Testing-Quadrants.png)

To the knowledgeable tester, this will seem incomplete and of course it is on purpose (again basic forms, is my opinion). 

If you understand your business position on the software you are developing most likely by undertaking some for of risk assessment, you should have a basic understanding of what is and what is unacceptable in your software.

Understanding this we can then think of what forms to use, and the types of test each form has. 

