import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
// import { createI18n } from 'vue-i18n'
import locales from './locales'
// import VueI18n from 'vue-i18n'
// const i18n = new VueI18n({
//     locale: 'en',
//     messages: {
//         'en': {
//             message: {hello: 'hello'},
//             switch_lang: 'change language'
//          },
//         'zh': {
//             message: {hello: '你好'},
//             switch_lang: '切换语言'
//          }
//      }
// })
// import store from '../store'

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages: locales,
})

export default i18n
