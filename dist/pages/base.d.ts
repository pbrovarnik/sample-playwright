/// <reference types="node" />
import type { Page } from '@playwright/test';
declare type NavigationOptions = {
    timeout?: number;
    url?: string | RegExp | ((url: URL) => boolean);
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
};
declare type ClickOptions = {
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
export declare class BasePage {
    readonly page: Page;
    constructor(page: Page);
    getAllElements(selector: string): Promise<import("@playwright/test").ElementHandle<HTMLElement | SVGElement>[]>;
    clickAndWaitForNavigation(selector: string, navigationOptions?: NavigationOptions, clickOptions?: ClickOptions): Promise<[import("@playwright/test").Response | null, void]>;
    clickAndWaitForDownload(selector: string): Promise<[import("@playwright/test").Download, void]>;
    testUrl(expectedUrl: string): Promise<string>;
    testPageTitle(expectedTitle: string): Promise<string>;
    testElementText(expectedUrl: string): Promise<string>;
    testSnapshop(snapshotPath: string): Promise<Buffer>;
    uploadWithFileChooser(filePath: string | string[]): Promise<void>;
}
export {};
