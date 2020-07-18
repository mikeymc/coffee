const puppeteer = require('puppeteer')

async function getVisual() {
    try {
        const URL = 'https://www.sweetmarias.com'
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(URL)
        await page.screenshot({path: 'screenshot.png'})

        await browser.close()
    } catch (error) {
        console.error(error)
    }
}


getVisual()