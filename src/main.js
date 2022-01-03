import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import typeNav from '@/components/TypeNav/typeNav'
import store from '@/store/index'
Vue.config.productionTip = false

// 引入mock数据
import '@/mock/mockServer.js'
// 引入Swiper样式
import 'swiper/css/swiper.css';

// 引入轮播图组件
import Carousel from '@/components/Carousel/index'
// 引入分页组件
import Pagination from '@/components/Pagination/index'

//注册全局组件 第一个参数是组件的名字 第二个参数是组件
Vue.component(typeNav.name,typeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

new Vue({
  render: h => h(App),
  //配置中央事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
