import { expect, Locator, Page } from '@playwright/test';
import { SwagLabsBasePage } from './SwagLabsBasePage';

export class SwagLabsCheckout extends SwagLabsBasePage{



//Locators
readonly page : Page;
//checkout info
readonly checkOutTitle : Locator;
readonly checkoutFirstName : Locator;
readonly checkoutLastName : Locator;
readonly checkoutZipCode : Locator;
readonly checkOutCancel : Locator;
readonly checkoutContinue : Locator;


//Checkout Overview
readonly checkoutProductsTable : Locator;
readonly checkoutPaymentInfo : Locator;
readonly checkoutShippingInfo : Locator;
readonly checkoutItemTotal : Locator;
readonly checkoutItemTax : Locator;
readonly checkoutTotal : Locator;





// Product remove from cart


constructor(page: Page){

    // let totalPrice = 0;   revisar esot


    super(page);
    this.page= page;
    //info
    this.checkOutTitle = page.getByText('Checkout: Your Information');   
    this.checkoutFirstName = page.locator('[data-test="firstName"]');   
    this.checkoutLastName = page.locator('[data-test="lastName"]');   
    this.checkoutZipCode = page.locator('[data-test="postalCode"]');   
    this.checkOutCancel = page.locator('[data-test="cancel"]');   
    this.checkoutContinue = page.locator('[data-test="continue"]');   
    //overview
    this.checkoutProductsTable = page.locator('#checkout_summary_container');
    this.checkoutPaymentInfo = page.getByText('SauceCard #31337');
    this.checkoutShippingInfo = page.getByText('Free Pony Express Delivery!');
    //this.checkoutItemTotal = page.locator('[data-test="continue"]');
    //this.checkoutItemTax = page.locator('[data-test="continue"]');
    // this.checkoutTotal = page.getByText(`Total: $ ${totalPrice}`
                       
                       //estos 2 aparte
                       
    
}

//Functions

async verifyInCheckout(){
    await expect(this.checkOutTitle).toBeVisible();
    await expect(this.checkoutFirstName).toBeVisible();
    await expect(this.checkoutLastName).toBeVisible();
    await expect(this.checkoutZipCode).toBeVisible();
    await expect(this.checkoutContinue).toBeVisible();
}

async completeCheckOutInfo(){
    await this.checkoutFirstName.fill('test');
    await this.checkoutLastName.fill('last name');
    await this.checkoutZipCode.fill('1234');
}

async continueCheckout(){
    await this.checkoutContinue.click();

}
 
async cancelCheckout(){
    await this.checkOutCancel.click();

}



}