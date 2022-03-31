<template>
  <!-- 统计 -->
  <div class="echart-wrapper">
    <BeautifulCard
      title="网络员统计"
      :isTriangle='false'
      class="echart-top echart-top-first"
    >
      <div class="inspect">
        <ul class="inspect_time">
          <li
            v-for="(item, index) in patrolData.inspect"
            :key="index"
          >{{item.name}} : <span>{{ item.num }}</span></li>
        </ul>
        <div class="inspect_people">
          <div class="first">网络员：</div>
          <img src="~_ats/img/people.png" />
          <div class="people_num">{{ patrolData.people }}人</div>
        </div>
      </div>
      <PatrolMap :data-list="patrolData.patrolList"></PatrolMap>
    </BeautifulCard>
    <BeautifulCard
      :title="item.title"
      v-for="(item, key, iindex) in echartsList"
      :is-show-head="!!item.title"
      :class="iindex > 2 ? 'echart-bottom echart-notitle' : 'echart-top echart-title'"
      :key="key"
      :isTriangle='false'
    >
      <div class="form-select">
        <el-select
          v-model="item.formValue"
          clearable
          size="mini"
          placeholder="请选择"
          @change="pickerHandel(item)"
        >
          <el-option
            v-for="item in dictOptions.dayList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div
        class="echart-content"
        v-loading="item.loading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <div
          class="echart-item"
          :id="key +'-echart'"
        ></div>
        <ul
          class="echart-legend"
          v-if="item.list && item.list.length > 0"
        >
          <li
            v-for="(val, bindex) in item.list"
            class="echart-legend-item"
            @click="echartClick(val, bindex)"
            :class="bindex === item.curIndex ? 'active-legend' : ''"
            :key="val.id"
          >
            <i :style="{backgroundColor: item.colors[bindex]}"></i>
            <span class="legend-name">{{ val.name }}</span>
            <span v-show="iindex !== 3">：{{ val.count }}</span>
          </li>
        </ul>
      </div>
    </BeautifulCard>
  </div>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import PatrolMap from '_vie/common/patrolMap'
export default {
  name: 'PatrolEchart',
  components: {
    BeautifulCard,
    PatrolMap
  },
  data () {
    return {
      // 字典数据
      dictOptions: {
        dayList: []
      },
      // 巡查整改数据
      patrolData: {
        inspect: [
          { name: '本月检查项目', num: 2654 },
          { name: '本月检查次数', num: 2353 },
          { name: '本月检查次数', num: 12324 }],
        people: 45661,
        patrolList: [
          { name: '巡查单', count: 256643, percent: 80 },
          { name: '停工单', count: 256643, percent: 60 },
          { name: '督办单', count: 256643, percent: 40 },
          { name: '整改单', count: 256643, percent: 50 }
        ]
      },
      // 五个echarts数据
      echartsList: {
        xctj: {
          formValue: '',
          myChart: null,
          title: '巡查统计',
          loading: false,
          // 当前图例点击的index
          curIndex: null,
          colors: ['#FF3D54', '#FF4F01', '#00FFFF'],
          list: [],
          getData: null
        },
        zgtj: {
          formValue: '',
          myChart: null,
          title: '整改统计',
          loading: false,
          // 当前图例点击的index
          curIndex: null,
          colors: ['#72C8FF', '#7FAFFF', '#317FFF'],
          list: [],
          getData: null
        },
        zgyqtj: {
          formValue: '',
          myChart: null,
          title: '整改逾期统计',
          loading: false,
          // 当前图例点击的index
          curIndex: null,
          colors: ['#B790FF', '#8A4AFF', '#620DFF'],
          list: [],
          getData: null
        },
        yhtj: {
          formValue: '',
          myChart: null,
          loading: false,
          // 当前图例点击的index
          curIndex: null,
          colors: ['#FFF600', '#FF9000'],
          list: [],
          getData: null
        }
      }
    }
  },
  created () {
    this.initDict()
  },
  mounted () {
    this.$nextTick(() => {
      this.initEchart()
    })
  },
  methods: {
    // 初始化字典数据
    initDict () {
      const dict = this.$store.state.global.dictData
      if (dict.dayDate && dict.dayDate.length > 0) {
        this.dictOptions.dayList = dict.dayDate
        Object.values(this.echartsList).forEach((item) => {
          item.formValue = dict.dayDate[0].id
        })
      }
    },
    getEchartData () {

    },
    // 初始化echarts图
    initEchart (data) {
      Object.entries(this.echartsList).forEach(([key, item]) => {
        if (!item.myChart) {
          item.myChart = this.$echarts.init(document.getElementById(key + '-echart'))
        }
        item.loading = true
        // 调用接口获取数据
        item.getData = () => {
          this.$http({
            url: '/xczg/getEchartData',
            data: {
              date: item.formValue,
              type: key
            }
          }).then(res => {
            // 如果获取到数据
            item.loading = false
            if (res.code === 200) {
              item.list = res.data.list
              console.log(res)
            } else {
              // this.$message.error('获取实时数据失败！')
              item.list = []
            }
          }, () => {
            item.loading = false
            const list1 = [
              { name: '噪声检查', count: 16 },
              { name: '污染检查', count: 26 },
              { name: '项目检查', count: 36 }
            ]
            const list2 = [
              { name: '施工隐患', count: 16 },
              { name: '污染环境', count: 26 }
            ]
            item.list = key === 'yhtj' ? list2 : list1
            // 处理echarts的数据
            const series = item.list.map((item) => {
              return {
                value: item.count,
                name: item.name
              }
            })
            let option = {
              color: item.colors,
              series: {
                type: 'pie',
                radius: ['50%', '80%'],
                label: { show: false },
                labelLine: { show: false },
                emphasis: {
                  label: { show: true, formatter: '{b}: {c}' },
                  labelLine: { show: true }
                },
                data: series
              }
            }
            item.myChart.setOption(option)
          })
        }
        item.getData()
        // 鼠标移入隐藏点击的高亮-- - 单个元素的移入移出不太友好，最好是对echarts整个图表做移入移出
        item.myChart.on('mouseover', (v) => {
          if (item.curIndex !== null && v.dataIndex !== item.curIndex) {
            item.myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: item.curIndex
            })
          }
        })
        // 鼠标移出重新高亮当前点击的图例
        item.myChart.on('mouseout', (v) => {
          if (item.curIndex !== null && v.dataIndex !== item.curIndex) {
            item.myChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: item.curIndex
            })
          }
        })
      })
    },
    // 图例点击事件---obj是data里面定义的图表对象
    echartClick (item, index) {
      // 点击回调，如果点击同一个图例，则直接清除高亮
      if (item.curIndex !== null && index === item.curIndex) {
        item.curIndex = null
        item.myChart.dispatchAction({
          type: 'downplay', seriesIndex: 0, dataIndex: index
        })
      } else {
        // 如果上一个点击的图例不为空，则清除上一个
        if (item.curIndex !== null) {
          item.myChart.dispatchAction({
            type: 'downplay', seriesIndex: 0, dataIndex: item.curIndex
          })
        }
        // 新点击的图例高亮
        item.myChart.dispatchAction({
          type: 'highlight', seriesIndex: 0, dataIndex: index
        })
        // 保存当前点击的图例的索引
        item.curIndex = index
      }
    }
  }
}
</script>

<style scoped lang="less">
.echart-wrapper {
  width: inherit;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
}
.echart-top {
  height: 60%;
}
.echart-top-first {
  width: 20%;
}
.echart-title {
  flex-grow: 1;
  width: 26%;
}
.echart-notitle {
  width: 27%;
}
.echart-bottom {
  height: 40%;
}
.echart-content {
  width: 100%;
  height: calc(100% - 43px);
}
.echart-item {
  height: calc(100% - 112px);
  width: 100%;
}
.form-select {
  text-align: right;
  padding-bottom: 15px;
  .el-select {
    width: 120px;
  }
}
// 第一个模块，网络员统计
.echart-top-first {
  .inspect {
    background-color: #103387;
    border-radius: 0.5rem;
    border: 1px solid #334c9e;
    display: flex;
    align-items: stretch;
    font-size: 14px;
    .inspect_time,
    .inspect_people {
      width: 50%;
    }
    .inspect_time {
      border-right: 1px solid #183b8f;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-content: flex-start;
      > li {
        display: flex;
        align-items: center;
        padding: 0 14px;
        height: 30px;
        :nth-of-type(n + 2) {
          border-top: 1px solid #183b8f;
        }
        span {
          font-weight: bold;
          color: var(--high-color);
        }
      }
    }
    .inspect_people {
      text-align: center;
      .first {
        display: flex;
        align-items: center;
        padding-left: 14px;
        height: 30px;
      }
      img {
        display: inline-block;
        width: 3rem;
      }
      .people_num {
        font-size: 20px;
        color: var(--high-color);
        margin: 0.5rem 0;
      }
    }
  }
  .patrol-echart {
    height: calc(100% - 120px);
  }
}
// 后面三个统计图模块
.echart-legend {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.echart-legend-item {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.875rem;
  width: 379px;
  height: 37px;
  background: #2f71ff33;
  color: #fff;
  cursor: pointer;
  padding: 0 22px;
  transition: background 0.5s;
  > i {
    width: 20px;
    height: 8px;
    border-radius: 5px;
    margin-right: 25px;
    flex-shrink: 0;
  }
  .legend-name {
    width: 170px;
    flex-shrink: 0;
    text-align: left;
  }
  .legend-value {
    flex-shrink: 1;
    width: 50%;
  }
}
.echart-legend-item:nth-of-type(even) {
  background: transparent;
}
.active-legend {
  background: #2f71ffce;
}
// 无标题的统计图模块
.echart-notitle {
  .echart-item {
    height: calc(100% - 22px);
  }
  .echart-legend {
    display: flex;
    align-items: center;
    flex-direction: unset;
    justify-content: space-around;
  }
  .echart-legend-item {
    background: transparent;
    height: 20px;
    width: 160px;
  }
  .active-legend {
    background: transparent;
  }
}
</style>