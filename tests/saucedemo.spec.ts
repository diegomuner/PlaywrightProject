import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    // Go to the starting url before each test.

    if (testInfo.title != 'check google bro'){
    await page.goto('https://www.saucedemo.com/');
    
    }
  });


test('has title', async ({page}, testInfo) => {
   
// Expect a title "to contain" a substring.
await expect(page).toHaveTitle(/Swag Labs/);
});


test('login using given credentials', async ({ page }, testInfo) => {

    console.log(testInfo.title);
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/)
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('check google bro', async ({ page }) => {

    await page.goto('https://www.google.com/');
    await expect(page.getByRole('img', { name: 'Google' })).toBeVisible();
    // code below takes a snapshot and compares against base image. The 1st time it runs it fails as there is no base image yet
//     expect(await page.screenshot()).toMatchSnapshot(); 
    

});

