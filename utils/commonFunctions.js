const { expect } = require("@playwright/test");
const exp = require("constants");
const { default: test } = require("node:test");

class Common{

    constructor(page) {
        this.page = page; // Guarda la instancia de page
    }

    /**
     * Click a selected element in dom
     * @param {Selector} testObject is the selector of the element
     */
    async clickElement(testObject){
        await testObject.click();
    }

    /**
     * Add value to an input field
     * @param {Selector} testObject is the selector of the element
     * @param {String} text is the text to write
     */
    async setValueInput(testObject, text){
        await testObject.fill(text);
        const value = await testObject.inputValue();
        await expect(value).toBe(text);
    }

    /**
     * Verify text on element
     * @param {Selector} testObject is the selector of the element
     * @param {String} text is the text to evaluate element's text
     */
    async checkObjectText(testObject, text){
        await expect(testObject).toHaveText(text);
    }

    /**
     * Check if an element is visible
     * @param {Selector} testObject is the selector of the element
     */
    async checkIsVisible(testObject){
        await expect(testObject).toBeVisible();
    }

    /**
     * 
     * @param {Selector} testObject is the selector of the element
     */
    async checkNotExist(testObject){
        await expect(testObject).toHaveCount(0);
    }

    /**
     * Check if the element is hidden
     * @param {Selector} testObject is the selector of the element
     */
    async getObjectText(testObject){
        return testObject.textContent();
    }

    /**
     * Check if the element is hidden
     * @param {Selector} testObject is the selector of the element
     */
    async checkIsHidden(testObject){
        await expect(testObject).toBeVisible();
    }

    /**
     * @param {String} text1 first text to compare
     * @param {String} text2 second text to compare if they're equal
     */
    async checkIsEqual(text1, text2){
        expect(text1).toEqual(text2);
    }

    async getPrice(testObject){
        let text = await this.getObjectText(testObject);
        text = text.replace("$", "");
        let number = parseFloat(text);
        return number;
    }

}

module.exports=Common;