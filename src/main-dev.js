import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
// 引入element组件配置
import './plugins/element'
// 引入nprogress样式
import 'nprogress/nprogress.css'

import './libs/pxtoRem'
Vue.config.productionTip = false
Vue.prototype.$utils = Utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
