<template>
  <!--项目管理 -->
  <BeautifulWrapper
    :borderIcon='borderIcon'
    :wraStyle='wraStyle'
  >
    <div class="container">
      <div class="container_left">
        <!-- 项目总数
        <BeautifulCard
          :title="'项目总数'"
          :isTriangle="false"
        >
          <div class="project_total">
            <ProjectTotalPie
              :paramslist='paramslist'
              :total='projectTotal'
            />
            <div class="params">
              <div
                class="item"
                v-for="(item, index) in paramslist"
                :key="index + '.'"
              >
                <div
                  class="color"
                  :style="{ backgroundColor: item.color }"
                ></div>
                <div class="span">{{ item.name }}:
                  <span class="margin">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </BeautifulCard> -->
        <!-- 业务分类 -->
        <!-- <BeautifulCard
          :title="'业务分类'"
          :isTriangle="false"
        >
          <div class="project_total">
            <BusinessSortPie
              :dataList="businessSortList"
              :total='businessTotal'
            />
            <div class="params business">
              <div
                class="item business"
                v-for="(item, index) in businessSortList"
                :key="index + '.'"
              >
                <div
                  class="color"
                  :style="{ backgroundColor: item.color }"
                ></div>
                <div class="span">{{ item.name }}:
                  <span class="margin">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </BeautifulCard> -->
        <!-- 每月新增 -->
        <!-- <BeautifulCard
          :title="'每月新增'"
          :isTriangle="false"
        >
          <addMonthChart
            :xAxisData='xAxisData'
            :seriesData='seriesData'
          />
        </BeautifulCard> -->
      </div>
      <!-- 中间地图区域 -->
      <div class="map">
        <!-- <AirQualityMap
          :center='center'
          :isMarkHandle='false'
          :coordinateList='coordinateList'
          :mapColorList='mapColorList'
        />
        <div class="map_left_title">地图</div> -->

      </div>
      <!-- 右边列表 -->
      <div class="super_list">
        <!-- <BeautifulCard
          :isShowHead="false"
          :isTriangle="false"
        >
          <div class="super_list_top">
            <div class="super_top_title">
              <div class="left_img">
                <img
                  src="~_ats/img/shizhong.png"
                  alt=""
                >
                <div class="zhongjian scale">超期90天未竣工:</div>
                <div class="scale num">123</div>
              </div>
              <div
                class="scale more"
                @click="morePage('超期90天未竣工')"
              >更多</div>
            </div>
            <div class="columns">
              <div
                v-for="item in columns"
                :key='item.id'
              >{{item.name}}</div>
            </div>
            <div class="data">
              <div
                class="data_item"
                v-for="item in dataList"
                :key="item.id"
              >
                <div>{{item.jcd}}</div>
                <div>{{item.jcwd}}</div>
                <div>{{item.sgdw}}</div>
                <div>{{item.cqt}}</div>
              </div>
            </div>
          </div>
        </BeautifulCard> -->
        <!-- <BeautifulCard
          :isShowHead="false"
          :isTriangle="false"
        >
          <div class="super_list_top">
            <div class="super_top_title">
              <div class="left_img">
                <img
                  src="~_ats/img/shizhong.png"
                  alt=""
                >
                <div class="zhongjian scale">本月已考评:</div>
                <div class="scale num">123</div>
                <div class="zhongjian scale unkao">本月未考评:</div>
                <div class="scale num2">123</div>
              </div>
              <div
                class="scale more"
                @click="morePage('本月考评')"
              >更多</div>
            </div>
            <div class="columns">
              <div
                v-for="item in columns"
                :key='item.id'
              >{{item.name}}</div>
            </div>
            <div class="data">
              <div
                class="data_item"
                v-for="item in dataList"
                :key="item.id"
              >
                <div>{{item.jcd}}</div>
                <div>{{item.jcwd}}</div>
                <div>{{item.sgdw}}</div>
                <div>{{item.cqt}}</div>
              </div>
            </div>
          </div>
        </BeautifulCard> -->
      </div>
    </div>
    <projectDialog
      :dialogVisible="dialogVisible"
      :title="title"
      :dataList="DialogDataList"
      @closeDialog='closeDialog'
    > </projectDialog>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
// import BeautifulCard from '_com/common/BeautifulCard'
// import ProjectTotalPie from './components/ProjectTotalPie.vue'
// import BusinessSortPie from './components/BusinessSortPie.vue'
// import addMonthChart from './components/addMonthChart.vue'
import projectDialog from './ProjectOverdue.vue'
// import AirQualityMap from '_com/common//AirQualityMap.vue'

export default {
  name: 'ProjectIndex',
  components: {
    BeautifulWrapper,
    // BeautifulCard,
    // ProjectTotalPie,
    // BusinessSortPie,
    // addMonthChart,
    projectDialog
    // AirQualityMap
  },
  data () {
    return {
      borderIcon: ['top', 'right', 'bottom', 'left'],
      wraStyle: { inPadding: '0px' },
      // 项目总数模块
      projectTotal: 131244,
      paramslist: [
        {
          name: '房建',
          value: 45,
          color: '#FCFF20'
        },
        {
          name: '市政',
          value: 34,
          color: '#FF4F01'
        },
        {
          name: '轨道',
          value: 21,
          color: '#FF3D54'
        },
        {
          name: '其他',
          value: 50,
          color: ' #00FFFF'
        }
      ],
      // 业务分类模块
      businessTotal: 1432143,
      businessSortList: [
        {
          name: 'AI识别',
          value: 45,
          color: '#FCFF20'
        },
        {
          name: ' 水质',
          value: 34,
          color: '#FF4F01'
        },
        {
          name: ' 噪声',
          value: 21,
          color: '#FF3D54'
        },
        {
          name: ' 扬尘',
          value: 50,
          color: ' #00FFFF'
        },
        {
          name: '智慧工地',
          value: 50,
          color: ' #FFAE00'
        }
      ],
      // 每月新增模块
      xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
      seriesData: [20, 50, 10, 35, 35, 47],
      // 表格表头——右边两个表格
      columns: [
        { name: '项目名称', prop: 'jcd', key: 1 },
        { name: '开发单位', prop: 'jcwd', key: 2 },
        { name: '施工单位', prop: 'sgdw', key: 3 },
        { name: '超期/天', prop: 'cqt', key: 4 }
      ],
      // 表格数据
      dataList: [
        {
          id: '2', jcwd: '开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        },
        {
          id: '3', jcwd: '开发单位开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        },
        {
          id: '4', jcwd: '开发单位开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        },
        {
          id: '1', jcwd: '开发单位开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        }],
      // 大弹窗数据
      DialogDataList: [
        { id: 'geewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'gwg', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'geewhwwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'geegsdwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'geegeewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geejwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geeerwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geesjjwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geejjjwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '242141', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2434', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2421', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '242149661', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '244642141', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '242145641', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
      ],
      // 大弹窗
      dialogVisible: false,
      title: '',
      // 地图
      coordinateList: [{ lng: 116.2787, lat: 40.0492, value: 80 },
      { lng: 116.2787, lat: 40.040, value: 130 },
      { lng: 116.2887, lat: 40.040, value: 230 },
      { lng: 116.297047, lat: 39.979542, value: 30 },
      { lng: 116.321768, lat: 39.88748, value: 30 },
      { lng: 116.494243, lat: 39.956539, value: 10 },
      { lng: 116.594243, lat: 40.01, value: 100 }],
      mapColorList: [{ name: '优', color: '#30D385', section: '0-35' },
      { name: '良', color: '#FFD902', section: '36-75' },
      { name: '轻度', color: '#FF9902', section: '76-115' },
      { name: '中度', color: '#FF0200', section: '116-150' },
      { name: '重度', color: '#990099', section: '151-250' },
      { name: '严重', color: '#990000', section: '251-500' }],
      center: { lng: 116.404, lat: 39.915 }
    }
  },
  methods: {
    morePage (val) {
      console.log(val)
      this.dialogVisible = true
      this.title = val
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  background-color: #03014f;
  height: 100%;
  .map {
    flex: 1;
    position: relative;
    .map_left_title {
      width: 139px;
      height: 51px;
      background: url("../../../assets/img/tabmenu-active.png") no-repeat 100%;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 1.25rem;
      font-weight: 600;
      text-align: center;
      line-height: 51px;
    }
  }
  .container_left {
    display: flex;
    flex-direction: column;
    height: 100%;
    > div {
      height: 33.33%;
    }
  }
  .project_total {
    width: 25rem;
    height: 100%;
    .params {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 0 0.2rem;
      .item {
        width: 11.8rem;
        // height: 2.7rem;
        text-align: center;
        cursor: pointer;
        margin: 0.25rem;
        background-color: #0b1771;
        border-radius: 0.3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1rem;
        padding: 0.2rem 1rem 0.2rem 1.5rem;
        .color {
          width: 1.2rem;
          height: 0.6rem;
          border-radius: 0.3rem;
        }
        .span {
          transform: scale(0.9);
          flex: 1;
          width: 3rem;
          text-align: left;
          // display: flex;
          // // justify-content: flex-start;
          // align-items: center;
          margin-left: 1rem;
          .margin {
            // width: 2.5rem;
            transform: scale(0.9);
            // text-align: left;
            margin-left: 0.4rem;
          }
        }
      }
    }
    .business {
      padding: 0;
      justify-content: flex-start;
      .item.business {
        width: 7.8rem;
        padding: 0.2rem 0.2rem 0.4rem 0.2rem;
        .span {
          margin-left: 0.1rem;
        }
      }
    }
  }
  .add_everyday {
    width: 25rem;
  }
  .super_list {
    display: flex;
    flex-direction: column;
    padding: 0.9rem;
    justify-content: space-between;
    > div {
      width: 23.75rem;
      // flex: 1;
      height: 49%;
    }
    /deep/.card-content-notitle {
      height: 100%;
      padding: 0 !important;
    }
    .super_list_top {
      height: 100%;
      .super_top_title {
        display: flex;
        justify-content: space-between;
        height: 11%;
        align-items: center;
        border-bottom: 1px solid #3b67e3;
        padding: 15px 19px 15px 15px;
        .left_img {
          display: flex;
          align-items: center;
          img {
            width: 1.4375rem;
            height: 1.4375rem;
          }
          .zhongjian {
            margin: 0 0.2rem;
          }
          .num {
            color: #ff791f;
          }
          .num2 {
            color: #18d9ae;
          }
          .unkao {
            margin-left: 1.5rem;
          }
        }
        .scale {
          transform: scale(0.9);
        }
        .more {
          cursor: pointer;
          z-index: 20;
        }
      }
      .columns {
        display: flex;
        height: 10%;
        justify-content: space-around;
        align-items: center;
        color: #00eff4;
        border-bottom: 1px solid #3b67e3;
      }
      .data {
        height: 78%;
        align-items: center;
        .data_item {
          display: flex;
          height: 25%;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          border-bottom: 1px solid #3b67e3;
          > div {
            width: 5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        .data_item:last-child {
          border: none;
        }
      }
    }
  }
}
</style>