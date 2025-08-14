import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
    test('should display login form', async ({ page }) => {
        await page.goto('/login');

        await expect(
            page.getByRole('heading', { name: 'Login' })
        ).toBeVisible();
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByLabel('Password')).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Sign In' })
        ).toBeVisible();
    });

    test('should show validation errors', async ({ page }) => {
        await page.goto('/login');

        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page.getByText('Invalid email address')).toBeVisible();
        await expect(
            page.getByText('Password must be at least 6 characters')
        ).toBeVisible();
    });
});
