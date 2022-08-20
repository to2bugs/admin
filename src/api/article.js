import request from '@/utils/request'
/**
 * 创建文章
 */
export const createArticle = data => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}
