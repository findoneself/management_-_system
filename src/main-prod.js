import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cloneDeep from 'lodash/cloneDeep'
import Utils from './libs/utils'
import format from './libs/format'
import http from './network'
import apiObj from './network/api'

import echarts from 'echarts'
import VueCookie from 'vue-cookie'
import './libs/pxtoRem'
Vue.prototype._cloneDeep = cloneDeep
Vue.config.productionTip = false
Vue.prototype.$utils = Utils
Vue.prototype.$echarts = echarts
Vue.prototype.$format = format
Vue.prototype.$http = http
Vue.prototype.$api = apiObj
Vue.use(VueCookie)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
