---
layout: post
title: Code Coverage
tags: [testing]
comments: true
---

Code coverage is not a very understood tool that can be used to aid in testing. I've read various articles stating the misconception of code coverage, and articles stating that code coverage is useless. These for me miss the point of what Code coverage is, which I hope to make clear.

## 100% Code Coverage = 100% tested

There are various themes of the above, but they all mean essentially the same thing. This statement is wrong, and is wrong due to a common lack of understanding of what code coverage does and what testing is.

The problem with the right hand side with respects to testing, is that a good tester will never make the statement "100% tested". This is due to the fact even a simple program, has thousands, possibly millions (and this is a simple program), ways it could be run. No software will have that many tests, its just not feasible, and even if it were, you'd still not get every single use case. Testing in general only finds defects, unfortunately it cannot prove to you that there are no defects still in your system.
`
> Program testing can be used to show the presence of bugs, but never to show their absence!
> <small>Edsger Dijkstra</small>
`
Code coverage is but a small aspect of testing, if testing itself cannot claim 100% tested, neither can code coverage.

## 100% Code coverage is impossible!

This statement is not quite true, I have seen and worked on systems with 100% code coverage, so its not impossible. With that said not all systems are developed equally, and most will struggle to achieve 100% code coverage. This struggle is then used as an excuse to not care about 100% code coverage, or showing code coverage in general.

I think this can be best explained from an [Uncle Bob article](https://blog.cleancoder.com/uncle-bob/2017/03/06/TestingLikeTheTSA.html).

> (1. Don’t aim for 100% coverage.
>
> Disagree. Aim as high as you can. Treat 100% as an asymptotic goal. No other number makes a reasonable goal. There is never a reason to stop driving your coverage number higher.

