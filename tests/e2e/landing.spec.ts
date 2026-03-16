import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('loads with navbar and all sections', async ({ page }) => {
    await page.goto('/')
    
    // Check navbar
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('nav').getByText('LineageAI')).toBeVisible()
    
    // Check hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('7 in 10 at-risk families never get tested')).toBeVisible()
    
    // Check at least 8 sections (hero, problem, solution, features, how-it-works, social proof, pricing, FAQ)
    const sections = await page.locator('section').count()
    expect(sections).toBeGreaterThanOrEqual(8)
    
    // Check footer exists
    await expect(page.locator('footer')).toBeVisible()
    
    // Check pricing section
    await page.getByText('Pricing').first().click()
    await expect(page.getByText('Pilot')).toBeVisible()
    await expect(page.getByText('Pro')).toBeVisible()
    await expect(page.getByText('Enterprise')).toBeVisible()
  })

  test('has no broken links on primary navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check nav links
    const navLinks = ['Pricing', 'About', 'Contact']
    for (const link of navLinks) {
      const response = await page.goto(`/${link.toLowerCase()}`)
      expect(response?.status()).toBe(200)
    }
  })

  test('images load on scroll', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 3000))
    await page.waitForLoadState('networkidle')
    
    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src)
    })
    
    expect(brokenImages).toHaveLength(0)
  })

  test('is responsive at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    
    // Ensure page doesn't overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(375)
  })
})
