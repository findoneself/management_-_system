<template>
  <div
    id="business_sort"
    style="width: 100%; height: 75%"
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
  data () {
    return {
      option: {
        emphasis: {
          label: { show: true, formatter: '{b}: {c}' },
          labelLine: { show: true },
          itemStyle: {
            normal: {
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
        },
        title: {
          text: this.total,
          left: '49%',
          top: '40%',
          textAlign: 'center',
          subtext: '项目总数',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: '#fff'
          }
        },
        toolbox: {
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [45, 65],
            center: ['50%', '50%'],
            // roseType: 'radius',
            itemStyle: {
              // borderRadius: 5
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
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
  // 橘黄色//红色//亮蓝//黄色
  methods: {
    getmap () {
      let data = []
      this.dataList.map(i => {
        data.push({
          ...i,
          itemStyle: {
            color: i.color
          }
        })
      })
      var myChart = this.$echarts.init(document.getElementById('business_sort'))
      const { series } = this.option
      series[0].data = data
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