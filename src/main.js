import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import i18n from './i18n/index.js'
import 'element-plus/dist/index.css'
import VueClipboard from 'vue-clipboard2'

createApp(App).use(i18n).use(store).use(router).use(ElementPlus).use(VueClipboard).mount('#app')
