import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { mock } from './appConfig'
import enableMock from './mock'
import '@/styles/index.postcss' // 全局样式
import 'virtual:svg-icons-register'
import './permission'
import 'element-plus/theme-chalk/el-message.css' // message样式

// 只在开发环境且appConfig的mock字段为‘on’的情况启动mock，
// 由于线上预览需要，这里不限制环境
['development', 'staging', 'production'].includes(import.meta.env.MODE) && mock === 'on' && enableMock()

createApp(App).use(createPinia()).use(router).mount('#app')
