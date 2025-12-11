from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000/hosting/shared-hosting")
    page.screenshot(path="jules-scratch/verification/shared-hosting.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
