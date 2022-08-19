import request from '@/utils/request'
/**
 * 获取项目接口
 * @returns Promise
 */
export const getFeature = () => {
  return request({
    url: '/user/feature',
    method: 'GET'
  })
}
/**
 * 获取章节接口
 * @returns Promise
 */
export const getChapter = () => {
  return request({
    url: '/user/chapter',
    method: ''
  })
}
