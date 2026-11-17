import type { Page } from '@playwright/test';
export class ReviewPage {
 constructor(private page: Page) {}
 get screening() { return this.page.locator('#screening-status'); }
 get status() { return this.page.locator('#review-status'); }
 get audit() { return this.page.locator('#audit'); }
 get error() { return this.page.locator('#review-error'); }
 async screen() { await this.page.getByRole('button',{name:'Run demo screening'}).click(); }
 async decide(decision: 'Approve' | 'Escalate', notes: string) {
  await this.page.getByLabel('Decision',{exact:true}).selectOption(decision);
  await this.page.getByLabel('Review notes').fill(notes);
  await this.page.getByRole('button',{name:'Save decision'}).click();
 }
}
