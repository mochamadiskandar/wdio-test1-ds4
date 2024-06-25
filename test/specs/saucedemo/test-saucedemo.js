import { browser, $ } from '@wdio/globals'

describe('Test - Sauce Demo Login Page', () => {
    it('TC1 - Login Success', async () => {
        await browser.url('https://www.saucedemo.com')

        //get element
        const usernameTextBox = await $("//input[@id='user-name']")
        const passwordTextBox = await $("//input[@name='password']")
        const loginButton = await $(
            "//input[@class= 'submit-button btn_action']",
        )

        // check console log
        const usernamePlaceholder = await usernameTextBox.getAttribute(
            'placeholder',
        )
        console.log('🚀 ~ it ~ usernamePlaceholder:', usernamePlaceholder)

        const passwordPlaceholder = await passwordTextBox.getAttribute(
            'placeholder',
        )
        console.log('🚀 ~ it ~ passwordPlaceholder:', passwordPlaceholder)

        // use getValue to get value from elemen form like input, textarea, button, dll
        const loginButtonValue = await loginButton.getValue()
        console.log('🚀 ~ it ~ loginButtonValue:', loginButtonValue)

        // Test Execution
        await usernameTextBox.waitForDisplayed({ timeout: 2000 })
        await usernameTextBox.setValue('standard_user')
        await passwordTextBox.waitForDisplayed({ timeout: 2000 })
        await passwordTextBox.setValue('secret_sauce')
        await loginButton.click()

        // assertion
        await expect(browser).toHaveUrl(
            'https://www.saucedemo.com/inventory.html',
        )
        const titleProducts = await $("//span[@class= 'title']")
        await expect(titleProducts).toBeDisplayed()
    })

    it('TC2 - Add Item to Cart', async () => {
        //get element
        const buttonAddToCart = await $(
            "//button[contains(text(), 'Add to cart')]",
        )

        const shoppingCartBadge = await $(
            "//span[@class= 'shopping_cart_badge']",
        )

        // Test Execution
        await buttonAddToCart.click()

        // assertion
        // use getText to get visible text from element html (non form)
        const badgeText = await shoppingCartBadge.getText()
        await expect(badgeText).not.toBe(0)
        await expect(badgeText).not.toBe(null)
        console.log('🚀 ~ it ~ badgeText :', badgeText)

        // await browser.debug()
        await browser.pause(10000)
    })
})
