import { expect } from "@playwright/test";
import checkoutPage from "../locator/checkoutPage";

export default class chartActions {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.checkoutPage = new checkoutPage();
        this.firstName = page.locator(this.checkoutPage.firstName);
        this.lastName = page.locator(this.checkoutPage.lastName);
        this.zipCode = page.locator(this.checkoutPage.zipCode);
        this.btnContinue = page.locator(this.checkoutPage.btnContinue);
        this.btnFinish = page.locator(this.checkoutPage.btnFinish); 
        this.txtCheckoutOverview = page.locator(this.checkoutPage.txtCheckoutOverview);
        this.txtOrder = page.locator(this.checkoutPage.txtOrder);
    }

    async inputCheckoutForm() {
        await this.firstName.fill('Alfi');
        await expect(this.firstName).toHaveValue('Alfi');
        await this.lastName.fill('Rizzi');
        await expect(this.lastName).toHaveValue('Rizzi');
        await this.zipCode.fill('12345');
        await expect(this.zipCode).toHaveValue('12345');
        await this.btnContinue.click();
        await expect(this.txtCheckoutOverview).toHaveText('Checkout: Overview');
        await this.btnFinish.click();
        await expect(this.txtOrder).toHaveText('Thank you for your order!');
    }

}