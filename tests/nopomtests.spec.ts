import { test, expect } from '@playwright/test';
const { loginData } = require('../data/loginData.json'); //Reading from json file with test data

// This test class does not use page object model, instead we do everything in the test

test.beforeEach(async ({ page }, testInfo) => {
    // Go to the starting url before each test.

    if (testInfo.title != 'check different site'){
    await page.goto('https://www.saucedemo.com/');
    
    }
  });


 //for loop so the test is called 1 time per set of data in the Json file
 //test has no assertions or anything, its here just to check that the test runs with different sets of data.
  for (const data of loginData) {
    test(`Login with ${data.username}`, async ({ page }) => {

      await expect(page).toHaveTitle(/Swag Labs/)
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill(data.username);
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill(data.password);
      await page.locator('[data-test="login-button"]').click();
    });
  }


test('has title', async ({page}, testInfo) => {
   
// Expect a title "to contain" a substring.
await expect(page).toHaveTitle(/Swag Labs/);
});


test('login using given credentials', async ({ page }, testInfo) => {

  console.log(testInfo.title);
  await expect(page).toHaveTitle(/Swag Labs/)
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});


