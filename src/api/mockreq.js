// 对axios的二次封装
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"

// 利用axios对象的方法create,去创建一个axios实例
const requests = axios.create({
  // 基础路径
  baseURL: '/mock',
  //请求超时时间
  timeout: 5000,
})

//请求拦截器：在发送请求之前,请求拦截器可以监测到,可以在请求前做一些事情
requests.interceptors.request.use(config => {
  //请求开始,进度条开始动
  nProgress.start()
  return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
  //成功的回调函数,服务器响应数据回来以后,响应拦截器可以检测到,可以做一些事情
  // 进度条结束
  nProgress.done()
  return res.data
},(error)=>{
  //失败的回调函数,
  return Promise.reject(error)
})

export default requests