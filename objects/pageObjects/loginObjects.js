import data from "../data/userData.json";
const Common=require('../../utils/commonFunctions.js');

class LoginPage extends Common{
    constructor(page){
        super(page);
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
        await super.setValueInput(this.usernameField, data.validUser);
        await super.setValueInput(this.passwordFile, data.password);
        await super.clickElement(this.loginBtn);
    }

    async loginLockedAccount(){
        await super.setValueInput(this.usernameField, data.lockedUser);
        await super.setValueInput(this.passwordFile, data.password);
        await super.clickElement(this.loginBtn);
        await super.checkIsVisible(this.usernameErrorIcon);
        await super.checkIsVisible(this.passwordErrorIcon);
    }

    async loginInvalidAccount(){
        await super.setValueInput(this.usernameField, data.validUser);
        await super.setValueInput(this.passwordFile, data.wrongPass);
        await super.clickElement(this.loginBtn);
        await super.checkIsVisible(this.usernameErrorIcon);
        await super.checkIsVisible(this.passwordErrorIcon);
    }
}

module.exports=LoginPage;