import { classification } from '@/api/index'

// state中的状态数据不要瞎写,根据后台返回数据来写
const state = {
  categoryList: [], //三级联动列表
}
const mutations = {
  // 三级联动
  CreateList(state,value) {
    let res = value.slice(0,-2)
    state.categoryList = res
  }
}
const actions = {
  // 请求三级联动数据
  async getCategoryList(context) {
    let result = await classification()
    if(result.code == 200) {
      context.commit('CreateList',result.data)
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