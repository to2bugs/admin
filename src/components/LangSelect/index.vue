<template>
  <div class="lang-container">
    <el-dropdown
      class="international"
      trigger="click"
      @command="handleSetLanguage"
    >
      <div>
        <el-tooltip content="国际化" :effect="effect">
          <svg-icon icon="language"></svg-icon>
        </el-tooltip>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zh'" command="zh"
            >中文</el-dropdown-item
          >
          <el-dropdown-item :disabled="language === 'en'" command="en"
            >English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
const store = useStore()
const i18n = useI18n()
//
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (val) {
      return ['dark', 'light'].indexOf(val) !== -1
    }
  }
})
//
const language = computed(() => {
  return store.getters.language
})
//
const handleSetLanguage = (lang) => {
  // 切换 i18n 的 locale
  i18n.locale.value = lang
  // 修改 vuex 中的 language
  store.commit('app/setLanguage', lang)
  // 提示
  // const tooltips = lang === 'zh' ? '中文' : '英文'
  // ElMessage.success(`语言设定为${tooltips}`)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped>
.lang-container {
}
</style>
