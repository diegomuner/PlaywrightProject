import { expect, Locator, Page } from '@playwright/test';

export class SwagLabsBasePage{

//Locators
//Sliding left menu
readonly page : Page;
readonly openMenu : Locator;

readonly xButton : Locator;
readonly allItems : Locator;
readonly about : Locator;
readonly logout : Locator;
readonly resetAppState : Locator;

//Footer


//TODO


constructor(page: Page){
    this.page= page;
    this.openMenu = page.getByRole('button', { name: 'Open Menu' });
    this.xButton = page.getByRole('button', { name: 'Close Menu' });
    this.allItems = page.getByRole('link', { name: 'All Items' });
    this.about = page.getByRole('link', { name: 'About' });
    this.logout = page.getByRole('link', { name: 'Logout' });
    this.resetAppState = page.getByRole('link', { name: 'Reset App State' });

}

//Functions
async performLogout(){
    await this.openMenu.click();
    await this.logout.click();
    
}




}