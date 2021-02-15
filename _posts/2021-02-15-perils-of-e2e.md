---
layout: post
title: The Perils of End-to-End Testing
tags: [testing e2e]
comments: true
---

End-to-End testing (or E2E) is an often used testing practice to get a feeling of how the application works from a 
users perspective. Unlike unit and integration testing in the automated testing pyramid they ensure all 
functionality is working. 

I have implemented and worked with E2E tests for about a decade, and can safely say E2E in 
theory are great, in reality they are unfortunately extremely problematic.

### Why do developers love E2E tests?

I think this is a bold statement, but let us go with it. E2E tests allow developers to write automated tests, which 
give us an impression of whether the system is working or not from a user perspective. They should be run 
against production or very production like system to have real confidence. They allow us to write fewer tests in 
theory with respects to unit and integration tests.

In short a developer, and even the product team have a sense of accomplishment with E2E due to the fact they are 
had done more with less.

### What is wrong with E2E?

I have referred to E2E tests as tests from the user perspective or more formally simulating user scenarios. But E2E 
is a poor substitute for that. For starters automating user scenarios is not something easily done, without data to 
inform decisions e.g., Could you realistically simulate actual user scenarios in which buttons are clicked in 
order correctly? With one button you could, 2 you could also but your amount of tests has now doubled, add another 
button in again, and the number of tests is starting to get unmanageable. We could look at this from the perspective 
of a simple editor.

It fails the primary purpose of testing, but what other areas do E2E fall short for a developer?

1. Long feedback loop
2. Flaky tests
3. Tests are not isolated
4. Difficult to setup

Anyone who has done E2E before has run into each of the above issues in some way or another, and they actually slow 
the development process down, or more likely simply get dropped. Let's quickly go over each issue.

#### Long feedback loop

E2E tests generally walk through a simple user scenario. We may hit one or more areas within a single test e.g., from 
a web perspective we may hit several screens to perform the scenario, in which we have hit many backend systems. 
Running a single test can take many seconds to typically minutes. This is due to the fact that something usually 
needs to be set up (normally a browser), it requires a screen to load, waiting on certain aspects to be available to 
perform the scenario.

Due to this time it takes to run, its much slower to get feedback on a problem existing, you now then need to 
discover where the problem is. As E2E tests are not isolated to a single unit of work but to a greater system, the 
failure could be in any underlying system. For example, it could be the UI itself, the API, the backend system, an 
external system. The list goes on, once isolated can you determine how it should be fixed (best done with a unit 
test and/or integration test), and re-run the E2E to assure its resolved at the top level. 

The big carrot for automated tests is the short feedback loop that is; knowing there is an issue, isolating the 
issue, fixing the issue, and proving its fixed.

#### Flaky tests

Unfortunately E2E tests can be flaky, my examples are all driven from the browser so I cannot speak to other E2E 
style tests. We have various frameworks trying to solve this by doing retries such as cypress but even still E2E 
tests are flaky, and it can be down to a number of reasons

1. UI execution (race conditions, async)
2. Tasks in the background system
3. Is the environment isolated, could there be a deployment happening?

I could continue on with this list, but I kept it short to make the point. Flaky tests reduce confidence in our 
tests and our system. I have seen many developers state it, and fewer practice the preaching. But flaky tests have a 
tendency to just get re-run, and oh it works. Unfortunately this gives a false sense of security, which will 
eventually hit someone else as a real problem may have actually been uncovered but ignored. The problem here is that 
it pushes problems further down the line, making it more difficult to fix later on.

#### Tests are not isolated

As much as we try E2E tests are very difficult to keep isolated. As mentioned previously our system, which we use for 
testing may have a deployment going. But the problem is further escalated from that. To run an E2E test we typically 
need some data to be present in the system. This might be when we load the system up, or perhaps we refresh it when 
we run the tests. We need that data otherwise its nearly impossible to run E2E tests without huge investment to 
make it possible. 

What we end up with, is tests that are reliant on other tests due to results of the data present in the system. Not 
only do we have a shared fixture (our test data), but that shared fixture has results from previous tests, which 
means we have tests interacting with each other, and our fixture data is mutable. It makes it very difficult to run a 
test in isolation that is a single test by itself.

There are ways to spot this, but it continues on with it potentially being very difficult to do, not to mention add 
time to running our tests. See Long feedback loops.

#### Difficult to setup

We want to isolate our tests, which means we may need to build additional components to make insertion and removal 
of test data in our system easy between E2E test setup, and between the individual tests. You also need to ensure 
you have test data available, some times you require a lot of test data to demonstrate certain features like search. 
Depending on your system, it may not be possible to allow this, so you need to handle the fact there might be data 
from a previous run, all these make writing and setting these tests very difficult.

### What should we do?

E2E tests are not something we should shy away from, but being reliant on them as our source of automated test is in 
my opinion wrong (or you could get [Googles opinion also](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)).

What you should do is

- Make it possible to setup and clean up after tests and full test runs
- Ensure tests are possible to be run in isolation
- Limit the number of tests you write. Only common scenarios should be tested
- Favour unit tests and integration tests
- Remember that manual tests are also possible and should still be done which may bring more value.

## Conclusion

E2E tests have their place, but they should be used sparingly. Use E2E tests on areas that are frequently used and 
benefit most of automation. Value other automated testing techniques such as unit and integration testing, and 
remember that exploratory testing will give you better value than E2E tests.
