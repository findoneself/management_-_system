import $http from './index'
let apiObj = {}
// 直接调取文件请求文件流
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
// 根据文件流直接下载文件
apiObj.download = function (response, fileName = '文件', callback) {
  try {
    if (!response || response.status !== 200) {
      callback({ msg: response.msg || '访问服务器网络错误，请检查！' })
      return
    }
    let url = window.URL.createObjectURL(response.data)
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  } catch (e) {
    callback(false)
  }
}
export default apiObj