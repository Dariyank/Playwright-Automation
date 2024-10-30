const Common=require('../../utils/commonFunctions.js');
const Product=require("../pageObjects/pdpObjects.js");

class Gallery extends Common{
    constructor(page){
        super(page);
        this.pdp = new Product(page);
        this.galleryLogo = page.locator(".app_logo");
        this.galleryTitle = page.locator(".title");
        this.itemContainer = page.locator(".inventory_item")
        this.itemTitle = (item) => {return page.locator(".inventory_item_name").nth(item);};
        this.itemPrice = (item) => {return page.locator(".inventory_item_price").nth(item);};
        this.itemAddToCartBtn = (item) => {return page.locator("[data-test*='add-to-cart']").nth(item);};
        this.itemRemoveBtn = (item) => {return page.locator("[data-test*='remove']").nth(item);};
        this.cartIcon = page.locator("#shopping_cart_container");
        this.cartCounter = page.locator(".shopping_cart_badge");
        this.sortBtn = page.locator("[data-test='active-option']");
        this.sortOptionBtn = (option) => { return page.locator(".product_sort_container option").nth(option);};
        this.facebookBtn = page.locator(".social_facebook a");
        this.twitterBtn = page.locator(".social_twitter a");
        this.linkedinBtn = page.locator(".social_linkedin a");
    }

    async addItemToCart(item, index){
        await super.checkIsVisible(this.itemAddToCartBtn(item));
        await super.clickElement(this.itemAddToCartBtn(item));
        await super.checkIsVisible(this.itemRemoveBtn(index));
    }

    async removeItemToCart(item){
        await super.checkIsVisible(this.itemRemoveBtn(item));
        await super.clickElement(this.itemRemoveBtn(item));
        await super.checkIsVisible(this.itemAddToCartBtn(item));
    }

    async navigateToCart(){
        await super.checkIsVisible(this.cartIcon);
        await super.clickElement(this.cartIcon);
    }

    async navigateToProductDetail(item){
        await super.checkIsVisible(this.itemTitle(item));
        let name = await super.getObjectText(this.itemTitle(0));
        let price = await super.getObjectText(this.itemPrice(0));
        await super.clickElement(this.itemTitle(0));
        return {name, price};
    }
}

module.exports=Gallery;