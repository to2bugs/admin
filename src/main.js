import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import isntallSvgIcon from '@/icons/index'

// 引入自定义的全局样式
import '@/styles/index.scss'

// 引入前置路由, 作为登录鉴权
import '@/permission.js'

const app = createApp(App)
installElementPlus(app)
// 全局注册自定义组件 SvgIcon
isntallSvgIcon(app)
app.use(store).use(router).mount('#app')
