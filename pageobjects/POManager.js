// import { loginPage } from '../pageobjects/PO_LoginPage';
import { expect} from "@playwright/test";
import { loginPage } from '../pageobjects/PO_LoginPage';
import { dashboardpage } from '../pageobjects/DashBoardPage';

export const PoManager = class POManager

{
 constructor(page)
 {
    this.page = page;
    this.loginPage = new loginPage(this.page);
    this.dashboardpage = new dashboardpage(this.page);

 }

 getLoginPage()
 {
   return this.loginPage;
 }

 getDashboardPage()
 {
   return this.dashboardpage;
 }


}