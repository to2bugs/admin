<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></sidebar>
    <!-- 右侧 -->
    <div class="main-container">
      <!-- 右侧顶部的 navbar -->
      <div class="fixed-header">
        <navbar></navbar>
        <tag-view></tag-view>
      </div>
      <!-- 右侧的内容区 appmain -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/layout/components/Sidebar/index'
import Navbar from '@/layout/components/Navbar'
import AppMain from '@/layout/components/AppMain'
import TagView from '@/components/TagView/index'
import variables from '@/styles/variables.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
  transition: width #{$sideBarDuration};
}
</style>
