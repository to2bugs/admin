<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import E from 'wangeditor'
import i18next from 'i18next'
const store = useStore()
// 初始化 Editor 实例
let editor = null
// 获取到 dom
let el
const initEditor = (el) => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  // 菜单栏提示的位置
  editor.config.menuTooltipPosition = 'down'
  // 国际化
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  // 创建 editor
  editor.create()
}
//
onMounted(() => {
  // 获取指定的 dom 元素
  el = document.querySelector('#editor-box')
  initEditor(el)
})
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
