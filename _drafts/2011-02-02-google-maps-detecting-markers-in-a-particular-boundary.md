---
layout: post
title: Google maps detecting markers in a particular boundary
tags: [javascript, google-api]
comments: true
---

Its been a very long time since I last used the Google Maps API, think v2 of the API had just come out of Beta when I last used it which shows just how long ago it was. Thankfully v3.0 adds many cool features and makes things a hell of a lot easier. One of those things is being able to make a radius boundary, based off a marker or even the persons location. There are several drawing (overlay) like options for google maps in this example I am using the circle. Each overlay object comes with a getBounds method which allows us to see if a particular latitude and longitude is contained within that boundary. In my example I am detecting whether a draggable marker (after being dragged) lives within this boundary.

Here is the [demo](http://www.paulmcilwaine.com/wp-content/uploads/2011/02/map.html).

A few things to note in the code are:

```javascript
var radius = new google.maps.Circle({
    center : myLatlng,
    radius : 500,
    fillOpacity : 0,
    strokeOpacity : 0,
    map : map
});
```

The radius property is in meters so 1km would be 1000. The fillOpacity and strokeOpacity are set to 0 however you can have these higher to show the actual overlay.

The main magic happens with these lines

```javascript
var dragable_marker = new google.maps.Marker({
    position : new google.maps.LatLng(-33.868625,151.210274),
    map : map,
    draggable : true
});
google.maps.event.addListener( dragable_marker, 'dragend', function( e ) {
    alert( radius.getBounds().contains( dragable_marker.getPosition() ) );
});
```

Firstly dragable_marker object is simple enough it just creates a marker which we can drag, however the main code is in the event listener is the big part. We want to listen for the dragend event which just means once the dragging has stopped fire this event. Within this we check with the radius google.maps.Circle object which has the getBounds method, getBounds returns a [google.maps.LatLngBounds](http://code.google.com/apis/maps/documentation/javascript/reference.html) object. This object is pretty special instead of us having to some maths to workout whether the current position is within a certain region the magic happens in the contains method which we pass the dragable_marker object and use the getPosition method. This just retuns a google.maps.LatLng which is what contains is after. The methods returns true if its within the bounds and of course false if it doesnt.

So there is it a very simple yet extremely powerful bit of code.
