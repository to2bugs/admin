import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constances/index'
const app = {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      state.language = lang
      setItem(LANG, lang)
    },
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        // 不重复
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    }
  }
}
export default app
