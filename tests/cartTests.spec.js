const { test } = require("@playwright/test");
const Common = require("../utils/commonFunctions.js")
import Cart from "../objects/pageObjects/cartObjects.js";
const LoginPage = require("../objects/pageObjects/loginObjects.js");
const Gallery = require("../objects/pageObjects/galleryObjects.js");
const Product = require("../objects/pageObjects/pdpObjects.js");
const Checkout = require("../objects/pageObjects/checkoutObjects.js");

let common,cart,login,gallery,pdp,checkout;

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    login = new LoginPage(page);
    await login.loginValidAccount();
    common = new Common(page);
    cart = new Cart(page);
    gallery = new Gallery(page);
    await gallery.addItemToCart(0, 0);
    pdp = new Product(page);
    checkout = new Checkout(page);
});

test("Go back to gallery", async () => {
    await gallery.navigateToCart();
    await cart.returnToGallery();
    await common.checkObjectText(gallery.galleryTitle, "Products");
});

test("Remove item from cart", async () => {
    await gallery.navigateToCart();
    await cart.removeItem(0);
    await common.checkNotExist(cart.itemRemoveBtn(0));
});

test("Remove one item from a group", async () => {
    await gallery.addItemToCart(0, 0);
    let itemName = await common.getObjectText(gallery.itemTitle(1));
    await gallery.addItemToCart(0, 0);
    await gallery.navigateToCart();
    await cart.removeItemFromGroup(itemName, 1);
});

test("Navigate to product detail", async () => {
    await gallery.navigateToCart();
    let itemName = await common.getObjectText(cart.itemTitle(0));
    let itemPrice = await common.getObjectText(cart.itemPrice(0));
    await cart.navigateToItemPDP(0);
    await pdp.checkItemInfo(itemName, itemPrice);
});

test("Navigate to Checkout", async () => {
    await gallery.navigateToCart();
    await cart.navigateToCheckout();
    await common.checkObjectText(checkout.checkoutTitle, "Checkout: Your Information");
});
