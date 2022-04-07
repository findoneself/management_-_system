import VueCookie from 'vue-cookie'
import store from '../store'
let Utils = {}
// // 清除sessionStorage
// Utils.sessionStorageRemove = function (key) {
//   if (typeof key === 'string') {
//     window.sessionStorage.removeItem(key)
//   } else {
//     return
//   }
// }
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
// 获取当前年月日
Utils.getDate = function () {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  var nowDate = year + '-' + month + '-' + day
  return nowDate
}
// 图片类型的正则判断
Utils.imageRegExp = function (str) {
  const pattern = /^image\/(jpg|jpeg|png)$/
  return pattern.test(str)
}
// 递归查找树结构的第一条无children的数据
Utils.queryTreeFirst = function (data) {
  let obj = {}
  if (data && data.length > 0) {
    obj = data.find(item => {
      if (item.children && item.children.length > 0) {
        Utils.queryTreeFirst(item.children)
      } else {
        return item
      }
    })
  }
  return obj
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
/**
 * 清除登录信息
 */
Utils.clearLoginInfo = function () {
  VueCookie.delete('token')
  store.commit('resetStore')
  localStorage.removeItem('userInfo')
}
// 节流(规定时间内，只触发一次事件)
Utils.throttle = function (fn, delay) {
  let lasttime = 0 // 记录上一次触发的时间
  return function () { // 通过闭包的方式使用lasttime变量，每次都是上次的时间
    const nowtime = Date.now()
    if (nowtime - lasttime > delay) {
      fn.call(this) // 修正this函数问题
      lasttime = nowtime // 同步时间
    }
  }
}
// 防抖(规定时间内，只触发最后一次事件)
Utils.debounce = function (fn, delay) {
  let timer = null // 记录上一次的延时器
  return function () {
    if (timer) clearTimeout(timer) // 清除上一延时器
    timer = setTimeout(function () { // 重新设置新的延时器
      fn.apply(this)
    }, delay)
  }
}
// 获取当前字体大小
Utils.fontSize = function (res) {
  const width = document.documentElement.clinetWidth || document.body.clientWidth
  const size = Math.floor(width / 1920)
  return size * res
}
/*
* 获取echart默认的参数配置
*/
Utils.getEchartDefaultParams = function () {
  if (!Utils.echartDefaultParams) {
    var echartParams = {
      // 图例标题颜色
      titleColor: '#FFFFFF',
      // X轴参数
      xAxis: {
        // 字体颜色
        textColor: '#48e9f2',
        // 线条颜色
        lineColor: '#2462AE',
        // 线宽
        lineWidth: 2
      },
      // 图例组参数
      legend: {
        // 字体颜色
        textColor: '#48e9f2',
        // 图例颜色组
        colors: ['#3398DB', '#fddd60', '#73c0de', '#7dffb2', '#5ed8fe', '#ff707a', '#5470c6'],
        // 翻页三角箭头颜色
        pageIconColor: '#48e9f2',
        // 翻页（即翻页到头时）
        pageIconInactiveColor: '#aaa'
      },
      // Y轴颜色
      yAxis: {
        // 字体颜色
        textColor: '#2462AE',
        // 线条颜色
        lineColor: '#2462AE',
        // 线宽
        lineWidth: 2
      }
    }
    Utils.echartDefaultParams = echartParams
  }
  return Utils.echartDefaultParams
}
export default Utils
