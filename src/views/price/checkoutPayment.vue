<template>
    <div class="payment-container">
      <div class="pay">
        <div style="width: 60%;margin: auto;padding-top: 7%;">
            <div class="right">
                <div class="header">
                    <h1>Complete your purchase</h1>
                </div>
                <div class="flex-grow-1">
                    <hr style="border: 0;border-top:1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:100%;">
                </div>
                <h1 style="font-size: 1.4rem;font-weight: bold;">Credit package</h1>
                <div style="font-size: 1.3rem;display: ruby-text;padding: 10px 0 10px 0;">
                    <span style="float: left;">{{ sum }}</span>
                    <!-- <span style="float: right;">{{ sum }}</span> -->
                </div>
                <!-- <div style="font-size: 1.3rem;display: ruby-text;padding: 10px 0 10px 0;">
                    <span style="float: left;">Sales tax</span>
                    <span style="float: right;">US$0.73</span>
                </div> -->
                <div class="flex-grow-1">
                    <hr style="border: 0;border-top:1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:100%;">
                </div>
                <h1 style="font-size: 1.4rem;font-weight: bold;">Total</h1>
                <div style="font-size: 1.8rem;font-weight: bold;display: ruby-text;padding: 10px 0 10px 0;">
                    <!-- <span style="float: left;">Total&nbsp;&nbsp;</span>  -->
                    <span style="float: right;">{{ price }}</span>
                </div>
            </div>
            <div class="flex-grow-1">
                <hr style="border: 0;border-top:1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:100%;">
            </div>
            <div class="content" v-loading="loading">
                <form @submit.prevent="handleSubmit" style="width: 100%;padding: 40px;margin: auto;box-shadow: 0px 0px 4px 2px #efefef;border-radius: 10px;">
                    <div id="payment-element"></div>
                    <el-button type="primary" v-if="!loading" round style="width: 100%;height: 50px;margin-top: 30px;font-size: 20px;" @click="handleSubmit">Pay now</el-button>
                </form>
            </div>
        </div>
      </div>
      <div class="summary">
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref , onMounted} from 'vue'
  import { loadStripe } from '@stripe/stripe-js';
  import { pay, stripe_publicSecrect } from '@/api/pay'
  import { ElButton, ElLoading} from 'element-plus';
  import { useRouter } from 'vue-router'
  const router = useRouter()
  console.log(router)
  console.log(router.currentRoute.value.params)

  const sum = router.currentRoute.value.params.sum
  const type = router.currentRoute.value.params.type
  const price = router.currentRoute.value.params.price
  const amount = 1

  const info = {
    payType: type,
    amount: 1
  }
 // 使用ref创建响应式引用
  const stripe = ref();
  const elements = ref();
  const loadingPay = ref(null)
  const loading = ref(true)

  //构建支付组件
  const setupStripe = async () => {
    stripe.value = await loadStripe(stripe_publicSecrect);
    pay(info).then(res=>{
      try {
        console.log(res)
        const payInfo = ref({
          payType: info.payType,
          amount: amount,
          paymentId: res.payment_id,
          paymentAmount: price,
          sum:sum
        })
        localStorage.setItem('payInfo',JSON.stringify(payInfo))
        elements.value = stripe.value.elements({
          theme: 'stripe',
          clientSecret: res.clientSecret
          // locale: 'auto'
        })
        const paymentElement = elements.value.create('payment')
        paymentElement.mount('#payment-element');
        loading.value = false
      } catch (error) {
        console.log(error)
      }
    })
  };

  // 使用onMounted钩子在组件挂载后调用initStripe
  onMounted(() => {
    setupStripe();
  });



  //支付
  const handleSubmit = async (e) => {
    loadingPay.value = ElLoading.service({
      text:'Payment loading...'
    }); // 开始加载
    stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://tools.teclips.cn/#/completionPayment"
      },
      // redirect: 'if_required' 如果设置redirect: 'if_required'则不跳转returnUrl
    }).then(res=>{
      loadingPay.value.close()
      console.log('---------------------',res)
    })
  };

  // 将方法暴露给模板
  defineExpose({
    handleSubmit
  });

  </script>
  
  <style scoped>
  .payment-container {
    max-height: 100vh;
    max-width: 100vw;
    padding: 0px 20px 20px 20px;
    background-color: #ffffff;
  }

  .pay{
    width: 60%;
    margin: auto;
  }
  
  .header h1 {
    color: #333;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .content {
    font-size: 14px;
    color: #606266;
    margin-top: 30px;
  }
  
  </style>