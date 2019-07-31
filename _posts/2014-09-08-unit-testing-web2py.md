---
layout: post
title: Unit Testing with Web2py
tags: [python, web2py, testing]
comments: true
---

I am a big fan of web2py, however it does have its short comings one being the difficulties of unit testing. This is actually not surprising, it was only in the last 18 months or so the web2py framework got serious about doing unit testing, which means unlike other frameworks testing wasn’t at the forefront of the development. Fortunately there are several ways to do this which are surprisingly simple, however they do require a particular set up. Before I start I should make it clear unit testing isn’t the only way to do automated testing so do not be fooled in thinking this is the magic silver bullet.

I have setup a basic skeleton for how unit testing can be done which can be [found here](https://github.com/pmcilwaine/web2py_unit_test). The basic idea with this setup is for the unit test runner to not be tied to the actual web2py framework, but to create a custom one. We also ensure that models are not done the traditional web2py way in the models file, I follow the [Model less approach](http://www.web2pyslices.com/slice/show/1479/model-less-apps-using-data-models-and-modules-in-web2py) suggested by Bruno Rocha. The reason being is we need to ensure we can run these tests anywhere and sometimes we may not have the correct database available, we also need to ensure that we can drop and recreate it quickly. This is why I use SQLite for the test database. If you are familiar with SQLite you may realise this isn’t the best way due to how inconsistent SQLite can be with some queries. The model less approach allows us to easily change the database connection string [without globals such as suggested in this example](http://www.web2py.com/AlterEgo/default/show/260), and also to define an application configuration.

Now that the runner is explained the rest of this is pretty stock standard python and unit testing. The controllers folder has a `__init__.py` file which the runner.py can now include into the project as a normal python module. All request, response and session objects still exist on the current threading object which the runner now controls (another reason for the custom web2py framework), I have to admit to not being a big fan of the current object and how it works within web2py but a lot of frameworks have a similar concept like Flask. What I do not show in the skeleton that much is that a lot of my work is usually pushed as python modules rather than the controllers. I actually recommend this approach although at times it can seem like overkill.

The code provided is tested with the latest web2py 2.9.8 although you can get it with slight changes with versions prior to 2.4.7.
