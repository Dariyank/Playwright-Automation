const Common=require('../../utils/commonFunctions.js');
const Product=require("../pageObjects/pdpObjects.js");

class Gallery{
    constructor(page){
        this.page = page,
        this.common = new Common(page); 
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
        await this.common.checkIsVisible(this.itemAddToCartBtn(item));
        await this.common.clickElement(this.itemAddToCartBtn(item));
        await this.common.checkIsVisible(this.itemRemoveBtn(index));
    }

    async removeItemToCart(item){
        await this.common.checkIsVisible(this.itemRemoveBtn(item));
        await this.common.clickElement(this.itemRemoveBtn(item));
        await this.common.checkIsVisible(this.itemAddToCartBtn(item));
    }

    async navigateToCart(){
        await this.common.checkIsVisible(this.cartIcon);
        await this.common.clickElement(this.cartIcon);
    }

    async navigateToProductDetail(item){
        await this.common.checkIsVisible(this.itemTitle(item));
        let name = await this.common.getObjectText(this.itemTitle(0));
        let price = await this.common.getObjectText(this.itemPrice(0));
        await this.common.clickElement(this.itemTitle(0));
        return {name, price};
    }
}

module.exports=Gallery;