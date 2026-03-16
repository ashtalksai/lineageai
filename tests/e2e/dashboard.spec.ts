import { test, expect } from '@playwright/test'

test.describe('Dashboard & App Pages', () => {
  test('dashboard loads with correct layout', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Should have sidebar navigation
    await expect(page.getByText('LineageAI')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Cases' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Letters' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Compliance' })).toBeVisible()
    
    // Should show stat cards
    await expect(page.getByText('Open Cases')).toBeVisible()
    await expect(page.getByText('Pending Outreach')).toBeVisible()
    
    // Should show active cases table
    await expect(page.getByText('Active Cases')).toBeVisible()
  })

  test('cases page loads', async ({ page }) => {
    await page.goto('/cases')
    await expect(page.url()).toContain('/cases')
    // Should not 404
    const content = await page.content()
    expect(content).not.toContain('404')
    expect(content).not.toContain('page could not be found')
  })

  test('letters page loads', async ({ page }) => {
    await page.goto('/letters')
    await expect(page.url()).toContain('/letters')
    const content = await page.content()
    expect(content).not.toContain('404')
  })

  test('compliance page loads', async ({ page }) => {
    await page.goto('/compliance')
    await expect(page.url()).toContain('/compliance')
    const content = await page.content()
    expect(content).not.toContain('404')
  })

  test('settings page loads', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.url()).toContain('/settings')
    const content = await page.content()
    expect(content).not.toContain('404')
  })

  test('/deck pitch deck page loads', async ({ page }) => {
    await page.goto('/deck')
    await expect(page.url()).toContain('/deck')
    const content = await page.content()
    expect(content).not.toContain('404')
  })

  test('/docs hub page loads', async ({ page }) => {
    await page.goto('/docs')
    await expect(page.url()).toContain('/docs')
    const content = await page.content()
    expect(content).not.toContain('404')
  })
})
