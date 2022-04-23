<template>
  <!--项目管理 -->
  <BeautifulWrapper
    :borderIcon='borderIcon'
    :wraStyle='wraStyle'
  >
    <div class="container">
      <div class="container_left">
        <!-- 项目总数 -->
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
                :title="item.name"
              >
                <div
                  class="color"
                  :style="{ backgroundColor: item.color }"
                ></div>
                <div class="span">{{ item.name?item.name.slice(0,4):'' }}:
                  <span class="margin">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </BeautifulCard>
        <!-- 业务分类 -->
        <BeautifulCard
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
                <div class="span">{{ item.name?item.name.slice(0,4):'' }}:
                  <span class="margin">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </BeautifulCard>
        <!-- 每月新增 -->
        <BeautifulCard
          :title="'每月新增'"
          :isTriangle="false"
        >
          <addMonthChart
            :xAxisData='xAxisData'
            :seriesData='seriesData'
          />
        </BeautifulCard>
      </div>
      <!-- 中间地图区域 -->
      <div class="map">
        <AirQualityMap
          :center='center'
          :isMarkHandle='true'
          @markHandle='markHandle'
          :coordinateList='coordinateList'
          :mapColorList='mapColorList'
          :title="'project'"
        />
        <div class="map_left_title">地图</div>
        <div class="map-input">
          <el-input
            type="text"
            v-model="searchValue"
            placeholder="地点名称"
          > </el-input>
          <i
            class="el-icon-search"
            @click="getMapData"
          ></i>
        </div>
      </div>
      <!-- 右边列表 -->
      <div class="super_list">
        <BeautifulCard
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
                <div class="scale num">{{more90day}}</div>
              </div>
              <div
                class="scale more"
                @click="morePage('超期90天未竣工')"
              >更多</div>
            </div>
            <BeautifulTableList
              cell-height="2.2rem"
              :data-list="dataList"
              :columns="columns"
              :operObj='{}'
            />
            <!-- <div class="columns">
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
            </div> -->
          </div>
        </BeautifulCard>
        <BeautifulCard
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
                <div class="scale num">0</div>
                <div class="zhongjian scale unkao">本月未考评:</div>
                <div class="scale num2">0</div>
              </div>
              <div
                class="scale more"
                @click="morePage('本月考评')"
              >更多</div>
            </div>
            <!-- <div class="columns">
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
            </div> -->
          </div>
        </BeautifulCard>
      </div>
    </div>
    <projectDialog
      :dialogVisible="dialogVisible"
      :title="title"
      :dataList="DialogDataList"
      @closeDialog='closeDialog'
    > </projectDialog>
    <DialogCenter
      v-if="dialogVisibleCenter"
      :dialogCenterData='dataColumns'
      @closeDialogCenter='closeDialogCenter'
    />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import ProjectTotalPie from './components/ProjectTotalPie.vue'
import BusinessSortPie from './components/BusinessSortPie.vue'
import addMonthChart from './components/addMonthChart.vue'
import projectDialog from './ProjectOverdue.vue'
import AirQualityMap from '_com/common//AirQualityMap.vue'
import BeautifulTableList from '_com/common/BeautifulTableList'
import DialogCenter from './components/DialogCenter.vue'

export default {
  name: 'ProjectIndex',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    ProjectTotalPie,
    BusinessSortPie,
    addMonthChart,
    projectDialog,
    AirQualityMap,
    BeautifulTableList,
    DialogCenter
  },
  data () {
    return {
      borderIcon: ['top', 'right', 'bottom', 'left'],
      wraStyle: { inPadding: '0px' },
      // 项目总数模块
      projectTotal: 0,
      projectColor: ['#FCFF20', '#FF4F01', '#FF3D54', '#00FFFF', '#FFAE00', '#B78FFF'],
      paramslist: [],
      // 业务分类模块
      businessTotal: 0,
      businessSortList: [],
      // 每月新增模块
      xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
      seriesData: [20, 50, 10, 35, 35, 47],
      // 表格表头——右边两个表格
      columns: [
        { name: '项目名称', prop: 'projectName', key: 1 },
        { name: '开发单位', prop: 'constructo', key: 2 },
        { name: '施工单位', prop: 'builder', key: 3 },
        { name: '超期/天', prop: 'chaoQiDays', key: 4 }
      ],
      // 表格数据
      more90day: 0,
      dataList: [],
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
      searchValue: '', // 输入框搜索
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
      center: { lng: 116.404, lat: 39.915 },
      // 详情弹窗数据
      dataColumns: [{ name: '项目编号', prop: 'projectNum', value: '' },
      { name: '备案号', prop: 'projectRecordNum', value: '' },
      { name: '项目名称', prop: 'projectName', value: '' },
      { name: '行政区域名称', prop: 'areaName', value: '' },
      { name: '项目地址', prop: 'projectAddress', value: '' },
      { name: '建设单位', prop: 'constructor', value: '' },
      { name: '建设单位组织机构代码', prop: 'constructorOrgCode', value: '' },
      { name: '建设单位联系人', prop: 'constructorContacts', value: '' },
      { name: '建设单位联系电话', prop: 'constructorTel', value: '' },
      { name: '施工单位', prop: 'builder', value: '' },
      { name: '施工单位组织机构代码', prop: 'builderOrgCode', value: '' },
      { name: '施工单位联系人', prop: 'builderContacts', value: '' },
      { name: '施工单位联系电话', prop: 'builderTel', value: '' },
      { name: '项目备案时间', prop: 'beianTime', value: '' },
      { name: '项目竣工状态', prop: 'completeStatu', value: '' }
      ],
      dialogVisibleCenter: false,
      api: {
        projectTotalApi: 'integration/project/getProjectZs', // 项目总数
        businessSorApi: 'integration/project/getProjectBussiness', // 业务分类
        mapApi: 'integration/project/listDiTu', // 地图
        moreApi: 'integration/project/getOver90Projects', // 超期90天
        monthAddApi: 'integration/project/getMonthCreateProjects' // 每月新增
      }
    }
  },
  created () {
    this.getProjectTotalData(this.api.projectTotalApi, 'project')
    this.getProjectTotalData(this.api.businessSorApi, 'sort')
    this.getProjectTotalData(this.api.monthAddApi, 'add')
    this.getMapData()
    this.getMoreData()
  },
  methods: {
    getProjectTotalData (url, str) {
      this.$http({
        url: url
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          if (str === 'project') {
            const { projectTotal, paramslist } = data
            paramslist && paramslist.map((i, index) => {
              i.color = this.projectColor[index]
            })
            this.projectTotal = projectTotal
            this.paramslist = paramslist
          } else if (str === 'sort') {
            const { businessTotal, businessSortList } = data
            businessSortList && businessSortList.map((i, index) => {
              i.color = this.projectColor[index]
            })
            this.businessTotal = businessTotal
            this.businessSortList = businessSortList
          } else {
            const { xAxisData, seriesData } = data
            this.xAxisData = xAxisData
            this.seriesData = seriesData
          }


        } else {
          this.$message.error(msg || '获取数据错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    getMapData () {
      let data = {
        projectAddress: this.searchValue
      }
      let params = this.$api.toQueryString(data)
      this.$http({
        url: this.api.mapApi + params
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          const { center, list } = data
          this.center = center
          this.coordinateList = list
        } else {
          this.$message.error(msg || '获取地图错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    getMoreData () {
      this.$http({
        url: this.api.moreApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          const { over90, list } = data
          let arr = []
          list && list.map(i => {
            arr.push({ ...i, 'devUint': i.constructor })
          })
          this.dataList = arr || []
          this.more90day = over90
        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    // 地图点位点击显示详情
    markHandle (item) {
      Object.keys(item).map(j => {
        this.dataColumns.map(o => {
          if (o.prop === j) {
            console.log(item[j])
            o.value = item[j] || ''
          }
        })
      })
      this.dialogVisibleCenter = true

    },
    morePage (val) {
      console.log(val)
      if (val === '超期90天未竣工') {
        this.dialogVisible = true
        this.title = val
      } else {
        this.$message.error('暂未开放该模块')

      }

    },
    closeDialog () {
      this.dialogVisible = false
    },
    closeDialogCenter () {
      this.dialogVisibleCenter = false
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
    .map-input {
      position: absolute;
      right: 50px;
      top: 10px;
      width: 12rem;
    }
    .el-icon-search {
      position: absolute;
      top: 50%;
      right: 10%;
      transform: translateY(-50%);
      font-size: 20px;
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
      justify-content: flex-start;
      flex-wrap: wrap;
      overflow: hidden;
      height: 30%;
      .item {
        width: 7.8rem;
        padding: 0.2rem 0.2rem 0.4rem 0.2rem;
        text-align: center;
        cursor: pointer;
        margin: 0.25rem;
        background-color: #0b1771;
        border-radius: 0.3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1rem;
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
          margin-left: 0.1rem;
          .margin {
            // width: 2.5rem;
            transform: scale(0.9);
            // text-align: left;
            margin-left: 0.4rem;
          }
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
/deep/ .be-ishead-content {
  height: calc(100% - 5.5rem);
}
</style>