<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags.js'
import { generateTitle } from '@/utils/i18n.js'
const store = useStore()
const route = useRoute()

// 生成 title
const getTitle = (route) => {
  let title = ''
  if (!route.meta) {
    const pathArray = route.path.split('/')
    title = pathArray[pathArray.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
// 监听路由的变化, 添加路由到 tagsView 中
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
