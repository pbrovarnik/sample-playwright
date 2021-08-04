import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

type NavigationOptions = {
	timeout?: number;
	url?: string | RegExp | ((url: URL) => boolean);
	waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
};

type ClickOptions = {
	button?: 'left' | 'right' | 'middle';
	clickCount?: number;
	delay?: number;
	force?: boolean;
	modifiers?: ('Alt' | 'Control' | 'Meta' | 'Shift')[];
	noWaitAfter?: boolean;
	position?: {
		x: number;
		y: number;
	};
	timeout?: number;
	trial?: boolean;
};

export class BasePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async getAllElements(selector: string) {
		return this.page.$$(selector);
	}

	async clickAndWaitForNavigation(
		selector: string,
		navigationOptions?: NavigationOptions,
		clickOptions?: ClickOptions
	) {
		return Promise.all([
			this.page.waitForNavigation(navigationOptions),
			this.page.click(selector, clickOptions),
		]);
	}

	async clickAndWaitForDownload(selector: string) {
		return Promise.all([
			this.page.waitForEvent('download'),
			this.page.click(selector),
		]);
	}

	async testUrl(expectedUrl: string) {
		return expect(this.page.url()).toBe(expectedUrl);
	}

	async testPageTitle(expectedTitle: string) {
		return expect(await this.page.title()).toContain(expectedTitle);
	}

	async testElementText(expectedUrl: string) {
		return expect(this.page.url()).toBe(expectedUrl);
	}

	async testSnapshop(snapshotPath: string) {
		return expect(await this.page.screenshot()).toMatchSnapshot(snapshotPath);
	}

	async uploadWithFileChooser(filePath: string | string[]) {
		this.page.on('filechooser', async (filechooser) => {
			await filechooser.setFiles(filePath);
		});
	}
}
