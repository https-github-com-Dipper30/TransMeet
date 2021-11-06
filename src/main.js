import { createApp } from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import i18n from './i18n'
import 'element-plus/dist/index.css'

createApp(App).use(VueI18n).use(store).use(router).use(ElementPlus).use(i18n).mount('#app')
