const { test } = require('@playwright/test');
const LoginPage=require('../objects/pageObjects/loginObjects.js');
const Common=require('../utils/commonFunctions.js');
const Gallery=require('../objects/pageObjects/galleryObjects.js');
const Cart=require('../objects/pageObjects/cartObjects.js');
const Checkout = require('../objects/pageObjects/checkoutObjects.js');

let common,gallery,login,cart,checkout;

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    login = new LoginPage(page);
    await login.loginValidAccount();
    common = new Common(page);
    gallery = new Gallery(page);
    await gallery.addItemToCart(0, 0);
    cart = new Cart(page);
    checkout = new Checkout(page);
});

test("Complete your information form in checkout", async () => {
    await gallery.navigateToCart();
    await cart.navigateToCheckout();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Your Information");
    await checkout.fillYourInformation();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Overview");
});

test("Cancel checkout", async () => {
    await gallery.navigateToCart();
    await cart.navigateToCheckout();
    await common.clickElement(checkout.cancelBtn);
    await common.checkObjectText(cart.cartTitle, "Your Cart");
});

test("Navigate to checkout Overview", async () => {
    await gallery.navigateToCart();
    await cart.navigateToCheckout();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Your Information");
    await checkout.fillYourInformation();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Overview");
});

test("Complete Checkout", async () => {
    await gallery.addItemToCart(2, 1);
    await gallery.navigateToCart();
    await cart.navigateToCheckout();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Your Information");
    await checkout.fillYourInformation();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Overview");
    let values = await checkout.checkOverviewInfo();
    console.log(await common.getObjectText(checkout.totalAmount))
    await common.checkObjectText(checkout.totalAmount, `Total: $${(values.total + values.taxes).toFixed(2)}`);
});
