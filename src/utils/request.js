import axios from 'axios'
import store from '@/store/index'
import { ElMessage } from 'element-plus'
import { icode } from '../constances'
import { isCheckTimeout } from '@/utils/auth'
// 定义实例 instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: { icode }
})

// 定义请求拦截器
instance.interceptors.request.use(
  config => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      if (isCheckTimeout()) {
        // token 在客户端验证过期了
        // 退出登录
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 过期了...'))
      }
      // 如果token存在 注入token 注意 Authorization 大写
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 配置接口的国际化
    config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  error => {
    return Promise.reject(error)
  }
)

// 定义响应拦截器
instance.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    // 处理服务端 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default instance
