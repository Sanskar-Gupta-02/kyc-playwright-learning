import {test,expect} from '../fixtures/test.js';
import {customers} from '../test-data/customers.js';
for(const scenario of [
 {customer:customers.clear,screening:'Clear',decision:'Approve' as const,status:'Approved'},
 {customer:customers.potentialMatch,screening:'Potential match',decision:'Escalate' as const,status:'Escalated'},
]) {
 test(`${scenario.screening} becomes ${scenario.status} @smoke`,async ({customersPage,reviewPage})=>{
  await test.step('Create customer',async()=>{
   await customersPage.create(scenario.customer.name,scenario.customer.country);
   await customersPage.open(scenario.customer.name);
  });
  await test.step('Screen and decide',async()=>{
   await reviewPage.screen(); await expect(reviewPage.screening).toHaveText(scenario.screening);
   await reviewPage.decide(scenario.decision,'Reviewed synthetic evidence');
   await expect(reviewPage.status).toHaveText(scenario.status);
   await expect(reviewPage.audit.getByRole('listitem')).toHaveText([
    'Customer created',`Demo screening completed: ${scenario.screening}`,`${scenario.status}: Reviewed synthetic evidence`,
   ]);
  });
 });
}
test('screening is required before decision',async ({customersPage,reviewPage})=>{
 await customersPage.create(customers.clear.name); await customersPage.open(customers.clear.name);
 await reviewPage.decide('Approve','Attempt before screening');
 await expect(reviewPage.error).toHaveText('Run screening before saving a decision');
 await expect(reviewPage.status).toHaveText('Pending review');
});
test('potential match requires escalation',async ({customersPage,reviewPage})=>{
 await customersPage.create(customers.potentialMatch.name); await customersPage.open(customers.potentialMatch.name);
 await reviewPage.screen(); await reviewPage.decide('Approve','Attempt direct approval');
 await expect(reviewPage.error).toHaveText('Potential matches require escalation in this demo');
 await expect(reviewPage.status).toHaveText('Pending review');
});
