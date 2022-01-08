
export default [
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
    name: 'detail',  // 是当前路由的标识名称
    path: '/detail/:skuId',
    component: ()=> import('@/pages/Detail/index'),
  },
  {
    path: '/',
    redirect: '/home' // 重定向
  },
  {
    path: '/addCart',
    name: 'addCart',
    component: ()=> import('@/pages/AddCartSuccess/index'),
    meta: {
      //通过路由原信息来控制footer组件显示与隐藏
      show: true
    }
  },
  {
    path: '/showCart',
    name: 'showcart',
    component: ()=> import('@/pages/ShopCart/index'),
    meta: {
      //通过路由原信息来控制footer组件显示与隐藏
      show: true
    }
  }
]