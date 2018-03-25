let request = function(options) {
  options.header = options.header || {}
  let wid = wx.getStorageSync('wid')
  options.header.Cookie = `wid=${wid}`
  wx.request(options)
}
module.exports = {
  request
}