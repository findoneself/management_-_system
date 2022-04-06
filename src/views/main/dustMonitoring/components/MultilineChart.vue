<template>
  <!-- 车辆出入分析 双折线 -->
  <div
    id="many_line_chart"
    style="width: 100%; height: 100%"
  ></div>
</template>
<script>
export default {
  props: {
    xAxisData: {
      type: Array,
      default () {
        return []
      }
    },
    seriesData: {
      type: Array,
      default () {
        return []
      }
    },
    legendData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      myChart: null,
      color: ['#19B17E', '#9834FF', '#23DBFC', '#FA6B16'],
      option: {
        xAxis: {
          type: 'category',
          //   data: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
          // X轴线上标识样式
          axisLabel: {
            color: '#fff',
            fontSize: '15'
          },
          // 底部X轴线 样式
          axisLine: {
            lineStyle: {
              color: '#B9C8DB'
            }
          },
          // X轴是否可以穿出左侧边框
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '次数',
          axisLabel: {
            color: '#fff',
            fontSize: '15'
          },
          // 边框Y轴线样式
          axisLine: {
            lineStyle: {
              color: '#B9C8DB'

            }
          },
          // Y轴全部轴线样式（除开边框Y轴）
          splitLine: {
            lineStyle: {
              color: '#F2F2F2',
              opacity: 0.1
            }
          },
          // Y轴是否可以穿出底部边框
          axisTick: {
            show: false
          }
        },
        grid: {
          top: 10,
          right: 50,
          left: '3%',
          type: 'scroll',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          axisPointer: {
            type: 'cross'
          }
        },
        legend: [{
          x: 'center',
          bottom: '2%',
          //   y: '30',
          textStyle: {
            color: '#fff',
            fontSize: '15'
          },
          itemWidth: 25,
          itemHeight: 15,
          itemGap: 20
        }]
      }
    }
  },
  watch: {
    seriesData: {
      handler () {
      },
      deep: true
    }
  },
  mounted () {
    this.getmap()
  },
  methods: {
    getmap () {
      if (!this.myChart) {
        this.myChart = this.$echarts.init(document.getElementById('many_line_chart'))
      }
      this.myChart.clear()
      this.option.legend.data = this.legendData
      this.option.xAxis.data = this.xAxisData
      // 处理series数据
      let series = []
      this.seriesData.map((i, index) => {
        series.push({
          name: i.title,
          data: i.data,
          type: 'line',
          //  折线图线上的原点
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: this.color[index],
              borderColor: '#fff',
              fontSize: '1rem',
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          }
        })
      })
      let option = {
        ...this.option,
        series
      }
      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      })
    }
  },
  destroyed () {
    window.removeEventListener('resize', () => {
      this.myChart.resize()
    })
  }
}
</script>
<style lang="less" scoped>
</style>