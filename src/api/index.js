//当前这个模块,对API进行统管理
// 后台请求数据
import requests from './requests'

// 请求mock数据
import MockReq from './mockreq'

/**
 * 三级分类
 * get方式
 * 无参数
 */
export function classification() {
  return requests({url: '/product/getBaseCategoryList',method:'get'});
}

// 获取banner轮播图数据
export function getBannerList() {
  return MockReq({url: 'banner',method: 'get'})
}

// 获取floor数据
export function getFloor() {
  return MockReq({url: 'floor',method: 'get'})
}

// 获取Search相关的数据 请求方式 post
// 需要携带参数
/**
 * {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// 参数至少是一个空对象
export function getSearchInfo(params) {
  return requests({url: '/list',method: 'post',data: params})
}

//获取产品详情信息的接口  URL: /api/item/{ skuId }  请求方式：get  
export function reqGoodsInfo(skuId) {
  return requests({url: `/item/${skuId}`,method: 'get'})
}

// 添加到购物车的接口 /api/cart/addToCart/{ skuId }/{ skuNum } post
export function reqAddUpCart(skuId,skuNum) {
  return requests({url: `/cart/addToCart/${skuId}/${skuNum}`,method:'post'});
}

// 获取购物车信息
export function reqGetShopList() {
  return requests({url: '/cart/cartList',method: 'get'})
}

// 切换购物车单个选中状态
// /api/cart/checkCart/{skuID}/{isChecked} get
export function CheckStatus(skuId,isChecked) {
  return requests({url: `/cart/checkCart/${skuId}/${isChecked}`,method: 'get'})
}

// 删除单个商品
// /api/cart/deleteCart/{skuId} DELETE
export function Deletegoods(skuId) {
  return requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
}

// 注册
// /api/user/passport/register post
export function Register(data) {
  return requests({url: '/user/passport/register',data,method: 'post'});
}

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export function getCode(phone) {
  return requests({url: `/user/passport/sendCode/${phone}` ,method:'get'})
}

// 登录
// /api/user/passport/login post
export function UserLogin(data) {
  return requests({url: '/user/passport/login',data,method:'post'});
}

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export function GetUserInfo() {
  return requests({url: '/user/passport/auth/getUserInfo',method: 'get'})
}

// 退出登录
// /api/user/passport/logout get
export function UserLogiut() {
  return requests({url:'/user/passport/logout',method: 'get'})
}

