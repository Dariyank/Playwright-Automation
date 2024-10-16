const { expect } = require("@playwright/test");
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
     * @param {*} testObject is the selector of the element
     * @param {*} text is the text to write
     */
    async setValueInput(testObject, text){
        await testObject.fill(text);
        const value = await testObject.inputValue();
        await expect(value).toBe(text);
    }

    /**
     * Verify text on element
     * @param {*} testObject is the selector of the element
     * @param {*} text is the text to evaluate element's text
     */
    async checkObjectText(testObject, text){
        await expect(testObject).toHaveText(text);
    }

    /**
     * Check if an element is visible
     * @param {*} testObject is the selector of the element
     */
    async checkIsVisible(testObject){
        await expect(testObject).toBeVisible();
    }

    async getObjectText(testObject){
        return testObject.textContent();
    }

    /**
     * Check if the element is hidden
     * @param {*} testObject is the selector of the element
     */
    async checkIsHidden(testObject){
        await expect(testObject).toBeVisible();
    }

}

module.exports=Common;