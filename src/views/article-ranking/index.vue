<template>
  <div class="article-ranking-container">
    <!-- check -->
    <el-card class="header">
      <div class="dynamic">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" ref="tableRef" border>
        <!-- <el-table-column
          :label="$t('msg.article.ranking')"
          prop="ranking"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.title')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.author')"
          prop="author"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.publicDate')"
          prop="publicDate"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.article.desc')"
          prop="desc"
        ></el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column> -->
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="mini" @click="onShowClick(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="pagination"
        :total="total"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 10, 20, 50, 100]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getArticleList } from '@/api/article.js'
import { watchSwitchLang } from '@/utils/i18n.js'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic/index'
// 数据相关
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
// dom
const tableRef = ref(null)
// 获取数据的方法
const getListData = async ({ page, size }) => {
  const rest = await getArticleList({
    page: page.value,
    size: size.value
  })
  console.log('文章排名的数据 ', rest)
  tableData.value = rest.list
  total.value = rest.total
}
getListData({ page, size })
// 国际化处理
watchSwitchLang(() => {
  getListData({ page, size })
})
//
onActivated(() => {
  getListData({ page, size })
})
// 操作按钮事件
const onShowClick = (row) => {}
const onRemoveClick = (row) => {}
// 分页器事件
const handleSizeChange = (size) => {
  getListData({ page, size })
}
const handleCurrentChange = (page) => {
  getListData({ page, size })
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
