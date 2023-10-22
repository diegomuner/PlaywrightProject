import { test, expect } from '@playwright/test';
//const { loginData } = require('../data/loginData.json'); //Reading from json file with test data

// This test class does not use page object model, instead we do everything in the test

test.beforeEach(async ({ page }, testInfo) => {
    // Go to the starting url before each test.

    if (testInfo.title != 'check different site'){
    await page.goto('http://localhost:3000/WebPage/homePage.html');
    
    }
  });

  test('has title', async ({page}, testInfo) => {
   
    // Expect a title "to contain" a substring
    const buyTickets = page.locator('data-testid=btickets1');

    expect(buyTickets.isVisible());
    await buyTickets.click();
    await page.waitForTimeout(2000);

    });