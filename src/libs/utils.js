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
/**
 * 对象数组排序
 * @param {*数据} data ，默认[]
 * @param {*排序字段} property
 * @param {*正序或倒序} order ，默认asc
 * 判断字段类型、还需要判断是倒序还是正序
 */
Utils.compareSort = function (data = [], property, order = 'asc') {
  if (data.length === 0 || !property) return data
  return data.sort(function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    // 判断是否可以是有限数值
    if (isFinite(value1) && isFinite(value2)) {
      return order === 'asc' ? (Number(value1) > Number(value2) ? 1 : -1) : (Number(value1) > Number(value2) ? -1 : 1)
    } else {
      return order === 'asc' ? value1.localeCompare(value2) : value2.localeCompare(value1)
    }
  })
}
/**
 * 处理多个字段相同数据
 * @param {*数据} data ，默认[]
 * @param {*需要处理的字段名} propertys
 * 返回一个字段组成的对象{key: [1:5, 2:0, 3:6, 4:0, 5: 0], key: []}
 * 其中key为字段名，12345代表行数
 */
Utils.computedFileList = function (data = [], propertys = []) {
  if (propertys.length < 1 || data.length < 1) return {}
  const mergeObj = {}
  propertys.forEach((key, index) => {
    mergeObj[key] = []
    let numerical = 0
    // 循环当前字段所有行数据，取出相同行的数量，并储存下来，相同多少行就合并多少行
    data.map((item, itemindex) => {
      if (itemindex === 0) {
        mergeObj[key].push(1)
      } else {
        // 需要判断当前列两行同一字段是否相同且前面所有列两行同一字段是否相同，相同数量才+1
        let num = 0
        for (let i = 0; i <= index; i++) {
          if (item[propertys[i]] === data[itemindex - 1][propertys[i]]) {
            num++
          }
        }
        // 如果所有列的上下两行字段都一样，则需要合并，数量+1
        if (num === index + 1) {
          mergeObj[key][numerical] += 1
          mergeObj[key].push(0)
        } else {
          numerical = itemindex
          mergeObj[key].push(1)
        }
      }
    })
  })
  return mergeObj
}
/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
Utils.treeDataTranslate = function (data, id = 'id', pid = 'parentId', children = 'children') {
  let res = []
  let temp = {}
  for (let i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
    temp[data[i][id]][children] = []
    temp[data[i][id]]['_level'] = null
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]][children]) {
        temp[data[k][pid]][children] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]][children].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return Utils.deleteChild(res, children)
}
// 删除树数据子节点为空的字段
Utils.deleteChild = function (arr, children = 'children') {
  return arr.map(item => {
    if (item[children].length > 0) {
      this.deleteChild(item[children])
    } else {
      delete item[children]
    }
    return item
  })
}
export default Utils