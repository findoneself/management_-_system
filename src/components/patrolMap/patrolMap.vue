<template>
  <div>
    <div
      id="map"
      style="width: 100%; height: 18.75rem"
    ></div>
  </div>
</template>
<script>
// import * as echarts from "echarts";

export default {
  data () {
    return {
      dataList: [
        {
          //  3
          name: '巡查单',
          value: 80,
          top: '33%',
          left: '23%',
          num: 24181,
          center: ['25%', '78%'],
          color: ['#9A99B8', '#FF5656'] // left top
        },
        {
          //  1
          name: '停工单',
          value: 44,
          top: '33%',
          left: '70%',
          num: 241872,
          center: ['25%', '30%'],
          color: ['#9A99B8', '#FF7E00']
        },
        {
          //  4
          name: '督办单',
          value: 35,
          top: '80%',
          left: '23%',
          num: 241873,
          center: ['73%', '78%'],
          color: ['#9A99B8', '#59E6FF']
        },
        {
          // 2
          name: '整改单',
          value: 30,
          top: '80%',
          left: '70%',
          num: 241874,
          center: ['73%', '30%'],
          color: ['#9A99B8', '#FFD820']
        }
      ]
    }
  },
  mounted () {
    this.getmap()
  },
  // 橘黄色//红色//亮蓝//黄色
  methods: {
    getmap () {
      var myChart = this.$echarts.init(document.getElementById('map'))
      var titleArr = []
      var seriesArr = []
      this.dataList.forEach(function (item) {
        // let indexs = index + 1;
        titleArr.push({
          text: item.name,
          left: item.left,
          top: item.top,
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '10',
            color: item.name === '巡查单' ? '#FF7E00' : item.name === '停工单' ? '#FFD820' : item.name === '督办单' ? '#FF5656' : '#59E6FF',
            textAlign: 'center'
          }
        })
        console.log(item.name, item.color[1])
        seriesArr.push({
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius: [31, 43],
          itemStyle: {
            normal: {
              color: item.color[0],
              shadowColor: item.color[1],
              fontSize: '1rem',
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
          center: item.center,
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function (params) {
                    return item.num
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    // fontSize: ".625rem",
                    fontWeight: 'bold',
                    color: item.color[1]
                  }
                }
              }
            },
            {
              value: 100 - 70,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: item.color[1]
                },
                emphasis: {
                    // color: colors[index][1],
                }
              }
            }
          ]
        })
      })
      var option = {
        title: titleArr,
        series: seriesArr
      }
      console.log(option)
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
