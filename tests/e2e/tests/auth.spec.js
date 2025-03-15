import { test, expect } from '@playwright/test';

let randNum = Date.now();

test('should be able to register', async ({ page }) => {
  await page.goto('http://localhost:8082/');
  await page.locator('#registerUsername').pressSequentially('aldy ' + randNum);
  await page.locator('#registerPassword').pressSequentially('123');
  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.locator('#notification')).toContainText('User registered')
});

test('should be able to login', async ({ page }) => {
  await page.goto('http://localhost:8082/');
  await page.locator('#loginUsername').pressSequentially('aldy ' + randNum);
  await page.locator('#loginPassword').pressSequentially('123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await expect(page.locator('#notification')).toContainText('Login successful')
});