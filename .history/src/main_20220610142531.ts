import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/styles/index.postcss' // 全局样式

createApp(App).use(createPinia()).use(router).mount('#app')
