import {v4 as v4Div} from 'uuid'

// 生成一个随机身份,且每次执行不能发生变化,游客身份永久
export function getUserId() {
  // 从本地存储中查看是否有游客id（看一下本地存储里面是否有）
  let user_token = localStorage.getItem('userToken');
  //如果没有
  if(!user_token) {
    // 生成临时身份,
    user_token = v4Div();
    // 存储到本地
    localStorage.setItem('userToken',user_token)
  }
  //切记有返回值,没有返回值undefined
  return user_token
}