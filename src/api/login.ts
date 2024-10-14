import request from "@/utils/request";
import { log } from "console";
import { da } from "element-plus/es/locale";
import { json } from "stream/consumers";

// 创建验证码
export const getCaptcha = (id?:string) => {
  if(id){
    return request({
      url:'/captcha/'+id,
      method: "GET",
    });
  }
  return request({
    url:'/captcha',
    method: "GET",
  });
};
//登录
export const login = (data: object) => {
  return request({
    url: "/v1/login",
    method: "POST",
    data,
  });
};

//谷歌登录
export const google_login = (data: object) => {
  return request({
    url: "/v1/google/callback",
    method: "POST",
    data,
  });
};

//注册
export const register = (data: object) =>{
  return request({
    url: "/v1/user",
    method: "POST",
    data,
  });
}

//用戶信息
export const getUserInfo = (data: object) =>{
  return request({
    url: "/v1/user/me/",
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`
    // },
    data,
  });
}
