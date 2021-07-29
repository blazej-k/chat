import puppeteer from 'puppeteer'
import getTestUtils from '../test-utils/e2e.config'

let browser: puppeteer.Browser, page: puppeteer.Page

beforeAll(async () => {
    ({ browser, page } = await getTestUtils('http://localhost:8000'))
})

afterAll(async () => {
    await browser.close()
})

describe('Home e2e', () => {
    it('should open and close sign in modal', async () => {
        await page.click('#sign-in')
        await page.click('#cancel')
    })
    it('should open and close sign up modal', async () => {
        await page.click('#sign-up')
        await page.click('#cancel')
    })
    it('should redirect between modals', async () => {
        await page.click('#sign-in')
        await page.click('.redirect')
        await page.waitForSelector('#cancel')
        await page.click('#cancel')
    })
    it('should open chat', async () => {
        await page.click('#sign-in')
        await page.waitForSelector('#login')
        await page.type('#login', 'blazej1')
        await page.type('#password', '1')
        await page.click('#submit')
        await page.waitForSelector('.chat-content-wrapper')
    })
    it('should show error', async () => {
        await page.goto('http://localhost:8000')
        await page.click('#sign-in')
        await page.type('#login', 'blazej2')
        await page.type('#password', '1')
        await page.click('#submit')
        await page.waitForSelector('.user-auth-error')
    })
    it('should show warning when some input is empty', async () => {
        await page.goto('http://localhost:8000')
        await page.click('#sign-in')
        await page.type('#login', 'blazej2')
        await page.click('#submit')
        await page.waitForSelector('.form-validate')
    })

})