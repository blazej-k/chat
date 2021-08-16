import puppeteer from 'puppeteer'
import getTestUtils from '../test-utils/e2e.config'

let browser: puppeteer.Browser, page: puppeteer.Page

const checkIsModalExist = async () => {
    try {
        const modal = await page.$eval('.sign-in-modal', elem => elem)
        expect(modal).toBeUndefined()
    }
    catch {
        const modal = await page.$('.sign-in-modal')
        expect(modal).toBeNull()
    }
}

beforeAll(async () => {
    ({ browser, page } = await getTestUtils({ url: 'http://localhost:8000' }))
})

afterAll(async () => {
    await browser.close()
})

afterEach(async () => {
    await page.reload()
})

describe('Home e2e', () => {
    it('should open and close sign in modal', async () => {
        await page.click('#sign-in')
        await page.click('#cancel')
        checkIsModalExist()
    })
    it('should open and close sign up modal', async () => {
        await page.click('#sign-up')
        await page.click('#cancel')
        checkIsModalExist()
    })
    it('should redirect between modals', async () => {
        await page.click('#sign-in')
        await page.waitForSelector('.redirect')
        await page.click('.redirect')
        await page.waitForSelector('.sign-in-modal')
        let modal = await page.$('.sign-in-modal')
        expect(modal).toBeDefined()
        await page.click('#cancel')
    })
    it('should open chat page', async () => {
        await page.click('#sign-in')
        await page.waitForSelector('#login')
        await page.type('#login', 'blazej1')
        await page.type('#password', '1')
        await page.click('#submit')
        await page.waitForSelector('.chat-content-wrapper')
        const chat = await page.$('.chat-content-wrapper')
        expect(chat).toBeDefined()
    })
    it('should show error mess in modal', async () => {
        await page.click('#sign-in')
        await page.type('#login', 'blazej2')
        await page.type('#password', '1')
        await page.click('#submit')
        const errorMess = await page.$eval('.user-auth-error', elem => elem.textContent)
        expect(errorMess).toBe('Invalid login or password')
    })
    it('should show warning when some input is empty', async () => {
        await page.click('#sign-in')
        await page.type('#login', 'blazej2')
        await page.click('#submit')
        await page.waitForSelector('.form-validate')
        const warningMess = await page.$eval('.form-validate', elem => elem.textContent)
        expect(warningMess).toBe('Required')
    })
})