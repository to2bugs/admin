import i18n from '@/i18n/index'
import { watch } from 'vue'
import store from '@/store/index'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 * 监听语言的变化时, 执行回调函数callback
 */
export const watchSwitchLang = (...callbacks) => {
  watch(() => store.getters.language, () => {
    callbacks.forEach(cb => {
      return cb(store.getters.language)
    })
  })
}
