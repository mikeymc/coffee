const puppeteer = require('puppeteer')
const {sort} = require('./sort.js');

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

        const linkToGreenCoffeePage = await page.$x(greenCoffeeLinkXPath);
        await linkToGreenCoffeePage[0].click();
        await page.waitForNavigation();
        const linkToViewAllGreenCoffees = await page.$x(viewAllCoffeeButtonXPath);
        await linkToViewAllGreenCoffees[0].click();
        await page.waitForNavigation();
        let greenCoffeeTableRows = await page.$x(coffeeTableRowsXPath);
        let greenCoffees = [];

        for (let i = 0; i < greenCoffeeTableRows.length; i++) {
            let nameLink = await greenCoffeeTableRows[0].$x(coffeeNameXPath);
            await nameLink[i].click();
            await page.waitForNavigation();

            let coffeeName = await page.$eval('.page-title .base', node => node.innerText)
            let score = await page.$('.total-score .score-value');
            if (score) {
                let coffeeScore = await page.$eval('.total-score .score-value', node => node.innerText)
                let arrivalDateElement = await page.$x(arrivalDateXPath)
                if (arrivalDateElement && arrivalDateElement[0]) {
                    let arrivalDate = await arrivalDateElement[0].$eval('.data', node => node.innerText.trim())
                    greenCoffees.push({name: coffeeName, score: parseFloat(coffeeScore), arrived: parseDate(arrivalDate)});
                }
            }
            await page.goBack();
            greenCoffeeTableRows = await page.$x(coffeeTableRowsXPath);
        }

        console.log(sort(greenCoffees));
        await browser.close()
    } catch (error) {
        console.error(error)
    }
}

function parseDate(dateString) {
    let dateTokens = dateString.split(' ');
    const monthNumLookupTable = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(dateTokens[1], monthNumLookupTable[dateTokens[0]], 1)
}

getVisual()