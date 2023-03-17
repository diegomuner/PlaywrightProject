import { test, expect } from '@playwright/test';
import { SwagLabsHome } from '../page_objects/SwagLabsHome';
import { SwagLabsLogin } from '../page_objects/SwagLabsLogin';
import { chromium, Browser, Page } from '@playwright/test';


let password = 'secret_sauce';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit waits at class level so we can use delay(ms) when needed.

// Login Tests

/// TRYING TO SHARE PAGE OBJECT ACROSS MULTIPLE TESTS

test.describe('One browser instance tests', () => {

    test.describe.configure({ mode: 'serial' });
    let page: Page;
    let swagLabsLogin: SwagLabsLogin;
    let swagLabsHome: SwagLabsHome;
    // Before and After suite hooks
    
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        swagLabsLogin = new SwagLabsLogin(page);
        swagLabsHome = new SwagLabsHome(page);
    });

    test.afterAll(async () => {
        await page.close();
    });

    // Tests that run in Serial mode
    test('verify login page elements', async () => {
        await swagLabsLogin.goto();
        await swagLabsLogin.verifyAllElements();
    });

    test('login with blocked user', async () => {
        await swagLabsLogin.login('locked_out_user',password);
        await swagLabsLogin.checkLoginError();
        await delay(2000);
    })


    test('login successfully with on screen password', async () => {
        await delay(2000);
        await swagLabsLogin.loginUsingOnScreenPassword();
        await delay(2000);

    })
    
    test('logout from the swaglabs site', async () => {  
        await swagLabsHome.performLogout();  
        await expect(swagLabsLogin.loginButton).toBeVisible();
    });

})


// REGULAR ISOLATED TESTS

test('login to swag labs successfully', async ({page}) => {
    const swagLabsLogin = new SwagLabsLogin(page);
    await swagLabsLogin.goto();
    await swagLabsLogin.login('standard_user',password);
}); 


// HomePage Tests

test('add every product to the cart', async ({page}) => { 
    const swagLabsLogin = new SwagLabsLogin(page);
    const swagLabsHome = new SwagLabsHome(page);
    await swagLabsLogin.goto();
    await swagLabsLogin.login('standard_user',password);
    await swagLabsHome.addAllToCart();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit wait, not needed at all but trying it out here
    await delay(2000);
    

}); 


//cuando agregas productos los botones quedan con remove asique despues del test anterior podria haber otro test que sea para remover todo

// usando el mismo test como base se puede avanzar y hacer checkout tmb














