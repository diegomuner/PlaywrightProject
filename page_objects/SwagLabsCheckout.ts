import { expect, Locator, Page } from '@playwright/test';
import { SwagLabsBasePage } from './SwagLabsBasePage';

export class SwagLabsCheckout extends SwagLabsBasePage{

//Locators
readonly page : Page;


// Product remove from cart


constructor(page: Page){

    super(page);
    this.page= page;
   
}

//Functions





}