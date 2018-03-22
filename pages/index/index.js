//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    modalFlag:false,
    task:"",
    dateType:0,
    inputFocus:true,
    tasks: [
      {
        task: [
          { content: '111', type: '个人事务', time: '19:58' },
          { content: '222', type: '个人事务', time: '19:58' },
          { content: '333', type: '个人事务', time: '19:58' },
          { content: '444', type: '个人事务', time: '19:58' }
        ],
        cancelTask: [
          { content: '444', type: '个人事务', time: '19:58' }
        ],
        type: 0,
        label: '今日',
        detailFlag: false
      },
      {
        task: [
          { content: '123', type: '个人事务', time: '19:58' },
          { content: '222', type: '个人事务', time: '19:58' },
          { content: '333', type: '个人事务', time: '19:58' },
          { content: '444', type: '个人事务', time: '19:58' }
        ],
        type: 1,
        label: '明日',
        detailFlag: false
      },
      {
        task: [
          { content: '123', type: '个人事务', time: '19:58' },
          { content: '222', type: '个人事务', time: '19:58' },
          { content: '333', type: '个人事务', time: '19:58' },
          { content: '444', type: '个人事务', time: '19:58' }
        ],
        type: 2,
        label: '已过期',
        detailFlag: false
      }
    ]
  },
  onLoad: function (options) {
    console.log(123456)
  },
  //事件处理函数
  showModalHandle: function(event) {
    this.showModal()
  },
  hideModalHandle: function () {
    this.setData({
      modalFlag: false,
      dateType: 0,
      task: ''
    })
  },
  chooseTypeHandle: function() {
    wx.showActionSheet({
      itemList: ['个人事务', '工作项目', '杂货列表'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  chooseDateHandle: function() {
    wx.showActionSheet({
      itemList: ['推迟一天', '推迟两天', '推迟一周'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  doneTaskHandle: function() {
    wx.showModal({
      title: '提示',
      content: '确认该项任务已完成？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  removeTaskHandle: function() {
    console.log('remove')
  },
  deleteTaskHandle: function() {
    console.log('delete')
  },
  revertTaskHandle: function() {
    console.log('revert')
  },
  showModal: function (dateType) {
    this.setData({
      modalFlag: true,
      dateType: dateType || 0
    })
  },
  addHandle: function(event) {
    this.showModal(event.target.dataset.type)
  },
  addTag: function(event) {
    let tag = event.currentTarget.dataset.tag;
    if (tag) {
      this.setData({
        task: tag + " ",
        inputFocus: true
      })
    }
  },
  //任务编辑
  editTaskHandle: function (event){
    let content = event.currentTarget.dataset.content;
    this.setData({
      task: content
    })
    this.showModal()
  },
  //点击时间分类
  toggleDate: function(event) {
    let type = event.currentTarget.dataset.type || 0
    let key = `tasks[${type}].detailFlag`
    this.setData({
      [key]: !this.data.tasks[type].detailFlag
    })
  },
  //点击任务详情
  toggleTask: function(event) {
    let index = event.currentTarget.dataset.index || 0
    let type = event.currentTarget.dataset.type || 0
    console.log(index, type)
    let key = `tasks[${type}].task`
    this.data.tasks[type].task.forEach((item, i)=>{
      if (i === index) {
        item.detailFlag = !item.detailFlag;
      } else {
        item.detailFlag = false;
      }  
    })
    this.setData({
      [key]: this.data.tasks[type].task
    })
    
  },
  saveTaskHandle: function() {
    console.log('save',this.data.task, this.data.dateType);
    this.hideModalHandle();
  },
  taskChange: function(e) {
    let value = e.detail.value;
    this.setData({
      task: value
    });
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
  }
})
