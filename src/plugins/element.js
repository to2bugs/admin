import ElementPlus from 'element-plus'
// element plus 升级到 1.1.0-beta.15 时
// 修改 import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app) => {
  app.use(ElementPlus, { locale })
}
