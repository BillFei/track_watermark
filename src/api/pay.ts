import request from "@/utils/request";

//支付
export const pay = (data: object) =>{
    return request({
      url: "/v1/user/pay/",
      method: "POST",
      data,
    });
  }