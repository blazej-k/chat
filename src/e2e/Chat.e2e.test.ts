import puppeteer from 'puppeteer'
import getTestUtils from '../test-utils/e2e.config'

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
        await page.click('.main-color-wrapper > .colors > .select-color > .red')
        await page.click('.second-color-wrapper > .colors > .select-color > .orange')
    })
    it('should open every nav list', async() => {
        await page.click('#friends > span')
        await page.waitForSelector('#list-friends > li > span')
        await page.click('#groups > span')
        await page.waitForSelector('#list-groups > li > span')
    })
})