<template>
  <div class="login_content">
  <div class="card-with-shadow card">
    <el-tabs v-model="activeName" class="login-tabs" @tab-click="handleTabclick">
      <el-tab-pane label="Login" name="login" class="lg-pane">
        <el-row justity="center" style="margin-top: 20px;">
          <el-col :span="24" :push="4">
            <!-- <el-button size="large" @click="googleLogin" class="bt"  round><img class="img-icon" src="https://accounts.kaleido.ai/assets/login_google-2cb4e02cffa10e473b6e3549e711d537a2311783b8ddf497d3f2616a2784d41f.svg">
            以 Google 账户继续
          </el-button> -->
          <GoogleLogin :callback="onGoogleLoginSuccess" prompt>
            <button class="bt"><img class="img-icon" src="https://accounts.kaleido.ai/assets/login_google-2cb4e02cffa10e473b6e3549e711d537a2311783b8ddf497d3f2616a2784d41f.svg">以 Google 账户继续</button>
          </GoogleLogin>
        </el-col>
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
            <el-input v-model="loginInfo.username" style="width: 400px;height: 48px;font-size:20px;" placeholder="Email" @focus="handleEmailInputClick"/>
            <el-alert title="Please enter your email address"  v-if="loginMatch.matchEmail"  type="error" show-icon @close="loginMatch.matchEmail = false"/>
          </el-col>
          <el-col>
            <el-input v-model="loginInfo.password" type="password" style="width: 400px;height: 48px;font-size:20px;margin-top:20px;" @focus="handlePasswordInputClick" placeholder="Password" />
            <el-alert title="Please enter your email address" v-if="loginMatch.matchPassword" type="error" show-icon @close="loginMatch.matchPassword = false"/>
          </el-col>
          <el-col>
            <el-checkbox v-model="checkedRemember" value="1" style="width: 400px;height: 48px;font-size:24px;margin-top:20px;" @change="remember(checkedRemember)">Remember Me</el-checkbox>
          </el-col>
          <el-col :span="24" :push="8">
            <el-button :plain="true" size="large" @click="goLogin" class="login-bt" round>Login</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Sign Up" name="sign">
        <el-row justity="center" style="margin-top: 20px;">
          <el-col :span="24" :push="4">
            <el-button size="large" @click="googleLogin" class="bt"  round><img class="img-icon" src="https://accounts.kaleido.ai/assets/login_google-2cb4e02cffa10e473b6e3549e711d537a2311783b8ddf497d3f2616a2784d41f.svg">
            以 Google 账户继续
          </el-button>
        </el-col>
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
            <el-input v-model="registerForm.username" style="width: 400px;height: 48px;font-size:24px;" @focus="handleREmailInputClick"/>
            <el-alert title="Please enter your email address"  v-if="registerMatch.matchREmail"  type="error" show-icon @close="registerMatch.matchREmail = false"/>
            <el-alert title="The mailbox format is incorrect"  v-if="registerMatch.noMatchREmail"  type="error" show-icon @close="registerMatch.noMatchREmail = false"/>
          </el-col>
          <el-col style="margin-top:20px;">
            <h3 style="color: #666;">Password (<span style="font-style: italic;">6 characters minimum</span>)</h3>
            <el-input v-model="registerForm.password" type="password" style="width: 400px;height: 48px;font-size:24px;" @focus="handleRPasswordInputClick"/>
            <el-alert title="Please enter your password"  v-if="registerMatch.matchRPassword"  type="error" show-icon @close="registerMatch.matchRPassword = false"/>
          </el-col>
          <el-col style="margin-top:20px;">
            <h3 style="color: #666;">Password confirmation</h3>
            <el-input v-model="registerForm.PasswordCf" type="password" style="width: 400px;height: 48px;font-size:24px;" @focus="handleRPasswordCfInputClick"/>
            <el-alert title="Please enter your password again"  v-if="registerMatch.matchRPasswordCf"  type="error" show-icon @close="registerMatch.matchRPasswordCf = false"/>
            <el-alert title="Two passwords did not match，Please check and try again"  v-if="registerMatch.noMatch"  type="error" show-icon @close="registerMatch.noMatch = false"/>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="checkedAgreement" label="1" @change="checkAgreement(checkedAgreement)" style="white-space: pre-line;margin-top: 10px;">
              I agree to the
              <el-link type="primary" herf="#">Terms of Service</el-link>、
              <el-link type="primary" herf="#">General Terms and Conditions</el-link> and 
              <el-link type="primary" herf="#">Privacy Policy</el-link>.
            </el-checkbox>
            <el-checkbox v-model="checkedSubscription" label="1" @change="checkSubscription(checkedAgreement)" style="white-space: pre-line;margin-top: 10px;">
              Send me updates about remove.bg products and services. You can unsubscribe at any time.
            </el-checkbox>
          </el-col>
          <el-col :span="24" :push="8" style="margin-top:20px;">
            <el-button size="large" @click="signUp" class="login-bt" round>Sign up</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-col>
      <el-link type="primary" herf="#" style="margin-top: 20px;">Forgot your password?</el-link><br/>
      <el-link type="primary" herf="#">Didn't receive confirmation instructions?</el-link>
    </el-col>
  </div>
</div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineComponent, onMounted } from "vue";
import { ElLoading, FormInstance, TabsPaneContext,ElMessage  } from 'element-plus'
import {getCaptcha,login,register} from '@/api/login'
import {useRouter} from 'vue-router'
import axios from 'axios';
import FB from 'fb';
import OAuth2 from 'vue-google-oauth2';
import { googleLogout,googleAuthCodeLogin,googleSdkLoaded    } from "vue3-google-login"

//退出谷歌登录
const yourLogoutFunction = ()=> {
  // your logout logics
  googleLogout()
}

const ruleFormRef = ref<FormInstance>()

const Router=useRouter()
const captchaUrl=ref<any>()

const activeName = ref('login')

const handleTabclick = (tab: TabsPaneContext, event: Event) => {
console.log(tab, event)
}

const onGoogleLoginSuccess = (response) =>{
      // 处理登录成功，例如发送ID token到后端进行验证
      console.log("Handle the response",response);
      // 这里可以添加发送token到后端的代码
}

const checkedRemember = ref(false)
const checkedAgreement = ref(false)
const checkedSubscription = ref(false)

//记住密码
const remember = (re)=>{
  console.log(re)
  checkedRemember.value = re
}

//同意协议
const checkAgreement = (ag)=>{
  console.log(ag)
  checkedRemember.value = ag
}

//订阅
const checkSubscription = (sb)=>{
  console.log(sb)
  checkedRemember.value = sb
}

const formInfo = reactive({
userName: '',
password: '',
captcha_code: '',
captcha_id:''
})

//登录信息
const loginInfo = reactive({
  username:'',
  password:''
})

//注册信息
const registerForm = reactive({
  username:'',
  password:'',
  PasswordCf:''
})

//登录提示
const loginMatch = reactive({
  matchEmail:false,
  matchPassword:false
})

//注册提示
const registerMatch = reactive({
  matchREmail:false,
  noMatchREmail:false,
  matchRPassword:false,
  matchRPasswordCf:false,
  noMatch:false
})

const handleEmailInputClick = () =>{
  loginMatch.matchEmail = false
}

const handlePasswordInputClick = () =>{
  loginMatch.matchPassword = false
}

const handleREmailInputClick = ()=>{
  if(registerMatch.noMatchREmail == true){
    registerMatch.noMatchREmail = false
  }else{
    registerMatch.matchREmail = false
  }
}

const handleRPasswordInputClick = ()=>{
  registerMatch.matchRPassword = false
}

const handleRPasswordCfInputClick = ()=>{
  if(registerMatch.matchRPasswordCf == true){
    registerMatch.matchRPasswordCf = false
  }else{
    registerMatch.noMatch = false
  }
}

//登录
const goLogin = () =>{
  if(loginInfo.username === ''){
    loginMatch.matchEmail = true
    return
  }

  if(loginInfo.password === ''){
    loginMatch.matchPassword = true
    return
  }

  login(loginInfo).then(res=>{
    console.log(res)
    if(res && res.access_token) {
      ElMessage .success('login successfully');
      localStorage.setItem('token', res.access_token)
				setTimeout(function(){
					window.location.href="http://localhost:3000/#/home"
				},1000)
		}else{
			ElMessage .error('The account or password is incorrect');
		}
  })
}

//随机生成手机号
const generateRandomMobileNumber = () => {
  // 手机号码第一位固定为1
  let number = '1';
  // 第二位是3-9之间的数字
  const secondDigit = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
  number += secondDigit;
  // 生成剩余的9位数字
  const numbers = '0123456789';
  for (let i = 0; i < 9; i++) {
    number += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return number;
};


//注册
const signUp = ()=>{
  if(registerForm.username === ''){
    registerMatch.matchREmail = true
    return
  }
  const emailMatch = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  // const emailMatch = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,15}[a-zA-Z0-9]{1,1}$/ 
  if(!emailMatch.test(registerForm.username)){
    registerMatch.noMatchREmail = true
    return
  }

  if(registerForm.password === ''){
    registerMatch.matchRPassword = true
    return
  }

  if(registerForm.PasswordCf === ''){
    registerMatch.matchRPasswordCf = true
    return
  }

  if(registerForm.password != registerForm.PasswordCf){
    registerMatch.noMatch = true
    return
  }

  if(checkedRemember.value == false){
    ElMessage .error('Please agree to the Service Agreement and Privacy Policy');
    return
  }

  const regInfo = reactive({
    username:registerForm.username,
    password:registerForm.password,
    phone_number:generateRandomMobileNumber()
  })

  register(regInfo).then(res=>{
    console.log(res)
    if(res && res.id) {
      ElMessage .success('Register successfully, please login to your account');
			// activeName.value = 'sign'
      const userInfo = reactive({
        username:registerForm.username,
        password:registerForm.password
      })
      login(userInfo).then(res=>{
        if(res && res.access_token) {
          ElMessage .success('login successfully');
          localStorage.setItem('token', res.access_token)
          setTimeout(function(){
            window.location.href="http://localhost:3000/#/home"
          },1000)
        }else{
          ElMessage .error('The account or password is incorrect');
        }
      })
		}else{
			ElMessage .error('Registration failed, please try again');
		}
  })

}

const updateCaptcha=async ()=>{
const res:any=await getCaptcha()
 captchaUrl.value=import.meta.env.VITE_BASE_API+'/captcha/'+res.data.id
 formInfo.captcha_id=res.data.id
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
// window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=425522104351-jdajusf5ollgt7ahk1q1pt6o55t8la69.apps.googleusercontent.com&redirect_uri=YOUR_REDIRECT_URI&scope=YOUR_SCOPE&response_type=code'
googleAuthCodeLogin().then((response) => {
    console.log("Handle the response", response)
  })
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

  border-radius: 10px;
  border: 1px solid #efefef;
  background-color: #fff;
  color: #666;
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
