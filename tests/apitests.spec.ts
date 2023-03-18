import { test, expect, type Page } from '@playwright/test';
import * as helpers from '../helpers/functions';



//The purpose of these tests is to just call an API and validate its response.
test('should do a GET to public api', async ({ request }, testInfo) => {
    const newIssue = await request.get('/homes?availability=available');
    const responseBody = await newIssue.json();
    const items = responseBody.items;
    
    //get the city of the random picked home
    const randomIndex = helpers.getRandomInt(1,items.length)
    const city = items[randomIndex].basicInfo.address.city;
    await expect(city==null).toBeFalsy();

    });


   