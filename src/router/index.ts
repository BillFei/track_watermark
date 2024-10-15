import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { ElMessage } from "element-plus";
import Layout from "@/layout/Layout.vue";
//存放登录，404等状态页面
export const Routes = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/home",
    children:[
      {
        path:'/home',
        name:'Home',
        component:()=>import('@/views/home/home.vue')
      },
      {
        path: "/remove",
        name: "Remove",
        component: () => import("@/views/remove/remove.vue"),
        // meta: {
        //   requireAuth: true,
        // }, 
        
      },
      {
        path: "/price",
        name: "Price",
        component: () => import("@/views/price/price.vue"),
        // meta: {
        //   requireAuth: true,
        // }, 
        
      },{
        path: "/personalCenter",
        name: "PersonalCenter",
        component: () => import("@/views/personalCenter/personalCenter.vue"),
        // meta: {
        //   requireAuth: true,
        // }, 
        
      }
    ],
  },{
    path: "/checkoutPayment",
    name: "CheckoutPayment",
    component: () => import("@/views/price/checkoutPayment.vue"),
    // meta: {
    //   requireAuth: true,
    // }, 
    
  },{
    path: "/completionPayment",
    name: "CompletionPayment",
    component: () => import("@/views/price/completionPayment.vue"),
    // meta: {
    //   requireAuth: true,
    // }, 
    
  },{
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    // meta: {
    //   requireAuth: true,
    // }, 
    
  },
];


const routes: Array<RouteRecordRaw> = [...Routes];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => { 
  next();
  // // 判断有没有登录
  // if (!localStorage.getItem("token")) {
    
  //   if (to.name == "Login") {
  //     next();
  //   } else {
  //     ElMessage.warning('请重新登陆')

  //     router.push({name:'Login'});
  //   }
  // } else {
  
  //   next();
  // }

});

export default router;
