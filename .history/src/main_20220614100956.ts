import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/base.css'
import '@/styles/index.postcss' // 全局样式
import 'virtual:svg-icons-register'

createApp(App).use(createPinia()).use(router).mount('#app')
