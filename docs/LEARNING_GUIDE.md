# Understand the framework by following one test

Start with the `Clear becomes Approved` test in `tests/03-review.spec.ts`.

## What happens when you run npm test?

1. The Playwright command loads `playwright.config.ts` and discovers the spec files.
2. `webServer` launches `demo/server.mjs`, then waits for the HTTP server.
3. Playwright creates a fresh browser context and page for each test.
4. The test requests `customersPage`. Its custom fixture creates LoginPage, opens the app, signs in, and verifies the workspace is visible.
5. `await use(...)` hands the CustomersPage object to the test. Code after `use` would be fixture teardown; browser cleanup is already provided by Playwright.
6. The test calls `create` and `open`. Those page-object methods use accessible labels and roles to interact with the UI.
7. The ReviewPage method clicks screening. The demo updates its state and audit list.
8. `expect(...).toHaveText(...)` retries until the expected text appears or the assertion times out. Avoid fixed sleeps; waiting an arbitrary time neither proves readiness nor explains failure.
9. The test saves a decision, checks the final status and checks the complete audit trail. Clicking Save alone would not prove the workflow succeeded.
10. Playwright closes that test's context and writes report results.

The `.js` suffix in TypeScript imports follows NodeNext module resolution. TypeScript resolves those imports to the `.ts` source during checking; Playwright loads the source when executing tests.

## How this relates to a KYC360-style project

| Learning example | Pattern to carry into your real project |
| --- | --- |
| Analyst login | Login page object and authenticated setup |
| Customer form | Customer/entity page object and synthetic data factory |
| Screening action | Wait for real screening completion and assert its business result |
| Approval/escalation | Separate positive and negative workflow scenarios |
| Audit list | Verify persisted evidence, actor and timestamps where applicable |
| Session-isolated data | Use unique server-side records and reliable cleanup in a real shared environment |

Exact selectors, endpoints, roles, statuses and business rules must come from your real application. Changing only baseURL will not make this suite test KYC360. The demo intentionally logs in per test so setup is easy to follow. Later, real authentication can use a setup project and storageState after checking how the application stores sessions. Playwright storageState does not automatically preserve sessionStorage.

## Small exercises

1. Add a third synthetic customer in `test-data/customers.ts`. Create it in an independent test and assert its country.
2. Add a search-with-no-results scenario. Assert the customer list is empty.
3. Add a required-notes scenario. An empty textarea triggers native browser validation; assert the status stays Pending review and no decision audit entry appears.
4. Add a reload-after-decision check. Reopen the same record and verify the saved decision and audit.
5. Deliberately change an expected status, run the test, and inspect its trace in the HTML report. Restore the assertion afterwards.
6. Add Firefox as another project, install its browser, and compare execution.

## Debugging checklist

Read the assertion message first. Inspect the screenshot for the actual page, then trace the preceding actions. Confirm the locator uniquely identifies the intended control. Check the test's inputs and setup before changing timeouts. Keep assertions about business outcomes in tests and reusable interactions in page objects.

## Future stages

Add a real API layer only when there is a backend to exercise. Add authentication reuse when repeated login becomes expensive. Add environments when there is more than one deployed target. Add cleanup when records live beyond the test context. Avoid unused helper folders, generic BasePage wrappers and custom retry loops until a concrete repeated need appears.
