import {test as base, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.js';
import {CustomersPage} from '../pages/CustomersPage.js';
import {ReviewPage} from '../pages/ReviewPage.js';
import {analyst} from '../test-data/customers.js';
export const test = base.extend<{customersPage: CustomersPage; reviewPage: ReviewPage}>({
 customersPage: async ({page}, use) => {
  const login = new LoginPage(page);
  await login.open(); await login.signIn(analyst.email,analyst.password);
  await expect(page.getByRole('heading',{name:'Customer review workspace'})).toBeVisible();
  await use(new CustomersPage(page));
 },
 reviewPage: async ({page}, use) => { await use(new ReviewPage(page)); },
});
export {expect};
