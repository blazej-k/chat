import puppeteer from 'puppeteer'

const getTestUtils = async ({ url, headless = false, slowMo = 50 }: { url: string, headless?: boolean, slowMo?: number }) => {
    let browser = await puppeteer.launch({
        slowMo,
        headless,
    })
    let page = await browser.newPage()
    page.setViewport({
        width: 1000,
        height: 800
    })
    await page.goto(url)
    return { page, browser }
}

export default getTestUtils