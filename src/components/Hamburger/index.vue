<template>
  <div id="guide-hamburger" class="hamburger-container1" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container1 {
  padding: 0 16px;
  .hamburger {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
