<template>
  <div
    id="business_sort"
    style="width: 100%; height: 100%"
  ></div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default () {
        return []
      }
    },
    total: {
      type: Number,
      default () {
        return ''
      }
    }
  },
  watch: {
    total: {
      handler () {
        this.option.title.text = this.total
        this.getmap()
      },
      deep: true
    },
    dataList: {
      handler () {
        this.getmap()
      },
      deep: true
    }
  },
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            // type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '10rem',
          top: '40rem',
          bottom: '5rem',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff',
            fontSize: '14'
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
            color: '#fff',
            fontSize: '12'
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
          barMaxWidth: 25,
          barGap: '10%',
          label: {
            show: true
          },
          itemStyle: {
            normal: {
              color: '#486AFF',
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
  // 橘黄色//红色//亮蓝//黄色
  methods: {
    getmap () {
      const { xAxis, series } = this.option
      console.log(this.xAxisData)
      let arr1 = []
      let arr2 = []
      this.dataList.map(i => {
        if (i.length > 10) {
          arr1.push(i.name.slice(0, 10))
        } else {
          arr1.push(i.name)
        }
        arr2.push(i.value)
      })
      xAxis.data = arr1
      series[0].data = arr2
      // console.log(this.dataList)
      // let data = []
      // this.dataList.map(i => {
      //   data.push({
      //     ...i,
      //     itemStyle: {
      //       color: i.color
      //     }
      //   })
      // })
      var myChart = this.$echarts.init(document.getElementById('business_sort'))
      // const { series } = this.option
      // series[0].data = data
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