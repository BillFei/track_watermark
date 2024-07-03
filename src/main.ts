import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './assets/language'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import './components/globle.scss'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import './iconfont/iconfont.css'
import { setupAntd } from "./ant-design";
import vue3GoogleLogin from 'vue3-google-login';
const app = createApp(App)
createApp(App).use(vue3GoogleLogin, {
    clientId: '425522104351-jdajusf5ollgt7ahk1q1pt6o55t8la69.apps.googleusercontent.com' // 谷歌客户端ID
})
app.use(i18n)
setupAntd(app);
app.use(VueClipboard)
app.use(router)
app.use(createPinia())
app.mount('#app')
