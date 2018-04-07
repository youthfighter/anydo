const config = require('../config.js')
let request = function(options) {
  options.url = `${config.baseURL}${options.url}`
  options.header = options.header || {}
  let token = wx.getStorageSync('token')
  options.header.authentication = token
  let fail = options.fail
  options.fail = function(data) {
    wx.showToast({
      title: '服务器错误或网络故障，请稍后重试！',
      icon: 'none',
      duration: 3000
    })
    if (fail) {
      fail.apply(this, data)
    }
  }
  wx.request(options)
}
module.exports = {
  request
}