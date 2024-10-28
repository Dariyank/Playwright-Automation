const Common = require("../../utils/commonFunctions.js");
const Gallery = require("./galleryObjects.js");

export default class Cart extends Common{
    constructor(page){
        super(page);
        this.gallery = new Gallery(this.page);
        this.cartTitle = page.locator(".header_secondary_container span");
        this.QtyLabel = page.locator(".cart_quantity_label");
        this.descriptionLabel = page.locator(".cart_desc_label");
        this.itemTitleName = (name) => {return page.locator(".cart_item a").filter({ hasText: name });};
        this.itemTitle = (item) => {return page.locator(".cart_item a").nth(item)};
        this.itemPrice = (item) => {return page.locator(".item_pricebar div").nth(item);};
        this.itemRemoveBtn = (item) => {return page.locator(".item_pricebar button").nth(item);};
        this.continueShoppingBtn = page.locator("#continue-shopping");
        this.checkoutBtn = page.locator("#checkout");
    }

    async returnToGallery(){
        await super.clickElement(this.continueShoppingBtn);
        await super.checkIsVisible(this.gallery.galleryTitle);
    }

    async removeItem(item){
        await super.checkIsVisible(this.itemRemoveBtn(item));
        await super.clickElement(this.itemRemoveBtn(item));
    }

    async removeItemFromGroup(name, item){
        await super.checkIsVisible(this.itemTitleName(name));
        await super.clickElement(this.itemRemoveBtn(item));
        await super.checkNotExist(this.itemTitleName(name));
    }

    async navigateToItemPDP(item){
        await super.clickElement(this.itemTitle(item));
    }

    async navigateToCheckout(){
        await super.clickElement(this.checkoutBtn);
    }

}
