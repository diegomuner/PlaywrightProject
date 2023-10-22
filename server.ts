// server.ts
import express from 'express';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import PlaywrightTestConfig from '@playwright/test';
import PlaywrightTest from '@playwright/test';

// THIS IS NOT WORKING


// Load the Playwright test configuration
const config = new PlaywrightTestConfig({
    testDir: './tests',
    testFunction:'',
    timeout: 30000,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    projects: [
      {
        name: 'Desktop Chromium',
        use: { browserName: 'chromium' },
      },
      {
        name: 'Desktop Firefox',
        use: { browserName: 'firefox' },
      },
    ],
  });

// Create an Express application
const app = express();

// Set the EJS view engine and the views directory
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

// Set up a route to render the test selection page
app.get('/', async (req, res) => {
  const testFiles = readdirSync(resolve(__dirname, 'tests')).filter((f) => f.endsWith('.spec.ts'));
  res.render('index', { testFiles });
});

// Set up a route to trigger the test execution
app.post('/run-tests', async (req, res) => {
  const { tests, browsers } = req.body;

  // Set the test files or suites to run
  config.testDir = resolve(__dirname, 'tests', tests);

  // Set the browsers to use
  config.browsers = browsers;

  // Create a new Playwright test runner and execute the tests
  const runner = new PlaywrightTest(config);
  await runner.run();

  // Redirect to the test selection page after the tests have finished
  res.redirect('/');
});

// Start the Express application on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});