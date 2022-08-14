import i18n from '@/i18n/index'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
