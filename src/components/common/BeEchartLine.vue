<!--echarts 折线图-->
<template>
  <div
    :id="id"
    ref="chartLineBox"
    style="width: 100%;height: 100%"
  ></div>
</template>
<script>
export default {
  name: 'BeEchartLine',
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
      default: null
    },
    // y轴是否脱离0刻度
    yScale: {
      type: Boolean,
      default: false
    },
    // X轴显示得名称
    xName: {
      type: String,
      default: null
    },
    echartColors: {
      type: Array,
      default () {
        return null
      }
    },
    // x轴是否默认为0刻度
    xonZero: {
      type: Boolean,
      default: false
    },
    // 图例集合
    legends: {
      type: Array,
      default () {
        return []
      }
    },
    // 图例默认勾选集合
    legendSelected: {
      type: Object,
      default () {
        return {}
      }
    },
    // X轴数据列表
    xAxis: {
      type: Array,
      default () {
        return []
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
      chartLine: null,
      minInterval: null,
      id: 'u_chartLineBox' + (Math.ceil(Math.random() * 1000000000))
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
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize()
    }
  },
  mounted () {
    this.initChartLine()
  },
  watch: {
    series () {
      this.initChartLine()
    },
    yFormatter (vals) {
      if (vals === 'int' || vals === 'number') {
        this.minInterval = 1
      }
    }
  },
  methods: {
    // 折线图
    initChartLine () {
      if (this.yFormatter === 'int' || this.yFormatter === 'number') {
        this.minInterval = 1
      }
      var _this = this
      var echartParams = this.$api.getEchartDefaultParams()
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
        // 工具箱
        toolbox: {
          top: 3,
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        // 鼠标移入的弹窗配置
        tooltip: {
          trigger: 'axis'
        },
        // X轴参数
        xAxis: {
          name: this.xName,
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            onZero: this.xonZero,
            lineStyle: {
              color: echartParams.xAxis.lineColor,
              width: echartParams.xAxis.lineWidth,
              type: 'solid'
            }
          },
          nameTextStyle: {
            fontSize: '0.875rem',
            color: '#7b7b7b'
          },
          data: []
        },
        // Y轴参数
        yAxis: {
          type: 'value',
          name: this.yName,
          scale: this.yScale,
          axisLine: {
            show: true,
            lineStyle: {
              color: echartParams.yAxis.lineColor,
              width: echartParams.yAxis.lineWidth,
              type: 'solid'
            }
          },
          nameTextStyle: {
            fontSize: '0.875rem',
            color: '#7b7b7b'
          },
          minInterval: this.minInterval,
          axisLabel: {
            formatter: function (value, index) {
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
        options.legend.selected = this.legendSelected
      }
      var markLine = null
      // 折线值在不同分区显示不同颜色
      if (this.visualMapPieces.length > 0) {
        var colorIndex = 0
        markLine = {
          silent: true,
          data: []
        }
        var datas = []
        var pieceColors = this.echartColors || echartParams.legend.colors
        pieceColors = pieceColors || []
        var pieces = this.visualMapPieces.map(piece => {
          if (piece.min !== null && piece.min !== undefined) {
            if (datas.indexOf(piece.min) < 0) {
              markLine.data.push({
                yAxis: piece.min
              })
              datas.push(piece.min)
            }
          }
          var yAxis = null
          if (piece.value !== null && piece.value !== undefined) {
            yAxis = piece.value
          } else if (piece.gt !== null && piece.gt !== undefined) {
            yAxis = piece.gt
          } else if (piece.gte !== null && piece.gte !== undefined) {
            yAxis = piece.gte
          } else if (piece.lt !== null && piece.lt !== undefined) {
            yAxis = piece.lt
          } else if (piece.lte !== null && piece.lte !== undefined) {
            yAxis = piece.lte
          }
          if (yAxis !== null) {
            if (datas.indexOf(yAxis) < 0) {
              markLine.data.push({
                yAxis: yAxis
              })
              datas.push(yAxis)
            }
          }
          if (piece.max !== null && piece.max !== undefined) {
            if (datas.indexOf(piece.max) < 0) {
              markLine.data.push({
                yAxis: piece.max
              })
              datas.push(piece.max)
            }
          }
          piece.color = piece.color || pieceColors[colorIndex++ % pieceColors.length]
          return piece
        })
        options.visualMap = {
          top: 30,
          right: 10,
          textStyle: options.textStyle,
          pieces: pieces,
          outOfRange: {
            color: '#00FF00'
          }
        }
      }
      // x坐标
      var xAxis = {
        data: this.xAxis
      }
      // y坐标
      var yAxis = {
        scale: this.yScale,
        splitLine: {
          show: false
        }
      }
      if (!options.visualMap) {
        xAxis = options.xAxis
        yAxis = options.yAxis
      }
      options.xAxis = xAxis
      options.yAxis = yAxis
      options.xAxis.data = this.xAxis
      options.yAxis.data = this.yAxis
      // 序列数据
      options.series = this.series.map(s => {
        s.type = 'line'
        if (markLine) {
          s.color = ['#ff0000', '#999999']
          s.markLine = markLine
        }
        return s
      })
      if (this.$refs.chartLineBox) {
        this.$refs.chartLineBox.removeAttribute('_echarts_instance_')
        this.chartLine = this.$echarts.init(this.$refs.chartLineBox, 'light')
        this.chartLine.setOption(options, true)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
