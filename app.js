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
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        wx.getUserInfo({
          success: res => {
            console.log(res)
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
            console.log(res.userInfo)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})