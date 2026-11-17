import type { Page } from '@playwright/test';
export class LoginPage {
 constructor(private page: Page) {}
 async open() { await this.page.goto('/'); }
 async signIn(email: string, password: string) {
  await this.page.getByLabel('Email', {exact:true}).fill(email);
  await this.page.getByLabel('Password', {exact:true}).fill(password);
  await this.page.getByRole('button', {name:'Sign in',exact:true}).click();
 }
}
