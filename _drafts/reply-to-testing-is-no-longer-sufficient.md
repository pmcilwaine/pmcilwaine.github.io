---
layout: post
title: A reply regarding Testing no longer being sufficient
tags: [testing]
comments: true
---

I recently read an article _["Why Testing is No Longer Sufficient for Today’s Software Delivery Pipelines"](https://blog.overops.com/why-testing-is-no-longer-sufficient-for-todays-software-delivery-pipelines/)_. This article unfortunately fails to make its point, and seems to demonstrate a clear lack of understanding on what testing is, and what it can accomplish. To be clear, I am no testing expert, so this reply is purely my opinions.

Let's go over some key points.

## The importance of Testing

> Over a decade ago, when Test-Driven Development (TDD) was introduced, it promised to improve productivity and quality. Even for teams that don’t follow it religiously, but treat it more as a north star.
>
> To reiterate this point, testing is perhaps more relevant than ever, but when moving fast is table stakes, relying on traditional tests alone for preventing errors is no longer enough. Even though tests are irreplaceable, critical errors still reach production, while customers are waiting on the seamless experience they were promised

I cannot claim to understand what is meant by traditional testing.

## How did we get to this place.

> The same idea can be applied to a business setting, demonstrating why every company is rushing to automate their CI/CD workflows. The second-order effect here is how it applies to testing. When you’re releasing code faster and faster, increasing your development velocity, how can you prevent errors from being promoted? And how can you fix them fast if they do occur?

The above quote is probably the main point of the article, but actually demonstrates where the real issue is.

The 3 takeways on why testing is insufficient.

## Discussion from Experts

The article then picks points made in a discussion panel from experts to back up the main premise of the article. 

> 100% Code coverage ≠ 100% errors identified

> High quality testing takes time and doesn’t guarantee success

> GA is effectively a beta and users are the new QA








I recently read the post ["Why Testing is No Longer Sufficient for Today’s Software Delivery Pipelines"](https://blog.overops.com/why-testing-is-no-longer-sufficient-for-todays-software-delivery-pipelines/) by Alex Zhitnitsky. The post is seemingly void of any solution to the stated problem, and it doesn't provide sufficient evidence to how the conclusion was made. So let's go about showing how testing is important for todays delivery pipelines, by going over particular areas of interest in the post.

> The move to innovate at speed and scale is stressing software quality and exposing the limitations of testing

This sentence might be short but states a lot, so let's break it down. "Speed and scale is stressing software quality" seems to be "exposing the limitations of testing". Unfortunately the article doesn't specify what speed and scale means here, so let's infer the meaning based on the rest of the article or outside sources.

- speed is related to the frequency of releasing software;
- scale is a loaded term, as its both scaling our system and team.
- software quality: "Quality is value to some person" [^1]

Limitations of testing are also not defined so let's give an attempt to make it clear with a quote from Edsger Dijkstra;

> Testing shows the presence, not the absence of bugs

I believe all has been cleared up at least in my response to the article so let's discuss.

The sentence states that speed and scale is stressing software quality and because of this the limitations of testing is being exposed. Testing does indeed have limitations, the quote from Egsger Dijkstra demonstrates this, for those who have read it will know the quote sounds quite scientific. Testing has its roots in science, and science has a similar issue in that we cannot prove non-existent, just as testing cannot prove we shipped a product without bugs. This alone demonstrates that speed and scale have nothing to do with the limitations of testing. I will address speed and scale later as it comes up again in a different form.

The next part of interest is this

> Over a decade ago, when Test-Driven Development (TDD) was introduced, it promised to improve productivity and quality.

It would be good to get some evidence on where TDD promised either of these things. In my readings on TDD has not made this promise. There is however some research regarding TDD[^2] which goes on to state that TDD can improve productivity but this is not a promise from TDD just a discovered outcome. In respects to quality, TDD will not improve it. All TDD really does is make our system more testable as we think about testing first (TDD sometimes is referred to as test first development).

> To reiterate this point, testing is perhaps more relevant than ever, but when moving fast is table stakes, relying on traditional tests alone for preventing errors is no longer enough. Even though tests are irreplaceable, critical errors still reach production, while customers are waiting on the seamless experience they were promised

I agree that testing is important, in fact its always been important regardless of the speed we are trying to deliver software to our customers. This quote talks about traditional tests, but what does this mean? In the past testers were testing all sorts of things, which might include the following;

- installability
- configuration management
- performance
- usability
- exploratory tests
- boundary value testing
- integration

This is but a very small list of things testers, tested for in the past, perhaps this is what is meant by traditional or perhaps its manual testing. Manual testing still needs to be done, even in our pipelines. For example if we are following TDD practices, I doubt we just assume because our tests past, we don't run our program, the act of running the program to see our changes is a form of testing. The next part is about errors reaching production, and again I point back to Edsger Dijkstra. More on this is discussed in the next part of the article.

> The same idea can be applied to a business setting, demonstrating why every company is rushing to automate their CI/CD workflows. The second-order effect here is how it applies to testing. When you’re releasing code faster and faster, increasing your development velocity, how can you prevent errors from being promoted? And how can you fix them fast if they do occur?

Let's ignore the fact that companies are rushing and perhaps in the process of rushing are doing a very poor job in implementing their CI/CD workflows. Again the article fails to show evidence for the claim.

The next part is regarding testing and releasing code faster and faster and how to prevent errors. As testing is our way of preventing bugs we should test our application thoroughly, but be mindful testing cannot prove the absence of bugs. With that in mind we should ensure our pipeline we have enough of the application surface area tested, and we should build into our application telemetry to inform us as quickly as possible of issues or potential issues, so we can resolve.

We should also ensure to aid in faster release cycles that, we plan how each pull request (PR) will enter the system. We should ensure our PRs don't contain multiple concerns e.g. infrastructure changes and application code. Each should be separate and should be small. This makes it easier to review and potentially spot mistakes before it continues in our pipeline. It also makes diagnosis of problems easier if they do enter our production system as we can tell which PR caused the problem (assuming we have proper monitoring etc in place). This then makes it faster for us to fix issues as it could be simple as reverting a PR, our system automatically rolling back etc. When we attempt to fix the issue, we ensure it contains tests to demonstrate the issue is fixed, and prevent regressions.

So far testing has not been shown to be insufficient, if anything we need to ensure we thoroughly test our systems and think about how changes will affect our system. My explanation on this point is rather short, and I hope to address this in a future post of my own.

The next part of the article attempts to give evidence of testing being insufficient for todays delivery, so let's address each of the following points;

1. 100% Code coverage ≠ 100% errors identified
2. High quality testing takes time and doesn’t guarantee success
3. GA is effectively a beta and users are the new QA

## 100% Code coverage ≠ 100% errors identified
It's hard to argue against this, but there is no evidence shown in the article that developers think this way. To attempt to support the point as it comes from a panel discussion, one of the panelists Viktor Fracic states 

> “Code coverage means nothing. I don’t understand why people are still obsessed with code coverage. It’s not really about how many tests you have, but the quality of those tests. I’ve seen companies that have close to 100% code coverage but have meaningless tests that don’t prove anything.

I beg to differ, code coverage does mean something. It means how much of your production code is executed by your automated tests. It helps uncover areas which are not executed. Please note I state executed and not tested. It also claims that code coverage means have many tests.This is also not true, you could potentially have 1 automated test execute all the code in your system, it quite rightly would not be a very good test, but you would know all your code was executed against a test. Code coverage should only be used to help us know how much of our application has been **executed under test**. If we use it for anything else then this is wrong.

## High quality testing takes time and doesn’t guarantee success

As stated previously testing cannot prevent all the bugs from entering production. Its just not possible, and there are various books, articles to go into more detail and a quote above [^3] [^4]. I feel this point is made due to a lack of understanding of what testing is. Under this point in the article there actually isn't anything supporting it but rather a discussion on whether to release in 5yrs vs release quickly. I believe this seems to be mingled with the quote from Viktor Fracic shown previously. High quality tests should be at least;

- easy to read
- reliable
- test behaviour [^5]
- repeatable
- deterministic
- If unit test, test one thing (not the same as multiple assertions

There are probably more attributes to quality tests, but I believe these are easy to identify with.

The final point is

## GA is effectively a beta and users are the new QA
I have to admit, I find this difficult to reason with respects to topic in question which is testing being insufficient for todays software delivery pipelines and there isn't enough supporting evidence for this point to tie it back to the main topic. All I can really say is that software is not perfect, and we should accept feedback from our stakeholders (customers, internal team etc) to improve.

# Footnotes
[^1]: Quality Software Management: Volume 1, Systems Thinking - Gerald Weinberg
[^2]: [On the Effectiveness of Test-first Approach to Programming](https://web.archive.org/web/20141222180731/http://nparc.cisti-icist.nrc-cnrc.gc.ca/npsi/ctrl?action=shwart&index=an&req=5763742&lang=en)
[^3]: Perfect Software And Other Illusions About Testing - Gerald Weinberg
[^4]: Foundations of Software Testing
[^5]: [Programmer Test Principles](https://medium.com/@kentbeck_7670/programmer-test-principles-d01c064d7934)