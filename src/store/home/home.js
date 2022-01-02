import { classification,getBannerList,getFloor } from '@/api/index'

// state中的状态数据不要瞎写,根据后台返回数据来写
const state = {
  categoryList: [], //三级联动列表
  bannerList: [],
  FloorList: []
}
const mutations = {
  // 三级联动
  CreateList(state,value) {
    let res = value.slice(0,-2)
    state.categoryList = res
  },
  // 轮播图
  CreateBanner(state,value) {
    state.bannerList = value
  },
  // floor数据
  CreateFloor(state,value) {
    state.FloorList = value
  }
}
const actions = {
  // 请求三级联动数据
  async getCategoryList(context) {
    let result = await classification()
    if(result.code == 200) {
      context.commit('CreateList',result.data)
    }
  },
  // 请求banner数据
  async GetBanner(context) {
    let result = await getBannerList() 
    if(result.code == 200) {
      context.commit('CreateBanner',result.data)
    }
  },
  // 请求floor数据
  async getfloorList(context) {
    let result = await getFloor()
    if(result.code == 200) {
      context.commit('CreateFloor',result.data)
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