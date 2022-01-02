// 引入mockjs模块
import Mock from 'mockjs'

//* 这里JSON数据格式根本没有对外暴露，但是可以引入
//* 因为webpack默认对外暴露: 图片、JSON数据格式
// 引入banner模块(数据)
import banner from './banner.json'
// 引入floor模块(数据)
import floor from './floor.json'

// 使用Mock
// 第一个参数为请求的地址 第二个参数为请求数据
Mock.mock('/mock/banner',{code: 200,data: banner});
Mock.mock('/mock/floor',{code: 200,data: floor});