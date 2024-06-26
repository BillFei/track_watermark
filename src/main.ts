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
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: '758687148578-8mg5p65q2rbmj8vhoam5vsivvomlug4e.apps.googleusercontent.com'
})
app.use(i18n)
setupAntd(app);
app.use(VueClipboard)
app.use(router)
app.use(createPinia())
app.mount('#app')
