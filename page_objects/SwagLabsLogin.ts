import { expect, Locator, Page } from '@playwright/test';

export class SwagLabsLogin {

//Locators
readonly page : Page;
readonly userNameField : Locator;
readonly passwordField : Locator;
readonly title : Locator;
readonly loginButton : Locator;
readonly acceptedUserNames : Locator;
readonly acceptedPasswords : Locator;
readonly lockedError : Locator;


constructor(page: Page){

this.page= page;
this.userNameField = page.locator('[data-test="username"]');
this.passwordField = page.locator('[data-test="password"]');
this.title = page.getByText('Swag Labs');
this.loginButton = page.locator('[data-test="login-button"]');
this.acceptedUserNames = page.getByText('Accepted usernames are:standard_userlocked_out_userproblem_userperformance_glitc');
this.acceptedPasswords = page.getByText('Password for all users:secret_sauce');
this.lockedError = page.locator('[data-test="error"]');

}


//Functions
async goto(){

    await this.page.goto('https://www.saucedemo.com/');
}

async login(user:string, password:string){
    // populate fields 
    await this.userNameField.fill(user);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    console.log('Logged In')
    // TODO add checks or assertions to end the test
}

async loginUsingOnScreenPassword(){

        let secretSaucePassword : string;
        // capture password from screen
        let passwordString = await this.acceptedPasswords.textContent(); //await because this returns a promise
        if (passwordString !== null) {
        let passwordArray = passwordString.split(':');    // without the if to check for null, code complains about the chance for passwordString being null
        secretSaucePassword = passwordArray[1].trim();
        } else { 
        console.error('Password string is null');
        }
        
        // populate fields 
        await this.userNameField.fill('standard_user');
        await this.passwordField.fill(secretSaucePassword);
        await this.loginButton.click();
        console.log('we are in')
        // TODO add checks or assertions to end the test

}

async checkLoginError(){

    await expect(this.lockedError).toBeVisible();
    await expect(this.lockedError).toContainText('Epic sadface: Sorry, this user has been locked out.');

}

async verifyAllElements() {
    await expect(this.userNameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.title).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.acceptedUserNames).toBeVisible();
    await expect(this.loginButton).toBeVisible();
}

}
