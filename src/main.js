import { createApp } from 'vue'
import './assets/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus,{
    // 国际化处理
    locale: zhCn
})

app.mount('#app')
