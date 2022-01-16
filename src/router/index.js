import Vue from 'vue'
import store from '@/store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes'

const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {
      y: 0
    }
  }
})
// 全局路由守卫
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // to 跳转的目标路由
  // from 从哪个路由跳转而来
  // next 放行
  next()
  // 获取token
  let token = store.state.user.token
  // 获取用户信息
  let name = store.state.user.userInfo.name
  // token存在说明用户已登录
  if (token) {
    // 如果登录了将不能再跳转到登录、注册页面
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      //已经登陆了,访问的是非登录与注册
      //登录了且拥有用户信息放行
      if (name) {
        next();
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch('GetUserInfos');
          next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch('OverLogin');
          next('/login')
        }
      }
    }
  } else {
    // 未登录
    next()
  }
})

export default router