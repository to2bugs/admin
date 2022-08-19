<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :feature="featureData"
        ></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :feature="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { getFeature } from '@/api/user.js'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n.js'
const activeName = ref('feature')
// 获取项目功能数据
const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await getFeature()
}
getFeatureData()
// console.log('featureData ', featureData.value)
//
watchSwitchLang(() => {
  return getFeatureData()
})
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
