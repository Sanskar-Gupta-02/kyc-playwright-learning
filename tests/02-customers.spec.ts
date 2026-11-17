import {test,expect} from '../fixtures/test.js';
import {customers} from '../test-data/customers.js';
test('create, search and persist customer @smoke',async ({page,customersPage})=>{
 await customersPage.create(customers.clear.name,customers.clear.country);
 await customersPage.create(customers.potentialMatch.name);
 await customersPage.search(customers.clear.name);
 await expect(page.getByRole('button',{name:customers.clear.name,exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:customers.potentialMatch.name,exact:true})).toBeHidden();
 await page.reload(); await customersPage.open(customers.clear.name);
 await expect(page.locator('#customer-details')).toHaveText('Asha Learning / India');
});
