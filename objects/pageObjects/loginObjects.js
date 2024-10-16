import data from "../data/userData.json";
const Common=require('../../utils/commonFunctions.js');

class LoginPage{
    constructor(page){
        this.page = page,
        this.common = new Common(page); 
        this.usernameField = page.locator("#user-name");
        this.passwordFile = page.locator("#password");
        this.loginBtn = page.locator("#login-button");
        this.usernameErrorIcon = page.locator(".error_icon").nth(0);
        this.passwordErrorIcon = page.locator(".error_icon").nth(1);
        this.errorLabel = page.locator("[data-test='error']");
        this.errorCloseBtn = page.locator(".error-button svg")
        this.appHeader = page.locator(".app_logo");
    }

    async loginValidAccount(){
        await this.common.setValueInput(this.usernameField, data.validUser);
        await this.common.setValueInput(this.passwordFile, data.password);
        await this.common.clickElement(this.loginBtn);
    }

    async loginLockedAccount(){
        await this.common.setValueInput(this.usernameField, data.lockedUser);
        await this.common.setValueInput(this.passwordFile, data.password);
        await this.common.clickElement(this.loginBtn);
        await this.common.checkIsVisible(this.usernameErrorIcon);
        await this.common.checkIsVisible(this.passwordErrorIcon);
    }

    async loginInvalidAccount(){
        await this.common.setValueInput(this.usernameField, data.validUser);
        await this.common.setValueInput(this.passwordFile, data.wrongPass);
        await this.common.clickElement(this.loginBtn);
        await this.common.checkIsVisible(this.usernameErrorIcon);
        await this.common.checkIsVisible(this.passwordErrorIcon);
    }
}

module.exports=LoginPage;