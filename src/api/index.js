//当前这个模块,对API进行统管理
import requests from './requests'

/**
 * 三级分类
 * get方式
 * 无参数
 */
export function classification() {
  return requests({url: '/product/getBaseCategoryList',method:'get'});
}