<template>
  <div
    id="patrol"
    class="patrol-echart"
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
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.getmap()
  },
  // 橘黄色//红色//亮蓝//黄色
  methods: {
    getmap () {
      const colors = ['#FF7E00', '#FFD820', '#FF5656', '#59E6FF']
      const myChart = this.$echarts.init(document.getElementById('patrol'))
      let titleArr = []
      let seriesArr = []
      this.dataList.map((item, index) => {
        titleArr.push({
          text: item.name,
          left: index % 2 === 0 ? '24%' : '69%',
          top: index % 4 === 0 || index % 4 === 1 ? '30%' : '80%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: this.$utils.fontSize(14),
            color: colors[index]
          }
        })
        seriesArr.push({
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius: ['28%', '38%'],
          itemStyle: {
            normal: {
              color: colors[index],
              shadowColor: 'red',
              fontSize: this.$utils.fontSize(16),
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: [index % 2 === 0 ? '25%' : '70%', index % 4 === 0 || index % 4 === 1 ? '28%' : '78%'],
          data: [
            {
              value: item.percent,
              label: {
                normal: {
                  formatter: function () {
                    return item.count
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontWeight: 'bold'
                  }
                }
              },
              itemStyle: {
                color: colors[index]
              }
            },
            {
              value: 100 - item.percent,
              name: 'invisible',
              label: {
                show: false
              },
              itemStyle: {
                color: '#9a99b8'
              }
            }
          ]
        })
        seriesArr.push({
          type: 'pie',
          radius: ['41%', '42%'],
          itemStyle: {
            normal: {
              color: '#fff',
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: [index % 2 === 0 ? '25%' : '70%', index % 4 === 0 || index % 4 === 1 ? '28%' : '78%'],
          data: [
            {
              value: 100,
              name: 'invisible',
              label: {
                show: false
              },
              itemStyle: {
                color: '#9a99b8'
              }
            }
          ]
        })
      })
      var option = {
        title: titleArr,
        series: seriesArr
      }
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.patrol-echart {
  width: 100%;
  height: calc(100% - 152px);
}
</style>
