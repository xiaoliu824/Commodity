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
