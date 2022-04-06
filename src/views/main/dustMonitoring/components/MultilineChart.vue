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
        return ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07', '3.08', '3.09', '3.10', '3.11', '3.12']
      }
    },
    seriesData: {
      type: Array,
      default () {
        return [{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], color: '#19B17E', title: '云-徐州传染病医院' },
        { data: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], color: '#9834FF', title: '云-淮安传染病医院' },
        { data: [13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], color: '#23DBFC', title: '云-延安传染病医院' },
        { data: [16, 18, 20, 22, 24, 26, 28, 30, 31, 33, 35, 37], color: '#FA6B16', title: '云-常州传染病医院' }]
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
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.myChart) {
      this.myChart.resize()
    }
  },
  methods: {
    getmap () {
      this.option.legend.data = this.legendData
      this.option.xAxis.data = this.xAxisData
      let series = []
      if (this.seriesData.length > 0) {
        console.log(123)
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
            },
            lineStyle: {
              normal: {
                color: i.color,
                width: 5
              }
            }
          })
        })
      } else {
        console.log('没有data')
        let arr = [{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], color: '#19B17E', title: '云-徐州传染病医院' },
        { data: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], color: '#9834FF', title: '云-淮安传染病医院' },
        { data: [13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], color: '#23DBFC', title: '云-延安传染病医院' },
        { data: [16, 18, 20, 22, 24, 26, 28, 30, 31, 33, 35, 37], color: '#FA6B16', title: '云-常州传染病医院' }]
        arr.map((i, index) => {
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
            },
            lineStyle: {
              normal: {
                color: i.color,
                width: 5
              }
            }
          })
        })
      }
      let option = {
        ...this.option,
        series
      }
      console.log(option)
      this.myChart = this.$echarts.init(document.getElementById('many_line_chart'))
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