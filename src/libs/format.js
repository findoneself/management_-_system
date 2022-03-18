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
