<template>
  <div class="container">
    <section style="background-color: #54616c;color: #f9fafa;padding-top: 3rem;padding-bottom: 20rem;margin-bottom: -17rem;">
      <div class="des">
        <h1 style="font-size:3.75rem;">Get High Resolution Video</h1>
        <p class="lead">
          <span class="font-weight-bold" style="text-transform: uppercase;font-size:1.25rem;">1 Video = 1 Credit</span>
        </p>
      </div>
    </section>
    <!-- <div style="display: inline-flex;width: 100%;justify-content: center;"> -->
      <div style="width: 100%;justify-content: center;">
      <div class="pricing-overview">
        <el-row justify="center" class="pricing-row">
          <!-- <el-col :span="8" class="el-co-8">
            <el-card class="upper" style="width:100%;">
              <h2 style="text-align: center;">goPay as you </h2>
              <div>
                <div>
                  <div style="text-align: center; color: rgb(15, 112, 230); line-height: 1; margin-bottom: 15px;">
                    <span class="h3" style="font-size: 2rem;font-weight: 400;display: inline-block;vertical-align: middle;">US
                    $ 5</span>
                    <span style="font-size: 12px; display: inline-block; vertical-align: middle; margin-left: 5px; margin-top: 4px;">/ image</span>
                  </div>
                </div>
                <el-table :data="tableData" class="plans-tabs" style="margin: 0px auto 20px;width: 100%">
                  <el-table-column width="50px" label="">
                    <template v-slot="scope"> 
                      label值要与el-table数据id实现绑定
                      <el-radio v-model="checkRadio1" :label="scope.row.id" @change="handleRowChange(scope.row,1)">{{""}}</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="count" label="Count"/>
                  <el-table-column prop="sum" label="Sum"/>
                  <el-table-column prop="price" label="Price"/>
                </el-table>
              </div>
              <el-col style="text-align: center;" :span="24">
              <el-button size="large" class="right-buy" @click="buyNow" round>Buy Now</el-button>
            </el-col>
            </el-card>
          </el-col> -->
          <el-col :span="8" class="el-co-8-1">
            <el-card class="upper" style="width:100%;">
              <h2 style="font-size: 2rem;text-align: center;">Subscription Plan</h2>
              <div>
                <div>
                  <div style="text-align: center; color: rgb(15, 112, 230); line-height: 1; margin-bottom: 15px;">
                    <span class="h3" style="font-size: 24px;font-weight: 400;display: inline-block;vertical-align: middle;">5S</span>
                    <span style="font-size: 18px; display: inline-block; vertical-align: middle; margin-left: 5px; margin-top: 4px;">/ Credit</span>
                  </div>
                </div>
                <el-table :data="tableData1" class="plans-tabs" style="margin: 0px auto 20px;width: 100%;text-align: center;">
                  <el-table-column width="50px" label="">
                    <template v-slot="scope">
                      <!-- label值要与el-table数据id实现绑定 -->
                      <el-radio v-model="checkRadio2" :label="scope.row.id" @change="handleRowChange(scope.row)">{{""}}</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="membership_type" label="Membership Type"/>
                  <el-table-column prop="price" label="Price"/>
                  <el-table-column prop="sum" label="Sum" /> 
                  <el-table-column prop="count" label="Count"/>
                </el-table>
              </div>
              <el-col style="text-align: center;" :span="24">
              <el-button size="large" class="right-buy sub" @click="buyNow" round>Subscribe now</el-button>
            </el-col>
            </el-card>
          </el-col>
          <!-- <el-col :span="8" class="el-co-8">
            <el-card class="upper" style="width:100%;">
              <h2 style="text-align: center;">High-Volume Solutions </h2>
              <div>
                <div>
                  <div style="text-align: center; color: rgb(15, 112, 230); line-height: 1; margin-bottom: 15px;">
                    <span class="h3" style="font-size: 2rem;font-weight: 400;display: inline-block;vertical-align: middle;">100K + Video</span>
                    <span style="font-size: 12px; display: inline-block; vertical-align: middle; margin-left: 5px; margin-top: 4px;">/ year</span>
                  </div>
                </div>
                <el-tree>
                  
                </el-tree>
              </div>
              <el-col style="text-align: center;" :span="24">
                    <el-button size="large" class="right-buy" round>Contact us</el-button>
              </el-col>
            </el-card>
          </el-col> -->
        </el-row>
      </div>
      <div class="text-center"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElTable , ElLoading} from 'element-plus'
  import { useRouter } from 'vue-router'
  const router=useRouter()

  // const checkRadio1 = ref(1);
  const checkRadio2 = ref(1);

  // const tableData = [{
  //   id:1,
  //   count: '1 Credit',
  //   sum: 'US$ 5',
  //   price:'US$ 5/video'
  // },{
  //   id:2,
  //   count: '10 Credit',
  //   sum: 'US$ 49',
  //   price:'US$ 4.9/video'
  // },{
  //   id:3,
  //   count: '100 Credit',
  //   sum: 'US$ 40',
  //   price:'US$ 4/video'
  // },{
  //   id:4,
  //   count: '200 Credit',
  //   sum: 'US$ 70',
  //   price:'US$ 3.5/video'
  // },{
  //   id:5,
  //   count: '500 Credit',
  //   sum: 'US$ 120',
  //   price:'US$ 3/video'
  // }] 

  const tableData1 = [{
    id:1,
    membership_type:'7 Days',
    price:'US$ 9.9',
    sum: '720 Credits / 60 minutes',
    count: '5S/Credit',
    ptype:'SEVEN_DAYS',
    price_number:'9.9'
  },{
    id:2,
    membership_type:'14 Days',
    price:'US$ 19.9',
    sum: '1440 Credits / 120 minutes',
    count: '5S/Credit',
    ptype:'FOURTEEN_DAYS',
    price_number:'19.9'
  },{
    id:3,
    membership_type:'30 Days',
    price:'US$ 49.9',
    sum: '3600 Credis / 300 minutes',
    count: '5S/Credit',
    ptype:'THIRTY_DAYS',
    price_number:'49.9'
  }]

  const checkedSetMeal = ref({
    count:tableData1[0].count,
    price:tableData1[0].price,
    sum:tableData1[0].sum,
    type:"SEVEN_DAYS"
  })


  function handleRowChange (data){
    checkedSetMeal.value.count = data.count
    checkedSetMeal.value.price = data.price
    checkedSetMeal.value.sum = data.sum
    console.log(data)
      checkRadio2.value = data.id
      // checkedSetMeal.value.type = "membership"
      checkedSetMeal.value.type = data.ptype
  }
  
  const buyNowPay = ref(null)
  const buyNow = () => {
    buyNowPay.value = ElLoading.service({
      text:'loading...'
    }); // 开始加载
    console.log(checkedSetMeal.value)
    router.push({
      name:'CheckoutPayment',
      params:{
        // count: checkedSetMeal.value.count,
        sum: checkedSetMeal.value.sum,
        type: checkedSetMeal.value.type,
        price:checkedSetMeal.value.price,
      }
    }).then(res=>{
      buyNowPay.value.close()
      console.log('---------------------',res)
    })
  };



</script>

<style  lang="scss" scoped>
.container{
  display: flex;
  justify-content: center;
  //padding-top: 40px;
  flex-direction: column;
  .card{
    display: flex;
    .img-card{
      max-width: 420px;
    }
    .upload{
      width: 420px;
      margin-left: 10px;
    }
  }
}

.des{
  display: block;
  width: 100%;
  text-align: center;
}

.lead{
  margin-bottom:2em;
}

.el-co-8{
  max-width: 31%;
    flex: 0 0 31%;
    margin-top: 20px;
    margin-bottom: 50px;
}

.el-co-8-1{
  max-width: 38%;
    position: relative;
    z-index: 30;
    margin-top: 0;
    margin-bottom: 0;
}

.right-buy{
  padding: 12px 45px;
    border: 1px solid rgb(15, 112, 230);
    color: rgb(15, 112, 230);
    font-weight: bold;
}

.sub{
  background-color: rgb(15, 112, 230);
  color: #fff;
}
</style>
