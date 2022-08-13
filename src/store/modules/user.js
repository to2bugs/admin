import { login, getUserInfo } from '@/api/sys'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constances/index'
import md5 from 'md5'
import router from '@/router/index'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            console.log(data)
            this.commit('user/setToken', data.token)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 用户信息
    async getUserInfo(context) {
      const rest = await getUserInfo()
      this.commit('user/setUserInfo', rest)
      return rest
    },
    // 退出登录
    logout(context) {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // to /login
      router.push('/login')
    }
  }
}
