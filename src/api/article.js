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
/**
 * 获取所有的文章
 */
export const getArticleList = (data) => {
  return request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}
