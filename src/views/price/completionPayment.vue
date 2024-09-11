<template>
    <div class="payment-success">
      <el-card class="success-card">
        <div class="icon-success">
          <!-- Element Plus 的成功图标 -->
          <i class="el-icon-success"></i>
        </div>
        <div class="success-message">
          <h2>{{ paymentStatus.status }}</h2>
          <p>{{ paymentStatus.atten }}</p>
        </div>
        <div class="order-info" v-if="orderInfo.id">
          <!-- 订单信息，根据实际订单数据进行展示 --> 
          <p>Payment Amount：${{ orderInfo.paymentAmount }}</p>
          <p>Order Types：{{ orderInfo.types }}</p>
          <p>Order Count：{{ orderInfo.sum }}</p>
          <p>Order Number：{{ orderInfo.id }}</p>
        </div>
        <div class="action-buttons">
          <!-- 操作按钮，如返回首页或查看订单 -->
          <el-button type="primary" @click="goHome">Back Homepage</el-button>
          <el-button type="success" @click="viewOrder">View Order</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref,onMounted} from 'vue';
  import { ElMessage, ElButton, ElCard } from 'element-plus';
  import { useRouter } from 'vue-router'
  import { payStatus,payCallBack } from '@/api/pay'
  import { getUserInfo } from '@/api/login'
  const router = useRouter()
  console.log(router);

  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams)
  
  // 模拟订单信息
  const orderInfo = ref({
    id: '',
    types: '',
    paymentAmount:'',
    sum:''
  });

  const paymentStatus =  ref({
    status:'',
    atten:''
  })
  
  const goHome = () => {
    // window.location.href = '/'; // 根据实际路由逻辑调整
    router.push({name:'Home'})
  };
  
  const viewOrder = () => {
    // 跳转到查看订单的页面或逻辑
    console.log('View order:', orderInfo.value);
    // 可以使用ElMessage来显示提示信息
    ElMessage.success('查看订单信息');
  };

  onMounted(() => {
    console.log(JSON.parse(localStorage.getItem("payInfo")))
    if(localStorage.getItem("payInfo")){
      const payInfo = JSON.parse(localStorage.getItem("payInfo"))._value
      const payInfos = {
        amount:payInfo.amount,
        payType:payInfo.payType,
        paymentId:payInfo.paymentId,
      }
      console.log(payInfo)
      payCallBack(payInfos).then(res=>{
        if(res.status === "success"){
          ElMessage .success('Payment successfully');
          paymentStatus.value.status = 'Payment successfully'
          paymentStatus.value.atten = 'Thank you for your purchase, the order has been paid successfully.'
          orderInfo.value.id = payInfo.paymentId
          orderInfo.value.paymentAmount = payInfo.paymentAmount
          orderInfo.value.types = payInfo.payType
          orderInfo.value.sum = payInfo.sum
          update_userInfo();
          localStorage.removeItem("payInfo")
        }else{
          ElMessage .success('Payment failed');
          paymentStatus.value.status = 'Payment failed',
          paymentStatus.value.atten = 'Payment failed, please contact customer service'
        }
      }).catch({
        
      })
    }else{ 
      router.push({name:'Home'})
    }
  });

  //更新本地用户信息
  const update_userInfo = () =>{
    if(localStorage.getItem("token")){
      getUserInfo().then(res=>{
        if(res.status_code === 200) {
          localStorage.setItem('userInfo',JSON.stringify(res.data))
        }
      }).catch(error =>{
        ElMessage.error(error);
      })
    }
  }

  </script>
  
  <style scoped>
  .payment-success {
    text-align: center;
    padding-top: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    height: 60vh;
  }
  
  .success-card {
    width: 40%;
    margin: 0 auto;
  }
  
  .icon-success {
    font-size: 48px;
    color: #67c23a;
    margin-bottom: 20px;
  }
  
  .success-message h2 {
    color: #67c23a;
  }
  
  .order-info p {
    margin: 10px 0;
    font-size: 16px;
  }
  
  .action-buttons {
    margin-top: 30px;
  }
  </style>