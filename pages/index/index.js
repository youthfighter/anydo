//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    modalFlag:false,
    task:"",
    inputFocus:true,
    todayTask:[
      { content: '123', type: '个人事务', time: '19:58'},
      { content: '222', type: '个人事务', time: '19:58' },
      {content: '333', type: '个人事务', time: '19:58' },
      {content: '444', type: '个人事务', time: '19:58' }
    ]
  },
  //事件处理函数
  showModal: function() {
    this.setData({
      modalFlag: true
    })
  },
  hideModal: function() {
    this.setData({
      modalFlag: false
    })
  },
  addTag: function(event) {
    let tag = event.currentTarget.dataset.tag;
    console.log(tag)
    if (tag) {
      this.setData({
        task: tag + " ",
        inputFocus: true
      })
    }
  },
  saveTask: function() {
    console.log('save',this.data.task);
  },
  taskChange: function(e) {
    let value = e.detail.value;
    this.setData({
      task: value
    });
    console.log(1)
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
  }
})
