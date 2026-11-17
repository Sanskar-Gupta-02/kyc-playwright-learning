# KYC Playwright Learning Framework

A self-contained TypeScript + Playwright project with a fictional KYC customer-review demo. It is designed to teach the patterns you can apply to your KYC360 framework. It does not copy or claim to reproduce KYC360 internals: the existing framework was not supplied.

## Start here

Install Node.js 22 or newer, then run:

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm test
npm run report
```

Playwright starts the demo automatically. To explore manually, run `npm run demo` and open http://127.0.0.1:3000. Sign in with `analyst@example.test` / `Learn123!`. These are published, fictional demo credentials.

## Learning order

1. Read `tests/01-login.spec.ts`. Run `npx playwright test 01-login --headed`. Follow how a test opens a page, uses a page object and asserts the result.
2. Read `pages/LoginPage.ts`. A page object owns locators and actions; the test owns the expected business outcome.
3. Read `fixtures/test.ts`, then `tests/02-customers.spec.ts`. The fixture signs in and injects page objects. Each test receives a fresh browser context, so tests do not depend on one another.
4. Read `test-data/customers.ts`, then `tests/03-review.spec.ts`. Two data rows produce two independent tests: clear customer approval and potential-match escalation.
5. Read `playwright.config.ts`. It controls the demo startup, browser, retries and failure evidence.
6. Read `docs/LEARNING_GUIDE.md` and try its exercises.

## Project map

| Path | Responsibility |
| --- | --- |
| `demo/` | Fictional application being tested |
| `tests/` | Scenarios, business assertions and report steps |
| `pages/` | Reusable locators and UI actions |
| `fixtures/` | Test setup and page-object injection |
| `test-data/` | Synthetic credentials and scenario inputs |
| `playwright.config.ts` | Test execution and evidence settings |
| `.github/workflows/playwright.yml` | CI installation, checks and report upload |

## Demo rules

Create customer → run screening → record decision → inspect audit trail.

Names containing `match` produce a potential match; other names produce a clear result. Screening must happen before a decision. Potential matches must be escalated. These are deterministic teaching rules, not actual screening logic or compliance advice.

The demo stores records and the sign-in flag in browser sessionStorage. Reloading keeps them within the same tab; a fresh browser context starts empty. The UI has no backend authentication, real screening provider, permissions or document upload. Never use it with real customer data or expose it as a production service.

## Useful commands

```sh
npm run test:headed
npm run test:debug
npx playwright test --grep @smoke
npx playwright test 03-review
npm run report
```

Failures retain screenshots, video and traces. Open the HTML report, select the failed test and inspect its attachments. A CI retry does not fix a failure: investigate a test that passes only on retry.

## Separate GitHub repository

The project is ready for a new repository named `kyc-playwright-learning`. It does not modify your existing KYC360 repository. From this directory, with GitHub CLI installed and signed in:

```sh
git init -b main
git add .
git commit -m "Add KYC Playwright learning framework"
gh repo create kyc-playwright-learning --public --source=. --remote=origin --push
```

Use `--private` instead if desired. GitHub Actions runs the tests after the push. The demo runs locally and inside CI; a GitHub repository alone does not host a live demo website.
