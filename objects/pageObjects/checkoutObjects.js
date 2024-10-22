const Common = require("../../utils/commonFunctions.js");
import checkoutData from "../data/checkoutData.json"

class Checkout {
    constructor(page){
        this.page = page;
        this.common = new Common(this.page);
        this.checkoutTitle = page.locator(".title");
        this.firstNameField = page.locator("#first-name");
        this.lastNameField = page.locator("#last-name");
        this.zipCodeField = page.locator("#postal-code");
        this.cancelBtn = page.locator("#cancel");
        this.continueBtn = page.locator("#continue");
        this.finishBtn = page.locator("#finish");
        this.itemsInCheckout = page.locator(".inventory_item_name");
        this.itemName = (item) => {return page.locator(".inventory_item_name").nth(item);};
        this.itemPrice = (item) => {return page.locator(".inventory_item_price").nth(item);};
        this.summaryLabel = (label) => {return page.locator(".summary_info_label").nth(label);};
        this.summaryInfo = (info) => {return page.locator(".summary_value_label").nth(info);};
        this.subTotal = page.locator(".summary_subtotal_label");
        this.taxesAmount = page.locator(".summary_tax_label");
        this.totalAmount = page.locator(".summary_total_label");
    }

    async fillYourInformation(){
        let value;
        await this.common.setValueInput(this.firstNameField, checkoutData.firstName);
        value = await this.firstNameField.getAttribute('value');
        await this.common.checkIsEqual(value, checkoutData.firstName);
        await this.common.setValueInput(this.lastNameField, checkoutData.lastName);
        value = await this.lastNameField.getAttribute('value');
        await this.common.checkIsEqual(value, checkoutData.lastName);
        await this.common.setValueInput(this.zipCodeField, checkoutData.zipCode);
        value = await this.zipCodeField.getAttribute('value');
        await this.common.checkIsEqual(value, checkoutData.zipCode);
        await this.common.clickElement(this.continueBtn);
    }

    async checkOverviewInfo(){
        await this.common.checkObjectText(this.summaryLabel(0), "Payment Information:");
        await this.common.checkObjectText(this.summaryInfo(0), "SauceCard #31337");
        await this.common.checkObjectText(this.summaryLabel(1), "Shipping Information:");
        await this.common.checkObjectText(this.summaryInfo(1), "Free Pony Express Delivery!");
        await this.common.checkObjectText(this.summaryLabel(2), "Price Total");
        let total = 0, index = 0;
        let items = await this.itemsInCheckout.count() 
        while(!(index >= items)){
            total = total + await this.common.getPrice(this.itemPrice(index));
            index++;
        }
        await this.common.checkObjectText(this.subTotal, `Item total: $${total}`);
        let taxes = total * 0.08;
        taxes = (Math.round(taxes * 1000) % 10 >= 5 ? Math.ceil(taxes * 100) / 100 : Math.floor(taxes * 100) / 100).toFixed(2);
        await this.common.checkObjectText(this.taxesAmount, `Tax: $${taxes}`);
        total = parseFloat(total);
        taxes = parseFloat(taxes);
        console.log(typeof total, typeof taxes);
        return {total, taxes};
    }
}

module.exports=Checkout;