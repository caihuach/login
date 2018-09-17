const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications', '--start-maximized'],
    });

    // const context = browser.defaultBrowserContext();
    // await context.overridePermissions('*', ['geolocation']);

    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://www.taobao.com/', {waitUntil: 'networkidle2'});

    console.log(page.url());

    // const mine = await page.$('div[class*="searchbar__mine"]');
    // console.dir(mine);
    // await page.click('div[class*="searchbar__mine"]');

    // const navigationPromise = page.waitForNavigation();
    // page.click('#J_TLoginInfo a');
    // await navigationPromise; // The navigationPromise resolves after navigation has finished

    // console.dir(response);



    // await page.click('#J_SubmitStatic');

    // await navigationPromise;

    // await browser.close();
})();