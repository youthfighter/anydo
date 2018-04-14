//app.js
const yf = require('./utils/yf.js')
App({
  onLaunch: function () {
    // 登录
    let self = this
    wx.login({
      success: res => {
        yf.request({
          url: `/v1/key?code=${res.code}`,
          method: 'GET',
          success: data=> {
            wx.setStorageSync('token', data.data.token)
            if (data.data.newUser) {
              self.updateUserInfo()
            }            
          }
        })
      }
    })
  },
  globalData: {
    tasksDataChangeFlag: false
  },
  //完善用户信息
  updateUserInfo: function() {
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        wx.getUserInfo({
          success: res => {
            yf.request({
              url: '/v1/user',
              method: 'POST',
              data: res.userInfo,
              fail (){
                wx.showToast({
                  title: '获取用户信息失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    })
  }
})