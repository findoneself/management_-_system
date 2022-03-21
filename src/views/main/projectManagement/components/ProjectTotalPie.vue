<template>
  <div>
    <div
      id="project_total"
      style="width: 100%; height: 15rem"
    ></div>
  </div>
</template>
<script>
export default {
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
          },
        },
        {
          name: '市政',
          value: 3434,
          color: '#FF4F01', itemStyle: {
            normal: {
              color: '#FF4F01'
            }
          },
        },
        {
          name: '轨道',
          value: 21,
          color: '#FF3D54', itemStyle: {
            normal: {
              color: '#FF3D54'
            }
          },
        },
        {
          name: '其他',
          value: 50,
          color: ' #00FFFF', itemStyle: {
            normal: {
              color: '#00FFFF'
            }
          },
        }
      ],
      option: {
        // title: {
        //   text: "Nightingale Chart",
        //   subtext: "Fake Data",
        //   left: "center",
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{b} :<br/> {c} ({d}%)'
        },
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
            radius: [40, 60],
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
      var myChart = this.$echarts.init(document.getElementById('project_total'))
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