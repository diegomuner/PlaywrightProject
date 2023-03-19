import { test, expect } from '@playwright/test';
import * as helpers from '../helpers/functions';



//The purpose of these tests is to just call an API and validate its response.
test('should do a GET to public api', async ({ request }, testInfo) => {
    const newRequest = await request.get('/homes?availability=available');
    const responseBody = await newRequest.json();
    const items = responseBody.items;
    
    //get the city of the random picked home
    const randomIndex = helpers.getRandomInt(1,items.length)
    const city = items[randomIndex].basicInfo.address.city;
    await expect(city==null).toBeFalsy();

});

// This test performs a get by calling the apiGet function defined in functions.ts
test ('do a get by calling apiGet function', async({ request }) => {
       const responseBody = await helpers.apiGet(request,'/homes?availability=available'); 
       const items = responseBody.items;
       const city = items[1];
       await expect(city==null).toBeFalsy();
});