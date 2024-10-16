const { test, context } = require('@playwright/test');
const LoginPage=require('../objects/pageObjects/loginObjects.js');
const Common=require('../utils/commonFunctions.js');
const Gallery=require('../objects/pageObjects/galleryObjects.js');

let common,gallery,login;

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    login = new LoginPage(page);
    await login.loginValidAccount();
    common = new Common(page);
    gallery = new Gallery(page);
});

test('Check gallery elements', async () => {
    let item = 0;
    await common.checkIsVisible(gallery.galleryLogo);
    await common.checkIsVisible(gallery.secundaryHeader);
    let totalCount = await gallery.itemContainer.count();
    while(item < totalCount){
        await common.checkIsVisible(gallery.itemTitle(item));
        await common.checkIsVisible(gallery.itemPrice(item));
        await common.checkIsVisible(gallery.itemAddToCartBtn(item));
        item++;
    }
    await common.checkIsVisible(gallery.cartIcon);
    await common.checkIsVisible(gallery.sortBtn);
    await common.checkIsVisible(gallery.facebookBtn);
    await common.checkIsVisible(gallery.twitterBtn);
    await common.checkIsVisible(gallery.linkedinBtn);
});

test("Add item to cart", async () => {
    await gallery.addItemToCart(0);
    await common.checkObjectText(gallery.cartCounter, "1");
});

test("Remove item from cart", async () => {
    await gallery.addItemToCart(0);
    await gallery.addItemToCart(1);
    await gallery.removeItemToCart(0);
    await common.checkObjectText(gallery.cartCounter, "1");

});
