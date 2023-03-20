import { test, expect, Page } from '@playwright/test';
import { SwagLabsCheckout } from '../page_objects/SwagLabsCheckout';
import { SwagLabsHome } from '../page_objects/SwagLabsHome';
import { SwagLabsLogin } from '../page_objects/SwagLabsLogin';
import * as helpers from '../helpers/functions';


let password = 'secret_sauce';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms)) //implicit waits at class level so we can use delay(ms) when needed.

// Login Tests


/// TRYING TO SHARE PAGE OBJECT ACROSS MULTIPLE TESTS
test.describe('one browser instance tests', () => { 

    test.describe.configure({ mode: 'serial' });
    let page: Page;
    //Declare page objects
    let swagLabsLogin: SwagLabsLogin;
    let swagLabsHome: SwagLabsHome;
    
    // Before and After suite hooks
    
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();

        // Instantiate the page objects
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


// Regular isolated test
test('login to swag labs successfully', async ({page},testInfo) => {
    const swagLabsLogin = new SwagLabsLogin(page);
    await swagLabsLogin.goto();
    await swagLabsLogin.login('standard_user',password);
    console.log(testInfo.status);
}); 


// HomePage Tests


//2nd suite
test.describe('cart tests', () => { 

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


    test('add every product to the cart', async () => { 
        await swagLabsLogin.goto();
        await swagLabsLogin.login('standard_user',password);
        await swagLabsHome.addAllToCart();
        await delay(2000);  //This is 100% not needed,but trying out the delay.
        
    }); 

    test('remove all products from cart', async () =>{
        await swagLabsHome.goToCart();
        await swagLabsHome.removeAllProducts();
        await swagLabsHome.continueShopping();
    });

    test('remove all products from homepage', async() =>{
        await swagLabsHome.addAllToCart();
        await swagLabsHome.removeAllProducts();

    })

});

test ('checkout with faker data and all products', async ({page}) =>{
    let swagLabsLogin = new SwagLabsLogin(page);
    let swagLabsHome = new SwagLabsHome(page);
    let swagLabsCheckout = new SwagLabsCheckout(page);
    let userData = helpers.generateUserData();  //Object
    await swagLabsLogin.goto();
    await swagLabsLogin.login('standard_user',password);
    await swagLabsHome.addAllToCart();
    await swagLabsHome.goToCart();
    await swagLabsHome.doCheckout();
    await swagLabsCheckout.verifyInCheckout();
    await swagLabsCheckout.completeCheckOutInfo(userData.firstName, userData.lastName, userData.zipCode);
    await swagLabsCheckout.continueCheckout();

    await expect(swagLabsCheckout.checkOutCancel).toBeVisible();
    await swagLabsCheckout.verifyTotalAmount();
    await swagLabsCheckout.verifyTaxAndTotal();
    await swagLabsCheckout.finishCheckout();
   


});


















