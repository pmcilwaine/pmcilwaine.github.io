---
layout: post
title: PR Rules to live by
tags: [scm git pr]
comments: true
---

The pull request (or PR), is often overlooked in part of the deployment process, however it plays a very critical 
role in ensuring quality and shared understanding of the overall application. Here are some key aspects from my many 
years creating and reviewing pull requests.

# Keep them small

Keeping your pull request small makes it easier for the reviewer(s). Think of your reviewers as customers, you want 
your customers to buy what you are selling with no obstacles in there path. A PR should be viewed in a similar light.

If you have a large PR, the reviewer will either spend considerable amount of time looking at the PR and thus making 
feedback longer for yourself, or worse and quite common to just approve the PR. Both of these should not be our goal 
of a PR.

## Long feedback loop

I discussed this in a previous article on [E2E testing](/2021/02/15/perils-of-e2e/). We always want a shorter 
feedback loop to enable flow. Flow is the concept that comes from LEAN. Essentially to enable flow we need to 
eliminate waste, long feedback loops is a type of waste that is you are spending considerable amount of time waiting 
for feedback to either continue on to the next item, or to react to feedback. This wait time is what we want to 
eliminate. 

## Simply approve

PRs are a teaching tool. I like it when people comment on my pull request it means I have something to learn. Simply 
approving my PR tells me that what I have done is acceptable even if it truly isn't. For anyone that has had the 
enjoyment of reviewing a PR that is 1000+ lines, and then seeing it approved signals to others this is acceptable. 
Big PRs in my experience usually hide many problems (I myself have caused some), some times this means a blocked 
pipeline, or worse the work makes it to production only for a revert to be required or fixes to be drip fed into the 
system until resolved.

My advice to those reviewing a large PR. Simply request changes explaining the PR should be broken up. Offer 
assistance in doing so also.

# Single purpose

This is tied to keeping your PR small. A small PR is usually focused on a single thing e.g., a configuration change, 
infrastructure. If your PR has multiple focus points, the PR in my opinion is doing too much and requires more 
context from the reviewer to properly go through the requested change.

# Ensure commit messages are clear

Commit message should give enough context on what was changed in that commit. Simply stating

> Addressed PR feedback

gives later viewers zero context as to what was changed without reviewing the commit and even still this may not be 
clear. I learnt to follow a structure of

> If applied, this commit will "your commit message here"

By following this format, it will help you write clearer commit messages, which are especially useful for historical 
context.

Ensure your commit message is a maximum length of 72 characters. This is obviously quite difficult if you have 
multiple changes within the commit, another reason to keep it singularly focussed.

# Give your PR context

Commit messages should be short, they should easily fit within the git log message on a single line with no cut off. 
This restriction usually means some context may not be as clear as you would like, Github allows a larger message to 
accompany the PR commit, ensure you give as much context as necessary, after all you want them to read it.

# Constructive feedback

A PR is not a one way street, the reviewer also plays a part in making effective PRs. A PR is not just getting code 
into the mainline branch, but it is also a learning tool both for the author of the commit and the reviewer.

1. Explain clearly what is wrong with the change. 
2. Offer suggestions on how to improve
3. Ensure your reviews are based on the code.
4. If necessary link off to documentation etc. which makes the point clear

For me the 4th point can be a strong way to ensure opinions are removed from the discussion. I find opinions unless 
there is some considerable weight behind them (demonstrable rather than authoritative) can get a little out of hand 
in certain situations.

# Conclusion

This is not an exhaustive list of PR rules, and thats because these main items are things that need to be done first 
and the others are really getting into the nuts and bolts of it, and because of that are usually specific to the 
organisation as well as languages involved.

Keeping PRs small, with a single focus as well as giving your PR additional context will make it easier to get PRs 
approved, allow learning. With constructive feedback a true learning experience should be available to you and your 
team.
