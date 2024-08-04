<template>
    <div class="payment-success">
      <el-card class="success-card">
        <div class="icon-success">
          <!-- Element Plus 的成功图标 -->
          <i class="el-icon-success"></i>
        </div>
        <div class="success-message">
          <h2>Payment Success</h2>
          <p>Thank you for your purchase, the order has been paid successfully.</p>
        </div>
        <div class="order-info">
          <!-- 订单信息，根据实际订单数据进行展示 -->
          <p>Order Number：123456789</p>
          <p>Payment Amount：$100.00</p>
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
  import { ref } from 'vue';
  import { ElMessage, ElButton, ElCard } from 'element-plus';
  import { useRouter } from 'vue-router'
  const router = useRouter()
  console.log(router);

  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams)
  
  // 模拟订单信息
  const orderInfo = ref({
    id: '123456789',
    amount: 100.00,
  });
  
  const goHome = () => {
    window.location.href = '/'; // 根据实际路由逻辑调整
  };
  
  const viewOrder = () => {
    // 跳转到查看订单的页面或逻辑
    console.log('View order:', orderInfo.value);
    // 可以使用ElMessage来显示提示信息
    ElMessage.success('查看订单信息');
  };
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