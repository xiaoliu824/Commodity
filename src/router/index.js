import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component:  ()=> import('@/pages/Home/home'),
      meta: {
        //通过路由原信息来控制footer组件显示与隐藏
        show: true
      }
    },
    {
      path: '/search/:keyword?',
      name: 'search',
      component: ()=> import('@/pages/Search/search'),
      meta: {
        //通过路由原信息来控制footer组件显示与隐藏
        show: true
      }
    },
    {
      path: '/login',
      component: ()=> import('@/pages/Login/login'),
      meta: {
        //通过路由原信息来控制footer组件显示与隐藏
        show: false
      }
    },
    {
      path: '/register',
      component: ()=> import('@/pages/Registered/register'),
      meta: {
        //通过路由原信息来控制footer组件显示与隐藏
        show: false
      }
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router