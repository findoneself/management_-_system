<template>
  <!-- 统计 -->
  <div class="echart-wrapper">
    <!-- 第一个统计图 -->
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
    <!-- 四个统计图 -->
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
          @change="pickerHandel(item, key)"
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
            @click="echartClick(item, bindex)"
            :class="bindex === item.curIndex ? 'active-legend' : ''"
            :style="{color: iindex === 3 && bindex === item.curIndex ? item.colors[bindex] : 'inherit'}"
            :key="val.id"
          >
            <i :style="{backgroundColor: item.colors[bindex]}"></i>
            <span class="legend-name">{{ val.name }}</span>
            <span v-show="iindex !== 3">{{ val.count }}</span>
          </li>
        </ul>
      </div>
    </BeautifulCard>
    <!-- 视频区域 -->
    <BeautifulCard
      title="隐患随手拍"
      class="echart-bottom echart-video"
      :cardStyle="{padding: '1.2rem 2.5rem'}"
      :isTriangle='false'
    >
      <ul class="video-ul">
        <li
          class="video-item"
          v-for="item in videoList"
          :key="item.id"
        >
          <BeVideo :src="item.src" />
          <div class="video-title">
            <span>{{ item.datetime }}</span>
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </BeautifulCard>
  </div>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import PatrolMap from '_vie/common/patrolMap'
import BeVideo from '_com/common/BeVideo'
export default {
  name: 'PatrolEchart',
  components: {
    BeautifulCard,
    PatrolMap,
    BeVideo
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
      },
      // 视频列表
      videoList: [
        { id: 'gweg', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
        { id: 'wgwh', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
        { id: 'greweg', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
        { id: 'gwhejeg', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
        { id: 'gwshseg', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
        { id: 'gwejrjeg', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' },
        { id: 'gweeaeg', title: '测试视频', datetime: '2022-02-02 11:02', src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }
      ]
    }
  },
  created () {
    this.initDict()
  },
  mounted () {
    this.$nextTick(() => {
      this.initEchart()
    })
    window.addEventListener('resize', this.watchEchart)
  },
  destroyed () {
    // 销毁监听
    window.removeEventListener('resize', this.watchEchart)
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
    // 监听窗口改变，两个echarts刷新
    watchEchart () {
      Object.values(this.echartsList).forEach((item) => {
        if (item.myChart) {
          item.myChart.resize()
        }
      })
    },
    // 下拉框值改变
    pickerHandel (item, key) {
      item.getData(item, key)
    },
    // 初始化echarts图
    initEchart () {
      Object.entries(this.echartsList).forEach(([key, item]) => {
        if (!item.myChart) {
          item.myChart = this.$echarts.init(document.getElementById(key + '-echart'))
        }
        // 调用接口获取数据
        item.getData = (info, type) => {
          info.loading = true
          const params = {
            date: info.formValue,
            type: type
          }
          this.$http({
            url: '/xczg/getEchartData',
            data: params
          }).then(res => {
            // 如果获取到数据
            info.loading = false
            if (res.code === 200) {
              info.list = res.data.list
              console.log(res)
            } else {
              // this.$message.error('获取实时数据失败！')
              info.list = []
            }
          }, () => {
            info.loading = false
            const list1 = [
              { name: '噪声检查', count: 16 },
              { name: '污染检查', count: 26 },
              { name: '项目检查', count: 36 }
            ]
            const list2 = [
              { name: '施工隐患', count: 16 },
              { name: '污染环境', count: 26 }
            ]
            info.list = key === 'yhtj' ? list2 : list1
            // 处理echarts的数据
            const series = info.list.map((info) => {
              return {
                value: info.count,
                name: info.name
              }
            })
            let option = {
              title: {
                text: info.list.reduce((val, pre) => {
                  return val + pre.count
                }, 0),
                left: 'center',
                top: 'center',
                textStyle: {
                  fontWeight: 'bold',
                  fontFamily: 'DS-Digital',
                  fontSize: this.$utils.fontSize(24),
                  color: '#fff'
                }
              },
              color: info.colors,
              series: {
                type: 'pie',
                radius: ['55%', '80%'],
                label: { show: false },
                labelLine: { show: false },
                emphasis: {
                  label: { show: true, formatter: '{b}: {c}' },
                  labelLine: { show: true }
                },
                data: series
              }
            }
            info.myChart.setOption(option)
          })
        }
        item.getData(item, key)
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
.echart-bottom {
  height: 40%;
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
.echart-video {
  width: 73%;
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
.echart-legend-item.active-legend {
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
// 视频区域
.video-ul {
  display: flex;
  align-items: stretch;
  overflow-x: scroll;
  width: 100%;
  height: 100%;
  .video-item {
    flex-shrink: 0;
    margin-right: 20px;
    border: 1px solid #0e5dfb;
    background: #2045ae;
    box-shadow: inset -0.0625rem -0.0625rem 30px #305cb3,
      inset 0.0625rem 0.0625rem 30px #2563e3;
    &:last-of-type {
      margin-right: 0;
    }
    .video-player {
      height: calc(100% - 44px);
      width: 100%;
    }
  }
  .video-title {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 14px;
  }
}
</style>