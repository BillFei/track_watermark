import axios from "axios";
import { ElMessage,ElLoading } from 'element-plus'
//创建axios实例
const request = axios.create({
    // 服务接口请求
    baseURL:'/api',
    // 超时设置
    timeout: 30000,
    headers:{
        'Content-Type':'application/json; charset=UTF-8',
    },
})
// 请求拦截
const loading:any=null
request.interceptors.request.use(
    (config:any) => {
      console.log(config)
      config.headers.Authorization  = `Bearer ${localStorage.getItem('token')}`;
      //  loading = ElLoading.service({
      //   lock: true,
      //   text: 'Loading',
      //   background: 'rgba(0, 0, 0, 0.7)',
      // })
      if("/v1/login" == config.url){
        config.headers['Content-Type'] = 'multipart/form-data'
        // config.data = {
        //   username:config.data.username,
        //   password:config.data.password
        // }
      }
      return config;
    },
    
    (error) => Promise.reject(error),
  );
  
  // 用来捕抓 axios 一般请求接口的错误
  function catchError(res:any) {
    const { status } = res;
  
    if (status === 200) {
      res.success = true;
      return res;
    }
  
    // 全局捕抓接口提示登录错误
    // if (code === 40002 || code === 40001 || code === 40004) {
    //   MessageBox.alert('登录过期，请重新登录', '提示', {
    //     confirmButtonText: '确定',
    //     showClose: false,
    //     showCancelButton: false,
    //     type: 'warning',
    //     callback: (action) => {
    //       if (action === 'confirm') {
    //         store.dispatch('user/doLogout');
    //       }
    //     },
    //   });
  
    //   return Promise.resolve({ ...res, success: false });
    // }
  
    // 统一弹出全局错误
    ElMessage({ message: `${res.message}`, type: 'error' });
    return Promise.resolve({
      ...res,
      success: false,
    });
  }
  
  // 接口返回捕获
  request.interceptors.response.use(
    (response:any) => {
      const res = response.data;
      const { status } = response;
      // loading.close()
    
      if (status === 200 || status === 201) {
       
     return res
      }else if(status===403&&status===401){
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        window.location.href = '#/login';
      }
      // console.log(333)
      // return Promise.resolve({
      //   success: false,
      //   message: '接口返回值错误',
      // });
    },
  
    (error) => {
      console.log(error)
       if(error.response.status===401){
        if(error.config.url==='/v1/login'){
          ElMessage.error('The user name or password is incorrect，please check and try again')
        }else{
          ElMessage.error(error.response.data.detail)
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          window.location.href = '#/login';
        }
       }
      // Message({ message, type: 'error' });
      // console.log(error.response);


      // if (error.response.data.message.includes('username or password incorrect') || error.response.data.message.includes('Field validation for \'Password\' failed on the \'min\' tag') || error.response.data.message.includes('incorrect username and password given for more than 3 time')) {
      //   Message({
      //     message: error.response.data.message,
      //     type: 'error',
      //   });
      // }
      if (error.response.data&&error.response.data.detail.includes('internal=Token is expired')) {
        if (document.getElementsByClassName('el-message--warning').length < 1) {
            ElMessage({
            message: 'Session expired! Please log in again.',
            type: 'warning',
          });
        }
        // eslint-disable-next-line no-restricted-globals
        // location.href = reLogin;
        window.location.href = '#/login'
        // const message = typeof error === 'string' ? error : error.message;
        // return Promise.resolve({
        //   success: false,
        //   message,
        // });
      } else {
        // ElMessage({
        //   message: error.response.data.detail,
        //   type: 'error',
        // });
        console.log(error.response.data.detail)
      }
    },
  );
  
  export default request;
  