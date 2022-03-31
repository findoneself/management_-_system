<template>
  <!-- 车辆出入记录 -->
  <div>
    <div
      id="car_in_out"
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
          value: 40, name: '合规车次', color: '#FCFF20', itemStyle: {
            normal: {
              color: '#FCFF20'
            }
          }
        },
        {
          value: 22, name: '无证黑车', color: '#FF9920', itemStyle: {
            normal: {
              color: '#FF9920'
            }
          }
        },
        {
          value: 33, name: '文明状态异常', color: '#FF4F01', itemStyle: {
            normal: {
              color: '#FF4F01'
            }
          }
        },
        {
          value: 28, name: '道路许可证过期', color: '#FF3D54', itemStyle: {
            normal: {
              color: '#FF3D54'
            }
          }
        },
        {
          value: 20, name: '准运证过期', color: '#00FFFF', itemStyle: {
            normal: {
              color: '#00FFFF'
            }
          }
        }
      ],
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
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{b} :<br/> {c} ({d}%)'
        // },
        legend: {
          left: 'center',
          top: 'center',
          data: [
            'rose1',
            'rose2',
            'rose3',
            'rose4',
            'rose5',
            'rose6',
            'rose7',
            'rose8'
          ]
        },
        toolbox: {
          //  show: true,
          //  下载 数据视图 还原按钮及功能
          //   feature: {
          //     mark: { show: true },
          //     dataView: { show: true, readOnly: false },
          //     restore: { show: true },
          //     saveAsImage: { show: true },
          //   },
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [55, 85],
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
      var myChart = this.$echarts.init(document.getElementById('car_in_out'))
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