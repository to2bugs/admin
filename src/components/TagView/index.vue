<template>
  <div id="guide-tags" class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{ backgroundColor: isActive(tag) ? 'black' : '' }"
      @contextmenu.prevent="openContext($event, index)"
    >
      {{ tag.title }}
      <i
        v-show="!isActive(tag)"
        class="el-icon-close"
        @click.prevent.stop="onCloseClick(index)"
      ></i>
    </router-link>
    <context-menu
      v-show="visible"
      :index="selectIndex"
      :style="menuStyle"
    ></context-menu>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ContextMenu from './ContextMenu.vue'
const store = useStore()
const route = useRoute()
// 是否是选中的 tagview
const isActive = (tag) => route.path === tag.path
// 关闭 tagview
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    index: index,
    type: 'index'
  })
}
// 点击鼠标右键
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = ref({
  left: 0,
  top: 0
})
const openContext = (event, index) => {
  // 属性
  selectIndex.value = index
  // 鼠标的位置
  const { x, y } = event
  // 右键菜单的行内样式
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  // 右键菜单的可见性
  visible.value = true
}
// 监听 visible
const closeContextMenu = () => {
  visible.value = false
}
// contextMenu 展示出来了, 就在 body 上添加事件 closeContextMenu
// 否则, 就在 body 上删除事件 closeContextMenu
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeContextMenu)
  } else {
    document.body.removeEventListener('click', closeContextMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
