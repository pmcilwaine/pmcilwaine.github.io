---
layout: post
title: Writing good Unit Tests
tags: [testing unit-tests]
comments: true
---

Writing unit tests are easier to do then it was many years ago, and yet we still struggle to write good unit tests. 
My assumption is that there is a fundamental misunderstanding on what testing is, and the principles behind each 
testing method.

This article is not going to discuss the principles behind the commonly used testing methods, or each of the testing 
methods themselves. I am going to focus on unit tests, as I consider it the most important automated testing method.

Some bad practices I have witnessed and definitely not limited to;

- Using randomised libraries for passing to code under testing or system under test (SUT).
- Working around language limitations i.e., Making private methods testable. Python and Typescript/JavaScript are 
  good examples of this bad practice.
- Treating E2E tests are unit tests
- Fixture data shared across tests.

Obviously this is not a comprehensive list, but I hope it highlights some simple ways in which people misuse unit tests.

So let me briefly go over why some of these are bad practices and then go on to what unit tests are, their 
properties and an example of a good unit test.

### Random libraries for Testing

In our first example of bad practices, a library is used to generate random values for our SUT. This seems nice 
right, now we can be sure our code works well, its going to be tested under many situations. This all seems fine, 
until, someone pushes to CI and the build breaks. The code was never touched, the tests were not changed and yet the 
test fails. Perhaps its not even 1 test, its many tests.

Countless times I have seen this happen when we run into situations just like this. 

> I'll try re-running it

And guess what? It now works, problem solved. I myself am guilty of this practice. The issue here is we have a flaky 
test or rather an [Erratic test](http://xunitpatterns.com/Erratic%20Test.html), what makes it worse, is its done 
intentionally. We have not introduced any confidence to our system, if anything we have reduced it.

### Working around language limitations

I am being quite specific here for example Python and Typescript/JavaScript has no true concept of private methods 
as of this writing.

```typescript
class Contact {
    constructor(private readonly firstName, private readonly lastName) {}

    private generateName(): string {
        return `${this.firstName} ${this.lastName}`; 
    }
    
    getName(): string {
        return this.generateName();
    }
}
```

In this rather simplistic example we have a private method generateName, which just joins the first and last name. 
Now we have a test which might do something like this. 

```typescript
describe("Contact", () => {
    it("will give name", () => {
        const contact = new Contact("First", "Last");
        contact["generateName"] = jest.fn()
            .mockReturnValue("Quick Testing");
        expect(contact.getName()).toEqual("Quick Testing");
    });
})
```

The test works, we have worked around the issue of our method being private due the language lacking accessor 
visibility, and Typescript being built on Javascript making classes just a syntactic sugar on an object literal. I 
won't list the problems here, I think at least the fact we are accessing a private method in a workaround method due 
language design/limitations should be enough.

So we have seen a few issues, lets go over what a unit test is.

## What is a Unit Test

The simplest definition is.

> A unit test is a piece of code (usually a method) that invokes another piece of code and checks the correctness of 
> some assumption afterwards. If the assumption turns out to be wrong, the unit test has failed.

This is rather vague, so lets extend it a bit more.

> A unit test is a piece of code that tests a small unit of work. The unit of work may call other methods, and once 
> the unit of work is complete the test checks the correctness. The test should call no outside dependencies.

Hopefully this is a little easier to understand, there are some additional constraints so lets discuss the 
properties of a good unit test, to help us understand this.

- It should be automated and repeatable
- It should be easy to implement
- Anyone should be able to run it at the push of a button
- It should run quickly
- It should be consistent in results i.e., if nothing changes between runs.
- It should have full control of the unit under test.
- It should be fully isolated
- Keep assertions to a minimum (ideally 1)
- When it fails it should be easy to detect what was expected and determine how to resolve

Some of these properties hit on some points discussed as problems.

> It should be consistent in results i.e., if nothing changes between runs.

Random values being used in tests, obviously fails this. If the values are changing each time a test is run and 
nothing is changed, its difficult to get consistent results. We want consistent results as that increases confidence 
in our tests and our system. It also fails the next bit.

> It should have full control of the unit under test.

If your tests is generating random values, you dont have control of the unit test as you do not have control of the 
random string being produced (otherwise its not random). But this property is good to understand, and most people 
following SOLID principles will have an easy time ensuring this is possible.

> Keep assertions to a minimum (ideally 1)

For many this is highly debatable, but for me I find the tests are generally easier to explain and its clearer what 
should be going on. It also ensures we focus the type of unit test it is. Is it a structural test or a behavioural 
test. I will explain more on this in another article.

## What does it look like?

So we have the basics of what properties are required for a unit test to be good. Lets see a quick example.

```typescript
class ContactRepository {
    constructor(private readonly client: DocumentClient) {}

    public async retrieveContacts(owner: string): Promise<Contact[]> {
        const query: DocumentClient.QueryInput = {
            // ... dynamodb syntax here
        };

        const result = await this.client.query(query).promise();

        return result.Items.map(item => doStuffToObjectToMapToContact(item) as Contact);
    }
}
```

And our tests might be like this

```typescript
describe("ContactRepository", () => {
    let client: DocumentClient;
    
    let queryPromise: jest.Mock;
    let query: jest.Mock;
    
    beforeEach(() => {
        queryPromise = jest.fn();
        query = jest.fn().mockReturnValue({promise: queryPromise});
        
        client = {query};
    });
    
    describe("query throws exception", () => {
        beforeEach(() => {
            queryPromise.mockRejectedValue(new Error());
        });
        
        it("will throw exception", async () => {
            const repository = new ContactRepository(client);
            await expect(repository.retrieveContacts("some owner"))
                .rejects.toThrowError(Error);
        });
    });
    
    describe("query returns items", () => {
        beforeEach(() => {
            queryPromise.mockResolvedValue({Items: []});
        });
        
        it("will return empty list", async () => {
            const repository = new ContactRepository(client);
            const result = await repository.retrieveContacts("some owner");
            
            expect(result).toHaveLength(0);
        });
    });
});
```

These tests could be clearer in terms of explaining what happens, but the basic concept follows all the properties.

- Its repeatable, no random values
- It was easy to implement, and extend I should add
- It should be easy to run, I haven't shown but most javascript systems will have a npm/yarn test command
- Since we mocked the dependencies this should be fast to run. Think single digit milliseconds.
- Again we have full control due to dependency being injected
- Its isolated, all setup code is linked to a test via a beforeEach and no test is dependent on the other
- We have a single assertion per test
- As we have a single assertion, its easy to spot what failed. 

We could improve on some of these, for example the last most assertion libraries allow a more descriptive reason on 
failure.

## Conclusion

I feel as though there is a lot here, and yet have barely scratched the surface. But let's discuss further in 
another article.