import { createApp } from 'vue'
import '@/assets/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from '@/App.vue'
import router from '@/router'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-persistedstate-plugin'

const app = createApp(App)
const pinia = createPinia()
const persist=createPersistedState()
// pinia数据持久化创建
pinia.use(persist)

app.use(pinia)
app.use(ElementPlus,{
    // 国际化处理
    locale: zhCn
})
app.use(router)

app.mount('#app')
