<template>
  <div class="markdown-container">
    <!-- 编辑区 -->
    <div id="markdown-box"></div>
    <!-- 底部的按钮 -->
    <div class="buttom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { watchSwitchLang } from '@/utils/i18n.js'
import { commitArticle } from './commit'
const store = useStore()
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['onSuccess'])
// markdown
let mkEditor = null
let el
const initEditor = (el) => {
  mkEditor = new MKEditor({
    // element
    el,
    // 高度
    height: '500px',
    // 预览 markdown 是垂直的还是水平的
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}
//
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor(el)
})
//
watchSwitchLang(() => {
  // 获取到输入的内容
  const content = mkEditor.getHTML()
  // 清理掉 mkEditor
  mkEditor.destroy()
  // 重新初始化 mkEditor
  el = document.querySelector('#markdown-box')
  initEditor(el)
  mkEditor.setHTML(content)
})
// 提交事件
const onSubmitClick = async () => {
  const rest = await commitArticle({
    title: props.title,
    content: mkEditor.getHTML()
  })
  console.log('rest ', rest)
  // 提交成功后, 清理掉 mkEditer 中的内容
  mkEditor.reset()
  // 提交成功后, 触发 onSuccess 事件
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .buttom {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
