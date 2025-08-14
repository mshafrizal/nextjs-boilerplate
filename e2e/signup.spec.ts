import { test, expect } from '@playwright/test';

test.describe('Signup Form', () => {
    test('should open signup modal when clicking the signup button', async ({
        page,
    }) => {
        // Navigate to the home page
        await page.goto('/');

        // Click the signup button
        await page.getByTestId('signup-btn').click();

        // Check if the signup modal is visible
        await expect(page.getByRole('dialog')).toBeVisible();
    });

    test('should navigate through all steps of the signup form', async ({
        page,
    }) => {
        // Navigate to the home page
        await page.goto('/');

        // Click the signup button
        await page.getByTestId('signup-btn').click();

        // Step 1: Fill in account information
        await page.getByTestId('email-input').fill('test@example.com');
        // Select phone country code
        await page.getByText('code').first().click();
        await page.getByRole('option').first().click();
        await page.getByTestId('phone-input').fill('1234567890');
        await page.getByTestId('password-input').fill('Password1!');
        await page.getByRole('button', { name: /nextStep/ }).click();

        // Step 2: Fill in personal information
        await page.getByTestId('first-name-input').fill('John');
        await page.getByTestId('last-name-input').fill('Doe');

        // Select birth date
        await page.getByTestId('datepicker-toggle').click();
        await page.getByRole('gridcell', { name: '15' }).click();

        // Select last visited property
        await page.locator('button[role="combobox"]').first().click();
        await page.getByRole('option').first().click();

        await page.getByRole('button', { name: /nextStep/ }).click();

        // Step 3: Fill in address information
        // Select country
        await page.locator('button[role="combobox"]').first().click();
        await page.getByRole('option').first().click();

        // If Indonesia is selected, fill in province and city
        await page.locator('button[role="combobox"]').nth(1).click();
        await page.getByRole('option').first().click();

        await page.locator('button[role="combobox"]').nth(2).click();
        await page.getByRole('option').first().click();

        // Fill in address details
        await page.getByTestId('postal-code-input').fill('12345');
        await page.getByTestId('address-input').fill('123 Main St');

        // Check consent checkbox
        await page.getByTestId('consent-checkbox').check();

        // Submit the form
        await page.getByRole('button', { name: /nextStep/ }).click();

        // Check for success message or redirection
        // This will depend on what happens after successful submission
        // For example:
        // await expect(page.getByText('Registration successful')).toBeVisible();
    });

    test('should show validation errors when submitting empty form', async ({
        page,
    }) => {
        // Navigate to the home page
        await page.goto('/');

        // Click the signup button
        await page.getByTestId('signup-btn').click();

        // Try to proceed without filling in required fields
        await page.getByRole('button', { name: /nextStep/ }).click();

        // Check for validation errors
        await expect(page.getByText(/validation.required/)).toBeVisible();
    });

    test('should allow navigation between steps', async ({ page }) => {
        // Navigate to the home page
        await page.goto('/');

        // Click the signup button
        await page.getByTestId('signup-btn').click();

        // Fill in step 1 and proceed to step 2
        await page.getByTestId('email-input').fill('test@example.com');
        // Select phone country code
        await page.locator('button[role="combobox"]').first().click();
        await page.getByRole('option').first().click();
        await page.getByTestId('phone-input').fill('1234567890');
        await page.getByTestId('password-input').fill('Password1!');
        await page.getByRole('button', { name: /nextStep/ }).click();

        // Check if we're on step 2
        await expect(page.getByTestId('first-name-input')).toBeVisible();

        // Go back to step 1
        await page.getByRole('button', { name: /previous/ }).click();

        // Check if we're back on step 1
        await expect(page.getByTestId('email-input')).toBeVisible();

        // Check if the data is preserved
        await expect(page.getByTestId('email-input')).toHaveValue(
            'test@example.com'
        );
        await expect(page.getByTestId('phone-input')).toHaveValue('1234567890');
        await expect(page.getByTestId('password-input')).toHaveValue(
            'Password1!'
        );
    });
});
