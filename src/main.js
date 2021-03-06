import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element.js'
// 导入全局公共样式
import './assets/css/gloabel.css'
import './assets/fonts/iconfont.css'
// import Antd from 'ant-design-vue';

// import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
    // Vue.use(Antd);
    // import 'xe-utils'
    // import VXETable from 'vxe-table'
    // import 'vxe-table/lib/style.css'

// Vue.use(VXETable)
import axios from 'axios'
// 配置请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
});
Vue.config.productionTip = false
Vue.prototype.$http = axios
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')