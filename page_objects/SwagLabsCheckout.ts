import { expect, Locator, Page } from '@playwright/test';
import { SwagLabsBasePage } from './SwagLabsBasePage';
import { CartItem } from './../data/cart-item.interface';
import * as helpers from '../helpers/functions';

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
readonly checkoutTaxAmount : Locator;


readonly finishButton : Locator;
readonly backHomeButton : Locator;

//

constructor(page: Page){

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
    this.checkoutProductsTable = page.locator('#cart_contents_container');
    this.checkoutPaymentInfo = page.getByText('SauceCard #31337');
    this.checkoutShippingInfo = page.getByText('Free Pony Express Delivery!');
    this.checkoutItemTotal = page.locator('.summary_subtotal_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.checkoutTaxAmount = page.locator('.summary_tax_label');
                       
}

//Functions

async verifyInCheckout(){
    await expect(this.checkOutTitle).toBeVisible();
    await expect(this.checkoutFirstName).toBeVisible();
    await expect(this.checkoutLastName).toBeVisible();
    await expect(this.checkoutZipCode).toBeVisible();
    await expect(this.checkoutContinue).toBeVisible();
}

async completeCheckOutInfo(firstName:string, lastName:string, zipCode:string){

    await this.checkoutFirstName.fill(firstName);
    await this.checkoutLastName.fill(lastName);
    await this.checkoutZipCode.fill(zipCode);

}

async continueCheckout(){
    await this.checkoutContinue.click();

}
 
async cancelCheckout(){
    await this.checkOutCancel.click();

}

private async calculateCartTotal() {
    const cartItems: CartItem[] = [];
     // Get all cart item elements and loop through them
    const cartItemElements = await this.page.$$('.cart_item');
    for (const cartItemElement of cartItemElements) {
        const quantity = await cartItemElement.$eval('.cart_quantity', el => parseInt(el.textContent!));
        const itemName = await cartItemElement.$eval('.inventory_item_name', el => el.textContent!);
        const itemPrice = await cartItemElement.$eval('.cart_item_label .inventory_item_price', el => parseFloat(el.textContent!.replace(/\$/g, '')));
        cartItems.push({ quantity, itemName, itemPrice });
    }

    const itemCostMap = new Map<string, number>();
    for (const cartItem of cartItems) {
        const { quantity, itemName, itemPrice } = cartItem;
        const itemCost = quantity * itemPrice;
        if (itemCostMap.has(itemName)) {
        itemCostMap.set(itemName, itemCostMap.get(itemName)! + itemCost);
        } else {
        itemCostMap.set(itemName, itemCost);
        }
    }
    let total = 0;
    for (const itemCost of itemCostMap.values()) {
        total += itemCost;
    }

    //return the sum of all items
    return total;
 
}

async verifyTotalAmount(){
    const calculatedTotalAmount = await this.calculateCartTotal();
    //capture the total amount from the page as string and convert to float using a regular expresion
    const stringTotalAmount= await helpers.getNumberFromString(await this.checkoutItemTotal.textContent());
    if (calculatedTotalAmount === stringTotalAmount){
        console.log('Amounts match');

    } else {
        console.log('Amounts do not match')

    }
}

async verifyTaxAndTotal(){
    
    const value =  await helpers.getNumberFromString(await this.checkoutItemTotal.textContent());
    const taxFromTotal = value * 0.08;
    const valueTax = await helpers.getNumberFromString(await this.checkoutTaxAmount.textContent());
    if (valueTax === Math.round(taxFromTotal*10)/10 ){

        console.log('Tax amount is right')
    } else {
        console.log('Tax amount is incorrect')
    }
}

async finishCheckout(){
    await this.finishButton.click();
    expect(this.backHomeButton).toBeVisible;
    await this.backHomeButton.click();
    
}


}
  

 

