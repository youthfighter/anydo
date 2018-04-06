//index.js
const yf = require('../../utils/yf.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    modalObj: {
      modalFlag: false,
      dateType: 0,
      inputFocus: true,
      taskContent: "",
      taskId: null
    },    
        
    typeList: [], //任务类型，onload中初始化
    tasks: []
  },
  onLoad: function (options) {
    this.initType() //初始化任务类型
    this.initClassifyTasks() //初始化首页任务分类
  },
  //事件处理函数
  showModalHandle: function(event) {
    this.showModal()
  },
  hideModalHandle: function () {
    this.setData({
      modalObj: {
        modalFlag: false,
        dateType: 0,
        inputFocus: false,
        taskContent: "",
        taskId: null
      }
    })
  },
  // 更新标签
  updateTaskType: function(taskId, type) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/task/${taskId}`,
      method: 'PUT',
      data: { type },
      success: (data) => {
        self.updateTasksByTaskId(taskId, {type})
      },
      complete: (data) =>{
        wx.hideLoading()
      }
    })
  },
  // 更新计划完成的时间
  updatePlanDatetime: function (taskId, num) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/delaytask/${taskId}`,
      method: 'PUT',
      data: { num },
      success: (data) => {
        self.initClassifyTasks()
      },
      complete: (data) => {
        wx.hideLoading()
      }
    })
  },
  //更新任务内容
  updateTaskContent: function (taskId, content) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/task/${taskId}`,
      method: 'PUT',
      data: { content },
      success: (data) => {
        self.updateTasksByTaskId(taskId, { content })
      },
      complete: (data) => {
        wx.hideLoading()
      }
    })
  },
  //任务完成
  doneTask: function (taskId) {
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
          self.initClassifyTasks()
        } else {
          wx.showToast({
            title: data.data || '操作失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (err) =>{
        wx.hideLoading()
      }
    })
  },
  //移除任务
  removeTask: function(taskId) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/removeTask/${taskId}`,
      method: 'PUT',
      success: (data) => {
        wx.hideLoading()
        if (data.statusCode === 200 || status === 302) {
          self.initClassifyTasks()
        } else {
          wx.showToast({
            title: data.data || '操作失败',
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
  revertTask: function (taskId) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/revertTask/${taskId}`,
      method: 'PUT',
      success: (data) => {
        wx.hideLoading()
        if (data.statusCode === 200 || status === 302) {
          self.initClassifyTasks()
        } else {
          wx.showToast({
            title: data.data || '操作失败',
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
  deleteTask: function (taskId) {
    let self = this
    wx.showLoading({
      title: '保存中...',
    })
    yf.request({
      url: `/v1/task/${taskId}`,
      method: 'DELETE',
      success: (data) => {
        wx.hideLoading()
        if (data.statusCode === 200 || status === 302) {
          self.initClassifyTasks()
        } else {
          wx.showToast({
            title: data.data || '操作失败',
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
  // 选择任务标签
  chooseTypeHandle: function(event) {
    let taskId = event.target.dataset.taskid
    let self = this
    wx.showActionSheet({
      itemList: self.data.typeList,
      success: function (res) {
        self.updateTaskType(taskId, self.data.typeList[res.tapIndex])
      }
    })
  },
  //选择延迟标签
  chooseDateHandle: function (event) {
    let self = this
    let taskId = event.target.dataset.taskid
    let curPlanDatetime = event.target.dataset.plandatetime
    wx.showActionSheet({
      itemList: ['推迟一天', '推迟两天', '推迟一周'],
      success: function (res) {
        let num = 0
        switch(res.tapIndex)
        {
          case 0:
            num = 1
            break
          case 1:
            num = 2
            break
          case 2:
            num = 7
            break          
        }
        self.updatePlanDatetime(taskId, num)
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  doneTaskHandle: function (event) {
    let self = this
    let taskId = event.target.dataset.taskid
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
  removeTaskHandle: function(event) {
    let taskId = event.target.dataset.taskid
    this.removeTask(taskId)
  },
  deleteTaskHandle: function (event) {
    let taskId = event.target.dataset.taskid
    this.deleteTask(taskId)
  },
  revertTaskHandle: function (event) {
    let taskId = event.target.dataset.taskid
    this.revertTask(taskId)
  },
  //初始化任务类型
  initType: function() {
    console.log('inittypes')
    yf.request({
      url: '/v1/types',
      method: 'GET',
      success: (data)=>{
        console.log('data', data.data)
        this.setData({
          typeList: data.data
        })
      }
    })
  },
  //初始化首页任务分类
  initClassifyTasks: function() {
    console.log('initClassifyTasks')
    let self = this
    yf.request({
      url: '/v1/classifyTasks',
      method: 'GET',
      success: (data) => {
        data.data[0].detailFlag = true
        self.setData({
          tasks: data.data
        })
      }
    })
  },
  showModal: function (options = {}) {    
    this.setData({
      modalObj: {
        modalFlag: true,
        dateType: options.dateType || 0,
        inputFocus: true,
        taskContent: options.taskContent || "",
        taskId: options.taskId || null
      }
    })
  },
  addHandle: function(event) {
    this.showModal({
      dateType: event.target.dataset.type
    })
  },
  addTag: function(event) {
    let tag = event.currentTarget.dataset.tag;
    if (tag) {
      this.setData({
        'modalObj.taskContent': tag + " ",
        'modalObj.inputFocus': true
      })
    }
  },
  //任务编辑
  editTaskHandle: function (event){
    let taskContent = event.currentTarget.dataset.taskcontent
    let taskId = event.currentTarget.dataset.taskid;
    console.log({ taskId, taskContent })
    this.showModal({ taskId, taskContent})
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
    let dateType = this.data.modalObj.dateType || 0
    console.log(this.data.modalObj.taskId)
    if (this.data.modalObj.taskId) {
      this.updateTaskContent(this.data.modalObj.taskId, this.data.modalObj.taskContent)
    } else {
      this.saveTask(this.data.modalObj.taskContent, dateType)
    }    
    this.hideModalHandle();
  },
  taskChange: function(e) {
    let value = e.detail.value;
    this.setData({
      'modalObj.taskContent': value
    });
  },
  // 通过方法 根据taskid修改taskList
  updateTasksByTaskId: function(taskId, obj) {
    let flag = false
    this.data.tasks.map((task)=>{
      task.task.map(item => {
        if (item.taskId === taskId) {
          flag = true
          for (let key in obj) {
            item[key] = obj[key]
          }
        }
        return item
      })
      task.cancelTask.map(item => {
        if (item.taskId === taskId) {
          flag = true
          for (let key in obj) {
            item[key] = obj[key]
          }
        }
        return item
      })
    })
    if (flag) {
      this.setData({
        tasks: this.data.tasks
      })
    }
  },
  //根据taskid找到task
  getTaskByTaskId: function(taskId) {
    let targetTask
    for(let i=0;i<this.data.tasks.length;i++){
      let ot = this.data.tasks[i]
      for (let j = 0; j < ot.task.length;j++){
        if (this.data.tasks[i].task.taskId === taskId) {
          targetTask = this.data.tasks[i].task
          break
        }
      }
    }
    return targetTask
  },
  // 保存任务
  saveTask: function(content, dateType) {
    console.log(content, dateType)
    wx.showLoading({
      title: '加载中',
    })
    yf.request({
      url: '/v1/task',
      method: 'POST',
      data:{
        dateType,
        content
      },
      success: data=>{
        let dateType = data.data.dateType
        if (dateType === 0) {
          this.data.tasks[0].task.unshift(data.data)
          this.data.tasks[0].detailFlag = true
        } else if (dateType === 1) {
          this.data.tasks[1].task.unshift(data.data)
          this.data.tasks[1].detailFlag = true
        } else if (dateType > 1) {
          this.data.tasks[2].task.unshift(data.data)
          this.data.tasks[2].detailFlag = true
        }
        this.setData({
          tasks: this.data.tasks
        })
      },
      fail: data=>{
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      },
      complete: data=>{
        wx.hideLoading()
      }      

    })
  }
})
