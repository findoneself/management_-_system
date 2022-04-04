const path = require('path')
const pxtorem = require('postcss-pxtorem')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const winConfig = {
  isProd: process.env.NODE_ENV === 'production',
  title: '江苏本初一体化管理平台',
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    nprogress: 'NProgress',
    'BMap': 'BMap',
    'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT'
  },
  cdnCss: [
    'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css',
    'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css',
    'https://cdn.jsdelivr.net/npm/video.js@6.13.0/dist/video-js.min.css'
  ],
  cdnJs: [
    'https://cdn.staticfile.org/vue/2.6.12/vue.min.js',
    'https://cdn.staticfile.org/vue-router/3.4.7/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.5.1/vuex.min.js',
    'https://cdn.staticfile.org/axios/0.20.0/axios.min.js',
    'http://api.map.baidu.com/api?v=3.0&ak=n3U8OT9b5COsP61ayOdOtjHK6rVOWwci',
    'https://cdn.jsdelivr.net/npm/echarts@5/dist/extension/bmap.min.js',
    'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js',
    // 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js',
    'https://cdn.jsdelivr.net/npm/vue-video-player@5.0.2/dist/vue-video-player.min.js',
    'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js',
    'https://cdn.staticfile.org/element-ui/2.13.2/index.js'
  ]
}
module.exports = {
  outputDir: 'dist',
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射，如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  publicPath: winConfig.isProd ? '/ment/' : '/',
  // 配置规则
  chainWebpack: config => {
    // 自定义打包入口，发布模式
    config.when(winConfig.isProd, config => {
      config.entry('app').clear().add('./src/main-prod.js')
      // 配置 html-webpack-plugin 插件
      config.set('externals', winConfig.externals)
      config.plugin('html').tap(args => {
        args[0].isProd = winConfig.isProd
        args[0].title = winConfig.title
        args[0].cdnJs = winConfig.cdnJs
        args[0].cdnCss = winConfig.cdnCss
        return args
      })
    })
    // 开发模式
    config.when(!winConfig.isProd, config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
    // 文件夹简写
    config.resolve.alias
      .set('_pls', resolve('src/plugins'))
      .set('_ats', resolve('src/assets'))
      .set('_lib', resolve('src/libs'))
      .set('_com', resolve('src/components'))
      .set('_vie', resolve('src/views'))
      .set('_new', resolve('src/network'))
    // 图片格式
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|jfif)(\?.*)?$/)
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [pxtorem({
          rootValue: 16, // 换算的基数
          selectorBlackList: ['ghzhead', 'scrollbar', 'lyform'], // 忽略转换正则匹配项
          propList: ['*']
        })]
      }
    }
  },
  devServer: {
    open: true, // 设置自动打开
    port: 8081, // 设置端口
    proxy: {
      // 设置代理
      '/api': {
        target: 'http://8.142.178.139:8080/integration',
        changeOrigin: true,
        // 如果是http接口，需要配置该参数
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
