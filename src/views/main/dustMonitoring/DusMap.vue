<template>
  <!--扬尘检测首-地图 -->
  <div class="container">
    <BeautifulCard
      v-if="activePage==0"
      :title="'监测源'"
      class="map_monitoring_source"
      :isTriangle='false'
      :cardStyle='cardStyle'
    >
      <div>
        <el-form
          :inline="true"
          slot="headform"
          size="medium"
          class="demo-form-inline"
        >
          <el-form-item class="el_form_county">
            <el-select
              v-model="dataForm.xzqy"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in dictOptions.xzqyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="5rem"
            class="el_form_search"
          >
            <el-input
              v-model="dataForm.searchValue"
              placeholder="请输入关键字搜索"
            >
            </el-input>
            <i
              class="el-icon-search"
              @click="iconSearchHandle"
            ></i>
          </el-form-item>
        </el-form>
      </div>
      <BeautifulTableList
        :stripe="true"
        :data-list="dataList"
        :columns="columns"
        :index-obj="{isIndex: false}"
        :operObj='{isOperation: false}'
        cell-height='2rem'
        class="tableList"
      />
    </BeautifulCard>
    <!-- 监测点数据 -->
    <MonitoringSpot
      v-else
      @monitoringSpotBack='monitoringSpotBack'
    />
    <!-- <div @click="changeActivePage">改变</div> -->
    <div class="map">
      <AirQualityMap
        :isMarkHandle='true'
        :coordinateList='coordinateList'
        @markHandle='markHandle'
      />
      <div class="map_title">地图</div>
      <div class="map_switch_box">
        <div class="switch_box">
          <div><span>视频:</span>
            <el-switch
              width="30"
              @change="switchChange('value1')"
              v-model="switch_value1"
            >
            </el-switch>
          </div>
          <div><span>喷淋:</span>
            <el-switch
              width="30"
              @change="switchChange('value2')"
              v-model="switch_value2"
            >
            </el-switch>
          </div>
        </div>
        <div class="colorBox">
          <div
            v-for="item in mapColorList"
            :key="item.color"
            :style="{ backgroundColor: item.color }"
          >{{item.name}}</div>
        </div>
        <div class="map_num_box">
          <div
            v-for="item in mapNumList"
            :key="item"
            class="item"
          >{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import BeautifulTableList from '_com/common/BeautifulTableList'
import MonitoringSpot from './components/MonitoringSpot.vue'
import AirQualityMap from '_com/common//AirQualityMap.vue'
export default {
  name: 'DusMap',
  components: {
    BeautifulCard,
    BeautifulTableList,
    MonitoringSpot,
    AirQualityMap
  },
  data () {
    return {
      activePage: 0,
      dictOptions: {
        // 行政区域
        xzqyList: [
          { id: 'xz-1', name: '区域1' },
          { id: 'xz-2', name: '区域2' },
          { id: 'xz-3', name: '区域3' },
          { id: 'xz-4', name: '区域4' }
        ]
      },
      dataForm: {
        xzqy: 'xz-1',
        searchValue: ''
      },
      cardStyle: { padding: '0px' },
      // 表格表头
      columns: [
        { name: '监测点', prop: 'jcd', key: 4 },
        { name: 'PM2.5', prop: 'jcwd', key: 3 }
      ],
      // 表格数据
      dataList: [
        { id: '1', jcwd: '21', jcd: '云-徐州传染病医院' },
        { id: '2', jcd: '云-徐州传染病医院', sj: '2022-03-11 00:00:00', jcwd: '12' },
        { id: '3', jcd: '云-徐州传染病医院', sj: '2022-03-12 00:00:00', jcwd: '24' },
        { id: '4', jcd: '云-徐州传染病医院', sj: '2022-03-13 00:00:00', jcwd: '15' },
        { id: '5', jcd: '云-徐州传染病医院', sj: '2022-03-14 00:00:00', jcwd: '21' },
        { id: '6', jcd: '云-徐州传染病医院', sj: '2022-03-15 00:00:00', jcwd: '16' },
        { id: '7', jcd: '云-徐州传染病医院', sj: '2022-03-16 00:00:00', jcwd: '21' },
        { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' },
        { id: '9', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' },
        { id: '10', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' },
        { id: '11', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' }
      ],
      // 监测点数据
      monitoringSspotData: {
        title: '云●徐州传染病医院',
        pieData: {},
        detailList: [{ name: '温度', value: '75 ℃' },
        { name: 'pm2.5', value: '62ug/m³' },
        { name: '湿度', value: '15%' },
        { name: 'pm10', value: '21ug/m³' },
        { name: '气压', value: '135' },
        { name: '二氧化氮', value: '254' },
        { name: '风速', value: '23' },
        { name: '二氧化硫', value: '5425' }]
      },
      // 地图标记
      coordinateList: [{ lng: 116.2787, lat: 40.0492, 'pm2.5': 80, color: 'blue' },
      { lng: 116.297047, lat: 39.979542, 'pm2.5': 30, color: 'yellow' },
      { lng: 116.321768, lat: 39.88748, 'pm2.5': 30, color: 'yellow' },
      { lng: 116.494243, lat: 39.956539, 'pm2.5': 10, color: 'green' },
      { lng: 116.594243, lat: 40.01, 'pm2.5': 100, color: 'red' }],
      // 地图右下角的switch 和相关data
      switch_value1: '',
      switch_value2: '',
      mapColorList: [{ name: '优', color: '#30D385' },
      { name: '良', color: '#FFD902' },
      { name: '轻度', color: '#FF9902' },
      { name: '中度', color: '#FF0200' },
      { name: '重度', color: '#990099' },
      { name: '严重', color: '#990000' }],
      mapNumList: [0, 35, 75, 115, 150, 250, 500]
    }
  },
  methods: {
    iconSearchHandle () {
      // 拿到下拉框和输入框的值发起请求 let data = this.dataForm

    },
    monitoringSpotBack () {
      this.activePage = 0
    },
    changeActivePage () {
      this.activePage = 1
    },
    markHandle (e) {
      console.log(e)
      this.activePage = 1
    },
    switchChange (value) {
      if (value === 'value1') {
        // 视频switch
      } else {
        // 喷淋switxh
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100%;
  .map_monitoring_source,
  .map_monitoring_spot {
    width: 25rem;
    height: 100%;
    overflow: hidden;
    .tableList {
      // padding: 0 5px;
    }
    .demo-form-inline {
      display: flex;
      padding: 2rem 0 0 1rem;
      .el_form_county {
        width: 35%;
      }
      .el_form_search {
        position: relative;
        i {
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
    }
  }
  .map {
    flex: 1;
    position: relative;
    .map_title {
      width: 7.5rem;
      height: 3.125rem;
      position: absolute;
      top: 1.25rem;
      left: 1.25rem;
      background-color: #1f70ff;
      text-align: center;
      line-height: 3.125rem;
      font-size: 1.25rem;
      font-weight: 600;
    }
    .map_switch_box {
      position: absolute;
      bottom: 20px;
      right: 20px;

      .switch_box {
        display: flex;
        div {
          margin: 0 0.625rem 0.1rem 0;
          transform: scale(0.9);
          span {
          }
        }
      }
    }

    .colorBox {
      width: 320px;
      height: 2rem;
      display: flex;
      align-items: center;
      border-radius: 1rem;
      div {
        width: 5rem;
        text-align: center;
      }
      div:first-child {
        border-radius: 1rem 0 0 1rem;
      }
      div:last-child {
        border-radius: 0 1rem 1rem 0;
      }
    }

    .map_num_box {
      display: flex;
      div {
        text-align: left;
        transform: scale(0.9);
      }
      div:nth-of-type(1) {
        width: 2.5rem;
      }
      div:nth-of-type(2) {
        width: 3.5rem;
      }
      div:nth-of-type(3) {
        width: 3rem;
      }
      div:nth-of-type(4) {
        width: 3.3rem;
      }
      div:nth-of-type(5) {
        width: 3.5rem;
      }
      div:nth-of-type(6) {
        width: 3.5rem;
      }
    }
  }
}
</style>