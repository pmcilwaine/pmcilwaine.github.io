---
layout: post
title: Year in Reflection
tags: [reflection]
comments: true
---

It's hard to imagine it's been a year since I said goodbye to the company that brought me to Europe, where I met my
 wife and started my family. During this past year I have;
 
- Been in Australia during one of the worst bushfires seasons to have hit the country and possibly in recorded history
- Sold my home in the Netherlands
- Moved my family to Italy
- Started a new job, which is also my first time remote (pre-covid)
- Discovered Italian Bureaucracy
- Witnessed one of the greatest pandemics in living history
- Started building a new house
- Started to learn a language

Probably many other things along the way, but these are the big points of this year, and let's just say what a year
 it's been looking back on that list.

Usually when I do my year in reflection I like to look at what I learnt, so let's see what I've learnt and why.

## Communication

It's hard to start with something else but this. Being a native English speaker living in a country and more
 importantly where I live in that country, English speakers could probably be counted as a small football team
 . Needing to learn a language to be an effective member of the community, is a difficult task, especially when
  needing to look after the family, and work. My tips are so far;
  
- Find something that motivates you.
- Talk with people (thankfully my wife is a native speaker so no excuses here)
- Be comfortable failing and being frustrated. Being frustrated with my reduced capacity to communicate in Italian
 has been one of my biggest learning points and something I need to master more.

Feedback is another important aspect to communication. I believe during my professional career I have gotten much
 better with this, but I did have another learning point.
 
> Ensure when giving feedback to remove yourself from distractions

Unfortunately I was trying to be helpful, and due to being distracted looking after my child and attempting to give
 feedback on a proposal. My directness came through a little too harshly. This put the recipient of the feedback on
  the defensive, and made my feedback all but useless. 

The real learning here is of course is being focussed on the feedback you are giving, whilst removing yourself from
 other distractions to help ensure you are focussed.
 
## Technical Debt

I'm always learning more about technical debt, but the last 2 years have made me focus on the real ways to solve this
. This year it has come in quite hard. The core part of the product my company offers suffers from serious technical
 debt. Unfortunately the engineering team is small, and large backlogs of work. We also have the pressure on
  improving our offering to ensure we can meet company goals.

It's difficult to sell to management that you want to spend 3-6 months or longer on improving what customers already
 have and are paying for, its even more difficult to sell it with saying, and no more new features will be developed. 

The basic idea is to ensure when you build your road map / next quarter goals or whatever you call it at your company
, is to ensure your solving your technical debt solves a problem for your company. Tie it with a monetary value and
 the company will have a tough time ignoring it.
 
This was best shown in solving one part of the technical debt on the main project. It does not scale, its deployment
 is put together with duck tape, glue and sweat. We could show that we lost sales due to our lack of scalability
 , bigger customers wanted to know, found out and went elsewhere. This got approved, and of course our deployment
  problem is tied to it.
  
Not all technical debt is as easily solvable as the above, but you must find ways to demonstrate it if you need to
 have a big project. Some times there is no clear monetary value, and it needs to be seen as small mini projects,
  which are distributed.

An example here is our issue with our frontend, its currently 2 deployments one being Angular v1 with React thrown in
, the other is React but thankfully closer to being the latest.

The way to solve this is in small increments;

- Get a basic strategy, ours is strangler pattern on the Angular v1 project and using Microfrontends
- Inform others, ideally those in manager positions of the choice and how it should work
- Get someone to start it in a project that touches the key area. My team did this as a new greenfield project.
- Convince other teams to follow suit, and ensure you are there to help out.

I have so far done the first 3, the last one is due to resource constraints in that another team hasn't picked this
 up. The other thing to note, this strategy is very slow, so don't get frustrated if it can take months to years to
  gain solid traction.

## Final note

As I've said it was quite a year with many things being done, I hope next year is slightly less eventful, safer and
 focussed on stability a.k.a no more moving 🙂.
