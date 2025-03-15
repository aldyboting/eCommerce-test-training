import { test, expect } from '@playwright/test';

test('Confirm Correct Product and Quantity Display in Cart', async ({ page }) => {
    let expectedText = ["botol - Rp 5.000,00 x 1", "snack - Rp 10.000,00 x 2"];
        
    await page.goto('http://localhost:8082/');
    await page.getByRole('listitem').filter({ hasText: 'botol - Rp 5.000,00Add to Cart' }).getByRole('button').click();
    await page.getByRole('listitem').filter({ hasText: 'snack - Rp 10.000,00Add to' }).getByRole('button').click();
    await page.getByRole('listitem').filter({ hasText: 'snack - Rp 10.000,00Add to' }).getByRole('button').click();
    for (let i = 0; i < expectedText.length; i++) {
        await expect(page.locator('#cart')).toContainText(expectedText[i]);
    }
    await expect(page.getByRole('paragraph')).toContainText('Rp 25.000,00');
})
