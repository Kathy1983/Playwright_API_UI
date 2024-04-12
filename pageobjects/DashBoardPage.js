export const dashboardpage = class DashBoardPage

{
 constructor(page)
 {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cardTitles = page.locator(".card-body b");
    this.ProductName = "ZARA COAT 3"; 
    this.cart = page.locator("//button[@routerlink='/dashboard/cart']") 

 }

async searchProduct(productName)
{
   const titles = await this.cardTitles.allTextContents();
   console.log(titles);
   const count = await this.products.count();
   
   for (let i =0 ; i < count ; ++i)
   {
    if (await this.products.nth(i).locator("b").textContent()==productName)
    {
       // Add product Zara Coat 3 to Card
     await this.products.nth(i).locator("text = Add To Cart").click();
     break;
    }
   }
}

async navigateToCart()
{
    await this.cart.click();
}

}

