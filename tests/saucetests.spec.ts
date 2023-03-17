import { test, expect } from '@playwright/test';
import { SwagLabsHome } from '../page_objects/SwagLabsHome';
import { SwagLabsLogin } from '../page_objects/SwagLabsLogin';



// Login Tests
test('verify login page elements', async ({page}) => {
    const swagLabsLogin = new SwagLabsLogin(page);
    await swagLabsLogin.goto();
    await swagLabsLogin.verifyAllElements();
})

test('login to swag labs', async ({page}) => {

const swagLabsLogin = new SwagLabsLogin(page);
await swagLabsLogin.goto();
await swagLabsLogin.login();
}); 


test('verify logged in page', async ({page}) => { 
    const swagLabsLogin = new SwagLabsLogin(page);
    const swagLabsHome = new SwagLabsHome(page);
    await swagLabsLogin.goto();
    await swagLabsLogin.login();
    await swagLabsHome.addAllToCart();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit wait, not needed at all but trying it out here
    await delay(2000);






}); 






// HomePage Tests








