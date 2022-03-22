<template>
  <div>
    <div
      id="business_sort"
      style="width: 100%; height: 13rem"
    ></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          name: 'AI识别',
          value: 45,
          color: '#FCFF20', itemStyle: {
            normal: {
              color: '#FCFF20'
            }
          }
        },
        {
          name: ' 水质',
          value: 34,
          color: '#FF4F01', itemStyle: {
            normal: {
              color: '#FF4F01'
            }
          }
        },
        {
          name: ' 噪声',
          value: 21,
          color: '#FF3D54', itemStyle: {
            normal: {
              color: '#FF3D54'
            }
          }
        },
        {
          name: ' 扬尘',
          value: 50,
          color: ' #00FFFF', itemStyle: {
            normal: {
              color: '#00FFFF'
            }
          }
        },
        {
          name: '智慧工地',
          value: 50,
          color: ' #FFAE00', itemStyle: {
            normal: {
              color: '#FFAE00'
            }
          }
        }
      ],
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} '
        },
        toolbox: {
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [40, 70],
            center: ['50%', '47%'],
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
      var myChart = this.$echarts.init(document.getElementById('business_sort'))
      this.option.series[0].data = this.data
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