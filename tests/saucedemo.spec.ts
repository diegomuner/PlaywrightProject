import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    // Go to the starting url before each test.

    if (testInfo.title != 'check different site'){
    await page.goto('https://www.saucedemo.com/');
    
    }
  });


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


