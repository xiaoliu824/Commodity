import { reqGetShopList,CheckStatus,Deletegoods } from '@/api/index'

const state = {
  cartList: []
}
const mutations = {
  GETshopList(state,shoplist) {
    state.cartList = shoplist
  }
}
const actions = {
  // 获取购物车列表数据
  async reqGetShopList({commit}) {
    let result = await reqGetShopList()
    console.log(result)
    if(result.code == 200) {
      commit('GETshopList',result.data)
    }
  },

  // 修改购物车状态
  async CartStatus({commit},{skuID,isChecked}) {
    let result = await CheckStatus(skuID,isChecked)
    if(result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 删除商品
  async delCart({commit},skuId) {
    let result = await Deletegoods(skuId)
    if(result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 删除所有选中的商品
  delAllchecked({dispatch,getters}) {
    //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组）
    let ProArr = []
    getters.cartlist.cartInfoList.forEach(item => {
     let result =  item.isChecked == 1 ? dispatch('delCart',item.skuId) : ''
     ProArr.push(result)
    })
    //只要全部的p1|p2....都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(ProArr)
  },

  // 修改所有商品的状态
  updateAllStatus({dispatch,state},isChecked) {
    let ProArr = []
    state.cartList[0].cartInfoList.forEach(item => {
      let result = dispatch('CartStatus',{skuID:item.skuId,isChecked})
      ProArr.push(result)
    })
    //最终返回结果
    return Promise.all(ProArr)
  }
}
const getters = {
  cartlist(state) {
    // console.log(state)
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}