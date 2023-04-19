import { test, expect, Page } from '@playwright/test';
import * as helpers from '../helpers/functions';
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit waits at class level so we can use delay(ms) when needed.
// Define the paths for the baseline and new screenshots
const baselinePath = 'baseline.png';



test.skip('compare screenshots using pixelmatch', async ({page},testInfo) => {
    
    // Check if a baseline screenshot already exists
    const baselineExists = fs.existsSync(baselinePath);

    if (!baselineExists) {
        console.log('baseline was not there')
    await page.goto('https://charts.livegap.com/app.php?lan=es&gallery=line');
    await delay(5000);
    const elementHandle = await page.$('#canvas');
    const screenshotOptions = { clip: await elementHandle.boundingBox(),path: 'baseline.png' };
    

    await page.screenshot(screenshotOptions);

     // Navigate to a different page and take a new screenshot
    await page.goto('https://charts.livegap.com/app.php?lan=es&gallery=line');
    await delay(5000);
    const elementHandleLast = await page.$('#canvas');
    const screenshotOptionsLast = { clip: await elementHandleLast.boundingBox(),path: 'new.png' };    

    await page.screenshot(screenshotOptionsLast);

     // Load the baseline and new screenshots from files
    const baselineData = fs.readFileSync('baseline.png');
    const newData = fs.readFileSync('new.png');
    const baselineImage = PNG.sync.read(baselineData);
    const newImage = PNG.sync.read(newData);

    // Compare the images using pixelmatch
    const diff = pixelmatch(baselineImage.data, newImage.data, null, baselineImage.width, baselineImage.height, { threshold: 0.1,samedimensions: true});

    // Check if the images match or not
    if (diff === 0) {
    console.log('Screenshots match');
    } else {
    console.log('Screenshots do not match');
    }
} else {
    console.log('baseline was there')

    // Navigate to a different page and take a new screenshot
    await page.goto('https://charts.livegap.com/app.php?lan=es&gallery=line');
    await delay(5000);
    const elementHandleLast = await page.$('#canvas');
    const screenshotOptionsLast = { clip: await elementHandleLast.boundingBox(),path: 'new.png' };    

    await page.screenshot(screenshotOptionsLast);
     // Load the baseline and new screenshots from files
     const baselineData = fs.readFileSync('baseline.png');
     const newData = fs.readFileSync('new.png');
     const baselineImage = PNG.sync.read(baselineData);
     const newImage = PNG.sync.read(newData);
 
     // Compare the images using pixelmatch
     const diff = pixelmatch(baselineImage.data, newImage.data, null, baselineImage.width, baselineImage.height, {threshold: 0.1,samedimensions: true });
 
     // Check if the images match or not
     if (diff === 0) {
     console.log('Screenshots match');
     } else {
     console.log('Screenshots do not match');

}}

}); 



const filterA:Array<String> = ['filter1', 'filter2', 'filter3', 'filter4'];

test('test', async ({page},testInfo) => {

let index = helpers.randomArrayIndex(filterA);
let filterSelection = filterA[index];

console.log(filterSelection);



});
