<template>
  <!-- 展示外部的 svg 图标 -->
  <div
    v-if="isExternal"
    :style="externalSVGStyle"
    class="svg-external-icon svg-icon"
    :class="className"
  ></div>
  <!-- 展示本地的 svg 图标 -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternalSVG } from '../../utils/rules'
// 定义属性
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  }
})
// 定义计算属性: 判断是否为外部图标
const isExternal = computed(() => {
  return isExternalSVG(props.icon)
})
// 定义计算属性: 外部图标的样式
const externalSVGStyle = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
// 定义计算属性: 本地图标的名称
const iconName = computed(() => {
  return `#icon-${props.icon}`
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
