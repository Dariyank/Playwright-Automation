const { test, expect } = require('@playwright/test');
const LoginPage=require('../objects/pageObjects/loginObjects.js');
const Common=require('../utils/commonFunctions.js');

let common;
let login

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    login = new LoginPage(page);
    common = new Common(page);
  });

test('Login valid user', async () => {
    await login.loginValidAccount();
    await common.checkIsVisible(login.appHeader);
    await common.checkObjectText(login.appHeader, "Swag Labs");
});

test('Login locked user', async () => {
    await login.loginLockedAccount();
    await common.checkIsVisible(login.errorLabel);
    await common.checkObjectText(login.errorLabel, "Epic sadface: Sorry, this user has been locked out.");
});

test('Login invalid user', async () => {
    await login.loginInvalidAccount();
    await common.checkIsVisible(login.errorLabel);
    await common.checkObjectText(login.errorLabel, "Epic sadface: Username and password do not match any user in this service");
    await common.clickElement(login.errorCloseBtn);
    await expect(login.errorLabel).toBeHidden();
});