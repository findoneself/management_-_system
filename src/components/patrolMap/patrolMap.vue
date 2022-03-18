<template>
  <div>
    <div
      id="map"
      style="width: 100%; height: 300px"
    ></div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      dataList: [
        { name: '装备制造', value: 80 },
        { name: '现代材料', value: 44 },
        { name: '新能源', value: 35 },
        { name: '新一代信息技术', value: 30 }
      ]
    }
  },
  mounted () {
    this.getmap()
  },
  methods: {
    getmap () {
      var myChart = echarts.init(document.getElementById('map'))
      var colors = [
        ['#389af4', '#dfeaff'],
        ['#ff8c37', '#ffdcc3'],
        ['#ffc257', '#ffedcc'],
        ['#fd6f97', '#fed4e0']
      ]
      var titleArr = []
      var seriesArr = []
      this.dataList.forEach(function (item, index) {
        titleArr.push({
          text: item.name,
          left: index * 20 + 10 + '%',
          top: '65%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '25',
            color: colors[index][0],
            textAlign: 'center'
          }
        })
        seriesArr.push({
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius: [40, 70],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
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
          center: [index * 20 + 10 + '%', '50%'],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + '%'
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold',
                    color: colors[index][0]
                  }
                }
              }
            },
            {
              value: 100 - item.value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: colors[index][1]
                },
                emphasis: {
                  color: colors[index][1]
                }
              }
            }
          ]
        })
      })
      var option = {
        backgroundColor: '#fff',
        title: titleArr,
        series: seriesArr
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
