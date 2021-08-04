"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const test_1 = require("@playwright/test");
const base_1 = require("../pages/base");
exports.test = test_1.test.extend({
    basePage: async ({ page }, use) => {
        await use(new base_1.BasePage(page));
    },
});
