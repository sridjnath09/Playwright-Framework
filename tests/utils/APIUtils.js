class APIUtils
{
    constructor(apiContext,payloadBody)
    {
        this.apiContext=apiContext;
        this.payloadBody=payloadBody
    } 

    async getToken()
    {
       const responseLogin=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
          {
           data:this.payloadBody
       })
       const loginResponseJson=await responseLogin.json();
       const token=loginResponseJson.token;
       return token;

    }

    async createOrder(createOrderPayload){
        const response={};
        response.token=await this.getToken();
        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: createOrderPayload,
                headers:{
                    "Authorization": response.token,
                    "Content-type": 'application/json'
                }
            });
            const orderResponseJSON=await orderResponse.json();
            const createdOrderID=await orderResponseJSON.orders[0];
            response.createdOrderID=createdOrderID;
            return response;
        }
}

module.exports={APIUtils}