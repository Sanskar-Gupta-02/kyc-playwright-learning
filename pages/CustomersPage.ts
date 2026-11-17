import type { Page } from '@playwright/test';
export class CustomersPage {
 constructor(private page: Page) {}
 async create(name: string, country = 'United Kingdom') {
  await this.page.getByLabel('Customer name',{exact:true}).fill(name);
  await this.page.getByLabel('Country',{exact:true}).selectOption(country);
  await this.page.getByRole('button',{name:'Create customer',exact:true}).click();
 }
 async search(name: string) { await this.page.getByLabel('Search customers').fill(name); }
 async open(name: string) { await this.page.getByRole('button',{name,exact:true}).click(); }
}
