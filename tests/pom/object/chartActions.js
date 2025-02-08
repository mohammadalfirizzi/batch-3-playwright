import { expect } from "@playwright/test";
import chartPage from "../locator/chartPage";

export default class chartActions {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.chartPage = new chartPage();
        this.btnCheckout = page.locator(this.chartPage.btnCheckout);
        this.txtCheckout = page.locator(this.chartPage.txtCheckout);
    }

    async chartClick() {
        this.btnCheckout.click();
        await expect(this.txtCheckout).toHaveText('Checkout: Your Information');
     
    }

}