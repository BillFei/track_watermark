<template>
  <div class="login_content">
  <div class="card-with-shadow card">
    <el-tabs v-model="activeName" class="login-tabs" @tab-click="handleTabclick">
      <el-tab-pane label="Login" name="login" class="lg-pane">
        <el-row justity="center" style="margin-top: 20px;">
          <el-col :span="24" :push="4">
            <el-button size="large" @click="googleLogin" class="bt"  round><img class="img-icon" src="https://accounts.kaleido.ai/assets/login_google-2cb4e02cffa10e473b6e3549e711d537a2311783b8ddf497d3f2616a2784d41f.svg">
            以 Google 账户继续
          </el-button></el-col>
          <el-col :span="24" :push="4">
            <el-button size="large" @click="facebookLogin" class="bt" round>
            <img class="img-icon" src="https://accounts.kaleido.ai/assets/login_facebook-e4f71915bb42ac7f7c61a4936a8981f6182aa26cdd485efb8ab913a58e630856.svg">    
      以 Facebook 账户继续
          </el-button>
          </el-col>
          <el-col>
            <div class="d-flex my-3" style="display: flex;unicode-bidi: isolate;">
              <div class="flex-grow-1" style="flex-flow: 1;display: block;margin-bottom: 1rem; margin-top:1rem; display: flex;unicode-bidi: isolate;">
                <hr style="margin-top: 1rem;margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:180px;height:32px;">
              </div>
              <div class="text-muted text-center pt-1 px-3" style="text-align: center; padding-left:1rem;padding-right:1rem;padding-top:0.25rem;margin-top: 1rem;margin-bottom: 1rem;">
                or
              </div>
              <div class="flex-grow-1" style="flex-flow: 1;margin-bottom: 1rem; margin-top:1rem; display: flex;unicode-bidi: isolate;">
                <hr style="margin-top: 1rem;margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:180px;height:32px;">
              </div>
            </div>
          </el-col>
          <el-col>
            <el-input v-model="email" style="width: 400px;height: 48px;font-size:20px;" placeholder="Email" />
          </el-col>
          <el-col>
            <el-input v-model="password" type="password" style="width: 400px;height: 48px;font-size:20px;margin-top:20px;" placeholder="Password" />
          </el-col>
          <el-col>
            <el-checkbox v-model="checkbox" value="1" style="width: 400px;height: 48px;font-size:24px;margin-top:20px;" @change="remember(checkbox)">Remember Me</el-checkbox>
          </el-col>
          <el-col :span="24" :push="8">
            <el-button size="large" @click="facebookLogin" class="login-bt" round>Login</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Sign Up" name="sign">
        <el-row justity="center" style="margin-top: 20px;">
          <el-col :span="24" :push="4">
            <el-button size="large" @click="googleLogin" class="bt"  round><img class="img-icon" src="https://accounts.kaleido.ai/assets/login_google-2cb4e02cffa10e473b6e3549e711d537a2311783b8ddf497d3f2616a2784d41f.svg">
            以 Google 账户继续
          </el-button></el-col>
          <el-col :span="24" :push="4">
            <el-button size="large" @click="facebookLogin" class="bt" round>
            <img class="img-icon" src="https://accounts.kaleido.ai/assets/login_facebook-e4f71915bb42ac7f7c61a4936a8981f6182aa26cdd485efb8ab913a58e630856.svg">    
      以 Facebook 账户继续
          </el-button>
          </el-col>
          <el-col>
            <div class="d-flex my-3" style="display: flex;unicode-bidi: isolate;">
              <div class="flex-grow-1" style="flex-flow: 1;display: block;margin-bottom: 1rem; margin-top:1rem; display: flex;unicode-bidi: isolate;">
                <hr style="margin-top: 1rem;margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:180px;height:32px;">
              </div>
              <div class="text-muted text-center pt-1 px-3" style="text-align: center; padding-left:1rem;padding-right:1rem;padding-top:0.25rem;margin-top: 1rem;margin-bottom: 1rem;">
                or
              </div>
              <div class="flex-grow-1" style="flex-flow: 1;margin-bottom: 1rem; margin-top:1rem; display: flex;unicode-bidi: isolate;">
                <hr style="margin-top: 1rem;margin-bottom: 1rem;border: 0;border-top: 1px solid rgba(0, 0, 0, 0.1);box-sizing:content-box;height: 0;overflow: visible;width:180px;height:32px;">
              </div>
            </div>
          </el-col>
          <el-col>
            <h3 style="color: #666;">Email</h3>
            <el-input v-model="email" style="width: 400px;height: 48px;font-size:24px;" />
          </el-col>
          <el-col style="margin-top:20px;">
            <h3 style="color: #666;">Password (<span style="font-style: italic;">6 characters minimum</span>)</h3>
            <el-input v-model="password" type="password" style="width: 400px;height: 48px;font-size:24px;"/>
          </el-col>
          <el-col style="margin-top:20px;">
            <h3 style="color: #666;">Password confirmation</h3>
            <el-input v-model="password" type="password" style="width: 400px;height: 48px;font-size:24px;"/>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="checked" label="1">
              我同意
              <el-link type="primary" herf="#">服务条款</el-link>、
              <el-link type="primary" herf="#">基本条款及交易条件</el-link> 和 
              <el-link type="primary" herf="#">隐私政策</el-link>。
            </el-checkbox>
            <el-checkbox v-model="checked" label="1">
              请给我发送有关 Teclips 产品和服务的最新消息。
            </el-checkbox>
          </el-col>
          <el-col :span="24" :push="8" style="margin-top:20px;">
            <el-button size="large" @click="facebookLogin" class="login-bt" round>Sign up</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-col>
      <el-link type="primary" herf="#">忘记密码？</el-link><br/>
      <el-link type="primary" herf="#">没有收到确认邮件？</el-link>
    </el-col>
  </div>
</div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineComponent, onMounted } from "vue";
import { ElLoading, FormInstance, TabsPaneContext } from 'element-plus'
import {getCaptcha,login} from '@/api/login'
import {useRouter} from 'vue-router'
import FB from 'fb';

const ruleFormRef = ref<FormInstance>()

const Router=useRouter()
const captchaUrl=ref<any>()

const activeName = ref('login')

const email = ref("")
const password = ref("")

const checked = ref(false)
const checkbox = ref(false)

const handleTabclick = (tab: TabsPaneContext, event: Event) => {
console.log(tab, event)
}

const formInfo = reactive({
userName: '',
password: '',
captcha_code: '',
captcha_id:''
})
const updateCaptcha=async ()=>{
const res:any=await getCaptcha()
 captchaUrl.value=import.meta.env.VITE_BASE_API+'/captcha/'+res.data.id
 formInfo.captcha_id=res.data.id
}

//记住密码
function remember(){
  console.log(checkbox)
}

// onMounted(()=>{
//   FB.init({
//       appId: 'YOUR_APP_ID',
//       cookie: true,
//       xfbml: true,
//       version: 'v12.0'
//     });
// })

const googleLogin = ()=>{
window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=YOUR_SCOPE&response_type=code'
}
const facebookLogin = ()=>{
// FB.login(response => {
//       if (response.authResponse) {
//         // 获取用户信息
//         FB.api('/me?fields=name,email,picture', response => {
//           console.log('User info:', response);
//           // 处理用户信息，例如存储token、用户信息等
//         });
//       } else {
//         console.log('User cancelled login or did not fully authorize.');
//       }
//     }, { scope: 'email' });
}
const submitForm = (formEl: FormInstance | undefined) => {
// if (!formEl) return
// formEl.validate(async (valid) => {
//   if (valid) {
//     const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.7)',
// })

//       const result=await login(formInfo)
//       if(result&&result.status&&result.status===200){
//        await localStorage.setItem('token',result.data.token)
//         localStorage.setItem('userInfo',JSON.stringify({...formInfo,time:Date.now()}))
//         loading.close()
//         Router.push({name:'Experiments'})
//       }else{
//         loading.close()
//         updateCaptcha()

//       }
//   } else {
//     return false
//   }
// })
}


</script>

<style  lang="scss" scoped>
.login_content{
padding-top: 40px;
display: flex;
justify-content: center;
.card-with-shadow {
  box-shadow: 0px 0px 40px #0000001A;
  border-width: 0;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 450px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #edeff0;
  border-radius: 2px;
  padding: 40px 20px 40px 20px;

  .lg-pane {
    
    .el-tabs__item {
      font-size: 24px;
      weight: 600;
    }
  }
}
.img-icon{
  width: 28px;
  height: 28px;
  margin-right: 7px;
}
.bt{
  width: 260px;
  margin-bottom: 20px;
  height: 48px;
  font-size:14px;
}

.login-bt {
  height:56px;
  width: 156px;
  font-size:20px;
  border-radius: 30px 30px;
  background-color: #0F70E6;
  color: white;
}
}
</style>
