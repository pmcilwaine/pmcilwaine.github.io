---
layout: post
title: Playing around with Youtube and Speech Recognition
tags: [youtube, speech, html, javascript]
comments: true
---

I’ve had an interest in learning the Speech Recognition API for sometime, in this time I have seen some nice uses of the API. So in my spare 30mins I decided to develop a very simple application which would allow a user to control Youtube video. Controlling video seems to be fairly popular first attempt at using the API, it’s also pretty easy to get setup in a short period of time.

A demo of this very hacky (not highly tested) can be found on [www.thenaught.com/speech.html](http://www.thenaught.com/speech.html). To use it, ensure you have a Mic connected to your computer and accepting input, and the latest version of Chrome, it hasn’t been tested on anything else. Now for a very brief explanation of how this works.

Firstly lets talk about the anonymous automatically called closure. Its important that this passes the window object as a argument. The reason being is that Youtube will execute a function it expects to be found in the global namespace. Unfortunately in my short time of development couldn’t find a way to register for this event, which would be obviously a lot better.

Secondly, setting up the player. Firstly it will need somewhere to be dropped, in the demo this is a simple empty div with id of player.

```html
<div id="player"></div>
```

We then ensure that we pull the javascript iframe api which gives us access to the Youtube Javascript API. We then register our callback for Youtube to call to, which just starts the youtube player with the video we want and basic dimensions. The player object will be used to playVideo, pauseVideo, and stopVideo.

Our final part is ensuring we initialise the speech recognition api.

```javascript
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-AU';
```

The 3 properties are quite important, firstly continuous allows for the recognition API to continuously check for new input, interimResults will be fired when at least in my experience when new words are spoken, and the language is important in terms of recognising the language spoken. We then register several events, however of most relevance is the onresult event which gives you transcript (what was spoken) and confidence in the [0, 1] range.

Some known bugs in this is that we the transcript will store everything said and nothing really gets discarded in this demo, so it's possible some video events get fired when they should not. I think though for 30mins of playing around it give s fairly good impression of how simple something like this is to setup.
