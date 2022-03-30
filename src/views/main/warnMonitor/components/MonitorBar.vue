<template>
  <!-- 各区县安装数量统计 -->
  <div
    :id="id"
    style="width: 100%; height: 80%"
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
    id: {
      type: String,
      default () {
        return ''
      }
    },
    color: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      option: {
        // backgroundColor: "#000",
        // 右上角的色块加title
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            // type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        grid: {
          left: '10rem',
          right: '1rem',
          top: '40rem',
          bottom: '1rem',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#C0BFD2',
            fontSize: '10',
            rotate: 45
          },
          axisLine: {
            lineStyle: {
              color: '#B9C8DB'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: '',
          axisLabel: {
            color: '#C0BFD2',
            fontSize: '10'
          },
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
          axisTick: {
            show: false
          }
        },
        series: [{
          type: 'bar',
          barMaxWidth: 15,
          barGap: '10%',
          label: {
            show: true
          },
          itemStyle: {
            normal: {
              color: this.color,
              label: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: '10'
                },
                position: 'top',
                formatter: function (p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          }
        }]
      }
    }
  },
  mounted () {
    this.getmap()
  },
  methods: {
    getmap () {
      const { xAxis, series } = this.option
      xAxis.data = this.xAxisData
      series[0].data = this.seriesData
      //   let option = {
      //     ...this.option,
      //     series
      //   }
      console.log(this.id)
      var myChart = this.$echarts.init(document.getElementById(this.id))
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