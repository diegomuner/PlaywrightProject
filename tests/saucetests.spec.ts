import { test, expect, Page } from '@playwright/test';
import { SwagLabsHome } from '../page_objects/SwagLabsHome';
import { SwagLabsLogin } from '../page_objects/SwagLabsLogin';


let password = 'secret_sauce';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit waits at class level so we can use delay(ms) when needed.

// Login Tests


/// TRYING TO SHARE PAGE OBJECT ACROSS MULTIPLE TESTS
test.describe('one browser instance tests', () => { 

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
        await expect(page).toHaveTitle(/Swag Labs/)
        await swagLabsLogin.verifyAllElements();
    });

    test('login with blocked user', async () => {
        await swagLabsLogin.login('locked_out_user',password);
        await swagLabsLogin.checkLoginError();
    })


    test('login successfully with on screen password', async () => {
        await swagLabsLogin.loginUsingOnScreenPassword();
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
    await delay(2000);  //This is 100% not needed,but trying out the delay.
    
}); 


//cuando agregas productos los botones quedan con remove asique despues del test anterior podria haber otro test que sea para remover todo

// usando el mismo test como base se puede avanzar y hacer checkout tmb














