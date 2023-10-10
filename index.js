const puppeteer = require('puppeteer'); // v20.7.4 or later
const { createCalendar } = require("./scrap");
const username = "YOUR USER IS HERE"
const password = "YOUR PASSWORD IS HERE"

    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const timeout = 60000;
        page.setDefaultTimeout(timeout);

        page.on("response", (res) => {
            if (res.url() === `https://sisselfservice.zewailcity.edu.eg/PowerCampusSelfService/Schedule/Student`) {
                res.json().then((res)=>{
                    console.log(typeof res)
                    createCalendar(JSON.parse(res))
                })
            }
        })
        {
            const targetPage = page;
            const promises = [];
            const startWaitingForEvents = () => {
                promises.push(targetPage.waitForNavigation());
            }
            startWaitingForEvents();
            await targetPage.goto('https://sisselfservice.zewailcity.edu.eg/PowerCampusSelfService/Home/LogIn?ReturnUrl=%2FPowerCampusSelfService%2FRegistration%2FSchedule');
            await Promise.all(promises);
        }

        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('::-p-aria(Username)'),
                targetPage.locator('#txtUserName'),
                targetPage.locator('::-p-xpath(//*[@id=\\"txtUserName\\"])'),
                targetPage.locator(':scope >>> #txtUserName')
            ])
                .setTimeout(timeout)
                .fill(username);
        }

        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('span > span'),
                targetPage.locator('::-p-xpath(//*[@id=\\"btnNext\\"]/span/span)'),
                targetPage.locator(':scope >>> span > span'),
                targetPage.locator('::-p-text(Next)')
            ])
                .setTimeout(timeout)
                .click();
        }

        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('::-p-aria(Password)'),
                targetPage.locator('#txtPassword'),
                targetPage.locator('::-p-xpath(//*[@id=\\"txtPassword\\"])'),
                targetPage.locator(':scope >>> #txtPassword')
            ])
                .setTimeout(timeout)
                .fill(password);
        }

        {
            const targetPage = page;
            const promises = [];
            const startWaitingForEvents = () => {
                promises.push(targetPage.waitForNavigation());
            }
            await puppeteer.Locator.race([
                targetPage.locator('div.jssEGb7Iu2BR_422 span > span'),
                targetPage.locator('::-p-xpath(//*[@id=\\"btnSignIn\\"]/span/span)'),
                targetPage.locator(':scope >>> div.jssEGb7Iu2BR_422 span > span'),
                targetPage.locator('::-p-text(Sign in)')
            ])
                .on('action', () => startWaitingForEvents())
                .click();
            await Promise.all(promises);
        }

        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('::-p-aria(Period 2022/FALL)'),
                targetPage.locator('#ddlPeriod_value'),
                targetPage.locator('::-p-xpath(//*[@id=\\"ddlPeriod_value\\"])'),
                targetPage.locator(':scope >>> #ddlPeriod_value')
            ])
                .setTimeout(timeout)
                .click();
        }

        /*  {
             const targetPage = page;
     
             let semesters = await targetPage.$$('#menu- > div.MuiPaper-root-0r_c4u2pkR450.MuiMenu-paper-0r_c4u2pkR960.Dropdown-paper-0r_c4u2pkR876.MuiPopover-paper-0r_c4u2pkR963.MuiPaper-elevation8-0r_c4u2pkR461.MuiPaper-rounded-0r_c4u2pkR451 > ul > li')
             console.log(semesters)
         } */

    })().catch(err => {
        console.error(err);
        process.exit(1);
    });
