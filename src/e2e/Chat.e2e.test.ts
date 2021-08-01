import puppeteer from 'puppeteer'
import getTestUtils from '../test-utils/e2e.config'

let browser: puppeteer.Browser, page: puppeteer.Page

beforeAll(async () => {
    ({ browser, page } = await getTestUtils({ url: 'http://localhost:8000', headless: false }))
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
        const chat = await page.$('.chat-content-wrapper')
        expect(chat).toBeDefined()
    })
    it('should change main and second color', async () => {
        await page.click('.main-color-wrapper > .colors > .select-color > .red')
        await page.click('.second-color-wrapper > .colors > .select-color > .orange')
        const mainColors = await page.$('.main-color-wrapper > .colors > .select-color')
        const secondColors = await page.$('.second-color-wrapper > .colors > .select-color')
        const newMainColor = await mainColors?.$('.red')
        const newSecondColor = await secondColors?.$('.orange')
        expect([newMainColor, newSecondColor]).toStrictEqual([null, null])
        //null beucase they aren't avilabe when they are choosen
    })
    it('should open friends and groups nav list', async () => {
        await page.click('#friends > span')
        await page.waitForSelector('#list-friends > li > span')
        await page.click('#groups > span')
        await page.waitForSelector('#list-groups > li > span')
        const openedList = await page.$$('.collection-open')
        expect(openedList).toHaveLength(2)
    })
    //to fix later
    // it('should send message', async () => {
    //     await page.click('#list-friends > li > span')
    //     await page.type('#mess-input', 'hello')
    //     await page.click('.send > button')
    // })
    it('should log out', async () => {
        await page.click('#log-out')
        let homePage
        try{
            homePage = await page.$('.home-wrapper')
        }
        catch{
            homePage = await page.$eval('.home-wrapper', elem => elem)
        }
        expect(homePage).toBeDefined()
    })
})