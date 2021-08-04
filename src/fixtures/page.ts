import { test as base } from '@playwright/test';
import { BasePage } from '../pages/base';

type TestFixtures = {
	basePage: BasePage;
};

export const test = base.extend<TestFixtures>({
	basePage: async ({ page }, use) => {
		await use(new BasePage(page));
	},
});
