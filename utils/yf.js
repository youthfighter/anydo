const config = require('../config.js')
let request = function(options) {
  options.url = `${config.baseURL}${options.url}`
  options.header = options.header || {}
  let token = wx.getStorageSync('token')
  options.header.authentication = token
  wx.request(options)
}
module.exports = {
  request
}