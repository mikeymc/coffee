const puppeteer = require('puppeteer')
const greenCoffeeLinkXPath = '//nav[@class="navigation"]//a[contains(., "Green Coffee")]';
const viewAllCoffeeButtonXPath = '//div[@class="control"]//a[contains(., "View All")]';
const arrivalDateXPath = '//table[@class="additional-attributes-table"]//tr[contains(., "Arrival date")]';
const coffeeTableRowsXPath = '//tr[contains(@class, "item")]';
const coffeeNameXPath = '//td[@class="product-item-name"]//a';

async function getVisual() {
    try {
        const URL = 'https://www.sweetmarias.com'
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 0
        })
        const page = await browser.newPage()

        await page.goto(URL)
        const greenCoffeeLink = await page.$x(greenCoffeeLinkXPath);
        await greenCoffeeLink[0].click();
        await page.waitForNavigation();
        const viewAllLink = await page.$x(viewAllCoffeeButtonXPath);
        await viewAllLink[0].click();
        await page.waitForNavigation();
        let coffeeList = await page.$x(coffeeTableRowsXPath);

        for (let i = 0; i < coffeeList.length; i++) {
            let nameLink = await coffeeList[0].$x(coffeeNameXPath);
            await nameLink[i].click();
            await page.waitForNavigation();

            let coffeeName = await page.$eval('.page-title .base', node => node.innerText)
            let score = await page.$('.total-score .score-value');
            if (score) {
                let coffeeScore = await page.$eval('.total-score .score-value', node => node.innerText)
                let arrivalDateElement = await page.$x(arrivalDateXPath)
                if (arrivalDateElement && arrivalDateElement[0]) {
                    let arrivalDate = await arrivalDateElement[0].$eval('.data', node => node.innerText.trim())
                    console.log('Name: ', coffeeName, ' | ', 'Score: ', coffeeScore, ' | ', 'Arrived: ', arrivalDate);
                }
            }
            await page.goBack();
            coffeeList = await page.$x(coffeeTableRowsXPath);
        }

        await browser.close()
    } catch (error) {
        console.error(error)
    }
}

getVisual()