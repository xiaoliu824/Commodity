import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home/home'
import search from "./search/search";
import detail from './detail/detail'
import shopcar from './shopcar/shopcar'
import user from './User/user'
import trade from './trade/trade'

const store = new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcar,
    user,
    trade
  }
})

export default store