import { GetOrderInfo,GetAddress } from '@/api'
const state = {
  Address:[], //地址信息
  OrderInfo: {}
}
const mutations = {
  // 用户地址
  CREATEADDRESS(state,address) {
    state.Address = address
  },
  //订单信息
  CREATEOrder(state,order) {
    state.OrderInfo = order
  }
}
const actions = {
  //获取商品清单数据
  async GetOrder({ commit }) {
    let result = await GetOrderInfo()
    if(result.code == 200) {
      commit('CREATEOrder',result.data)
    }
  },
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await GetAddress()
    if(result.code == 200) {
      commit('CREATEADDRESS',result.data)
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