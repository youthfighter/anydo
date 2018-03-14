const DATE_ITEM_WIDTH = 50
const FUTURE_YEAR = 1
const PAST_YEAR = 1
Page({
  data: {
    timeList:[],
    cur:0,
    scrollLeft:0
  },
  onLoad: function(){
    this.initData()
  },
  initData: function() {
    let nowDate = new Date()
    let nowYear = nowDate.getFullYear()
    let pastYearStart = nowYear - PAST_YEAR
    let futureYearEnd = nowYear + FUTURE_YEAR
    let curYear = pastYearStart
    let timeList = []
    let cur = 0
    //判断是否闰年
    let leapYear = function (Year) {
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else { return (false); }
    }
    while (curYear < futureYearEnd) {
      let mouthDayList = [31, leapYear(curYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let dayList = ['周一', '周二', '周三', '周四', '周五', '周六','周日']
      for (let i = 0; i<mouthDayList.length; i++) {
        for (let j = 0; j < mouthDayList[i]; j++) {
          let md = new Date(`${curYear}-${i+1}-${j+1}`)
          if (nowDate.getFullYear() === md.getFullYear() && nowDate.getMonth() === md.getMonth() && nowDate.getDate() === md.getDate()) {
            cur = timeList.length
            console.log(cur)
          }
          timeList.push({
            yearmonth: `${curYear}年${i+1}月`,
            wek: dayList[md.getDay()],
            day: j+1
          })
        }
      }
      ++curYear
    }
    this.setData({
      timeList,
      cur: cur,
      scrollLeft: cur * DATE_ITEM_WIDTH
    })
  },
  scrollXHandle: function(event) {
    let scrollLeft = event.detail.scrollLeft
    let offset = scrollLeft % DATE_ITEM_WIDTH
    let cur = parseInt(scrollLeft / DATE_ITEM_WIDTH)
    console.log(scrollLeft)
    if (offset > DATE_ITEM_WIDTH / 2) {
      ++cur
    }
    this.setData({
      cur: cur
    })
  }
})