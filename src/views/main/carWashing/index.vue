<template>
  <!--车洗裸土 -->
  <BeautifulWrapper
    :isMenuTab='false'
    :borderIcon='borderIcon'
    :wraStyle='wraStyle'
  >
    <div class="container">
      <div class="content_left">
        <BeautifulCard
          :isTriangle="false"
          :title="'管控信息'"
          class="control"
        >
          <div class="params">
            <div
              class="item"
              v-for="item in paramslist"
              :key="item.id"
              @click="controlHandel(item.path)"
            >
              <div class="span">{{ item.name }}</div>
              <div class="span">
                <div
                  class="margin"
                  :style="{ color: item.color }"
                >
                  {{ item.value }}
                </div>
                <span class="company">{{ item.company }}</span>
              </div>
            </div>
          </div>
        </BeautifulCard>
        <BeautifulCard
          class="car_in_out"
          :isTriangle="false"
          :title="'车辆出入记录'"
        >
          <div class="record">
            <el-select
              class="select_online_video"
              @change="(e)=>{videoChange(e,'cartime')}"
              v-model="value"
              size="mini"
              placeholder="请选择"
            >
              <el-option
                v-for="item in carTImeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <CarInAndOutMap></CarInAndOutMap>
          <div class="recordlist">
            <div
              class="record_item"
              v-for="(item, index) in recordList"
              :key="index"
              :style="{ backgroundColor: index % 2 == 0 ? '#0B1771' : '#02004D' }"
            >
              <div>
                <div
                  class="colorBox"
                  :style="{ backgroundColor: item.color }"
                ></div>
              </div>
              <div class="scale width">{{ item.name }}</div>
              <div class="scale">{{ item.value }}次</div>
              <div class="lookat">查看</div>
            </div>
          </div>
        </BeautifulCard>
      </div>
      <!-- 右侧地图区域 -->
      <div class="content_right">
        <!-- 上半部分 -->
        <div class="map_video">
          <!-- 中间地图部分 -->
          <div class="map"></div>
          <!-- 右边在线视频 -->
          <BeautifulCard
            class="online_video"
            :isTriangle="false"
            :title="'在线视频'"
          >
            <div class="select_list">
              <el-select
                class="select_online_video"
                @change="(e)=>{videoChange(e,'region')}"
                size="mini"
                v-model="regionValue"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in regionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                class="select_online_video"
                @change="(e)=>{videoChange(e,'project')}"
                v-model="projectValue"
                size="mini"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in projectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                class="select_online_video"
                @change="(e)=>{videoChange(e,'video')}"
                v-model="videoValue"
                size="mini"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in videoList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="video">
              <video
                :src="videoSrc"
                controls="controls"
              >
              </video>
            </div>
            <div class="video_list">
              <div class="video_list_title">
                <span>通行状态</span>
                <span>通行时间</span>
                <span>资质状态</span>
                <span>车辆型号</span>
              </div>
              <div
                class="video_list_data"
                v-for="(item, index) in carList"
                :key="index"
                :style="{ backgroundColor: index % 2 == 0 ? '#0B1771' : '#02004D' }"
              >
                <div>{{item.carnum}}</div>
                <div>{{item.time}}</div>
                <div>{{item.status}}</div>
                <div>{{item.type}}</div>
              </div>
            </div>
          </BeautifulCard>
        </div>
        <!-- 下半部分-统计图区域 -->
        <div class="map_region">
          <BeautifulCard
            class="car_analysis"
            :title="'车辆出入分析'"
          >
            <div class="car_analysis_content">
              <div class="car_analysis_left">
                <CarInAndOutPieChart></CarInAndOutPieChart>
                <div class="pie_chart_List">
                  <div
                    class="pie_chart_item"
                    v-for="(item,index) in pieChartList"
                    :key="index+']'"
                  >
                    <div
                      class="color_item"
                      :style="{ backgroundColor: item.color }"
                    ></div>
                    <div class="span">{{item.name}}</div>
                  </div>
                </div>
              </div>
              <!-- 双层折线图 -->
              <div class="double_line">
                <div class="double_line_select">
                  <el-select
                    class="select_online_video"
                    @change="(e)=>{videoChange(e,'double_line')}"
                    v-model="doubleLineValue"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in carTImeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <DoubleLineChart></DoubleLineChart>
                <div class="button">
                  <img
                    class="left_img"
                    src="~_ats/img/right.png"
                    alt=""
                  />
                  <img
                    class="right_img"
                    src="~_ats/img/right.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </BeautifulCard>
          <!-- 区域报警分析 -->
          <BeautifulCard
            class="car_county"
            :title="'区县报警分析'"
          >
            <div class="car_county_select">
              <div class="double_line_select">
                <el-select
                  class="select_online_video"
                  @change="(e)=>{videoChange(e,'car_county')}"
                  v-model="carCountyValue"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in carTImeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <!-- 柱状图区域 -->
              <CountyAnalysisBar></CountyAnalysisBar>
              <div class="button">
                <img
                  class="left_img"
                  src="~_ats/img/right.png"
                  alt=""
                />
                <img
                  class="right_img"
                  src="~_ats/img/right.png"
                  alt=""
                />
              </div>
            </div>
          </BeautifulCard>
        </div>
      </div>
    </div>
  </BeautifulWrapper>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import BeautifulWrapper from '_com/common/BeautifulWrapper'

import CarInAndOutMap from './index_components/CarInAndOutMap.vue'
import CarInAndOutPieChart from './index_components/CarInAndOutPieChart.vue'
import DoubleLineChart from './index_components/DoubleLineChart.vue'
import CountyAnalysisBar from './index_components/CountyAnalysisBar.vue'
export default {
  name: 'CarWashing',
  components: {
    BeautifulCard,
    BeautifulWrapper,
    CarInAndOutMap,
    CarInAndOutPieChart,
    DoubleLineChart,
    CountyAnalysisBar
  },
  data () {
    return {
      paramslist: [
        { name: '在监工程总数', id: '4-5', value: '16', company: '项', color: '#39FFEF' },
        { name: '备案渣土车', id: '4-4', value: '16', company: '辆', color: '#3DB6FC' },
        { name: 'AI识别安装率', id: '4-1', value: '16', company: '%', color: '#0BD3A6' },
        { name: '准运渣土车', id: '4-6', value: '16', company: '辆', color: '#FF6D15' },
        {
          name: '土方运输总数',
          value: '16',
          company: '万方',
          color: '#FFB31F'
        },
        { name: '违规渣土车', id: '4-2', value: '0', company: '辆', color: '#B94AFF' }
      ],
      carTImeList: [
        {
          value: '选项1',
          label: '近一周'
        },
        {
          value: '选项2',
          label: '近一月'
        },
        {
          value: '选项3',
          label: '近一年'
        }
      ],
      value: '选项1',
      recordList: [
        { value: 40, name: '合规车次', color: '#FCFF20' },
        { value: 22, name: '无证黑车', color: '#FF9920' },
        { value: 33, name: '文明状态异常', color: '#FF4F01' },
        { value: 28, name: '道路许可证过期', color: '#FF3D54' },
        { value: 20, name: '准运证过期', color: '#00FFFF' }
      ],
      // 行政区域
      regionValue: '1',
      regionList: [
        { value: '1', label: '北京' },
        { value: '2', label: '上海' },
        { value: '3', label: '广州' },
        { value: '4', label: '深圳' },
        { value: '5', label: '成都' }
      ],
      // 所属项目
      projectValue: '1',
      projectList: [
        { value: '1', label: '北京' },
        { value: '2', label: '上海' },
        { value: '3', label: '广州' },
        { value: '4', label: '深圳' },
        { value: '5', label: '成都' }
      ],
      // 视频设备
      videoValue: '1',
      videoList: [
        { value: '1', label: '北京' },
        { value: '2', label: '上海' },
        { value: '3', label: '广州' },
        { value: '4', label: '深圳' },
        { value: '5', label: '成都' }
      ],
      videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      carList: [
        { carnum: '浙123244', time: '2021-02-02', status: '无证黑车', type: '其他' },
        { carnum: '浙123244', time: '2021-02-02', status: '无证黑车', type: '其他' },
        { carnum: '浙123244', time: '2021-02-02', status: '无证黑车', type: '其他' },
        { carnum: '浙123244', time: '2021-02-02', status: '无证黑车', type: '其他' },
        { carnum: '浙123244', time: '2021-02-02', status: '无证黑车', type: '其他' }
      ],
      pieChartList: [
        { value: 1048, name: '干净', color: '#FFE827' }, //
        { value: 484, name: '不干净', color: '#DF4C4C' },
        { value: 735, name: '密封', color: '#23DBFC' },
        { value: 300, name: '未密封', color: '#993FFF' },
        { value: 580, name: '证件合规', color: ' #FFAD2D' },
        { value: 300, name: '证件违规', color: '#68A4FF' }
      ],
      doubleLineValue: '选项1',
      carCountyValue: '选项1',
      borderIcon: ['top', 'right', 'bottom', 'left'],
      wraStyle: { inPadding: '0px' },
      menuList: this.$store.state.global.menuList
    }
  },
  created () {
    let subMenu = this.menuList.find(item => item.id === this.$route.meta.id).children
    subMenu.map(i => {
      this.paramslist.map((o) => {
        if (i.id === o.id) {
          o.path = i.path
        }

      })
    })
  },
  methods: {
    controlHandel (path) {
      console.log(path)
      if (path) {
        this.$router.push(path)
      }
    },
    // 下拉框
    videoChange (e, val) {
      // e为当前选项 val为哪一个下拉框
      console.log(e, val)
    }
  }
}
</script>

<style lang="less" scoped>
.card-content {
  padding: 0;
}
.container {
  display: flex;
  // width: 100%;
  height: 100%;
}
.content_left {
  display: flex;
  flex-direction: column;
  .control {
    width: 25rem;
    // height: 40%;
    .params {
      // width: 25rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 0 0.6rem;
      margin-top: 10px;
      height: calc(100% - 80px);
      .item {
        width: 11.3rem;
        text-align: center;
        cursor: pointer;
        height: 30%;
        margin: 2px;
        background-color: #133c91;
        border-radius: 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 1rem;
        padding: 1rem;
        align-items: flex-start;
        .span {
          display: flex;
          align-items: center;
          transform: scale(0.9);
          text-align-last: justify;
          margin-top: 5px;
          .margin {
            font-size: 1.5rem;
            width: 2.5rem;
            text-align: left;
          }
        }
      }
    }
  }
  .car_in_out {
    width: 25rem;
    height: 60%;
    background-color: #02004d;
    .record {
      text-align: right;
      // padding: 0.5rem;
    }
    .recordlist {
      display: flex;
      flex-direction: column;
      align-items: center;

      .record_item {
        display: flex;
        width: 22.5rem;
        height: 2.5rem;
        background-color: #02004d;
        justify-content: space-around;
        align-items: center;
        line-height: 2.5rem;
        font-size: 0.88rem;
        div {
          flex: 1;
        }
        .lookat {
          color: #00ffff;
          transform: scale(0.9);
          cursor: pointer;
        }
        .scale {
          transform: scale(0.8);
        }
        .width {
          flex: 25%;
        }
        .colorBox {
          width: 1.3rem;
          height: 0.56rem;
          margin-left: 1.3rem;
          border-radius: 0.5rem;
        }
      }
    }
    .select_car_time {
      width: 7.63rem;
      /deep/.el-input {
        // transform: scale(0.8);
      }
      /deep/.el-select-dropdown {
        border: none !important;
        background: #192f4a !important;
        z-index: 999;
      }
      /deep/.el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background-color: #040560;
      }
    }
  }
}
.button {
  img {
    width: 0.6rem;
    height: 1rem;
    position: absolute;
  }
  .left_img {
    transform: rotate(180deg);
    position: absolute;
    bottom: 0.2rem;
    left: 3.5rem;
  }
  .right_img {
    bottom: 0.2rem;
    right: 0.6rem;
  }
}
.content_right {
  flex: 1;
  .map_video {
    display: flex;
    .map {
      flex: 1;
    }
    .online_video {
      width: 25rem;
      height: 37.5rem;
      background-color: #02004d;
      .select_list {
        display: flex;
        justify-content: space-around;
      }
      .video {
        width: 100%;
        height: 12.5rem;
        margin: 1rem 0 1.5rem 0;
        video {
          width: 100%;
          height: 100%;
        }
      }
      .video_list {
        display: flex;
        flex-direction: column;
        .video_list_title {
          display: flex;
          color: #00ffff;
          justify-content: space-around;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          span {
            transform: scale(0.8);
          }
        }
        .video_list_data {
          display: flex;
          height: 2.65rem;
          justify-content: space-between;
          align-items: center;
          padding: 0 1rem;
          div {
            transform: scale(0.8);
          }
        }
      }
    }
  }
  .map_region {
    display: flex;
    margin: 1.25rem 1.25rem 0 1.25rem;
    justify-content: space-between;
    .car_analysis {
      width: 52rem;
      height: 17.6rem;
      .car_analysis_content {
        display: flex;
      }
      .car_analysis_left {
        width: 14rem;
        margin-left: 1rem;
        .pie_chart_List {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          overflow: hidden;
          .pie_chart_item {
            width: 6rem;
            display: flex;
            justify-self: space-between;
            align-items: center;
            text-align: center;
            height: 1.1rem;
            margin: 0.3rem;
            border-radius: 0.3rem;
            .color_item {
              width: 0.75rem;
              height: 0.5rem;
              border-radius: 0.5rem;
              background-color: #133c91;
              margin-right: 0.7rem;
            }
            .span {
              font-size: 0.88rem;
              transform: scale(0.8);
              // display: inline-block;
            }
          }
        }
      }
      .double_line {
        position: relative;
        flex: 1;
        .double_line_select {
          text-align: right;
          position: absolute;
          top: -2.5rem;
          right: 0.4rem;
        }
        .left_img {
          bottom: 0.8rem;
        }
        .right_img {
          bottom: 0.8rem;
        }
      }
    }
    .car_county {
      width: 36.5rem;
      height: 17.6rem;
      .car_county_select {
        position: relative;
        .double_line_select {
          text-align: right;
          position: absolute;
          top: -2.5rem;
          right: 0.4rem;
        }
        .button {
          .left_img {
            left: 2.5rem;
          }
        }
      }
    }
  }
}

.select_online_video {
  width: 7.8rem;
  /deep/.el-input--suffix .el-input__inner {
    // height: 2.8rem;
    width: 6.5rem;
    // transform: scale(0.8);
  }
}
</style>