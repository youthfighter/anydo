//index.js
const yf = require('../../utils/yf.js')
Page({
  data: {
    taskList:[],
    curItem: 0,
    dataLoadErrorFlag: false
  },
  onShow: function (options) {
    this.initDateTasks()
  },
  //任务完成点击事件
  doneTaskHandle: function (event) {
    let taskId = event.currentTarget.dataset.taskid
    let self = this
    wx.showModal({
      title: '提示',
      content: '确认该项任务已完成？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          self.doneTask(taskId)
        }
      }
    })
    
  },
  //任务完成
  doneTask (taskId) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/donetask/${taskId}`,
      method: 'PUT',
      success: (data) => {
        wx.hideLoading()
        if (data.statusCode === 200 || status === 302) {
          self.setTaskDone(taskId)
        } else {
          let title = typeof data.data === 'string' ? data.data : '操作失败'
          wx.showToast({
            title,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (err) => {
        wx.hideLoading()
      }
    })
  },
  //初始化数据
  initDateTasks() {
    let self = this
    wx.showLoading({
      title: '加载中...',
    })
    yf.request({
      url: '/v1/dateTasks',
      method: 'GET',
      success: (data) => {
        if (data.data.taskList && data.data.taskList.length>0) {
          this.setData({
            taskList: data.data.taskList,
            curItem: data.data.curItem
          })
        } else {
          self.setData({
            dataLoadErrorFlag: true
          })
        }

      },
      complete: (data) => {
        wx.hideLoading()
      }
    })
  },
  //修改taskList任务完成状态
  setTaskDone (taskId) {    
    for (let i = 0; i < this.data.taskList.length;i++){
      let item = this.data.taskList[i].tasks
      for(let j=0;j<item.length;j++){
        if (taskId === item[j].taskId) {
          item[j].status = '已完成'
          break
        }
      }
    }
    this.setData({
      taskList: this.data.taskList
    })
  }
});