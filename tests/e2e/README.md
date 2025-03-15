# E2E Test Automation Framework for eCommerce Demo App

This project provides end-to-end (E2E) test automation for an eCommerce application using Playwright.

## Prerequisites
- Node.js 22+
- npm 11+

## Getting Started

1. Install dependencies:
```bash
npm install
npx playwright install --with-deps
```

2. Run tests in Chromium:
```bash
npx playwright test --project=chromium
```

## Running Tests
Choose one of these methods:
1. **VS Code Extension**:
   - Install the "Playwright Test for VSCode" extension
   - Use the testing sidebar to run individual tests

2. **Command Line**:
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/auth.spec.js

# Run in headed mode
npx playwright test --headed

# Generate HTML report
npx playwright show-report
```

## Project Structure
```
├── playwright.config.js    # Playwright configuration
├── tests/                  # Test specifications
│   ├── auth.spec.js        # Authentication tests
│   └── addToCart.spec.js   # Shopping cart tests
├── test-results/           # Automated test artifacts
└── playwright-report/      # HTML test reports
```

## Recommended VS Code Extensions
- Playwright Test for VSCode
- Playwright Runner
