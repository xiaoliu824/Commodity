// 存储token
export function saveToken(token) {
  console.log(token)
  localStorage.setItem('TOKEN',token)
}
// 获取token
export function getToken() {
  return localStorage.getItem('TOKEN')
}
// 删除token
export function delToken() {
  localStorage.removeItem('TOKEN')
}