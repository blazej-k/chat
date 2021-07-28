import React from 'react'
import puppeteer from 'puppeteer'

jest.setTimeout(30000)

let browser: puppeteer.Browser, page: puppeteer.Page

beforeAll(async () => {
    browser = await puppeteer.launch({
        slowMo: 200,
        headless: false,
    })
    page = await browser.newPage()
    page.setViewport({
        width: 1000,
        height: 800
    })
    await page.goto('http://localhost:8000')
})

afterAll(async () => {
    await browser.close()
})

describe('Home e2e', () => {
    it('should open and close sign in modal', async() => {
        await page.click('#sign-in')
        await page.click('#cancel')
    })
    it('should open and close sign up modal', async() => {
        await page.click('#sign-up')
        await page.click('#cancel')
    })
    it('should redirect between modals', async() => {
        await page.click('#sign-in')
        await page.click('.redirect')
        await page.click('#cancel')
    })
})