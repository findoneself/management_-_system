import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
import format from './libs/format'
import http from './network'
import echarts from 'echarts'
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
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')