<template>
  <!-- 区县报警分析 -->
  <div>
    <div>
      <div
        id="countyBar"
        style="width: 98%; height: 11rem"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      option: {
        // backgroundColor: "#000",
        // legend: [
        //   {
        //     data: ['D', 'Mail Ad'],
        //     align: 'left',
        //     right: 0,
        //     textStyle: {
        //       color: '#fff',
        //       fontSize: '10'
        //     },
        //     itemWidth: 10,
        //     itemHeight: 5,
        //     itemGap: 5
        //   },
        //   {
        //     data: ['Affiliate Ad', 'Video Ad'],
        //     align: 'left',
        //     right: 0,
        //     y: '30',
        //     textStyle: {
        //       color: '#fff',
        //       fontSize: '10'
        //     },
        //     itemWidth: 10,
        //     itemHeight: 5,
        //     itemGap: 5
        //   }
        // ],

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            // type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        grid: {
          left: '20rem',
          right: '10rem',
          top: '30rem',
          bottom: '5rem',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['沛-铜山', '沛-云龙', '沛-铜山', '沛-铜山', '沛-云龙', '沛-铜山'],
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
          name: '次数',
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
          },
          splitLine: {
            lineStyle: {
              color: '#F2F2F2',
              opacity: 0.1
            }
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
            data: [30, 32, 31, 34, 60, 30, 20],
            itemStyle: {
              normal: {
                color: '#3D73F2',
                shadowColor: '#3D73F2',
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
      var myChart = this.$echarts.init(document.getElementById('countyBar'))
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