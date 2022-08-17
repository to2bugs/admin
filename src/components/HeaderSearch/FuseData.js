import path from 'path'
import i18n from '@/i18n/index'
/**
 * 得到的数据 res:
 * [ ...
 *    {
        "path":"/my",
        "title":[
            "个人中心"
        ]
      },
     ...
 * ]
 * @param {*} routes 路由表
 * @param {*} basePath 基础路径, 默认是 /
 * @param {*} prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = []
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // meta 存在时, 使用国际化处理, 生成新的 title
    // 动态路由不允许被检索的, 动态路由定义为: 路径中包含':'
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      const i18nTitle = i18n.global.t('msg.route.' + route.meta.title)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    // 存在 children 时, 需要迭代处理
    if (route.children && route.children.length > 0) {
      const tmpRoutes = generateRoutes(route.children, data.path, data.title)
      if (tmpRoutes.length > 0) {
        res = [...res, ...tmpRoutes]
      }
    }
  }
  return res
}
