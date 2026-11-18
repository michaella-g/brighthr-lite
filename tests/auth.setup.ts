import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const email = process.env.BRIGHTHR_EMAIL;
  const password = process.env.BRIGHTHR_PASSWORD;
  if (!email || !password) {
    throw new Error('Set BRIGHTHR_EMAIL and BRIGHTHR_PASSWORD (copy .env.example to .env)');
  }

  await page.goto('/');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /log ?in|sign ?in/i }).click();

  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
  await page.context().storageState({ path: authFile });
});
