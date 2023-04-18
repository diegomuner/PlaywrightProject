import { test, expect, Page, chromium } from '@playwright/test';
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const workspacePath = process.env.GITHUB_WORKSPACE;
// Define the paths for the baseline and new screenshots
const baselinePath = `${workspacePath}/screenshots/baseline.png`;
const options = {

    path: `${workspacePath}/screenshots/baseline.png`,
    omitBackground: true,
    fullPage: true,
   // quality: 100, // or another fixed value
  };
  const options1 = {
    path: `${workspacePath}/screenshots/new.png`,
    omitBackground: true,
    fullPage: true,
    //quality: 100, // or another fixed value
  };

test('compare screenshots using pixelmatch', async () => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Check if a baseline screenshot already exists
    const baselineExists = fs.existsSync(baselinePath);

    if (!baselineExists) {
        console.log('baseline was not there')
    await page.goto('https://www.google.com');
    await page.screenshot(options);

     // Navigate to a different page and take a new screenshot
    await page.goto('https://www.google.com');
    await page.screenshot(options1);

     // Load the baseline and new screenshots from files
    const baselineData = fs.readFileSync(`${workspacePath}/screenshots/baseline.png`);
    const newData = fs.readFileSync(`${workspacePath}/screenshots/new.png`);
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
} else {
    console.log('baseline was there')

    // Navigate to a different page and take a new screenshot
    await page.goto('https://www.google.com');
    await page.screenshot(options1);
     // Load the baseline and new screenshots from files
     const baselineData = fs.readFileSync(`${workspacePath}/screenshots/baseline.png`);
     const newData = fs.readFileSync(`${workspacePath}/screenshots/new.png`);
     const baselineImage = PNG.sync.read(baselineData);
     const newImage = PNG.sync.read(newData);
 
     // Compare the images using pixelmatch
     const diff = pixelmatch(
    baselineImage.data,
    newImage.data,
    null,
    baselineImage.width,
    baselineImage.height,
    { threshold:0.1, includeAA: true, diffMask: true, samedimensions: true }
);
 
     // Check if the images match or not
     if (diff === 0) {
     console.log('Screenshots match');
     } else {
     console.log('Screenshots do not match');

}}

}); 


