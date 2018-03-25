//app.js
const yf = require('./utils/yf.js')
console.log(yf.request)
App({
  onLaunch: function () {
    // 登录
    let self = this
    wx.login({
      success: res => {
        yf.request({
          url: `http://127.0.0.1:3000/v1/key?code=${res.code}`,
          method: 'GET',
          success: data=> {
            wx.setStorageSync('wid', data.data.key)
            console.log(data)
            self.updateUserInfo()
          },
          fail: err=> {
            console.log(err)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  },
  //完善用户信息
  updateUserInfo: function() {
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        wx.getUserInfo({
          success: res => {
            yf.request({
              url: 'http://127.0.0.1:3000/v1/user',
              method: 'POST',
              data: res.userInfo,
              success: data => {
                console.log(data)
              },
              fail: err => {
                console.log(err)
              }
            })
          }
        })
      }
    })
  }
})