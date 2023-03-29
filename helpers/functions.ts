import { faker } from '@faker-js/faker';
import { APIRequestContext } from '@playwright/test';

export  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// This is to try and do a get in a test spec passing url as an argument
export async function apiGet(request: APIRequestContext, url: string){
    const newRequest = await request.get(url);

    if (newRequest.status()===200){
    console.log('request was successfull')  
    const responseBody = await newRequest.json();
    return responseBody;
} else {
  console.log('request did not succeed')
}


}

// Generate test data with Faker 
export function generateUserData(){
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const zipCode = faker.address.zipCode();
    const email = faker.internet.email();
    return {firstName,lastName,zipCode,email};
}

export async function getNumberFromString(text:string){
    const stringTotalAmount = text;
    const match = stringTotalAmount.match(/\d+\.\d+/);
    const value = match ? parseFloat(match[0]) : 0;
    return value;
}


//Function for coderbyte challenge 2 
export function removeEmptyValues(obj) {
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