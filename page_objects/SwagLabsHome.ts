import { expect, Locator, Page } from '@playwright/test';
import { SwagLabsBasePage } from './SwagLabsBasePage';

export class SwagLabsHome extends SwagLabsBasePage{

//Locators
readonly page : Page;
readonly leftTitle : Locator;
readonly shopCart: Locator;




// Product add to cart

readonly slBackpackAdd : Locator;
readonly slBikeLightAdd : Locator;
readonly slBoltShirtAdd : Locator;
readonly slFleeceJacketAdd : Locator;   
readonly slOnesieAdd : Locator;
readonly allThingsRedShirtAdd : Locator;

// Constructor
constructor(page: Page){

super(page);
this.page= page;
this.leftTitle = page.getByText('Products');
this.shopCart = page.locator('#shopping_cart_container a')
this.slBackpackAdd = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
this.slBikeLightAdd = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
this.slBoltShirtAdd = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
this.slFleeceJacketAdd = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
this.slOnesieAdd = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')
this.allThingsRedShirtAdd = page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]');

}

// Functions
async addAllToCart(){
await this.slBackpackAdd.click();
await this.slBikeLightAdd.click();
await this.slBoltShirtAdd.click();
await this.slFleeceJacketAdd.click();
await this.slOnesieAdd.click();
await this.allThingsRedShirtAdd.click();
await this.shopCart.click();
await expect(this.shopCart).toContainText('6'); //we validate everything was added to the cart with the text that is added to the cart element
}
    

}






