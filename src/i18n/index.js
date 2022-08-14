/**
 * 国际化
 * 创建 messages 数据源
   创建 locale 语言变量
   初始化 i18n 实例
   注册 i18n 实例: 在 main.js 中 app.use(i18n)
 */
import { createI18n } from 'vue-i18n'
import store from '@/store/index'
// 导入语言包
import zhLocale from '@/i18n/lang/zh'
import enLocale from '@/i18n/lang/en'

// 创建  messages 数据源
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

function getLanguage() {
  return store && store.getters && store.getters.language
}
// 创建 locale 语言变量
// const locale = store.getters.language

// 初始化 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 composition api , 必须设置为 false
  globalInjection: true, // 全局使用 t 函数, 必须设置为 true
  locale: getLanguage(),
  messages
})

// 导出 i18n 实例
export default i18n
