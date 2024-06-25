describe('Test - Sauce Demo Login Page', () => {
    const baseUrl = 'https://www.saucedemo.com/'
    it('TC1 - Login Success', async () => {
        await browser.url(baseUrl)

        //get element
        const usernameTextBox = await $("//input[@id='user-name']")
        const passwordTextBox = await $("//input[@name='password']")
        const loginGreenButton = await $(
            "//input[@class= 'submit-button btn_action']",
        )

        // just check
        const usernamePlaceholder = await usernameTextBox.getAttribute(
            'placeholder',
        )
        console.log('🚀 ~ it ~ usernamePlaceholder:', usernamePlaceholder)

        const passwordPlaceholder = await passwordTextBox.getAttribute(
            'placeholder',
        )
        console.log('🚀 ~ it ~ passwordPlaceholder:', passwordPlaceholder)

        // use getValue to get value from elemen form like input, textarea, button, dll
        const loginButtonValue = await loginGreenButton.getValue()
        console.log('🚀 ~ it ~ loginButtonValue:', loginButtonValue)

        // Test Execution
        await usernameTextBox.setValue('standard_user')
        await passwordTextBox.setValue('secret_sauce')
        await loginGreenButton.click()

        // assertion
        const titleProducts = await $("//span[@class= 'title']")
        await expect(titleProducts).toBeDisplayed()
    })

    it('TC2 - Add Item to Cart', async () => {
        // await browser.url(baseUrl)

        //get element
        const buttonAddToCart = await $(
            "//button[contains(text(), 'Add to cart')]",
        )

        const shoppingCartBadge = await $(
            "//span[@class= 'shopping_cart_badge']",
        )

        // Test Execution
        buttonAddToCart.click()

        // assertion
        // use getText to get visible text from element html (non form)
        const badgeText = await shoppingCartBadge.getText()
        await expect(badgeText).not.toBe(0)
        await expect(badgeText).not.toBe(null)
        console.log('🚀 ~ it ~ badgeText :', badgeText)

        await browser.debug()
    })
})
