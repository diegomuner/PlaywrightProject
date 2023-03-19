import { faker } from '@faker-js/faker';



export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // this is to try and do a get in a test spec passing url as an argument
  export async function apiGet(request, url){

    const newRequest = await request.get(url);
    const responseBody = await newRequest.json();
    return responseBody;
  }

  export function generateUserData(){
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const zipCode = faker.address.zipCode();
    const email = faker.internet.email();

    return {firstName,lastName,zipCode,email};


  }