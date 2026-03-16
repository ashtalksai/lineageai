import { test, expect } from '@playwright/test'

const breakpoints = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
]

const marketingPages = ['/', '/pricing', '/about', '/contact']

for (const breakpoint of breakpoints) {
  test.describe(`Responsive - ${breakpoint.name} (${breakpoint.width}px)`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height })
    })

    for (const pagePath of marketingPages) {
      test(`${pagePath} renders at ${breakpoint.width}px`, async ({ page }) => {
        await page.goto(pagePath)
        await page.waitForLoadState('networkidle')
        
        // No horizontal overflow
        const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth)
        expect(overflow).toBe(false)
        
        // Content is visible
        const bodyText = await page.textContent('body')
        expect(bodyText?.length).toBeGreaterThan(100)
      })
    }
  })
}
