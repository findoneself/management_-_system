import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
import cloneDeep from 'lodash/cloneDeep'
import format from './libs/format'
import https from './network'
import apiObj from './network/api'
import echarts from 'echarts'
import VueCookie from 'vue-cookie'
import 'video.js/dist/video-js.css'
// 引入element组件配置
import './plugins/element'
// 引入pxtorem配置
import './libs/pxtoRem'
// 引入nprogress样式
import 'nprogress/nprogress.css'
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'
// require('videojs-contrib-hls/dist/videojs-contrib-hls')
// 引入flv.js
import flvjs from 'flv.js'

Vue.prototype.$flvjs = flvjs
Vue.prototype._cloneDeep = cloneDeep
Vue.config.productionTip = false
Vue.prototype.$utils = Utils
Vue.prototype.$api = apiObj
Vue.prototype.$echarts = echarts
Vue.prototype.$http = https
Vue.prototype.$format = format
Vue.use(VueCookie)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')