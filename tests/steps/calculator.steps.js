const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = '127.0.0.1:5500/calculator/index.html';

Given('a user opens the app',  async function () {
    // Write code here that turns the phrase above into concrete actions
    await page.goto(url);
});

Then('in the display screen should be show a {string}', function (int) {
    // Then('in the display screen should be show a {float}', function (float) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});