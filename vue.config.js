module.exports = {
  //关闭eslint
  lintOnSave: false,
  // 配置代理服务器,解决跨域问题
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
      },
    },
  },
}