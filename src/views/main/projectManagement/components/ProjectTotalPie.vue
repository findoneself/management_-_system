<template>
  <div
    id="project_total"
    style="width: 100%; height: 75%"
  ></div>
</template>
<script>
export default {
  props: {
    paramslist: {
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
    paramslist: {
      handler () {
        this.getmap()
      },
      deep: true
    }
  },
  data () {
    return {
      data: [
        {
          name: '房建',
          value: 45,
          color: '#FCFF20', itemStyle: {
            normal: {
              color: '#FCFF20'
            }
          }
        },
        {
          name: '市政',
          value: 34,
          color: '#FF4F01', itemStyle: {
            normal: {
              color: '#FF4F01'
            }
          }
        },
        {
          name: '轨道',
          value: 21,
          color: '#FF3D54', itemStyle: {
            normal: {
              color: '#FF3D54'
            }
          }
        },
        {
          name: '其他',
          value: 50,
          color: ' #00FFFF', itemStyle: {
            normal: {
              color: '#00FFFF'
            }
          }
        }
      ],
      option: {
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
      this.paramslist.map(i => {
        data.push({
          ...i,
          itemStyle: {
            color: i.color
          }
        })
      })
      var myChart = this.$echarts.init(document.getElementById('project_total'))
      this.option.series[0].data = data
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