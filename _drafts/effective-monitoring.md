---
layout: post
title: Effective Monitoring
tags: [sre, monitoring]
comments: true
---

Monitoring can some times be called telemetry but for the sake of this article I'll just use monitoring to avoid any confusion. So why would you want to monitor your system?

Well imagine your system is a train line. You cannot be at every single point on the train line, as there are many. You need to ensure your trains are able to run, and if not why not. 

Lets say a signal is not working? How would you know its not working? Well the simpliest would be to wait for an accident, that way you know that something went wrong, but you could not pinpoint it to the signal until after a lengthy investigation, you'd also find out second hand after a potential major accident. I don't consider this ideal.

But let's say you had a heart beat on the signal, if you expected to receive the heart beat every minute and you missed a minute, there might be a problem? With this heart beat you know the signal is working if the heart beat is sent, however if you miss an expected heart beat, you don't necessarily know there is an issue. But now you can investigate, you can also inform trains in the area to stop at the signal until its investigated.


So we want to know of potential issues in our system, potentially before someone else finds out. Although this is still reactive, we have a bit more control and we can potentially act faster. We also can ascertain potentially where an issue might lie, but not the issue itself. In the train line example, there could be a number of reasons the signal did not send a heart beat. This example is a bit extreme but it highlights the potential impact of not monitoring.

Before I continue further lets get some monitoring terminology defined.

## Metrics
Metrics are just the raw data we store on data we want to measure. We could have metrics being low level from the operating system such as cpu usuage, disk usage, etc. Other systems can also have their own metrics from web servers, databases etc. But mostly when we talk metrics we want the data from our application such as how long it takes to retrieve records from the database, how long an external call made, our response time, system availability.


## Monitoring
Whilst metrics are the raw measurement data, monitoring is the collecting, aggregating and analysising and displaying those metrics. With monitoring we build dashboards which collate our metrics into something a bit more meaningful. For example we may have a graph with the number of requests vs the number of failed requests, we may have counters on the number of calls made per hour. There are many possibilities in how we build a monitor but we should do so to inform us of problems. Please note monitors alone do not notify you of an issue, you have to actively check. This leaves us on being notified;

## Alerting
Alerting is acting upon our monitoring, this is where we can signal when to be notified based on some data value in the monitor being below, at or above a certain value. Its important to have a good way to retrieve alerts. Some people might have it sent to an application on their phone, or perhaps a pager. Whatever mechanism you choose ensure the alert will be acted upon, and won't get lost on other noise.

I hope the above definitions help, for further reading I suggest reading the [Site Reliability Engineering](https://landing.google.com/sre/sre-book/toc/index.html) book from Google, as well as [An Introduction to Metrics, Monitoring, and Alerting](https://www.digitalocean.com/community/tutorials/an-introduction-to-metrics-monitoring-and-alerting). 

Now that we have a basic understanding of terms, lets discuss what we may want to measure, how we can monitor and ways we can effectively alert of issues.

Lets have an example of an Ecommerce site. There are several facets to an ecommerce site so lets list the areas.

1. Product Display
2. Ordering
3. Payment
4. Processing Order
5. Shipment

Depending on the size of the site/company this is a pretty trivial listing but will work for our example.

## Further Reading
1. [Site Reliability Engineering - HOW GOOGLE RUNS PRODUCTION SYSTEMS](https://landing.google.com/sre/sre-book/toc/index.html)
2. [An Introduction to Metrics, Monitoring, and Alerting](https://www.digitalocean.com/community/tutorials/an-introduction-to-metrics-monitoring-and-alerting)
