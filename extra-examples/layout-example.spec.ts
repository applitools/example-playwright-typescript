import { test } from '@playwright/test';
import { BatchInfo, Configuration, EyesRunner, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes, Target } from '@applitools/eyes-playwright';

export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;

test.beforeAll(async() => {

    // Configure Applitools SDK to run on the Ultrafast Grid
    Runner = new VisualGridRunner({ testConcurrency: 5 });
    Batch = new BatchInfo({name: `Playwright Typescript Quickstart`});

    Config = new Configuration();
    Config.setBatch(Batch);
    Config.addBrowsers(
        { name: BrowserType.CHROME, width: 800, height: 600 },
        { name: BrowserType.FIREFOX, width: 1600, height: 1200 },
        { name: BrowserType.SAFARI, width: 1024, height: 768 },
        { chromeEmulationInfo: { deviceName: DeviceName.iPhone_11, screenOrientation: ScreenOrientation.PORTRAIT} },
        { chromeEmulationInfo: { deviceName: DeviceName.Nexus_10, screenOrientation: ScreenOrientation.LANDSCAPE} }
    )
});

test.describe('ACME Bank', () => {
    let eyes: Eyes;
    test.beforeEach(async ({ page }) => {
        eyes = new Eyes(Runner, Config);

        // Start Applitools Visual AI Test
        // Args: Playwright Page, App Name, Test Name, Viewport Size for local driver
        await eyes.open(page, 'ACME Bank', `Playwright Typescript: Quickstart`, { width: 1200, height: 600 })
    });
    
    test('log into a bank account', async ({ page }) => {
        await page.goto('https://sandbox.applitools.com/bank?layoutAlgo=true');

        // Full Page - Visual AI Assertion
        await eyes.check('Login page', Target.window().fully());

        await page.locator('id=username').fill('user');
        await page.locator('id=password').fill('password');
        await page.locator('id=log-in').click();
        await page.locator('css=.dashboardNav_navContainer__kA4wD').waitFor({state: 'attached'});

        // Full Page - Visual AI Assertion
        await eyes.check('Main page', Target.window().fully()
            .layoutRegions(
                '.dashboardOverview_accountBalances__3TUPB',
                '.dashboardTable_dbTable___R5Du'
            )
        );
    });

    test.afterEach(async () => {
        // End Applitools Visual AI Test
        await eyes.close();
    });
});

test.afterAll(async() => {
    // Wait for Ultrast Grid Renders to finish and gather results
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});