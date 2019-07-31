---
layout: post
title: Website Request Forgery
tags: [http, crsf, security]
comments: true
---

A website request forgery or better known as Cross-site Request Forgery (CSRF)

## What is it?
This is an attack that forces an end user to execute unwanted actions on a web application they are authenticated on.

This an attack that tricks the victim into submitting unwanted requests. The attacker assumes the identity of the victim to perform these undesired attacks. Browsers automatically pass on credentials such as session cookie, ip etc, so the web site has no way to distinguish requests done by the attacker and those by the victim.[^1] [^4]

The attacker will do something to change state, that is because the attacker cannot get the response of the request such attacks could be to make a bank transaction, update password etc.

CSRF has the following characteristics:
* Involves sites that rely on a users identity
* The site is exploited for trusting the identity of the user
* The browser is tricked into sending HTTP requests on behalf the user to the target site
* Only affects HTTP requests with side effects

## How does it work?

Firstly the attacker needs to find a vulnerable end point. Let’s assume in our instance its a GET request to make a transaction on a bank from 1 account to another.

> GET /transfer?toAccount=12345678&amount=90

Now an attacker perhaps sends you an email[^2], you are logged in (required to make this work). The email is HTML is contains an `<img>` tag which you cannot see but looks like this.

> <img src=”[domain]/transfer?toAccount=[account]&amount=90”>

If you have HTML enabled for email this will silently make the request on your behalf. The service does not realise you in fact did not make this request but the money will be transferred nonetheless.

A POST example is not much more complicated, it would just require Javascript to be used to submit the form.

You can find more about an actual CSRF issue that affected uTorrent here [https://www.cvedetails.com/cve/CVE-2008-6586/](https://www.cvedetails.com/cve/CVE-2008-6586/).

## How can I prevent it?

Before going into how to prevent it, understand that Cross Site Scripting (XSS) is not necessary for CSRF, however most recommended ways of preventing CSRF can be defeated with XSS exploits.

### Vulnerable Resources
1. Form tags with POST
2. XHR calls

It is assumed that you are not violating [RFC2616, section 9.1.1](https://tools.ietf.org/html/rfc2616?source=post_page---------------------------#section-9.1.1) with GET requests changing state. If you do, you would also need to protect those resources.

## Methods to prevent
### Token Based
This is the most widely used and recommended ways to mitigate against CSRF attacks. Generally speaking you’ll need to create a token which is either put as a hidden field within a FORM, within a URL for a GET request or header/parameter for XHR calls[^3].

You should be doing the following:
* Create a unique token for a user session.
* Strict key rotation and lifetime policies.
* Pass the token in a hidden field for form OR parameter with AJAX.

### Auto CSRF
This is just a build on top of token based. The idea is that doing token based manually is error prone as a developer can easily forget to put it in place[^3].

### User Interaction
These should prevent CSRF attacks even for CSS. However there is a trade off for the additional security which will have an impact on the user experience. It is suggested to only use these techniques for applications requiring high security such money transfer[^3].
1. Re-authentication
2. One-time token
3. Recaptcha

I highly recommend reading [OWASP cheat sheet on defensive techniques](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md?source=post_page---------------------------#primary-defense-technique).

## Sources
[^1]: OWASP (2018, June 3). Cross-Site Request Forgery (CSRF). Retrieved from [https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))
[^2]: OWASP (2019, March 28). Testing for CSRF (OTG-SESS-005). Retrieved from [https://www.owasp.org/index.php/Testing_for_CSRF_(OTG-SESS-005)](https://www.owasp.org/index.php/Testing_for_CSRF_(OTG-SESS-005))
[^3]: OWASP. (2019, May 31) Cross Site Request Forgery Prevention Cheat Sheet. Retrieved [https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.md)
[^4]: Wikipedia. (2019, May 23). Cross-site request forgery. Retrieved from [https://en.wikipedia.org/wiki/Cross-site_request_forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery)