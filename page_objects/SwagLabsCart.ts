import { expect, Locator, Page } from '@playwright/test';
import { SwagLabsBasePage } from './SwagLabsBasePage';

export class SwagLabsHome extends SwagLabsBasePage{

//Locators
readonly page : Page;



constructor(page: Page){

super(page);
this.page= page;


}


}