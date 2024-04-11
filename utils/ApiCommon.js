

export const ApiCommon = class ApiCommon

{
constructor(apiContext, LoginPayLoad )
{
    this.apiContext = apiContext;
    this.LoginPayLoad = LoginPayLoad;

}

async GetToken()
{

    const LoginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
         data:this.LoginPayLoad
    });
    const loginResponseJson = await LoginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;  


}

async CreateOrder(OrderPayLoad)
{
    let response = {};
    response.token= await this.GetToken();

    const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        headers:{
             'Authorization':response.token,
             'Content-Type':'application/json',
         } ,
         data:OrderPayLoad
    })

    const orderResponseJson =await orderResponse.json();
    console.log(orderResponseJson);
   const orderId = orderResponseJson.orders[0];
  //  response.orderId = orderId;
    console.log("Order ID: "+ orderId);
    return orderId;

}



}