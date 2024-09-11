import request from "@/utils/request";

//Stripe公钥
export const stripe_publicSecrect = 'pk_test_51PgdmIAOsIHV5PCILAT77oz47NpEHRl75eJQ0by2t0QOneIFcovmJXpgYiGaEyGxZBT1wPp5IjraPA0nEfPFkX9r00TpPTEeLs'

//支付
export const pay = (data: object) =>{
  return request({
    url: "/v1/user/pay/",
    method: "POST",
    data,
  });
}

//支付校验
export const payStatus = (data: object,payType: string) =>{
  return request({
    url: "/v1/user/pay/"+payType,
    method: "POST",
    data,
  });
}


//支付校验
export const payCallBack = (data: object) =>{
  return request({
    url: "/v1/user/pay/callback",
    method: "POST",
    data,
  });
}