---
layout: post
title: Code Review - Working Titlte
tags: [programming, quality]
comments: true
---

This post is highly opininated!
Discuss from perspective of developer and reviewer.

Code review is an important part in the deployment pipeline. The pipeline is usually seen as when it goes to be built and deploy to the different environments etc. However code review should also be seen as part of this deployment pipeline. Its our first gate keeper, and our only gate keeper in terms of humans checking how something works rather than automated tasks within the pipeline. Yet, for how important I believe code review to be, it seems to be not seen that way for some and misused by others. 

Code review serves several purposes.

1. Learning for the developer who initiated the code to be reviewed.
2. Learning for the reviewer.
3. Check on readability and potentially maintainability.
4. Is the code optimal for the solution implemented







Code review is one of the first gate keepers in determining software quality, and has two factors to it. The developer who has requested the review and the reviewer(s) who will approve the changes requested to be merged.

In my experience there are two mindsets in which a code reviewer will see your pull request. Firstly is the we want the pull request to be merged. This mindset does not mean that the reviewer will approve it without checking, but the mindset of one that unless there is something dramatically wrong won't prevent approval. The other mindset is that of reject the pull request until it meets the standard. This mindset may seem like the best, but it must be done right, its very easy to get into this mindset and reject reasonably good code changes without merit.

As my article is tagged under quality, my view on the mindset should be one of reject. We want to reject code which we deem (the product/software team) not to meet our quality standards. But how can we ensure this is done in a consistent manner? 

Firstly I think we need to discuss what should not be part of code review to ensure we have at least a consistent base line.

## Code Styling
I do not believe code styling should be part of code review. My reason is that we generally want our code to be consistent with the rest of the system as if a single person who never changed styles worked on it. Code styling I generally consider to be of the following:

- Code indentation and spacing
- Ordering/positioning of variables, properties, constants etc.
- Variable, method, constants, and class naming etc.
- If your langauge supports brackets for scoping, how they are positioned
- Line length
- Statements per line

To solve this look to linters, most languages these days have them. Some linters are highly opininated to remove discussion. At the end of the day decide on what your coding style should be, ensure its linted, and ensure you have it run agains the pull request. A reviewer should not be picking these things up.

-- other things

Code review in my opinion should really be focused on is the imeplementation good. This is quite subjective but here is a list of things I believe should be checked.

- Is there anything that should be avoided either deprecated or considered bad.

