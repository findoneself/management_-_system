<template>
  <div
    id="warningnum"
    style="width: 98%; height: 100%"
  ></div>
</template>
<script>
export default {
  props: {
    xAxisData: {
      type: Array,
      default () {
        return ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07']
      }
    },
    seriesData: {
      type: Array,
      default () {
        return [20, 50, 10, 35, 35, 47, 20]
      }
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
            fontSize: '10'
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
            fontSize: '10'
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
              color: '#F2F2F2'
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
            itemStyle: {
              normal: {
                color: '#23DBFC',
                // shadowColor: item.color[1],
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
      var myChart = this.$echarts.init(document.getElementById('warningnum'))
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