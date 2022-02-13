
export default [
  {
    path: '/center',
    component: () => import('@/pages/Center/index'),
    children: [
      {
        // path: '/center/myorder',
        path: 'myorder',
        component:()=> import('@/pages/Center/myOrder/index'),
      },
      {
        path: 'groupbuy',
        // component: ()=>  import('@/pages/Center/groupOrder/index'),
        component: () => import('@/pages/Center/groupOrder/index')
        // component:()=> import('@/pages/Center/myOrder/index'),
      },

      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },
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
    },
  },
  {
    path: '/showCart',
    name: 'showcart',
    component: ()=> import('@/pages/ShopCart/index'),
    meta: {
      //通过路由原信息来控制footer组件显示与隐藏
      show: true
    }
  }, 
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/pages/Trade/index'),
    meta: {
      show: true
    },
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter: (to, from, next) => {
      // ...
      if(from.path === '/showCart') {
        next()
      } else {
        next('/showCart')
      }
    }
     
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/pages/Pay/index'),
    meta: {
      show: true
    },
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter: (to, from, next) => {
      // ...
      if(from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () => import('@/pages/PaySuccess/index'),
    meta: {
      show: true
    },
  }
]