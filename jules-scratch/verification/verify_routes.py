from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify that the main page loads correctly
    page.goto("http://localhost:3000")
    expect(page).to_have_title("QuantumPanda - Premium Web Hosting")
    page.screenshot(path="jules-scratch/verification/homepage.png")

    # Note: I cannot programmatically verify that the deleted pages return a 404
    # because the local server is configured to rewrite all not-found requests to
    # index.html. However, the successful build confirms that these pages are
    # no longer being generated.

    browser.close()

with sync_playwright() as playwright:
    run(playwright)