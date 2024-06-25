import { browser, $, $$ } from '@wdio/globals'

describe('Test - Sauce Demo Login Page', () => {
    it('TC1 - Login Success', async () => {
        // Buka browser dan navigasi ke URL
        await browser.url('https://www.saucedemo.com')

        //get element
        const usernameTextBox = await $("//input[@id='user-name']")
        const passwordTextBox = await $("//input[@name='password']")
        const loginButton = await $(
            "//input[@class= 'submit-button btn_action']",
        )

        // Test Execution
        await usernameTextBox.waitForDisplayed({ timeout: 2000 })
        await usernameTextBox.setValue('standard_user')
        await passwordTextBox.waitForDisplayed({ timeout: 2000 })
        await passwordTextBox.setValue('secret_sauce')

        console.log('🚀 ~ it ~ loginButtonValue:', await loginButton.getValue())
        await loginButton.click()

        // assertion
        await expect(browser).toHaveUrl(
            'https://www.saucedemo.com/inventory.html',
        )
        const titleProducts = await $("//span[@class= 'title']")
        await expect(titleProducts).toBeDisplayed()
    })

    it('TC2 - Add Multiple Item to Cart', async () => {
        // Tunggu inventory page terbuka
        await browser.waitUntil(async () => {
            return (
                (await browser.getUrl()) ==
                    'https://www.saucedemo.com/inventory.html',
                {
                    timeout: 5000,
                    timeoutMsg: 'expected url to be different after 5s',
                }
            )
        })

        //  Get All Product pada halaman
        const getAllProducts = await $$(
            "//button[contains(text(), 'Add to cart')]",
        )

        // Looping dan add to cart
        for (let i = 0; i < getAllProducts.length; i++) {
            await getAllProducts[i].click()
        }

        // Verifikasi bahwa semua item telah ditambahkan ke keranjang
        const cartBadge = await $("//span[@class= 'shopping_cart_badge']")
        const itemCount = await cartBadge.getText()

        // assertion
        console.log('🚀 ~ it ~ badgeText :', itemCount)
        await expect(itemCount).not.toBe(0)
        await expect(itemCount).not.toBe(null)

        await browser.debug()
    })
})
