<template>
  <div>
    <div
      id="monitoring_spot"
      style="width: 100%; height: 9rem"
    ></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data:
      {
        // name: '巡查单',
        // value: 80,
        // title: 'pm2.5',
        // company: '62ug/m³',
        center: ['50%', '50%'],
        color: ['#114991', ' #00DDFF'] // left top
      },
      myChart:null

    }
  },
  props: {
    pieData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.getmap()
    console.log(this.pieData)
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.myChart) {
      this.myChart.resize()
    }
  },
  // 橘黄色//红色//亮蓝//黄色
  methods: {
    getmap () {
      this.myChart = this.$echarts.init(document.getElementById('monitoring_spot'))
      var item = { ...this.data, ...this.pieData }
      var option = {
        title: {
          text: item.value,
          // left: '42%',
          // top: '20%',
          x: 'center',
          y: 'center',
          subtext: item.unit + '\n' + item.name + '\n\n\n',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '25',
            color: '#fff'
          },
          subtextStyle: {
            fontWeight: 'normal',
            fontSize: '10',
            color: '#5496C2'
          }
        },
        // title 的坐标
        legend: {
          //   left: '28%',
          top: '40%',
          icon: 'none',
          color: '#fff',
          align: 'center'
        },
        // toolbox: {
        //  show: true,
        //  下载 数据视图 还原按钮及功能
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
        series: [
          {
            name: item.name,
            type: 'pie',
            clockWise: false,
            radius: [31, 43],
            itemStyle: {
              normal: {
                color: item.color[0],
                shadowColor: item.color[1],
                fontSize: '2rem',
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
            center: ['50%', '48%'],
            data: [
              {
                value: item.value,
                label: {
                  show: false
                }
              },
              {
                value: 100 - 50,
                name: '',
                itemStyle: {
                  normal: {
                    color: item.color[1],
                    fontSize: 8,
                    center: ['50%', '80%'],
                    textStyle: {
                      fontWeight: 'bold',
                      fontSize: '20',
                      color: '#fff'
                      // textAlign: 'center'
                    }
                  }

                }
              }
            ]
          }
        ]
      }

      console.log(option)

      this.myChart.setOption(option)
      window.addEventListener('resize', function () {
        this.myChart.resize()
      })
    }
  },
  destroyed () {
    window.removeEventListener('resize', () => {
      this.myChart.resize()
    })
  }
}
</script>
<style lang="less" scoped>
</style>
