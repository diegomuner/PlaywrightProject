import { test, expect } from '@playwright/test';
import * as helpers from '../helpers/functions';



//The purpose of these tests is to just call an API and validate its response.
test('should do a GET to public api', async ({ request }) => {
    const newRequest = await request.get('/homes?availability=available');
    const responseBody = await newRequest.json();

    const b = await newRequest.statusText();
    console.log(b);
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



/*Back-end Challenge
In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/age-counting which contains a data key and the value is a string which contains items in the format: key=STRING, age=INTEGER. Your goal is to count how many items exist 
that have an age equal to or greater than 50, and print this final value.

Example Input
{"data":"key=IAfpK, age=58, key=WNVdi, age=64, key=jp9zt, age=47"}

Example Output
2
Example Output with ChallengeToken
2:d6fplxgewkc
Once your function is working, take the final output string and combine it with your ChallengeToken, both in reverse order and separated by a colon.

Your ChallengeToken: ckwegxlpf6d
*/


test ('coderbyte challenge number 1', async({ request }) => {

    const challengeToken:string = 'ckwegxlpf6d';    
    const responseBody = await helpers.apiGet(request, 'https://coderbyte.com/api/challenges/json/age-counting');
    //console.log(responseBody.data);
    let a = responseBody.data;
    let b = a.split(',');
    let count = 0;
    for (let i=0; i<b.length; i++){
        if (b[i].includes('age')){

            const ageElement = b[i].split('=');
            if(ageElement[1] >= 50){count += 1} 
        }

    }

    console.log("the count of ages over 50 years is " + count);

    let reverseToken =  challengeToken.split('').reverse().join('');
    let reverseCount = (count.toString()).split('').reverse().join('');

    console.log (reverseCount +':'+reverseToken);
    
});


/*
Back-end Challenge
In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/json-cleaning and then clean the object
according to the following rules: Remove all keys that have values of N/A, -, or empty strings. If one of these values appear in an array, 
remove that single item from the array. Then console log the modified object as a string.

Example Input
{"name":{"first":"Daniel","middle":"N/A","last":"Smith"},"age":45}

Example Output
{"name":{"first":"Daniel","last":"Smith"},"age":45}
*/

test ('coderbyte challenge number 2', async({ request }) => {
        const responseBody = await helpers.apiGet(request, 'https://coderbyte.com/api/challenges/json/json-cleaning');
        const keys = Object.keys(responseBody);
      
        for (const key of keys) {
          const value = responseBody[key];
      
          if (value === 'N/A' || value === '-' || value === '') {
            delete responseBody[key];
          } else if (Array.isArray(value)) {
            const filteredArray = value.filter(item => item !== 'N/A' && item !== '-' && item !== '');
            responseBody[key] = filteredArray;
          } else if (typeof value === 'object') {
            responseBody[key] = removeEmptyValues(value);
          }
        }
      
        const modifiedString = JSON.stringify(responseBody);
        console.log(modifiedString); //string
      });
      
      function removeEmptyValues(obj:object) {
        const keys = Object.keys(obj);
      
        for (const key of keys) {
          const value = obj[key];
      
          if (value === 'N/A' || value === '-' || value === '') {
            delete obj[key];
          } else if (Array.isArray(value)) {
            const filteredArray = value.filter(item => item !== 'N/A' && item !== '-' && item !== '');
            obj[key] = filteredArray;
          } else if (typeof value === 'object') {
            obj[key] = removeEmptyValues(value);
          }
        }
      
        return obj;
      }
   
///////////////


test ('coderbyte challenge number 2 simpler one', async({ request }) => {
  const responseBody = await helpers.apiGet(request, 'https://coderbyte.com/api/challenges/json/json-cleaning');
  const modifiedResponse = removeEmptyValues(responseBody);
  console.log(Array.from(Object.entries(modifiedResponse)));  //modifiedResponse is an object, we log it as an Array


});