<template>
  <div @click="onToggle">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
// 是否是全屏状态
const isFullscreen = ref(false)
// 图标点击事件
const onToggle = () => {
  // isFullscreen.value = !isFullscreen.value
  screenfull.toggle()
}
// 监听 screenfull 的变化
// on: 绑定监听
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
onMounted(() => {
  screenfull.on('change', change)
})
// off: 取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
