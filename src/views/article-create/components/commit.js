import { createArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n/index'

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(i18n.global.t('msg.article.createSuccess'))
  return res
}
