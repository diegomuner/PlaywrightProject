
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // this is to try and do a get in a test spec passing url as an argument
  export async function apiGet(request, url){

    const newRequest = await request.get(url);
    const responseBody = await newRequest.json();
    return responseBody;
  }