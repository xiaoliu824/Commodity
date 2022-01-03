import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes'

const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    return {  y: 0 }
  }
})

export default router