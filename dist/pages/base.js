"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const test_1 = require("@playwright/test");
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async getAllElements(selector) {
        return this.page.$$(selector);
    }
    async clickAndWaitForNavigation(selector, navigationOptions, clickOptions) {
        return Promise.all([
            this.page.waitForNavigation(navigationOptions),
            this.page.click(selector, clickOptions),
        ]);
    }
    async clickAndWaitForDownload(selector) {
        return Promise.all([
            this.page.waitForEvent('download'),
            this.page.click(selector),
        ]);
    }
    async testUrl(expectedUrl) {
        return test_1.expect(this.page.url()).toBe(expectedUrl);
    }
    async testPageTitle(expectedTitle) {
        return test_1.expect(await this.page.title()).toContain(expectedTitle);
    }
    async testElementText(expectedUrl) {
        return test_1.expect(this.page.url()).toBe(expectedUrl);
    }
    async testSnapshop(snapshotPath) {
        return test_1.expect(await this.page.screenshot()).toMatchSnapshot(snapshotPath);
    }
    async uploadWithFileChooser(filePath) {
        this.page.on('filechooser', async (filechooser) => {
            await filechooser.setFiles(filePath);
        });
    }
}
exports.BasePage = BasePage;
