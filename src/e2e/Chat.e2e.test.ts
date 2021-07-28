import puppeteer from 'puppeteer'
import getTestUtils from '../test-utils/e2e.config'

jest.setTimeout(30000)

let browser: puppeteer.Browser, page: puppeteer.Page

beforeAll(async () => {
    ({ browser, page } = await getTestUtils('http://localhost:8000'))
    await page.click('#sign-in')
    await page.waitForSelector('#login')
    await page.type('#login', 'blazej1')
    await page.type('#password', '1')
    await page.click('#submit')
    await page.waitForSelector('.chat-content-wrapper')
})

afterAll(async () => {
    await browser.close()
})

describe('Chat e2e', () => {
    it('should open chat of user (blazej1)', async () => {
        await page.waitForSelector('.chat-content-wrapper')
    })
    it('should change main and second color', async () => {
        await page.waitForSelector('.select-color')
        let className = ''
        await page.$eval('.select-color', async(element) => className = element.children[0].className)
        await page.evaluate(async() => await page.click(className))
    })
})