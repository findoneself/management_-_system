<template>
  <!-- 各区县安装数量统计 -->
  <div
    id="installnum"
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
    }
  },
  data () {
    return {
      colorList: ['#FF460D', '#FFAE00', '#1176FF', '#23DBFC'],
      option: {
        // backgroundColor: "#000",
        // 右上角的色块加title
        legend: [
          {
            align: 'left',
            right: 0,
            top: -3,
            textStyle: {
              color: '#fff',
              fontSize: '12'
            },
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 5
          },
          {
            align: 'left',
            right: 0,
            top: 15,
            y: '30',
            textStyle: {
              color: '#fff',
              fontSize: '12'
            },
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 5
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            // type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        grid: {
          left: '10rem',
          right: '10rem',
          top: '80rem',
          bottom: '1rem',
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
          name: '总数量',
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
        }
      }
    }
  },
  mounted () {
    this.getmap()
  },
  methods: {
    getmap () {
      let series = []
      let legendData = [[], []]
      this.seriesData.map((i, index) => {
        series.push({
          name: i.name,
          type: 'bar',
          stack: 'total',
          emphasis: {
            focus: 'series'
          },
          barWidth: 20, // 柱状宽度
          data: i.data,
          itemStyle: {
            normal: {
              color: this.colorList[index],
              shadowColor: '#23DBFC',
              fontSize: '0.5rem',
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
        if (index === 0 || index === 1) {
          legendData[0].push(i.name)
        } else {
          legendData[1].push(i.name)
        }
      })
      const { legend, xAxis } = this.option
      xAxis.data = this.xAxisData
      legend[0].data = legendData[0]
      legend[1].data = legendData[1]
      let option = {
        ...this.option,
        series
      }
      console.log(option)
      var myChart = this.$echarts.init(document.getElementById('installnum'))
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>