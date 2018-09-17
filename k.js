const puppeteer = require('puppeteer');
const config = reuire('./config');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications', '--start-maximized'],
    });

    // const context = browser.defaultBrowserContext();
    // await context.overridePermissions('*', ['geolocation']);

    const page = await browser.newPage();
    // await page.emulate(devices['iPhone 7 Plus']);
    await page.setViewport({width: 1920, height: 1080});
    await page.goto('https://www.kaola.com', {waitUntil: 'networkidle0'});

    // const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    await page.click('.checkin');
    // const newPage = await newPagePromise;
/*

    //前往qq登录
    navigationPromise = newPage.waitForNavigation({waitUntil: 'networkidle2'});
    await newPage.click('a.pdl');
    await navigationPromise; // The navigationPromise resolves after navigation has finished

    const iframe = await newPage.frames().find(f => {
        console.log(f.name());
        return f.name() === 'ptlogin_iframe'
    });
    // console.dir(iframe);

    //获取qq账号密码页面
    const switcher_plogin = await iframe.$('#switcher_plogin');
    // console.dir(switcher_plogin);
    await switcher_plogin.click();
    await iframe.type('#u', config.qq.username);
    await iframe.type('#p', config.qq.password);

    //点击qq登录
    navigationPromise = page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await iframe.click('#login_button');
    await navigationPromise; // The navigationPromise resolves after navigation has finished
*/

    //去签到页面
    // await page.goto('https://vip.jd.com/sign/index');

})();