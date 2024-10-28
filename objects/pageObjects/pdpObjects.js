const Common = require("../../utils/commonFunctions.js");

class Product extends Common{
    constructor(page){
        super(page);
        this.returnBtn = page.locator("#back-to-products");
        this.itemTitle = page.locator(".inventory_details_name");
        this.itemPrice = page.locator(".inventory_details_price");
        this.removeBtn = page.locator("#remove");
        this.addCartBtn = page.locator("#add-to-cart");
    }

    async checkItemInfo(name, price){
        await super.checkObjectText(this.itemTitle, name);
        await super.checkObjectText(this.itemPrice, price);
    }

    async addItemToCart(){
        await super.checkIsVisible(this.addCartBtn);
        await super.clickElement(this.addCartBtn);
        await super.checkIsVisible(this.removeBtn);
    }

    async removeItemFromCart(){
        await this.addItemToCart();
        await super.clickElement(this.removeBtn);
        await super.checkIsVisible(this.addCartBtn);
    }

    async returnToGallery(){
        await super.clickElement(this.returnBtn);
    }
}

module.exports=Product;