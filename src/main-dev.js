import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
import format from './libs/format'
import http from './network'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'y5vpGn7gL7QdbNBrc6GEbizGuaQezXiy'
})
import _cloneDeep from 'lodash/cloneDeep'
// 引入element组件配置
import './plugins/element'
// 引入pxtorem配置
import './libs/pxtoRem'
// 引入nprogress样式
import 'nprogress/nprogress.css'
Vue.config.productionTip = false
Vue.prototype.$utils = Utils
Vue.prototype.$echarts = echarts
Vue.prototype.$http = http
Vue.prototype.$format = format
Vue.prototype._cloneDeep = _cloneDeep
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')