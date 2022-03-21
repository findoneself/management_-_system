<template>
  <div>
    <div
      id="car_in_out_pie"
      style="width: 12rem; height: 9rem"
    ></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          value: 1048, name: '干净', color: '#FFE827', itemStyle: {// 饼图相关模块扇形颜色
            normal: {
              color: '#FFE827'
            },
            emphasis: {
              color: '#FFE827'
            }
          }
        },
        {
          value: 484, name: '不干净', color: '#DF4C4C', itemStyle: {
            normal: {
              color: '#DF4C4C'
            },
            emphasis: {
              // color: colors[index][1],
            }
          }
        },
        {
          value: 735, name: '密封', color: '#23DBFC', itemStyle: {
            normal: {
              color: '#23DBFC'
            },
            emphasis: {
              // color: colors[index][1],
            }
          }
        },
        {
          value: 300, name: '未密封', color: '#993FFF', itemStyle: {
            normal: {
              color: '#993FFF'
            },
            emphasis: {
              // color: colors[index][1],
            }
          }
        },
        {
          value: 580, name: '证件合规', color: ' #FFAD2D', itemStyle: {
            normal: {
              color: '#FFAD2D'
            },
            emphasis: {
              // color: colors[index][1],
            }
          }
        },
        {
          value: 300, name: '证件违规', color: '#68A4FF', itemStyle: {
            normal: {
              color: '#68A4FF'
            },
            emphasis: {
              // color: colors[index][1],
            }
          }
        }
      ],
      option: {
        series: [
          {
            name: '',
            type: 'pie',
            radius: '70%',
            center: ['50%', '38%'],
            label: {
              position: 'inner',
              fontSize: 0,
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
      var myChart = this.$echarts.init(document.getElementById('car_in_out_pie'))
      this.option.series[0].data = this.data
      myChart.setOption(this.option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>