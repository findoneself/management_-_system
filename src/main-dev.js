import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from './libs/utils'
import echarts from 'echarts';

// 引入element组件配置
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入nprogress样式
import 'nprogress/nprogress.css'
Vue.use(ElementUI);
import './libs/pxtoRem'
Vue.config.productionTip = false
Vue.prototype.$utils = Utils
Vue.prototype.$echarts = echarts
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')