const { test } = require("@playwright/test");
const Common = require("../utils/commonFunctions.js")
const LoginPage = require("../objects/pageObjects/loginObjects.js");
const Gallery = require("../objects/pageObjects/galleryObjects.js");
const Product = require("../objects/pageObjects/pdpObjects.js");

let common,login,gallery,pdp,itemInfo;

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    login = new LoginPage(page);
    await login.loginValidAccount();
    common = new Common(page);
    gallery = new Gallery(page);
    itemInfo = await gallery.navigateToProductDetail(0);
    pdp = new Product(page);
});

test("Navigate to product Detail page", async () => {
    await common.checkObjectText(pdp.itemTitle, itemInfo.name);
});

test("Check product Detail page elements", async () => {
    await common.checkObjectText(pdp.itemTitle, itemInfo.name);
    await common.checkObjectText(pdp.itemPrice, itemInfo.price);
    await common.checkIsVisible(pdp.addCartBtn);
});

test("Add item to cart from product detail", async () => {
    await pdp.addItemToCart();
    await common.checkObjectText(gallery.cartCounter, "1");
});

test("Remove item from product detail", async () => {
    await pdp.removeItemFromCart();
    await common.checkNotExist(gallery.cartCounter);
});

test("Return to Gallery from Product detail", async () => {
    await pdp.returnToGallery();
    await common.checkObjectText(gallery.galleryTitle, "Products");
});
