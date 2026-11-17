# Learn Playwright from the beginning

Imagine you have a tiny robot helper. You teach it to open a website, type into boxes, click buttons, and check the answers. Playwright is the tool that lets you give that robot instructions.

You do not need to understand all the code at once. Read one lesson, try its steps, and then continue. The examples below match the files in this repository.

## Your learning map

| Lesson | Question we will answer |
| --- | --- |
| 1 | What are we building, and why? |
| 2 | What do the folders and strange words mean? |
| 3 | How do I get the project running? |
| 4 | What does the demo do when I use it myself? |
| 5 | How does a simple login test work? |
| 6 | Why do we use page objects? |
| 7 | What are fixtures and test data? |
| 8 | How do the customer and review tests work? |
| 9 | What happens inside the demo? |
| 10 | What do the settings and GitHub workflow do? |
| 11 | How do I investigate a failure? |
| 12 | How do I write my own test? |

## Lesson 1: What are we building?

### What

We have two things:

1. A small pretend customer-review website in `demo/`.
2. Tests that drive that website in `tests/`.

The website is the thing being checked. Playwright is the helper checking it.

KYC means “Know Your Customer.” In this learning project, an analyst creates a pretend customer, runs a pretend check, and records a decision. An analyst is simply the person doing the review.

### Why

Suppose a developer changes the Save button and accidentally breaks customer approval. A repeatable test can help catch that mistake.

An automated test is a recipe with a check at the end:

- Arrange: get the page and data ready.
- Act: do something.
- Assert: check what happened.

An assertion is a question the computer must answer, such as “Does the status say Approved?”

### How our demo behaves

| Situation | Demo result |
| --- | --- |
| Correct demo email and password | Workspace opens |
| Wrong password | Error appears |
| Customer name contains “match,” ignoring letter case | Screening says Potential match |
| Customer name does not contain “match” | Screening says Clear |
| Try to decide before screening | Decision is blocked |
| Try to approve a potential match | Decision is blocked |
| Approve a clear customer with notes | Status becomes Approved |
| Escalate a screened customer with notes | Status becomes Escalated |

These are made-up teaching rules. The demo does not contact a real screening service. “Clear” does not prove anything about a real person. The project illustrates patterns you can apply to KYC360; it does not reproduce KYC360's actual rules or internal code.

**Check yourself:** What is the difference between clicking Save and checking that the status changed? Clicking is an action. Checking the result is an assertion. We need both.

## Lesson 2: Meet the files and words

Think of the project as a school play. The demo is the stage, tests are the script, page objects know where the props are, and fixtures prepare the stage.

### Every project file has a job

| File or folder | What it is | Why it is needed |
| --- | --- | --- |
| `README.md` | Front door to the project | Gives quick setup and navigation |
| `docs/LEARNING_GUIDE.md` | This lesson book | Explains the ideas slowly |
| `docs/VALIDATION.md` | Record of earlier checks | Separates checks performed from checks blocked |
| `package.json` | Tool list and command shortcuts | Tells npm what to install and run |
| `package-lock.json` | Exact dependency record | Helps different computers install the same versions |
| `tsconfig.json` | TypeScript checking rules | Finds certain code mistakes before running tests |
| `playwright.config.ts` | Playwright settings | Chooses browser, server, reports, and other options |
| `demo/server.mjs` | Small local web server | Sends the website to your browser |
| `demo/index.html` | Page layout, appearance, and behavior | Gives the tests a website to use |
| `pages/LoginPage.ts` | Login actions | Keeps login controls in one reusable place |
| `pages/CustomersPage.ts` | Customer actions | Creates, searches, and opens customers |
| `pages/ReviewPage.ts` | Review actions and locators | Screens customers and records decisions |
| `fixtures/test.ts` | Prepared version of Playwright's test tool | Signs in and supplies page objects when requested |
| `test-data/customers.ts` | Pretend inputs | Keeps names and demo credentials reusable |
| `tests/01-login.spec.ts` | Two login tests | Checks successful and unsuccessful login |
| `tests/02-customers.spec.ts` | One customer test | Checks creation, search, and reload persistence |
| `tests/03-review.spec.ts` | Four review tests | Checks decisions, audit entries, and blocked actions |
| `.github/workflows/playwright.yml` | GitHub's instruction sheet | Runs checks on a GitHub computer |
| `.gitignore` | Files Git should skip | Keeps installed tools, reports, and local secrets out of commits |

### A small dictionary

| Word | Simple meaning |
| --- | --- |
| Repository, or repo | A project whose saved changes are tracked by Git |
| Terminal | A place to type commands for your computer |
| Node.js | A program that can run JavaScript outside a browser |
| npm | A tool that installs JavaScript packages and runs shortcuts |
| Package | A reusable bundle of code |
| TypeScript | JavaScript with extra information for checking how values are used |
| Browser | The program displaying the website |
| Page | Playwright's handle for a browser tab |
| Locator | Instructions for finding a particular thing on a page |
| Method | A named action belonging to an object |
| Fixture | A prepared resource a test can ask for |
| Assertion | A check comparing the actual result with the expected result |
| Browser context | A separate browser session, like a fresh profile |
| CI | Checks run automatically on another computer |
| Audit trail | A list recording what happened |

A `.ts` file contains TypeScript. A `.spec.ts` file is a TypeScript test file. A `.json` file stores structured information. A `.yml` file stores settings using indentation. A `.md` file is readable text with Markdown formatting.

## Lesson 3: Get the project running

### Step 1: Install the tools

**What:** Install Git and Node.js 22 or newer from their official websites if you do not have them.

**Why:** Git downloads the project. Node.js runs the demo and test tools. npm comes with Node.js.

**How:** Open a terminal and check:

```sh
git --version
node --version
npm --version
```

**Expected:** Each command prints a version. If a command is “not found” or “not recognized,” install that tool and reopen the terminal.

### Step 2: Download the repository

```sh
git clone https://github.com/Sanskar-Gupta-02/kyc-playwright-learning.git
cd kyc-playwright-learning
```

**What:** The first command downloads the project. The second enters its folder.

**Why:** Commands such as `npm ci` need to run where `package.json` lives.

**Check:** You should see `package.json`, `tests`, `pages`, and `docs` in the folder.

If you already cloned this project, enter that existing folder. You do not need another copy. Use `git pull` to get new commits when your local changes are safely saved.

### Step 3: Install the project packages

```sh
npm ci
```

**What:** Downloads the tools listed in the lockfile into `node_modules/`.

**Why:** The repository contains our code, but not a copy of every installed tool.

**Expected:** npm finishes without an error. Warnings are not always failures; read the final result.

Do not edit `node_modules`. It can be rebuilt with this command.

### Step 4: Install the test browser

```sh
npx playwright install chromium
```

**What:** Downloads the Chromium browser version used by the installed Playwright package.

**Why:** Installing the Playwright package and installing its browser are separate steps.

**How:** `npx` runs the project's Playwright command. Chromium is the browser selected in this project's configuration. On Linux, if missing system libraries are reported, Playwright's `install --with-deps chromium` command also installs browser dependencies and may require administrator access.

### Step 5: Check TypeScript

```sh
npm run typecheck
```

**What:** Runs `tsc --noEmit`.

**Why:** It can find mistakes such as passing the wrong type of value.

**Expected:** It finishes without TypeScript errors. This does not prove the website works; it is a code check.

### Step 6: Run one visible test

```sh
npx playwright test 01-login --headed --workers=1
```

**What:** Runs the login test file with a visible browser, one worker at a time.

**Why:** Watching one browser is easier when learning.

**Expected:** The demo server starts automatically, login tests run, and the terminal reports their results. Browsers may close quickly after a test. For slower investigation, use the debugger in Lesson 11.

### Step 7: Run everything and see the report

```sh
npm test
npm run report
```

**What:** The first command runs all tests. The second serves the HTML report.

**Expected:** This version defines seven tests. Read the actual run summary rather than assuming they passed. The report shows names, results, and failure evidence when available.

Use Ctrl+C to stop a long-running report server.

## Lesson 4: Use the website yourself first

Understanding the manual journey makes the test code easier to understand.

### Step 1: Start the demo

```sh
npm run demo
```

Keep that terminal open. Open http://127.0.0.1:3000 in your browser.

- `127.0.0.1` means your own computer.
- `3000` is the server's port, like a numbered door.
- The demo is running locally. A public GitHub repository does not automatically publish a live website.

### Step 2: Sign in

Email: `analyst@example.test`

Password: `Learn123!`

These are fictional public demo credentials, not private account details.

**Expected:** Customer review workspace appears.

### Step 3: Create a clear customer

Enter `Asha Learning`, choose `India`, and click Create customer. Open that customer from the list.

**Expected:** Screening is Not screened. Review status is Pending review.

### Step 4: Try the wrong order

Choose Approve, enter notes, and click Save decision before screening.

**Expected:** “Run screening before saving a decision” appears. Status stays Pending review.

**Why try this?** Good testing checks that the app blocks a wrong action as well as accepting a right action.

### Step 5: Complete the review

Click Run demo screening. Choose Approve, enter notes, and save.

**Expected:** Screening says Clear, status says Approved, and the audit trail includes your decision and notes.

### Step 6: Try the other path

Go back, create `Demo Match Customer`, open it, and run screening.

Try Approve with notes first.

**Expected:** A message says potential matches require escalation. Choose Escalate and save with notes.

**Expected:** Status becomes Escalated.

**Remember:** The word “match” in the name triggers this fictional result. No external database is checked.

## Lesson 5: Read your first test slowly

Open [the login tests](../tests/01-login.spec.ts).

### Step 1: Borrow the tools

```ts
import {test,expect} from '@playwright/test';
```

**What:** Brings in the test tool and assertion tool.

**Why:** We need something to run the instructions and something to check the answers.

Braces select named exports. `import` means “use something provided by another file or package.”

### Step 2: Bring in the page object and inputs

```ts
import {LoginPage} from '../pages/LoginPage.js';
import {analyst} from '../test-data/customers.js';
```

`../` means “go up one folder.” The imports end in `.js` because this project uses NodeNext module rules. TypeScript resolves them to our `.ts` sources while checking, and Playwright loads the source for the tests. Do not rename the TypeScript files to fix these imports.

### Step 3: Give the test a name

```ts
test('analyst signs in and out @smoke', async ({page}) => {
  // Instructions go here.
});
```

**What:** Registers a named test and a function containing its work.

**Why:** The name tells us what behavior broke if the test fails.

- `async` allows this function to use `await`.
- `await` means “wait for this operation to finish before moving on.”
- `({page})` asks Playwright to supply its built-in page fixture.
- `=>` introduces the function body.
- `@smoke` is a text label we can filter on. It does not change browser behavior.

Without awaiting actions, instructions can overlap unexpectedly.

### Step 4: Prepare and act

```ts
const login = new LoginPage(page);
await login.open();
await login.signIn(analyst.email, analyst.password);
```

**What:** Creates a login helper for this tab, opens the website, and signs in.

**Why:** The test can describe the journey without repeating all the input selectors.

`const` gives a value a name. `new LoginPage(page)` creates an instance of the class. `analyst.email` reads the email field of the analyst object.

### Step 5: Check the answer

```ts
await expect(
  page.getByRole('heading', {name:'Customer review workspace'})
).toBeVisible();
```

**What:** Finds the named heading and checks that it is visible.

**Why:** A successful click on Sign in does not prove login succeeded.

**How:** This web assertion waits and checks again until it succeeds or reaches its timeout. It does not just check once immediately.

The test then clicks Sign out and checks that Analyst login is visible again.

### Step 6: Understand the second test

It submits the right email with the wrong password. It checks both the error text and that the workspace heading is hidden.

**Why both?** An error message alone would not catch a bug that also displayed the workspace.

## Lesson 6: Page objects are reusable instruction cards

Open [LoginPage.ts](../pages/LoginPage.ts).

```ts
export class LoginPage {
  constructor(private page: Page) {}
}
```

**What:** Defines a reusable class. Its constructor receives and remembers the browser page.

**Why:** All its methods need to act on the same tab.

`export` lets another file import the class. `Page` is a TypeScript type describing Playwright's page. `private` limits direct access to that stored field in TypeScript. `this.page` means “the page stored on this particular object.”

### How the open method works

```ts
async open() { await this.page.goto('/'); }
```

The configuration supplies the base address. Adding `/` opens its home page.

### How the signIn method works

```ts
await this.page.getByLabel('Email', {exact:true}).fill(email);
await this.page.getByLabel('Password', {exact:true}).fill(password);
await this.page.getByRole('button', {name:'Sign in',exact:true}).click();
```

| Part | What it means | Why |
| --- | --- | --- |
| `getByLabel('Email')` | Find the input associated with the Email label | Uses the name a person understands |
| `exact:true` | Match the complete name | Avoids accidentally matching a similar label |
| `fill(email)` | Put the supplied email into the input | The same method can try different inputs |
| `getByRole('button', ...)` | Find a button by role and accessible name | Makes the intended control clear |
| `click()` | Click the control | Performs the action |

A locator describes how to find an element. Making a locator does not itself click anything. Playwright checks readiness before actions such as clicking, but you still need assertions about the business result.

### Why use this extra file?

If ten tests sign in and the Email label changes, we can update one page-object method instead of ten copies.

The page object handles “how to click.” The test states “what should happen.”

[CustomersPage.ts](../pages/CustomersPage.ts) applies the same idea:

- `create(name, country)` fills the form and submits it.
- If country is omitted, it uses United Kingdom.
- `search(name)` fills the search box.
- `open(name)` clicks the customer's named button.

[ReviewPage.ts](../pages/ReviewPage.ts) provides screening and decision actions. Its `get status()` getter returns a locator when you read `reviewPage.status`. `#review-status` means the element whose HTML id is review-status.

`decision: 'Approve' | 'Escalate'` means TypeScript accepts either of those two strings. It helps catch a typo such as `'Aprove'` during type checking.

## Lesson 7: Fixtures prepare the desk; data supplies the ingredients

### Test data: what, why, how

Open [customers.ts](../test-data/customers.ts).

```ts
export const customers = {
  clear: {name:'Asha Learning',country:'India'},
  potentialMatch: {name:'Demo Match Customer',country:'United Kingdom'},
};
```

**What:** A named collection of pretend inputs.

**Why:** Test readers can see which example is clear and which produces a match. We avoid repeating spelling-sensitive names everywhere.

**How:** `customers.clear.name` selects the clear example's name.

This file does not create a customer in the app. A test must still call `customersPage.create(...)`.

### Fixtures: what, why, how

Open [fixtures/test.ts](../fixtures/test.ts).

The file imports Playwright's original test tool as `base`, then uses `base.extend` to make a version that knows about two extra resources: `customersPage` and `reviewPage`.

For the customersPage fixture:

1. Playwright supplies a fresh page.
2. The fixture makes LoginPage.
3. It opens the demo.
4. It signs in using demo credentials.
5. It checks that the workspace is visible.
6. `await use(new CustomersPage(page))` lends the prepared object to the test.
7. After the test, control returns from `use`. Additional cleanup could go there; Playwright already handles its page and context cleanup.

The reviewPage fixture only supplies a ReviewPage object. It does not log in by itself. In our review tests, requesting customersPage provides the login setup.

### Why are there two different test imports?

| Import source | What the test receives |
| --- | --- |
| `@playwright/test` | Standard fixtures such as page; login tests do their own setup |
| `../fixtures/test.js` | Standard fixtures plus our customer and review page fixtures |

If you request customersPage while importing the standard test tool, it will not know our custom fixture.

### Why separate browser contexts?

Imagine each test has its own clean notebook. One test's scribbles should not change another test's answer.

Playwright gives each test a fresh context. This demo uses sessionStorage in the browser tab, so each test starts without another test's customers or login flag.

The filename numbers are a reading order, not a promise that tests run one after another. Parallel tests may run together. Each test must prepare what it needs.

## Lesson 8: Understand all the customer and review tests

### Customer test: create, search, and persist

Open [02-customers.spec.ts](../tests/02-customers.spec.ts).

| Step | What happens | Why |
| --- | --- | --- |
| Request customersPage | Fixture opens the app and logs in | Start from the workspace |
| Create Asha Learning in India | Add a clear customer | Prepare the record to find |
| Create Demo Match Customer | Add another customer | Search now has something to exclude |
| Search Asha Learning | Filter the list | Exercise search behavior |
| Check Asha is visible | Confirm the desired result | Prove the search found the right record |
| Check the other button is hidden | Confirm it is excluded | Catch a search that shows everything |
| Reload the page | Rebuild the UI in the same tab | Check session persistence |
| Open Asha | Navigate to the saved customer | Prove it is still available |
| Check Asha Learning / India | Compare saved details | Catch incorrect name or country |

The search input itself is not saved. After reload, the test opens the customer by name again. Persistence here means browser session storage, not saving to a database.

### Two positive review tests from one recipe

Open [03-review.spec.ts](../tests/03-review.spec.ts).

The `for...of` loop registers a separate test for each scenario.

| Input | Expected screening | Decision | Expected final status |
| --- | --- | --- | --- |
| Asha Learning | Clear | Approve | Approved |
| Demo Match Customer | Potential match | Escalate | Escalated |

This is called data-driven testing: the journey is similar, while the ingredients and expected answers change. These are two independent tests, not one long test sharing a customer.

The backticks around the test name allow values inside `${...}` to become part of the name. `as const` keeps each decision's TypeScript type narrow enough for the page object's allowed choices.

### Follow the clear review test

1. Its fixtures prepare the page objects and sign in.
2. `test.step('Create customer', ...)` groups actions under a readable report label.
3. The test creates and opens its own customer.
4. `reviewPage.screen()` clicks the screening button.
5. An assertion checks the screening result is Clear.
6. `decide('Approve', 'Reviewed synthetic evidence')` selects a decision, fills notes, and clicks Save.
7. An assertion checks the final status is Approved.
8. An assertion checks all three audit list items, in order.

The expected audit entries are:

```text
Customer created
Demo screening completed: Clear
Approved: Reviewed synthetic evidence
```

**Why check the audit list?** A status could change while the record of the action is missing. The test checks both outputs.

### Negative test: screening first

The test creates a customer and tries to approve it before screening.

It checks the exact error and that the status is still Pending review.

**What it proves:** This attempted action is blocked in this demo.

### Negative test: potential match approval

The test creates a matching customer, screens it, and attempts approval.

It checks the escalation-required error and the unchanged Pending review status.

**What it proves:** This direct approval attempt is blocked.

A passing test proves only the conditions it actually checks. These seven tests do not cover every possible input, security issue, browser, or real KYC rule.

## Lesson 9: What happens inside the demo?

### The server delivers the page

Open [server.mjs](../demo/server.mjs).

1. `readFile` loads index.html into memory when the server starts.
2. `createServer` defines how to answer a browser request.
3. Requests for `/` or `/index.html` receive the HTML.
4. Status 200 means the request succeeded.
5. Unknown paths receive status 404 and “Not found.”
6. `listen(3000, '127.0.0.1')` opens the local server.

This server serves the page. It does not store customer records or check passwords on a backend.

### The page contains three kinds of instructions

Open [index.html](../demo/index.html).

| Part | Job | Everyday comparison |
| --- | --- | --- |
| HTML | Headings, forms, buttons, labels | Building blocks |
| CSS inside style | Colors, spacing, fonts | Decoration |
| JavaScript inside script | Responds to clicks and updates records | Rules for what happens |

The demo shows and hides login, workspace, and review sections. These are sections of one HTML page rather than separate server routes.

### Customer data has a little life story

1. Creating a customer adds an object to the `records` array.
2. That object has a name, country, screening value, review status, and audit list.
3. `persist()` converts the array to text with `JSON.stringify` and stores it in sessionStorage.
4. Reloading reads that text and rebuilds the array with `JSON.parse`.
5. Rendering functions update the visible list and review details.

An array is an ordered list. An object groups named values together. JSON is a text format for saving those values.

Session storage survives a reload in the same tab. It is temporary browser storage, not a shared database. Signing out removes the sign-in flag; it does not delete the customer records in that tab. A fresh Playwright context starts separately.

### How the pretend screening works

The code converts the name to lowercase and checks whether it includes `match`. The result is Potential match or Clear. It appends an audit message, saves records, and redraws the review.

Running screening again resets the review status to Pending review and adds another screening entry. The current tests do not check this repeat-screening case.

### How saving a decision works

The form needs review notes. Empty notes can trigger the browser's built-in required-field validation before the JavaScript save handler runs.

When the handler runs, it checks screening, trimmed notes, and the potential-match approval rule. If allowed, it changes the status, appends the decision and notes to the audit list, saves, and redraws.

The login check is only JavaScript in a teaching page. It is not secure authentication. Use synthetic data here.

## Lesson 10: Settings and automatic checks

### Playwright settings, one at a time

Open [playwright.config.ts](../playwright.config.ts).

| Setting | What it does | Why this project uses it |
| --- | --- | --- |
| testDir | Looks for tests in tests/ | Keeps test files together |
| fullyParallel | Allows tests in files to run in parallel | Independent tests can finish faster |
| forbidOnly | Rejects focused tests in CI | Prevents accidentally running just one test |
| retries | One retry in CI, zero locally | Provides another attempt on CI; investigate flaky results |
| workers | Two workers in CI | Limits simultaneous work there |
| list reporter | Prints terminal results | Gives immediate feedback |
| html reporter | Builds a browsable report | Makes failures easier to investigate |
| baseURL | Supplies the local website address | Page objects can use short paths |
| trace | Retains traces for failed tests | Shows actions and page snapshots |
| screenshot | Saves a screenshot on failure | Shows the page at the failure |
| video | Retains video on failure | Helps replay what happened |
| projects | Selects Chromium with desktop settings | Starts with one browser to learn |
| webServer.command | Runs npm run demo | Starts the website automatically |
| webServer.url | Waits for the local address to respond | Avoids testing before startup |
| reuseExistingServer | Allows reuse locally, not in CI | Lets you keep a manual demo running locally |

`process.env.CI` reads the environment's CI value. `?` and `:` choose between two values. `!!` turns a value into true or false. `!` means the opposite.

Desktop Chrome settings are device settings; the configured browser is Chromium. They do not require installing Google's branded Chrome.

### package.json and the lockfile

`scripts` gives names to commands. For example, `npm test` runs `playwright test`, and `npm run demo` runs `node demo/server.mjs`.

`devDependencies` lists tools used to develop and test the project. `private: true` prevents accidental npm publishing; it does not make the GitHub repository private. `type: module` selects JavaScript module behavior.

The lockfile records the resolved package versions. Commit it so `npm ci` has a repeatable recipe. Do not hand-edit it to update tools.

### TypeScript settings

| Setting | Simple explanation |
| --- | --- |
| target: ES2022 | Choose a JavaScript language target |
| module/moduleResolution: NodeNext | Follow Node-style module and import rules |
| strict: true | Enable stronger type checks |
| noEmit: true | Check without writing compiled JavaScript files |
| types: node | Include Node's type information |
| include: **/*.ts | Check TypeScript files throughout the project |

Playwright can load TypeScript tests, but running them is not a replacement for the separate typecheck command.

### GitHub Actions: a helper computer

Open [the workflow](../.github/workflows/playwright.yml).

It runs on pushes, pull requests, and manual workflow dispatches.

1. GitHub starts an Ubuntu runner.
2. Checkout downloads the repository.
3. Setup Node installs Node 22 and configures npm caching.
4. `npm ci` installs packages.
5. Playwright installs Chromium and its Linux dependencies.
6. TypeScript checks run.
7. Tests run.
8. The upload step tries to save the HTML report even if an earlier step failed. If no report was produced, there may be nothing to upload.
9. Uploaded reports are configured to remain for 14 days.

The job has a 15-minute time limit. Its `contents: read` permission lets the workflow read the repository; it does not grant this chat permission to push code.

On GitHub, open Actions, select the run, and read the job steps. Green means that run succeeded. Red means something failed. The workflow file's presence alone does not prove a passing run.

### Why .gitignore matters

Installed packages and generated evidence can be recreated. They should not clutter source commits. The file also excludes `.env` and an authentication-state folder. Ignoring a file does not remove a secret that was already committed.

## Lesson 11: Investigate a failure like a detective

A failure is a clue. It could be an app bug, a test mistake, bad input, or an environment problem.

### Step 1: Read what failed

Find the test name and first useful error. Ask: did the browser launch? Did login work? Which action or assertion failed?

A browser-launch failure does not tell you whether the approval feature works.

### Step 2: Run only that test

```sh
npx playwright test 03-review --headed --workers=1
```

This selects the review file and makes the browser visible.

### Step 3: Pause with the debugger

```sh
npx playwright test 03-review --debug
```

Use the inspector controls to move through actions and inspect locators. Watch what is on the page before changing code.

### Step 4: Open the report

```sh
npm run report
```

Select the failing test. Inspect its assertion message, screenshot, trace, and video when attached. The trace helps connect an action with the page state at that moment.

### Step 5: Compare expected and actual

If the test expects Approved but sees Pending review, check whether screening ran, notes were supplied, and an error appeared. Do not immediately replace the expected answer with whatever the app displayed.

### Step 6: Fix the cause and rerun

Update the app if its behavior is wrong, or update the test if its instructions or expectations are wrong. Rerun the affected test first, then the suite when appropriate.

### Common problems

| Symptom | What to check |
| --- | --- |
| package.json not found | Are you in the project folder? |
| node/npm not recognized | Install Node and reopen the terminal |
| Browser executable missing | Run the Playwright browser install command |
| Port 3000 already in use | Identify whether it is this demo; stop the known process with Ctrl+C if needed |
| Locator matches several controls | Make the role/name more precise; inspect before choosing one |
| Custom fixture is unknown | Import test from fixtures/test.js |
| Expected text differs | Check the real outcome and input data |
| Browser opens and closes quickly | Use --debug |
| Test passes only on retry | Investigate timing, isolation, and environment; retry is not a fix |

Avoid arbitrary sleeps such as “wait five seconds.” A sleep always spends that time and still cannot prove the app is ready. Wait for the relevant UI result with an assertion.

## Lesson 12: Write your own test, one small step at a time

### Exercise A: Search for a missing customer

**Goal:** Verify that search hides customers that do not match.

Create `tests/04-search.spec.ts` with:

```ts
import { test, expect } from '../fixtures/test.js';

test('search shows no customers for an unknown name', async ({
  page,
  customersPage,
}) => {
  await customersPage.create('Practice Customer');
  await customersPage.search('NobodyHasThisName');
  await expect(page.locator('#customers').getByRole('listitem')).toHaveCount(0);
});
```

**What each step does:**

1. Import our prepared test tool.
2. Give the behavior a readable name.
3. Request the page and customer helper. The fixture signs in.
4. Create a record so an empty result cannot be explained by starting with no records.
5. Search for a different name.
6. Check that the list contains zero items.

**Why count list items?** We want to check the result list itself.

Run:

```sh
npx playwright test 04-search --headed --workers=1
```

This exercise adds a new test only when you create the file. The repository's original suite has seven tests.

### Exercise B: Save a decision, then reload

1. Start a new test using our fixture import.
2. Create Asha Learning and open it.
3. Run screening.
4. Approve with notes.
5. Check Approved.
6. Reload using `page.reload()`.
7. The demo returns to the customer workspace, so open the customer again.
8. Check the status and audit entry.

**Why:** The visible status before reload could look correct even if saving were broken.

### Exercise C: Notes are required

1. Create and screen a clear customer.
2. Try to approve with an empty notes string.
3. Check that status remains Pending review.
4. Check that no decision entry was added to the audit trail.

**Hint:** The browser may stop submission because the textarea is required. Do not assume the JavaScript “Enter review notes” error must appear for an empty field.

### Exercise D: Learn from an intentional failure

1. Change one expected Approved value to a wrong value in a local practice branch.
2. Run that test.
3. Read the assertion failure and report.
4. Explain expected versus actual in your own words.
5. Restore the correct expectation.

**Why:** Learning to read failures is part of learning to write tests.

## Moving these ideas toward your KYC360 framework

| Here | In the real project |
| --- | --- |
| Published fictional login | Authorized test account and actual authentication setup |
| Browser-only records | Real backend data with unique names and cleanup |
| Name-based pretend screening | Real screening result and completion state |
| Two decision choices | Actual roles, permissions, and workflow rules |
| Simple audit text | Real persisted audit evidence, including actor/time where required |
| One local address | Approved environment configuration |
| Fresh session per test | Deliberate isolation for browser and server data |

Changing baseURL alone will not adapt the suite. Page locators, navigation, authentication, data setup, and expected rules must match the real application.

If you later reuse login with storageState, check how the app stores authentication. Playwright storageState does not automatically preserve sessionStorage, which this demo uses.

Add helpers when you have a repeated need you can explain. You do not need a large framework to write a useful first test.

## Your final self-check

Can you explain these in your own words?

- What is the app, and what is the test?
- Why is an assertion needed after a click?
- What does await do?
- Why do page objects store locators and actions?
- Which fixture signs in?
- Why does each test make its own customer?
- Why does a reload keep this demo's data?
- What does the audit assertion check?
- What does typecheck prove, and what does it not prove?
- Where do you look when a GitHub run fails?

If a question feels hard, return to its lesson and try the example again. Understanding one complete journey is more useful than memorizing every keyword.
