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

// 引入Elementui
import { Button,MessageBox } from 'element-ui';
// 注册全局组件
Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api'
//注册全局组件 第一个参数是组件的名字 第二个参数是组件
Vue.component(typeNav.name,typeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 引入图片懒加载
import atm from '@/assets/1.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading: atm
})

//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  //配置中央事件总线
  beforeCreate() {
    // 注册中央事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
