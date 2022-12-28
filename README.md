# Applitools Example: Playwright TypeScript with the Ultrafast Grid

This is the example project for the [Playwright TypeScript tutorial](https://applitools.com/tutorials/quickstart/web/playwright/typescript).
It shows how to start automating visual tests
with [Applitools Eyes](https://applitools.com/platform/eyes/)
and the [Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/)
using [Playwright](https://playwright.dev/) in TypeScript.

It uses:

* [TypeScript](https://www.typescriptlang.org/) as the programming language
* [Playwright](https://playwright.dev/) for browser automation
* [Playwright Test](https://playwright.dev/docs/api/class-test) as the core test framework
* [Chromium](https://www.chromium.org/chromium-projects/) as the local browser for testing
* [npm](https://www.npmjs.com/) for dependency management
* [Applitools Eyes](https://applitools.com/platform/eyes/) for visual testing
* [Applitools Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/) for cross-browser execution

To run this example project, you'll need:

1. An [Applitools account](https://auth.applitools.com/users/register), which you can register for free
2. A recent version of [Node.js](https://nodejs.org/en/download/)
3. A good TypeScript editor like [Visual Studio Code](https://code.visualstudio.com/docs/languages/typescript)

To install dependencies and set up Playwright, run:

```
npm install
npx playwright install
```

The main test case spec is [`acme-bank.spec.ts`](tests/acme-bank.spec.ts).

To execute tests, set the `APPLITOOLS_API_KEY` environment variable
to your [account's API key](https://applitools.com/tutorials/guides/getting-started/registering-an-account),
and then run:

```
npm test
```

**For full instructions on running this project, take our
[Playwright TypeScript tutorial](https://applitools.com/tutorials/quickstart/web/playwright/typescript)!**
