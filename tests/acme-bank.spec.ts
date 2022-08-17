// This test case spec contains everything needed to run a full visual test against the ACME bank site.
// It runs the test once locally, and then it performs cross-browser testing against multiple unique browsers in Applitools Ultrafast Grid.

import { test } from '@playwright/test';
import { BatchInfo, Configuration, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes, Target } from '@applitools/eyes-playwright';

// Applitools objects to share for all tests
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: VisualGridRunner;

// This method sets up the configuration for running visual tests in the Ultrafast Grid.
// The configuration is shared by all tests in a test suite, so it belongs in a `beforeAll` method.
// If you have more than one test class, then you should abstract this configuration to avoid duplication.
test.beforeAll(async() => {

  // Create the runner for the Ultrafast Grid.
  // Concurrency refers to the number of visual checkpoints Applitools will perform in parallel.
  // Warning: If you have a free account, then concurrency will be limited to 1.
  Runner = new VisualGridRunner({ testConcurrency: 5 });

  // Create a new batch for tests.
  // A batch is the collection of visual checkpoints for a test suite.
  // Batches are displayed in the dashboard, so use meaningful names.
  Batch = new BatchInfo({name: 'Example: Playwright TypeScript with the Ultrafast Grid'});

  // Create a configuration for Applitools Eyes.
  Config = new Configuration();

  // Set the batch for the config.
  Config.setBatch(Batch);

  // Add 3 desktop browsers with different viewports for cross-browser testing in the Ultrafast Grid.
  // Other browsers are also available, like Edge and IE.
  Config.addBrowser(800, 600, BrowserType.CHROME);
  Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
  Config.addBrowser(1024, 768, BrowserType.SAFARI);

  // Add 2 mobile emulation devices with different orientations for cross-browser testing in the Ultrafast Grid.
  // Other mobile devices are available, including iOS.
  Config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
  Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
});

// This "describe" method contains related test cases with per-test setup and cleanup.
// In this example, there is only one test.
test.describe('ACME Bank', () => {

  // Test-specific objects
  let eyes: Eyes;

  // This method sets up each test with its own Applitools Eyes object.
  test.beforeEach(async ({ page }) => {

    // Create the Applitools Eyes object connected to the VisualGridRunner and set its configuration.
    eyes = new Eyes(Runner, Config);

    // Open Eyes to start visual testing.
    // Each test should open its own Eyes for its own snapshots.
    // It is a recommended practice to set all four inputs below:
    await eyes.open(
      page,                             // The Playwright page object to "watch"
      'ACME Bank',                      // The name of the app under test
      test.info().title,                // The name of the test case
      { width: 1024, height: 768 });    // The viewport size for the local browser
  });
  
  // This test covers login for the Applitools demo site, which is a dummy banking app.
  // The interactions use typical Playwright calls,
  // but the verifications use one-line snapshot calls with Applitools Eyes.
  // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
  // Traditional assertions that scrape the page for text values are not needed here.
  test('log into a bank account', async ({ page }) => {

    // Load the login page.
    await page.goto('https://demo.applitools.com');

    // Verify the full login page loaded correctly.
    await eyes.check('Login page', Target.window().fully());

    // Perform login.
    await page.locator('id=username').fill('andy');
    await page.locator('id=password').fill('i<3pandas');
    await page.locator('id=log-in').click();

    // Verify the full main page loaded correctly.
    // This snapshot uses LAYOUT match level to avoid differences in closing time text.
    await eyes.check('Main page', Target.window().fully().layout());
  });
  
  // This method performs cleanup after each test.
  test.afterEach(async () => {

    // Close Eyes to tell the server it should display the results.
    await eyes.closeAsync();

    // Warning: `eyes.closeAsync()` will NOT wait for visual checkpoints to complete.
    // You will need to check the Applitools dashboard for visual results per checkpoint.
    // Note that "unresolved" and "failed" visual checkpoints will not cause the Playwright test to fail.

    // If you want the Playwright test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
    // If any checkpoints are unresolved or failed, then `eyes.close()` will make the Playwright test fail.
  });
});

test.afterAll(async() => {

  // Close the batch and report visual differences to the console.
  // Note that it forces Playwright to wait synchronously for all visual checkpoints to complete.
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});
