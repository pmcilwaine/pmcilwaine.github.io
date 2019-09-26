---
layout: post
title: SOLID Principles
tags: [solid, programming, oop, architecture]
comments: true
---

Robert Martin aka Uncle Bob many years ago wrote a number of articles around object oriented design. These articles were based off work prior but now they were given a grouping which we call SOLID Principles. 

## Single Responsibility (SRP)
> A class should have only one reason to change

This is a simple principle to understand, to follow however requires discipline and practice. The principle states that a class should have one responsibility, implied from only one reason to change. 

The reason for this principle is to reduce coupling of two or more responsibilities. 

- show a violation
- explain how it might not be a voliation of SRP

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
