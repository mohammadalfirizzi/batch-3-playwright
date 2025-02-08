import { expect } from "@playwright/test";
import inventoryPage from "../locator/inventoryPage";

export default class inventoryActions {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.invetoryPage = new inventoryPage();
        this.addChartBackpack = page.locator(this.invetoryPage.addChartBackpack);
        this.addChartBike = page.locator(this.invetoryPage.addChartBike);
        this.btnCart = page.locator(this.invetoryPage.btnCart);
        this.removeBackpack = page.locator(this.invetoryPage.removeBackpack);
        this.removeChartBike = page.locator(this.invetoryPage.removeChartBike);
        this.countShop = page.locator('#shopping_cart_container > a > span');
        this.txtChart = page.locator(this.invetoryPage.txtChart);
    }

    async InventoryClick() {
        await this.addChartBackpack.click();
        await expect(this.removeBackpack).toHaveText('Remove');
        await this.addChartBike.click();
        await expect(this.removeChartBike).toHaveText('Remove');
        await expect(this.countShop).toHaveText('2');
        await this.btnCart.click();
        await expect(this.txtChart).toHaveText('Your Cart'); 
    }

}