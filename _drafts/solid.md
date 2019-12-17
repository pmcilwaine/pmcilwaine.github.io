---
layout: post
title: SOLID Principles
tags: [solid, programming, oop, architecture]
comments: true
---

You may have heard of SOLID in passing, you may know it, you may be expected to know it. I hope in this article I can explain what it is, with real world examples and hope to show why you should understand and practice SOLID principles.

## What is SOLID.

SOLID is a set of 5 principles which each character in the SOLID acronym. They were grouped together by Robert C. Martin many years ago whilst writing articles on object oriented design. These articles of course were based off prior work others did, I recommend reading these articles also to see how things have changed. Getting these principles right can be tricky, but will hopefully allow the need for changes to fan out, and ideally make things easier to test. 

## Single Responsibility (SRP)
> A class should have only one reason to change

This is the first of the principles, and is probably one of the easiest of the principles to understand, thankfully this principle is fairly fundamental in solid. The principle states that your class should only change because of one reason/requirement. Lets start with a basic warm up example. 

```java
public class Rectangle
{
    public void draw();
    public double area();
}
```

Do not worry about the implementation details, they are not really relevant here. But in this example we have 2 basic methods draw and area. The area is a simple calculation of the area of a rectangle and draw is to actually draw this rectangle on a GUI.

At first glance this doesn't seem that bad. You probably have an application that draws and you want to compute the area of that is drawn. But lets think about it a bit more. The area method is a mathematical function, whilst the draw is a graphical function. If we need to make a change for the graphical part we are only change one aspect of the class, in this case its a responsibility in which we have 2, Graphics and Mathematical.

A better approach would be to split the Graphics and Maths into separate classes. It could look something like the approach below.

```java
public class GeometricRectangle 
{
    public double area();
}

public class GraphicRectangle 
{
    public void draw();
}
```

If we need to make a change for graphics we know its clear which to change and that any change will happen just in that GraphicRectangle class, and vice versa for Geometry (maths). But this is a rudimentary example, its good to see a close to real world example.

Below is a modified version of code we have in a repository, the modification is only to remove business entities which are not important in the scheme of demonstration.

```php
class DeliveryPromise
{
    public function orderContainsValidInstallationServiceForLargeCarrier();
    public function orderContainsValidInstallationServiceForSmallCarrier();
    public function loadShopDeliveryPromise();
    public function loadProductDeliveryPromise();
    public function determineCompatibleCarrierForInstallationService();
}
```

This class has quite a few responsibilities. It needs to determine if an order contains valid installation services for a particular carrier, load promises for the shop, load promises based on product. The likely candidates for grouping are

- orderContainsValidInstallationServiceForLargeCarrier
- orderContainsValidInstallationServiceForSmallCarrier
- determineCompatibleCarrierForInstallationService

These 3 methods all look to be doing the same thing, in fact the last methods looks like it could use the others so perhaps we can make those private.

```php
class InstallationPromise
{
    public function determineInstallationPromise();
    private function orderContainsValidInstallationServiceForLargeCarrier();
    private function orderContainsValidInstallationServiceForSmallCarrier();
}
```

Here we still have 3 methods, but only one is publicily available, it can return the correct promise if one is applicable. We now need to look for a way to split the loading of promises based on shop and product. These probably do very similar things so we could first create an interface and each type creates an instance of that. On DeliveryPromise class can then do stuff under the hood which it would normally do to create a promise.

```php
interface Promise 
{
    public function retrievePromises(); // no real logic is done to ensure a promise is valid
}

class ShopPromise implements DeliveryPromise 
{
    public function retrievePromises();
}

class ProductPromise implements Promise 
{
    public function retrievePromises();
}

class DeliveryPromise 
{
    public function __construct(Promise, InstallationPromise);
    public function retrievePromises(); // here we ensure the promises are all valid based on some logic.
}
```

Now the DeliveryPromise class has no concept of installation promises other than they exist, nor if its a shop or product promise. This class only deals with the logic of ensuring on valid promises are returned. 

## Open/Closed (OCP)

> You should be able to extend a classes behavior, without modifying it.



## Lisokov Subsitituion (LSP)

> Derived classes must be substitutable for their base classes.

## Interface Segragation (ISP)

> Make fine grained interfaces that are client specific.

## Dependency Injection (DIP)

> Depend on abstractions, not on concretions.

## Further Reading
You can go to [http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) if you want to read the original SOLID articles.
