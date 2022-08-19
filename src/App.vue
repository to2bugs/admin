<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n.js'
const store = useStore()
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
