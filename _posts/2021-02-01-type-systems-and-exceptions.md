---
layout: post
title: Type systems and Exceptions
tags: [type-system, typesafety, typescript, python, dotnet]
comments: true
---

I have thought about this problem for some time, but it was not until doing a lot of Typescript within an AWS 
serverless environment that it really hit home, it [reminded me of this article](https://sobolevn.me/2019/02/python-exceptions-considered-an-antipattern).

## So what is the problem?

The problem is that we use exceptions to do a lot of error handling, passing these exceptions to clients and hope 
that we either document it, or the programmer of the client knows to understand this could have an exception and 
catch. Now our system is exception driven. Wouldn't it be better if there was another way? Let's walk through a 
simple example.

Let's say you have a repository that interfaces with AWS DynamoDB, an external dependency to your system. You might 
have the following code to retrieve some data

```typescript
class ContactRepository {
    constructor(private readonly client: DocumentClient) {}

    async public retrieveContacts(owner: string): Promise<Contact[]> {
        const query: DocumentClient.QueryInput = {
            // ... dynamodb syntax here
        };

        const result = await this.client.query(query).promise();
        
        return result.Items.map(item => doStuffToObjectToMapToContact(item) as Contact);
    }
}
```

I have cut a lot of code out and did a cast, which with more code probably wouldn't be required, but the main point 
is here we have a connection to DynamoDB, an external dependency. Anything could go wrong here;

- Query could be invalid, and we receive an Exception.
- Query may not return Items (it could be undefined)
- Our function could throw an exception, depending on if we validate the contents of the result set.

There are possibly more places this could fail. We are then forcing all clients to understand the inner workings of 
this class to know what exceptions it might expect, we may need to document it as a block comment. Now we could 
simplify the exceptions it could handle like so;

```typescript
class ContactRepository {
    constructor(private readonly client: DocumentClient) {}

    async public retrieveContacts(owner: string): Promise<Contact[]> {
        const query: DocumentClient.QueryInput = {
            // ... dynamodb syntax here
        };

        try {
            const result = await this.client.query(query).promise();

            return result.Items.map(item => doStuffToObjectToMapToContact(item) as Contact);
        } catch (e) {
            throw new ContactRepositoryException("My message");
        }
    }
}
```

You may not create your own type for this and just use the base Error class (of course different languages have a 
different base, but the idea remains the same regardless). So we have simplified the type of exceptions the client 
to this class needs to handle. Unfortunately we have solved nothing here. We still have the following issues 
(language may be dependent on some);

- Clients do not need to catch the exception as its not enforced (This maybe language dependent).
- Using throw forces us to either document and hope the IDE shows the documented exceptions thrown.
- Documenting of course becomes stale quickly as its decoupled from the code.

Can we solve all 3 problems? Yes, and this is the key thing to having a typed language with Generics support (the 
solution proposed is possible without generics).

```typescript
interface Value<T> {
    type: 'value';
    value: T;
}

interface Exception<E extends Error> {
    type: 'error';
    error: E;
}

type Result<T, E extends Error> = Value<T> | Exception<E>;
```

This by itself is incomplete, we need some way to encapsulate this logic.

```typescript
class ResultResponse<T, E extends Error> {
    constructor(public result: Result<T, E>) {}
    
    static value<T>(value: T): ResultResponse<T, any> {
        return new ResultResponse<T, any>({
            type: 'value',
            value
        })
    }
    
    static error<E extends Error>(error: E): ResultResponse<any, E> {
        return new ResultResponse<any, E>({
            type: 'error',
            error
        })
    }
}
```

This is a minimal solution, for more of a concept you can [view this Gist](https://gist.github.com/jsoendermann/058d022e0b8e64980daca22bb56ae1b4)

Now we can modify our repository class to be like this.

```typescript
class ContactRepository {
    constructor(private readonly client: DocumentClient) {}

    async public retrieveContacts(owner: string): Promise<ResultResponse<Contact[], Error>> {
        const query: DocumentClient.QueryInput = {
            // ... dynamodb syntax here
        };

        try {
            const result = await this.client.query(query).promise();

            return ResultResponse.value(result.Items.map(item => doStuffToObjectToMapToContact(item) as Contact));
        } catch (e) {
            return ResultResponse.error(e);
        }
    }
}
```

We can do a lot more with this concept, and I recommend viewing the Gist. This problem solves the fact that; 

- Client is now not required to catch an exception.
- We are not throwing an exception to the client, its caught and wrapped.
- We have documented this via a type and the client knows it could have a value or an exception.

This can be implemented in most languages that support Generics and have exceptions. This solution of course is not 
bulletproof. You actually need to ensure you know where possible exceptions can occur, some times this is not 
obvious. I like to ensure that

- Any call to an external dependency i.e., HTTP, Database or other are strong candidates for this.
- Any result from an external dependency is validated to my required type. Validation should throw an exception, and 
  the potential result given the client to know how to deal with it e.g., No item might be ok as we can continue, or 
  we may stop execution.

## Conclusion

What I like about this is we have lent on the typing system making our system easier to code and should hopefully 
prevent
silly errors from creeping into our application. This is not foolproof, as we can only apply this in situations we 
recognise. 
