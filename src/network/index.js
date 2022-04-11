import VueCookie from 'vue-cookie'
import $utils from '../libs/utils'
import axios from 'axios'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
import router from '../router'
const http = axios.create({
  timeout: 1000 * 5,
  baseURL: process.env.NODE_ENV === 'production' ? 'api' : '/',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
// 请求拦截
http.interceptors.request.use(config => {
  if (config.responseType && config.responseType.toLowerCase().indexOf('blob') > -1) {
    config.timeout = 10 * 60 * 1000
  }
  config.headers.Authorization = VueCookie.get('token') || ''
  NProgress.start()
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截
http.interceptors.response.use(response => {
  // 隐藏进度条，NProgress.done()
  NProgress.done()
  if (response.data && response.data.code === 401) { // 401, token失效
    // 此处应该清除登录信息
    $utils.clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  NProgress.done()
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        message = '错误请求'
        break
      case 401:
        // 此处应该清除登录信息
        $utils.clearLoginInfo()
        router.push({ name: 'login' })
        message = '未授权，请重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求错误，未找到该资源'
        break
      case 405:
        message = '请求方法未允许'
        break
      case 406:
        message = '请求超时'
        break
      case 407:
        message = '文件不存在'
        break
      case 500:
        message = '服务器端出错'
        break
      case 501:
        message = '网络未实现'
        break
      case 502:
        message = '网络错误'
        break
      case 503:
        message = '服务不可用'
        break
      case 504:
        message = '网络超时'
        break
      case 505:
        message = 'http版本不支持该请求'
        break
      default:
        message = '连接错误' + error.response.status
        break
    }
  } else {
    message = '网络出现问题或接口不存在，请稍后重试'
  }
  error.message = message
  return Promise.reject(error)
}
)
export default http
