//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: `http://127.0.0.1:3000/v1/key?code=${res.code}`,
          method: 'GET',
          success: data=> {
            console.log(data)
          },
          fail: err=> {
            console.log(err)
          }
        })
      }
    })
    this.updateUserInfo()
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
            console.log(res.encryptedData)
            wx.request({
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