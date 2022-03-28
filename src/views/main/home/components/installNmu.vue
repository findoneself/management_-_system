<template>
  <!-- 各区县安装数量统计 -->
  <div
    id="installnum"
    style="width: 98%; height: 100%"
  ></div>
</template>
<script>
export default {
  data () {
    return {
      option: {
        // backgroundColor: "#000",
        // 右上角的色块加title
        legend: [
          {
            data: ['D', 'Mail Ad'],
            align: 'left',
            right: 0,
            top: -5,
            textStyle: {
              color: '#fff',
              fontSize: '10'
            },
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 5
          },
          {
            data: ['Affiliate Ad', 'Video Ad'],
            align: 'left',
            right: 0,
            top: 10,
            y: '30',
            textStyle: {
              color: '#fff',
              fontSize: '10'
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
          right: '1rem',
          top: '40rem',
          bottom: '1rem',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            color: '#fff',
            fontSize: '10'
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
            fontSize: '10'
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
        series: [
          {
            name: 'D',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            barWidth: 10,
            data: [30, 32, 31, 34, 90, 30, 20],
            itemStyle: {
              normal: {
                color: '#23DBFC',
                shadowColor: '#23DBFC',
                fontSize: '0.5rem',
                shadowBlur: 0,
                // transform:scale(0.6),
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
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',

            emphasis: {
              focus: 'series'
            },
            data: [20, 12, 10, 34, 90, 30, 20],
            itemStyle: {
              normal: {
                color: '#1176FF',
                shadowColor: '#1176FF',
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
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',

            emphasis: {
              focus: 'series'
            },
            data: [22, 18, 91, 34, 20, 30, 10],
            itemStyle: {
              normal: {
                color: '#FFAE00',
                shadowColor: '#FFAE00',
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
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',

            emphasis: {
              focus: 'series'
            },
            data: [10, 22, 21, 54, 10, 30, 40],
            itemStyle: {
              normal: {
                color: '#FF460D',
                shadowColor: '#FF460D',
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
      var myChart = this.$echarts.init(document.getElementById('installnum'))
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