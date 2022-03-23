<template>
  <div>
    <div
      id="double_line"
      style="width: 98%; height: 11rem"
    ></div>
  </div>
</template>
<script>
export default {
  props: {},
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
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
          name: '次数',
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
          left: '20rem',
          right: '10rem',
          top: '30rem',
          bottom: '5rem',
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
            data: [2, 10, 14, 19, 23, 26, 29],
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
          },
          {
            data: [5, 15, 15, 25, 30, 29, 39],
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF6D15',
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
      var myChart = this.$echarts.init(document.getElementById('double_line'))
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