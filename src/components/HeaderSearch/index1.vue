<template>
  <div :class="{ show: isShow }" class="show header-search">
    <!-- <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    /> -->
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in 5"
        :key="option"
        :label="option"
        :value="option"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.header-search {
  ::v-deep(.header-search-select) {
    width: 210px;
  }
}
</style>
