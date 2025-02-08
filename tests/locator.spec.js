// @ts-check
import { test, expect } from '@playwright/test';
const { default: loginActions } = require('../tests/pom/object/loginActions');
const { default: inventoryActions } = require('../tests/pom/object/inventoryActions');
const { default: chartActions } = require('../tests/pom/object/chartActions');
const { default: checkoutActions } = require('../tests/pom/object/checkoutActions');


test('Test Case Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const inputUsername = page.locator('#user-name');
    await inputUsername.fill('standard_user');
    await expect(inputUsername).toHaveValue('standard_user');

    const inputPassword = page.locator('#password');
    await inputPassword.fill('secret_sauce');
    await expect(inputPassword).toHaveValue('secret_sauce');

    const btnLogin = page.locator('#login-button');
    await btnLogin.click()

    await expect(page.locator('#header_container > div.primary_header > div.header_label > div')).toHaveText('Swag Labs');

    const addChartBackpack = page.locator('#add-to-cart-sauce-labs-backpack');
    addChartBackpack.click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');
    const addChartBike = page.locator('#add-to-cart-sauce-labs-bike-light');
    addChartBike.click();
    await expect(page.locator('#remove-sauce-labs-bike-light')).toHaveText('Remove')

    await expect(page.locator('#shopping_cart_container > a > span')).toHaveText('2');

    const btnCart = page.locator('#shopping_cart_container > a');
    btnCart.click();

    await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Your Cart');

    const btnCheckout = page.locator('#checkout');
    btnCheckout.click();

    await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Checkout: Your Information');

    //Fill this information
    const firstName = page.locator('#first-name');
    firstName.fill('Mohammad Alfi');
    await expect(firstName).toHaveValue('Mohammad Alfi');

    const lastName = page.locator('#last-name');
    lastName.fill('Rizzi')
    await expect(lastName).toHaveValue('Rizzi');

    const zipCode = page.locator('#postal-code');
    zipCode.fill('123456');
    await expect(zipCode).toHaveValue('123456');

    const btnContinue = page.locator('#continue');
    btnContinue.click();
    await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText('Checkout: Overview');

    const btnFinish = page.locator('#finish');
    btnFinish.click();

    await expect(page.locator('#checkout_complete_container > h2')).toHaveText('Thank you for your order!');




});


test('login with POM', async({ page }) => {
    const loginObj = new loginActions(page);
    await loginObj.goto();
    await loginObj.InputLogin("standard_user", "secret_sauce");

    const inventoryObj = new inventoryActions(page);
    await inventoryObj.InventoryClick();

    const chartObj = new chartActions(page);
    await chartObj.chartClick();

    const checkoutObj = new checkoutActions(page);
    await checkoutObj.inputCheckoutForm();
    
});