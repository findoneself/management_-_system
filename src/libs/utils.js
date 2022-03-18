let Utils = {}
// 清除sessionStorage
Utils.sessionStorageRemove = function (key) {
  if (typeof key === 'string') {
    window.sessionStorage.removeItem(key)
  } else {
    return
  }
}
// 自定义邮箱邮箱验证规则
Utils.checkEmail = function (rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入邮箱！'))
  } else {
    // 邮箱验证正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
    if (regEmail.test(value)) {
      return callback()
    }
    callback(new Error('请输入合法的邮箱'))
  }
}

// 自定义手机号验证规则
Utils.checkMobile = function (rule, value, callback) {
  if (!value) {
    return callback(new Error('请输入手机！'))
  } else {
    const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    if (regMobile.test(value)) {
      return callback()
    }
    callback(new Error('请输入合法的手机'))
  }
}

// 递归调用数组给子数据添加属性和值
// 四个api参数：data：数组， subData：子数组，key：添加的属性，value：添加的属性值
Utils.setAttribute = function (obj) {
  if (obj.data && Array.isArray(obj.data)) {
    obj.data.map(item => {
      if (item[obj.subData] && item[obj.subData][length] !== 0) {
        item[obj.key] = obj.value
        Utils.setAttribute({
          data: item[obj.subData],
          subData: obj.subData,
          key: obj.key,
          value: obj.value
        })
      }
      return item
    })
  }
  return obj.data
}

// 时间格式化
Utils.formatDate = function (date, fmt) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }

  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
// 时间格式化
Utils.format = function (format) {
  let date = new Date()
  var args = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var i in args) {
    var n = args[i]
    if (new RegExp('(' + i + ')').test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length))
  }
  return format
}
// 图片类型的正则判断
Utils.imageRegExp = function (str) {
  const pattern = /^image\/(jpg|jpeg|png)$/
  return pattern.test(str)
}
// 递归获取当前节点的所有父节点
Utils.familyTree = function (data, id) {
  let obj = {}
  let lists = []
  let index = 1
  function forFn (arr, id) {
    arr.map(list => {
      if (list.id === id) {
        lists.push(list)
        obj['item' + index] = list
        index++
        if (list.parentId && list.parentId !== '00') {
          forFn(data, list.parentId)
        }
      } else {
        if (list.children && list.children.length > 0) {
          forFn(list.children, id)
        }
      }
    })
  }
  forFn(data, id)
  return { obj, list: lists }
}
export default Utils
