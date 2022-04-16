<template>
  <div
    id="add_month"
    style="width: 98%; height: 100%"
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
    }
  },
  watch: {
    xAxisData: {
      handler () {
        this.getmap()
      },
      deep: true
    },
    seriesData: {
      handler () {
        this.getmap()
      },
      deep: true
    }
  },
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          // data: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
          // X轴线上标识样式
          axisLabel: {
            color: '#fff',
            fontSize: '14'
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
          name: '数量',
          axisLabel: {
            color: '#fff',
            fontSize: '12'
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
          left: '10rem',
          right: '1rem',
          top: '40rem',
          bottom: '1rem',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        series: [
          {
            // data: [20, 50, 70, 35, 35, 47, 260],
            type: 'line',
            //  折线图线上的原点
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: '#23DBFC',
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
            // 折线 宽度
            lineStyle: {
              normal: {
                width: 3
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.getmap()
  },
  methods: {
    getmap () {
      this.option.xAxis.data = this.xAxisData
      this.option.series[0].data = this.seriesData
      var myChart = this.$echarts.init(document.getElementById('add_month'))
      myChart.setOption(this.option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>