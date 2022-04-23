import $http from './index'
let apiObj = {}
/** *
 * 根据用户的参数请求系统的文件流并且下载文件
 * @param url
 * @param params
 * @param filename
 * @param callback
 */
apiObj.downloadBlob = function (url, params, filename = '文件', callback) {
  $http({
    url: url,
    method: 'post',
    responseType: 'blob',
    data: params
  }).then((response) => {
    apiObj.download(response, filename, callback)
  })
}
/** *
 * 系统根据请求的Response对象下载文件
 * @param response
 * @param fileName
 * @param callback
 */
apiObj.download = function (response, fileName = '文件', callback) {
  try {
    if (!response || response.status !== 200) {
      callback.call(this, { msg: response.msg || '访问服务器网络错误，请检查！' })
      return
    }
    callback.call(this, true)
    let url = window.URL.createObjectURL(response.data)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  } catch (e) {
    callback.call(this, false)
  }
}
apiObj.toQueryString = (params = {}, mark = true) => {
  return (
    (mark ? '?' : '') +
    Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')
  )
}
export default apiObj