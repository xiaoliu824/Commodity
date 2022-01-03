import {
  getSearchInfo
} from '@/api'
const state = {
  //搜索数据列表
  searList: [],
}
const mutations = {
  SearchList(state,value) {
    state.searList = value
  }
}
const actions = {
  // 获取搜索的数据
  async getSearch(context, params) {
    let result = await getSearchInfo(params)
    if(result.code == 200) {
      context.commit('SearchList',result.data)
    }
  }
}
const getters = {
  goodsList(state) {
    return state.searList.goodsList || []
  },
  trademarkList(state) {
    return state.searList.trademarkList || []
  },
  attrsList(state) {
    return state.searList.attrsList || []
  },
  totalList(state) {
    return state.searList.total || ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}