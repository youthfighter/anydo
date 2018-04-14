// pages/settings/settings.js
const yf = require('../../utils/yf.js')
Page({
  data: {
    userinfo:{
      avatarUrl: '',
      nickname: ''
    },
    task: {
      all: 0,
      todo: 0,
      done: 0,
      expire: 0
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getuserInfo()
    this.initTasksInfo()
  },
  //获取用户信息 cc
  getuserInfo() {
    let self = this
    yf.request({
      url: `/v1/user`,
      method: 'GET',
      success: (data) => {
        if (data.data.user) {
          self.setData({
            userinfo: data.data.user
          })
        }
      },
      complete: (data) => {
        wx.hideLoading()
      }
    })
  },
  //初始化任务完成信息
  initTasksInfo () {
    let self = this
    wx.showLoading({
      title: '数据获取中...',
    })
    yf.request({
      url: `/v1/taskinfo`,
      method: 'GET',
      success: (data) => {
        wx.hideLoading()
        if (data.data.task) {
          self.setData({
            task: data.data.task
          })
        }
      },
      complete: (data) => {
        wx.hideLoading()
      }
    })
  },
  //授权按钮
  authorizationHandle () {
    this.updateUserInfo()
  },
  //完善用户信息
  updateUserInfo: function () {
    let self = this
    wx.authorize({
      scope: 'scope.userInfo',
      success(res) {
        wx.getUserInfo({
          success: res => {
            yf.request({
              url: '/v1/user',
              method: 'POST',
              data: res.userInfo,
              success: data => {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 3000
                })
                self.getuserInfo()
              }
            })
          }
        })
      },
      fail(data){
        wx.showToast({
          title: '您之前拒绝了授权，请稍后再尝试重新授权。',
          icon: 'none',
          duration: 3000
        })
      }
    })
  }
})
