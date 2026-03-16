import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('signup page loads correctly', async ({ page }) => {
    await page.goto('/signup')
    
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()
    await expect(page.getByLabel('Full Name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible()
  })

  test('login page loads correctly', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  })

  test('signup form validates required fields', async ({ page }) => {
    await page.goto('/signup')
    await page.getByRole('button', { name: 'Create Account' }).click()
    
    // Form should not submit without required fields
    await expect(page.url()).toContain('/signup')
  })

  test('auth pages have no navbar/footer (clean split layout)', async ({ page }) => {
    await page.goto('/signup')
    
    // Auth pages should NOT have the marketing navbar
    const navCount = await page.locator('nav').count()
    expect(navCount).toBe(0)
    
    const footerCount = await page.locator('footer').count()
    expect(footerCount).toBe(0)
  })
})
