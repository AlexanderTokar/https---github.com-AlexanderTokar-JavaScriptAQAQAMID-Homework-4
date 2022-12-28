let page;

beforeAll(async () => {
    page = await browser.newPage();
});

afterAll(() => {
    page.close();
});

describe('Github page tests', () => {
    beforeAll(async () => {
        await page.goto('https://github.com/team/', {
            waitUntil: 'load',
            timeout: 120000,
        });
    });

    test("The h1 header content'", async () => {
        const firstLink = await page.$('header div div a');
        await firstLink.click();
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual(
            'GitHub for teams · Build like the best teams on the planet · GitHub',
        );
    });

    test('The first link attribute', async () => {
        const actual = await page.$eval('a', link => link.getAttribute('href'));
        expect(actual).toEqual('#start-of-content');
    });

    test('The page contains Sign in button', async () => {
        await page.goto('https://github.com/team', {
            waitUntil: 'load',
            timeout: 10000,
        });
        const btnSelector = '.btn-large-mktg.btn-mktg';
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain('Get started with Team');
    });
});

describe('Additional Github page tests', () => {
    test('Second h1 header content', async () => {
        await page.goto('https://github.com/marketplace/', {
            waitUntil: 'load',
            timeout: 10000,
        });
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual(
            'GitHub Marketplace · to improve your workflow · GitHub',
        );
    });

    test('Third h1 header content', async () => {
        await page.goto('https://github.com/codespaces/', {
            waitUntil: 'load',
            timeout: 10000,
        });
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual('Sign in to GitHub · GitHub');
    });

    test('Fourth h1 header content', async () => {
        await page.goto('https://github.com/', {
            waitUntil: 'load',
            timeout: 15000,
        });
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
    }, 150000);
});
