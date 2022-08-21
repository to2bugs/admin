import DynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
/**
 * 1. 动态的列数据
 * 2. 被勾选的动态列数据
 * 3. table 的列数据
 */

// 1. 动态的列数据
export const dynamicData = ref(DynamicData())

// 2. 被勾选的动态列数据
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = selectDynamicLabel => {
  selectDynamicLabel.value = dynamicData.value.map(item => item.label)
}
initSelectDynamicLabel(selectDynamicLabel)

// 2.5国际化处理
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel(selectDynamicLabel)
})

// 3. table 的列数据
export const tableColumns = ref([])
watch(selectDynamicLabel, val => {
  tableColumns.value = []
  const selectData = dynamicData.value.filter(item => {
    return val.includes(item.label)
  })
  tableColumns.value.push(...selectData)
}, {
  immediate: true
})
