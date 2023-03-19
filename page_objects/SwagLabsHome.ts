import { expect, Locator, Page } from '@playwright/test';
import { SwagLabsBasePage } from './SwagLabsBasePage';

export class SwagLabsHome extends SwagLabsBasePage{

//Locators
readonly page : Page;
readonly leftTitleHome : Locator;
readonly shopCart: Locator;
readonly continueShoppingButton : Locator;
readonly checkoutButton : Locator;



// Product add to cart

readonly slBackpackAdd : Locator;
readonly slBikeLightAdd : Locator;
readonly slBoltShirtAdd : Locator;
readonly slFleeceJacketAdd : Locator;   
readonly slOnesieAdd : Locator;
readonly allThingsRedShirtAdd : Locator;

// Product remove
readonly slBackpackRemove : Locator;
readonly slBikeLightRemove : Locator;
readonly slBoltShirtRemove : Locator;
readonly slFleeceJacketRemove : Locator;   
readonly slOnesieRemove : Locator;
readonly allThingsRedShirtRemove : Locator;
readonly leftTitleCart : Locator;

// Constructor
constructor(page: Page){

    super(page);
    //Home
    this.page= page;
    this.leftTitleHome = page.getByText('Products');
    this.shopCart = page.locator('#shopping_cart_container a')
    this.slBackpackAdd = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.slBikeLightAdd = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.slBoltShirtAdd = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.slFleeceJacketAdd = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    this.slOnesieAdd = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')
    this.allThingsRedShirtAdd = page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]');
    //Cart
    this.leftTitleCart = page.getByText('Your Cart');
    this.slBackpackRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.slBikeLightRemove = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.slBoltShirtRemove = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.slFleeceJacketRemove = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
    this.slOnesieRemove = page.locator('[data-test="remove-sauce-labs-onesie"]')
    this.allThingsRedShirtRemove = page.locator('[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]');  
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]')

}

// Functions
async addAllToCart(){
    await this.slBackpackAdd.click();
    await this.slBikeLightAdd.click();
    await this.slBoltShirtAdd.click();
    await this.slFleeceJacketAdd.click();
    await this.slOnesieAdd.click();
    await this.allThingsRedShirtAdd.click();
    await expect(this.shopCart).toContainText('6'); //we validate everything was added to the cart with the text that is added to the cart element
}
  

async removeAllProducts(){
    await this.slBackpackRemove.click();
    await this.slBikeLightRemove.click();
    await this.slBoltShirtRemove.click();
    await this.slFleeceJacketRemove.click();
    await this.slOnesieRemove.click();
    await this.allThingsRedShirtRemove.click();
    await expect(this.shopCart).toContainText('') // When no text, means no items in cart;
}

async continueShopping(){
    await this.continueShoppingButton.click();
    
}
async goToCart(){
    await this.shopCart.click();

}

async doCheckout(){
    await this.checkoutButton.click();


}






}






