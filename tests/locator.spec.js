// @ts-check
import { test, expect, request } from '@playwright/test';
//import { request } from 'http';
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


test('contoh get', async ({ page }) => {
    const apiContext = await request.newContext();
    const res = await apiContext.get('https://reqres.in/api/users?page=2');
    expect(res.status()).toBe(200);
    const responseJSON = await res.json();
    expect(responseJSON.page).toBe(2);
    //expect(responseJSON).toHaveLength(5);
});

test('contoh post', async ({page}) => {
    const apiContext = await request.newContext();
    const postData = {
        "name": "morpheus",
        "job": "leader"
    };
    const res = await apiContext.post('https://reqres.in/api/users',{
        data : postData
    });
    expect(res.status()).toBe(201);
    const responseJSON = await res.json();
    expect(responseJSON.name).toBe('morpheus');
    expect(responseJSON.job).toBe('leader');
    
});

test('contoh get single user', async ({ page }) => {
    const apiContext = await request.newContext();
    const res = await apiContext.get('https://reqres.in/api/users/2');
    expect(res.status()).toBe(200);
    const responseJSON = await res.json();
    expect(responseJSON.data.id).toBe(2); 
    expect(responseJSON.data.email).toBe('janet.weaver@reqres.in');
});


test('contoh post register', async ({ page }) => {
    const apiContext = await request.newContext();
    const postData ={
        "email": "eve.holt@reqres.in",
        "password": "pistol"
    };
    const res = await apiContext.post('https://reqres.in/api/users',{
        data : postData
    });
    expect(res.status()).toBe(201);
});


test('contoh put update', async ({ page }) => {
    const apiContext = await request.newContext();
    const putData = {
        "name": "morpheus",
        "job": "zion resident"
    };
    const res = await apiContext.put('https://reqres.in/api/users/2',{
        data : putData
    });
    expect(res.status()).toBe(200);
    const responseJSON = await res.json();
    expect(responseJSON.name).toBe('morpheus');
    expect(responseJSON.job).toBe('zion resident');
});


test('contoh delete user', async ({ page }) => {
    const apiContext = await request.newContext();
    const res = await apiContext.delete('https://reqres.in/api/users/2');
    expect(res.status()).toBe(204);
});
