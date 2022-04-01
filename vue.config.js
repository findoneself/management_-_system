const path = require('path')
const pxtorem = require('postcss-pxtorem')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const sysTitle = '江苏本初一体化管理平台'
module.exports = {
  outputDir: 'dist',
  devServer: {
    open: true, // 设置自动打开
    port: 8081 // 设置端口
    // proxy: {
    //   // 设置代理
    //   '/axios': {
    //     target: 'http://101.15.22.98',
    //     changeOrigin: true,
    //     // 如果是http接口，需要配置该参数
    //     secure: false,
    //     pathRewrite: {
    //       '^/axios': ''
    //     }
    //   }
    // }
  },
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射，如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // 配置规则
  chainWebpack: config => {
    // 自定义打包入口，发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'BMap': 'BMap',
        'BMap_Symbol_SHAPE_POINT': 'BMap_Symbol_SHAPE_POINT'
      })
      // 配置 html-webpack-plugin 插件
      config.plugin('html').tap(args => {
        args[0].isProd = true
        args[0].title = sysTitle
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      // 配置 html-webpack-plugin 插件
      config.plugin('html').tap(args => {
        args[0].isProd = false
        args[0].title = sysTitle
        return args
      })
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
  }
}
