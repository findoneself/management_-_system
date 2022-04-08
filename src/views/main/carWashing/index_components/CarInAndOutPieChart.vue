<template>
  <!-- 车辆出入分析 -->
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
      option: {
        series: [
          {
            name: '',
            type: 'pie',
            radius: '100%',
            center: ['50%', '50%'],
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
  props: {
    dataList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    dataList: {
      handler () {
        this.getmap()
      },
      deep: true
    }
  },
  mounted () {
    this.getmap()
  },
  methods: {
    getmap () {
      let seriesData = []
      this.dataList.map(i => {
        seriesData.push({
          ...i, itemStyle: {
            color: i.color
          }
        })
      })
      var myChart = this.$echarts.init(document.getElementById('car_in_out_pie'))
      this.option.series[0].data = seriesData
      myChart.setOption(this.option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>