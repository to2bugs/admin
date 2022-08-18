<template>
  <div id="guide-start" @click="onClick">
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide"></svg-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'
const i18n = useI18n()
let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版, 关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
//
const onClick = () => {
  console.log('click')
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped></style>
