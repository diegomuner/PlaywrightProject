import { test, expect, Page } from '@playwright/test';
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');




test('login to swag labs successfully', async ({page},testInfo) => {
    
    await page.goto('https://www.google.com');
    await page.screenshot({ path: 'baseline.png' });

     // Navigate to a different page and take a new screenshot
    await page.goto('https://www.google.com');
    await page.screenshot({ path: 'new.png' });

     // Load the baseline and new screenshots from files
    const baselineData = fs.readFileSync('baseline.png');
    const newData = fs.readFileSync('new.png');
    const baselineImage = PNG.sync.read(baselineData);
    const newImage = PNG.sync.read(newData);

    // Compare the images using pixelmatch
    const diff = pixelmatch(baselineImage.data, newImage.data, null, baselineImage.width, baselineImage.height, { threshold: 0.1 });

    // Check if the images match or not
    if (diff === 0) {
    console.log('Screenshots match');
    } else {
    console.log('Screenshots do not match');
    }
}); 
