import { expect } from "@playwright/test";
import loginPage from "../locator/loginPage";

export default class loginActions {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.loginPage = new loginPage();
        this.inputUsername = page.locator(this.loginPage.inputUsername);
        this.inputPassword = page.locator(this.loginPage.inputPassword);
        this.clickBtnLogin = page.locator(this.loginPage.btnLogin);
        this.txtSwagLab = page.locator(this.loginPage.txtSwagLab);
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async InputLogin(username, password) {
        await this.inputUsername.fill(username);
        await expect(this.inputUsername).toHaveValue(username);
        await this.inputPassword.fill(password);
        await expect(this.inputPassword).toHaveValue(password);
        await this.clickBtnLogin.click();
        await expect(this.txtSwagLab).toHaveText('Swag Labs');

    }
}