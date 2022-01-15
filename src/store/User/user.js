
import { getCode,Register,UserLogin,GetUserInfo,UserLogiut } from '@/api'
import { saveToken,getToken,delToken } from '@/utils/Token'

const state = {
  code: "",
  token: getToken(),
  userInfo: {},
}
const mutations = {
  // 验证码
  CreateCode(state,code) {
    state.code = code
  },
  // 得到Token
  CreateToken(state,token) {
    state.token = token
  },
  CreateInfo(state,userInfo) {
    state.userInfo = userInfo
  },
  //清除本地数据
  CLEAR(state) {
    // 将用户数据清空
    state.token = ''
    state.userInfo = {}
    // 清除本地token
    delToken()
  }
}
const actions = {
  // 获取验证码
  async getStatecode({commit},phone) {
    //获取验证码的这个接口：把验证码返回，但是正常情况，后台把验证码发到用户手机上【省钱】
    let result = await getCode(phone)
    if(result.code == 200) {
      commit('CreateCode',result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 注册业务
  async RegisterUser({commit},data) {
    console.log(data)
   let result = await Register(data)
   if(result.code == 200) {
     return 'ok'
   } else {
     return Promise.reject(new Error('faile'))
   }
  },
  // 登录业务
  async UserLogin({ commit }, data) {
    let result = await UserLogin(data)
    if(result.code == 200) {
      // 用户登录成功,并得到token(令牌)
      commit('CreateToken',result.data.token)
      //持久化存储token
      saveToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息【需要带着用户的token向服务器要用户信息】
  async GetUserInfos({ commit }) {
    let result = await GetUserInfo()
    console.log(result)
    if(result.code == 200) {
      commit('CreateInfo',result.data)
      return 'ok'
    } 
  },
  // 退出登录
  async OverLogin({ commit }) {
     //只是向服务器发起一次请求，通知服务器清除token
    let result = await UserLogiut()
    //action里面不能操作state，提交mutation修改state
    if(result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}