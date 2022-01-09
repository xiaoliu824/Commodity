import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './home/home'
import search from "./search/search";
import detail from './detail/detail'
import shopcar from './shopcar/shopcar'

const store = new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcar
  }
})

export default store