import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import typeNav from '@/components/TypeNav/typeNav'
import store from '@/store/index'
Vue.config.productionTip = false

//注册全局组件 第一个参数是组件的名字 第二个参数是组件
Vue.component(typeNav.name,typeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
