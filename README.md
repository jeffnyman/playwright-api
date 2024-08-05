# Learning Playwright (API)

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/en). The LTS version should be fine. You will also need the `npm` package manager (which comes with Node.js) or `yarn`. A development environment or IDE with TypeScript/JavaScript support will help. [Visual Studio Code](https://code.visualstudio.com/) is a good choice.

## Execution

This repo will be using the [restful-booker](https://restful-booker.herokuapp.com/apidoc/index.html) API for testing purposes.

Clone the repository and then set everything up:

```shell
npm ci
```

The reason for `npm ci` is covered best in this [Stack Overflow answer](https://stackoverflow.com/a/53325242).

Make sure to intasll the browsers that Playwright will need.

```shell
npx playwright install
```

To run the tests, just run the `test` script:

```shell
npm run test
```

## Implementation

The `harness/api.ts` holds all the test methods for API requests that will be utilized in the testing process. This provides an abstraction for communicating with the API and hence acts as a harness for any tests that will send requests to the API.

This code defines a class named `API` for handling API requests using Playwright. It initializes an instance of the class with an `APIRequestContext` object, which is what allows it to interact with HTTP requests that are managed by Playwright.

The `generateRequest` method is used for sending HTTP requests with Playwright. The method accepts parameters such as the endpoint, the HTTP method, the request body, and an optional token for authentication. This is what forms the request, including headers and data, and returns the response.

Then there are methods such as `getReqeust`, `postRequest` and so on that use the`generateRequest` method to make acutal GET and POST requests. The goal for these methods is to simplify the API testing by specifying the HTTP method and handling request details so that all of this is abstracted away from the tests.

---

There `support/fixture.ts` is a fixture that is used to provide the API abstraction process. The goal of the fixture is to pass the request instance to a constructor in the API test harness. What this actually provides is an "API" fixture of type `api` and what this does is extend the test harness. The "API" fixture sets up an instance of the API test harness using the Playwright request object and makes it available to all tests via the `use` function. This is what allows for simplified and consistent API interaction.

---

For the `booker.spec.ts`, the implementation is focused on creating test blocks and utilizing the `API` parameter. This parameter is what makes it possible to invoke all of the test methods within the `API` class.

Note that Playwright supports [soft assertions](https://playwright.dev/docs/test-assertions#soft-assertions). The tests here use that when checking for response codes.
