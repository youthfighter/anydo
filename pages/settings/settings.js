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
  }
})
