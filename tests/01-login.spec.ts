import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.js';
import {analyst} from '../test-data/customers.js';
test('analyst signs in and out @smoke',async ({page})=>{
 const login=new LoginPage(page); await login.open(); await login.signIn(analyst.email,analyst.password);
 await expect(page.getByRole('heading',{name:'Customer review workspace'})).toBeVisible();
 await page.getByRole('button',{name:'Sign out'}).click();
 await expect(page.getByRole('heading',{name:'Analyst login'})).toBeVisible();
});
test('invalid credentials are rejected',async ({page})=>{
 const login=new LoginPage(page); await login.open(); await login.signIn(analyst.email,'wrong');
 await expect(page.locator('#login-error')).toHaveText('Invalid email or password');
 await expect(page.getByRole('heading',{name:'Customer review workspace'})).toBeHidden();
});
