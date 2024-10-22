const Common = require("../../utils/commonFunctions.js");

class Product{
    constructor(page){
        this.page = page,
        this.common = new Common(this.page); 
        this.returnBtn = page.locator("#back-to-products");
        this.itemTitle = page.locator(".inventory_details_name");
        this.itemPrice = page.locator(".inventory_details_price");
        this.removeBtn = page.locator("#remove");
        this.addCartBtn = page.locator("#add-to-cart");
    }

    async checkItemInfo(name, price){
        await this.common.checkObjectText(this.itemTitle, name);
        await this.common.checkObjectText(this.itemPrice, price);
    }

    async addItemToCart(){
        await this.common.checkIsVisible(this.addCartBtn);
        await this.common.clickElement(this.addCartBtn);
        await this.common.checkIsVisible(this.removeBtn);
    }

    async removeItemFromCart(){
        await this.addItemToCart();
        await this.common.clickElement(this.removeBtn);
        await this.common.checkIsVisible(this.addCartBtn);
    }

    async returnToGallery(){
        await this.common.clickElement(this.returnBtn);
    }
}

module.exports=Product;