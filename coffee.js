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

        console.log('There are ', coffeeList.length, ' coffees...');

        // choose first coffee
        let nameLink = await coffeeList[0].$x(coffeeNameXPath);
        await nameLink[0].click();
        await page.waitForNavigation();

        let coffeeName = await page.$eval('.page-title .base', node => node.innerText)
        let coffeeScore = await page.$eval('.total-score .score-value', node => node.innerText)
        let arrivalDateElement = await page.$x(arrivalDateXPath)
        let arrivalDate = await arrivalDateElement[0].$eval('.data', node => node.innerText.trim())
        console.log('Name: ', coffeeName, ' | ', 'Score: ', coffeeScore, ' | ', 'Arrived: ', arrivalDate);
        await page.goBack();
        // end first coffee

        // choose second coffee
        coffeeList = await page.$x(coffeeTableRowsXPath);
        nameLink = await coffeeList[0].$x(coffeeNameXPath);
        await nameLink[1].click();
        await page.waitForNavigation();

        coffeeName = await page.$eval('.page-title .base', node => node.innerText)
        coffeeScore = await page.$eval('.total-score .score-value', node => node.innerText)
        arrivalDateElement = await page.$x(arrivalDateXPath)
        arrivalDate = await arrivalDateElement[0].$eval('.data', node => node.innerText.trim())
        console.log('Name: ', coffeeName, ' | ', 'Score: ', coffeeScore, ' | ', 'Arrived: ', arrivalDate);
        // end second coffee

        await browser.close()
    } catch (error) {
        console.error(error)
    }
}

getVisual()