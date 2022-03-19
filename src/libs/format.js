let format = {}
/** *
 * 格式化日期为字符串
 * formatString:格式化样式 参数格式要求：年：yyyy，月：MM ,日:dd，时：HH，分：mm，秒:ss,mims:毫秒
 * */
format.convertDateToString = function (date, formatString) {
  if (!date) {
    return ''
  }
  if (!formatString || formatString.length < 1) {
    formatString = 'yyyy-MM-dd'
  }
  if (date.getUTCHours() === date.getHours()) {
    format.sumTimeHour(date, 8)
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }
  var hh = date.getHours()
  if (hh < 10) {
    hh = '0' + hh
  }
  var mi = date.getMinutes().toString()
  if (mi < 10) {
    mi = '0' + mi
  }
  var ss = date.getSeconds()
  if (ss < 10) {
    ss = '0' + ss
  }
  var miniSecond = date.getMilliseconds() // 0~999
  if (miniSecond < 10) {
    miniSecond = '00' + miniSecond
  }
  if (miniSecond < 100) {
    miniSecond = '0' + miniSecond
  }
  var result = formatString.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('HH', hh).replace('mm', mi).replace('ss', ss).replace('mims', miniSecond)
  return result
}
/** *
 * 获取系统时间字符串
 * */
format.getSysTimeString = function (formatter = 'yyyy-MM-dd HH:mm:ss') {
  var now = new Date()
  return format.convertDateToString(now, formatter)
}
/** *
 * 获取系统日期字符串
 * */
format.getSysDateString = function () {
  var now = new Date()
  return format.convertDateToString(now, 'yyyy-MM-dd')
}
/** *
 * 将时间戳转换为年月日时分秒格式 xxxx年xx月xx日xx时xx分xx秒
 * */
format.getsecordToDate = function (value) {
  // 年
  var year = Math.floor(value / (12 * 30 * 24 * 60 * 60))
  value = value % (12 * 30 * 24 * 60 * 60)
  // 月
  var month = Math.floor(value / (30 * 24 * 60 * 60))
  value = value % (30 * 24 * 60 * 60)
  // 日
  var day = Math.floor(value / (24 * 60 * 60))
  value = value % (24 * 60 * 60)
  // 时
  var hour = Math.floor(value / (60 * 60))
  value = value % (60 * 60)
  // 分
  var mm = Math.floor(value / 60)
  value = value % (60)
  // 秒
  var ss = value
  year = year > 0 ? (year + '年') : ''
  month = month > 0 ? (month + '月') : ''
  day = day > 0 ? (day + '天') : ''
  hour = hour > 0 ? (hour + '时') : ''
  mm = mm > 0 ? (mm + '分') : ''
  ss = ss > 0 ? (ss + '秒') : ''
  return year + month + day + hour + mm + ss
}
/**
 * 转换时间戳为日期字符串
 * */
format.JsonTimeToString = function (jsonTime, formatString = 'yyyy-MM-dd HH:mm:ss') {
  var re = ''
  if (jsonTime) {
    try {
      var date = new Date(parseInt(jsonTime))
      re = format.convertDateToString(date, formatString)
    } catch (e) {
      // 日期无效
      console.info(jsonTime + '日期无效')
    }
  }
  return re
}
// 获取昨天 00:00:00 至 今天23:59:59日期
format.getTwodaysTime = function () {
  var date = new Date()
  var preDate = new Date(date.setDate(date.getDate() - 2))
  preDate = format.convertDateToString(preDate, 'yyyy-MM-dd 00:00:00')
  date = format.convertDateToString(new Date(), 'yyyy-MM-dd 23:59:59')
  var times = [preDate, date]
  return times
}
// 获取昨至今天的日期
format.getTwodaysDate = function () {
  var date = new Date()
  var preDate = new Date(date.setDate(date.getDate() - 1))
  preDate = format.convertDateToString(preDate, 'yyyy-MM-dd')
  date = format.convertDateToString(new Date(), 'yyyy-MM-dd')
  var times = [preDate, date]
  return times
}
// 获取最新一周的日期
format.getDefaultWorkDatetime = function (defaultFormat = 'yyyy-MM-dd') {
  var date = new Date()
  var preDate = new Date()
  preDate.setDate(preDate.getDate() - 7)
  preDate = format.convertDateToString(preDate, defaultFormat)
  date = format.convertDateToString(date, defaultFormat)
  var times = [preDate, date]
  return times
}
/** *
 * 获取日期所在年的年第一天
 * @param date
 * @returns {*|Date}
 */
format.getYearDayOne = function (date) {
  date = date || new Date()
  date.setMonth(0)
  date.setDate(1)
  return date
}
/** *
 * 计算两个日期之间的历时
 * @param starttime
 * @param endtime
 * @returns {string}
 */
format.getDatetimeLs = function (starttime, endtime) {
  var dd = ''
  var hh = ''
  var mm = ''
  var ss = ''
  if (!endtime || endtime > new Date()) {
    return '未结束'
  }
  if (!starttime) {
    return ''
  }
  var mimis = (endtime - starttime) / 1000 // 秒
  if (mimis > 24 * 60 * 60) {
    // 大于1天，按照天计算
    dd = Math.floor(mimis / (24 * 60 * 60))
    mimis = mimis - dd * 24 * 60 * 60
    dd += '天'
  }
  if (mimis > 60 * 60) {
    // 大于1小时，按照小时计算
    hh = Math.floor(mimis / (60 * 60))
    mimis = mimis - hh * 60 * 60
    hh += '时'
  }
  if (mimis > 60) {
    // 大于1分钟，按照分钟计算
    mm = Math.floor(mimis / 60)
    mimis = mimis - mm * 60
    mm += '分'
  }
  if (mimis > 0) {
    // 剩余的秒
    ss = mimis + '秒'
  }
  return dd + hh + mm + ss
}
/** *
 * 计算当前日期在当年中第几天
 * 年月日格式为xxxx-xx-xx，时间可有可无
 * @param starttime
 * @param endtime
 * @returns {string}
 */
format.getDayOfYear = function (date) {
  if (!date) return 0
  const y = parseInt(date.slice(0, 4))
  const m = parseInt(date.slice(5, 7))
  const d = parseInt(date.slice(8, 10))
  let num = 0
  for (let i = 1; i < m; i++) {
    // 判断是否是奇数和偶数
    num += (i % 2 === 1) ? 31 :
      (i !== 2 && i % 2 === 0) ? 30 :
        ((y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0)) ? 29 : 28
  }
  num += d
  return num
}
/**
 * 获取两个年份的月和天，总天数
 * @param {*年份1} year1
 * @param {*年份2} year2
 * @param {*所有的月和天数据} list,默认[]
 * @param {*按年份的月和天数据} listPage,默认{}
 * @param {*总共多少年} years
 * @param {*总共多少月} months,默认0
 * @param {*每年多少天和总天数} days,默认0
 */
format.getDateBetween = function (year1, year2) {
  if (!year1) return '请至少传入一个年！'
  // 处理年份
  year1 = year1 * 1
  year2 = year2 ? year2 * 1 : year1
  let newYear = year1
  if (year1 > year2) {
    year1 = year2
    year2 = newYear
  }
  // 获取所有月，日
  // 年份差
  const yearNUm = year2 - year1 + 1
  let result = {
    list: [],
    listPage: {},
    years: yearNUm,
    months: 0,
    days: { count: 0 }
  }
  for (let i = 0; i < yearNUm; i++) {
    result.listPage[year1] = []
    result.days[year1] = 0
    for (let m = 1; m <= 12; m++) {
      let date = new Date(year1, m, 0).getDate()
      result.list.push({ month: m, day: date })
      result.listPage[year1].push({ month: m, day: date })
      result.days[year1] += date
      result.days.count += date
    }
    result.months += 12
    year1++
  }
  return result
}

/**
 * 计算两个日期之间占用的天数、两个日期各自在第多少天、及其两年之间的总天数
 * 年月日格式为xxxx-xx-xx，时间可有可无
 * @param {*日期1} date1
 * @param {*日期2} date2
 * @param {*日期之间的天数} dayNum,默认0
 * @param {*开始日期在当年第多少天} startNum,默认0
 * @param {*结束日期在当年第多少天} endNum,默认0
 * @param {*总天数} alldays,默认365
 */
format.computedYearDay = function (date1, date2) {
  let dayObj = { dayNum: 0, startNum: 0, endNum: 0, alldays: 365 }
  if (date1 === 'null' && date2 === 'null') return dayObj
  if (date1 && date2) {
    // 根据所有年份的日期确定为当年的第多少天，然后根据当年的所有天数算百分比
    // left位置就是开始第多少天除以总天数，width就是算出中间占用多少天除以总天数
    const ksYears = parseInt(date1.slice(0, 4))
    const jsYears = parseInt(date2.slice(0, 4))
    // 两个年份之间信息
    const dayForm = format.getDateBetween(ksYears, jsYears)
    const startNum = parseInt(format.getDayOfYear(date1))
    const endNum = parseInt(format.getDayOfYear(date2))
    let dayNum = dayForm.days.count - (startNum + dayForm.days[jsYears] - endNum)
    dayNum = dayNum < 0 ? 0 : dayNum
    dayObj = { dayNum, startNum, endNum, alldays: dayForm.days.count }
  }
  return dayObj
}
export default format