<template>
  <div><div id="warningnum" style="width: 93%; height: 21rem"></div></div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      option: {
        // title: {
        //   text: "数量",
        //   textStyle: {
        //     fontWeight: "normal",
        //     fontSize: "10",
        //     color: "#fff",
        //     textAlign: "center",
        //   },
        // },
        xAxis: {
          type: "category",
          data: ["3.01", "3.02", "3.03", "3.04", "3.05", "3.06", "3.07"],
          // X轴线上标识样式
          axisLabel: {
            color: "#fff",
            fontSize: "10",
          },
          // 底部X轴线 样式
          axisLine: {
            lineStyle: {
              color: "#B9C8DB",
            },
          },
          //X轴是否可以穿出左侧边框
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "数量",
          axisLabel: {
            color: "#fff",
            fontSize: "10",
          },
          // 边框Y轴线样式
          axisLine: {
            lineStyle: {
              color: "#B9C8DB",
            },
          },
          // Y轴全部轴线样式（除开边框Y轴）
          splitLine: {
            lineStyle: {
              color: "#F2F2F2",
            },
          },
          //Y轴是否可以穿出底部边框
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: "20rem",
          right: "1rem",
          top: "50rem",
          bottom: "5rem",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        series: [
          {
            data: [20, 50, 70, 35, 35, 47, 260],
            type: "line",
            itemStyle: {
              normal: {
                color: "#23DBFC",
                // shadowColor: item.color[1],
                fontSize: "1rem",
                shadowBlur: 0,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getmap();
  },
  methods: {
    getmap() {
      var myChart = this.$echarts.init(document.getElementById("warningnum"));
      myChart.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>