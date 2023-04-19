import { test, expect, Page } from '@playwright/test';
import * as helpers from '../helpers/functions';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit waits at class level so we can use delay(ms) when needed.


//This is just a test that declares an array which are the options in a filter, then randoms an index and selects that option from the dropdown
test('test dropdown picks', async ({page}) => {
    let dropdownOptions = ['option1','option2']
     await page.goto('http://the-internet.herokuapp.com/dropdown');
    let index = helpers.randomArrayIndex(dropdownOptions);
    let selectedOption = dropdownOptions[index]
    console.log(selectedOption);
    if (selectedOption==='option1'){
        await page.selectOption('#dropdown', '1');
        await delay(2000);
    } else if (selectedOption==='option2'){
        await page.selectOption('#dropdown', '2');
        await delay(2000);
    }

})

//This test is to work with checkboxes, check if they are selected, and check them, then uncheck etc
test('test checkboxes', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    const checkbox1 = await page.waitForSelector('#checkboxes input[type="checkbox"]:nth-of-type(1)');
    const checkbox2 = await page.waitForSelector('#checkboxes input[type="checkbox"]:nth-of-type(2)');
    // Check if the checkbox is checked
    const isChecked1 = await checkbox1.isChecked();
    const isChecked2 = await checkbox2.isChecked();
    console.log('first checkbox is checked: '+isChecked1);
    console.log('second checkbox is checked: '+isChecked2);
    //check all checkboxes
    if (isChecked1===false){
        checkbox1.click();
    }
    if (isChecked2===false){
        checkbox2.click();
    }
    await delay(500);
    expect(await checkbox1.isChecked()).toBe(true);
    expect(await checkbox2.isChecked()).toBe(true);
    //uncheck all checkboxes
    await checkbox1.click();
    await checkbox2.click();
    expect(await checkbox1.isChecked()).toBe(false);
    expect(await checkbox2.isChecked()).toBe(false);

});