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
    await page.goto('https://www.suning.com/', {waitUntil: 'domcontentloaded'});

    //前往登录
    let navigationPromise = page.waitForNavigation({waitUntil: 'domcontentloaded'});
    await page.click('a[name="public0_none_denglu_denglu"]');
    await navigationPromise; // The navigationPromise resolves after navigation has finished

    //前往qq登录
    navigationPromise = page.waitForNavigation({waitUntil: 'networkidle2'});
    await page.click('a.qq');
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

    //点击云钻
    // navigationPromise = page.waitForNavigation({waitUntil: 'networkidle2'});
    // await page.click('.yunzuan');
    // await navigationPromise; // The navigationPromise resolves after navigation has finished

    //去签到页面
    await page.goto('https://sign.suning.com/sign-web/sign/welcome.do', {waitUntil: 'networkidle2'});

    //点击打卡
    await page.click('div.lotterydraw-start' +
        '');

})();