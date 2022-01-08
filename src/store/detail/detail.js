import { reqGoodsInfo,reqAddUpCart } from "@/api";

const state = {
  goodInfo: {},
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    console.log(result)
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  // 将商品添加到购物车
  async addShopCar({commit},{skuId,skuNum}) {
    let result = await reqAddUpCart(skuId,skuNum)
    if(result.code == 200) {
      // 添加成功
      return 'ok'
    } else {
      // 失败
      return Promise.reject(new Error('出错了'))
    }
  }
};
//简化数据而生
const getters = {
  //路径导航简化的数据
  categoryView(state) {
    //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
    return state.goodInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
};
export default {
  state,
  actions,
  mutations,
  getters,
};
