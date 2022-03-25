<!--echarts 柱状图-->
<template>
  <div
    :id="id"
    ref="chartBarBox"
    style="width: 100%; height: 100%"
  ></div>
</template>
<script>
export default {
  name: 'BeEchartBar',
  props: {
    // e自定义的echarts配置参数
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 标题
    title: {
      type: String,
      default () {
        return ''
      }
    },
    // 折线值在不同分区显示不同颜色，传图格式：[{lt:0,label:'名称1',color:'#ff0000'},{gte:0,lt:10,label:'名称2',color:'#ff0000'},{gte:20,label:'名称3',color:'#ff0000'}]
    visualMapPieces: {
      type: Array,
      default () {
        return []
      }
    },
    // Y轴显示得名称
    yName: {
      type: String,
      default () {
        return ''
      }
    },
    // X轴显示得名称
    xName: {
      type: String,
      default () {
        return ''
      }
    },
    // 是否转置横纵坐标
    inverse: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 图例集合
    legends: {
      type: Array,
      default () {
        return []
      }
    },
    // X轴数据列表
    xAxis: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否需要工具栏
    isToolbox: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 各个Y轴参数对应得X轴节点数据列表
    series: {
      type: Array,
      default () {
        return [
          {
            areaStyle: {
              normal: {}
            }
          }
        ]
      }
    },
    // // 图形高度
    // height: {
    //   type: [Number, String]
    // },
    // // 图形宽度
    // width: {
    //   type: [Number, String]
    // },
    // Y轴值得格式化
    yFormatter: {
      type: String,
      default () {
        return 'int'
      }
    }
  },
  data () {
    return {
      chartBar: null,
      minInterval: null,
      id: 'u_chartBarBox' + (Math.ceil(Math.random() * 1000000000))
    }
  },
  computed: {
    // mainStyle: {
    //   get () {
    //     var style = {}
    //     if (this.height) {
    //       if (typeof this.height === 'number' || !isNaN(this.height)) {
    //         style.height = this.height + 'rem'
    //       } else {
    //         style.height = this.height
    //       }
    //     }
    //     if (!style.height) {
    //       style.height = '25rem'
    //     }
    //     if (this.width) {
    //       if (typeof this.width === 'number' || !isNaN(this.width)) {
    //         style.width = this.width + 'rem'
    //       } else {
    //         style.width = this.width
    //       }
    //     }
    //     return style
    //   }
    // }
  },
  mounted () {
    this.initChartBar()
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartBar) {
      this.chartBar.resize()
    }
  },
  watch: {
    series () {
      this.initChartBar()
    },
    yFormatter (vals) {
      if (vals === 'int' || vals === 'number') {
        this.minInterval = 1
      }
    }
  },
  methods: {
    // 柱状图
    initChartBar () {
      console.log('aa')
      if (this.yFormatter === 'int' || this.yFormatter === 'number') {
        this.minInterval = 1
      }
      var _this = this
      var echartParams = this.$utils.getEchartDefaultParams()
      var options = {
        chartTitle: '柱状图',
        // 标题
        title: {
          text: '',
          left: 'left',
          textStyle: {
            color: echartParams.titleColor,
            fontSize: '1.125rem'
          }
        },
        // 图例组颜色
        color: echartParams.legend.colors,
        // X与Y轴字体颜色
        textStyle: {
          color: echartParams.xAxis.textColor,
          fontSize: '0.875rem'
        },
        // 图例组显示的位置
        legend: {
          top: 10,
          right: 120,
          left: '3%',
          type: 'scroll',
          textStyle: {
            color: echartParams.legend.textColor,
            fontSize: '0.875rem'
          },
          // 翻页三角箭头颜色
          pageIconColor: echartParams.legend.pageIconColor,
          // 翻页（即翻页到头时）
          pageIconInactiveColor: echartParams.legend.pageIconInactiveColor,
          // 翻页按钮的两个之间的间距
          pageButtonItemGap: -8,
          // 翻页的页码和总页码
          pageFormatter: ' ',
          // 翻页按钮大小
          pageIconSize: 14,
          data: []
        },
        // 图形显示区域
        grid: {
          top: 65,
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        // 鼠标移入的弹窗配置
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // X轴参数
        xAxis: {
          name: this.xName,
          type: 'category',
          nameTextStyle: {
            fontSize: '0.875rem',
            color: '#7b7b7b'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: echartParams.xAxis.lineColor,
              width: echartParams.xAxis.lineWidth,
              type: 'solid'
            }
          },
          data: []
        },
        // Y轴参数
        yAxis: {
          type: 'value',
          name: this.yName,
          axisLine: {
            show: true,
            lineStyle: {
              color: echartParams.yAxis.lineColor,
              width: echartParams.yAxis.lineWidth,
              type: 'solid'
            }
          },
          minInterval: this.minInterval,
          nameTextStyle: {
            fontSize: '0.875rem',
            color: '#7b7b7b'
          },
          axisLabel: {
            formatter: function (value) {
              if (_this.yFormatter === 'int') {
                _this.minInterval = 1
                return parseInt(value)
              }
              return value
            }
          },
          splitLine: {
            show: false
          },
          data: []
        },
        // 序列数据
        series: []
      }
      if (this.options) {
        Object.keys(this.options).forEach(key => {
          var value = this.options[key]
          if (value) {
            options[key] = this.options[key]
          }
        })
      }
      // 标题
      if (this.showTitle && this.title) {
        options.title.text = this.title
      }
      // 图例组
      if (this.legends) {
        options.legend.data = this.legends
      }
      if (this.isToolbox) {
        options.toolbox = {
          top: 3,
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        }
      }
      // 序列数据
      options.series = this.series || []
      options.xAxis.data = this.xAxis
      options.yAxis.data = this.yAxis
      // X轴与Y轴是否转置
      if (this.inverse) {
        var xAxis = options.xAxis
        var yAxis = options.yAxis
        options.xAxis = yAxis
        options.yAxis = xAxis
      }
      // 开始绘制图例
      if (this.$refs.chartBarBox) {
        this.$refs.chartBarBox.removeAttribute('_echarts_instance_')
        this.chartBar = this.$echarts.init(this.$refs.chartBarBox)
        this.chartBar.setOption(options, true)
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      }
    }
  },
  destroyed () {
    window.removeEventListener('resize', () => {
      this.chartBar.resize()
    })
  }
}
</script>
<style scoped>
</style>
