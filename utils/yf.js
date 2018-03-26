let request = function(options) {
  options.header = options.header || {}
  let token = wx.getStorageSync('token')
  options.header.authentication = token
  wx.request(options)
}
module.exports = {
  request
}