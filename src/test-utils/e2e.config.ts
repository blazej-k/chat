import puppeteer from 'puppeteer'

const getTestUtils = async (url: string, slowMo = 100) => {
    let browser, page
    browser = await puppeteer.launch({
        slowMo,
        headless: false,
    })
    page = await browser.newPage()
    page.setViewport({
        width: 1000,
        height: 800
    })
    await page.goto(url)
    return { page, browser }
}

export default getTestUtils