const puppeteer = require('puppeteer');
const config = require('./config');

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
    await page.goto('http://www.jd.com/', {waitUntil: 'networkidle2'});

    let navigationPromise = page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await page.click('.link-login');
    await navigationPromise; // The navigationPromise resolves after navigation has finished

    //前往qq登录
    navigationPromise = page.waitForNavigation({waitUntil: 'networkidle2'});
    await page.click('a.pdl');
    await navigationPromise; // The navigationPromise resolves after navigation has finished

    const iframe = await page.frames().find(f => {
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

    //去签到页面
    await page.goto('https://vip.jd.com/sign/index');

})();