<template>
  <!--扬尘检测首-地图 -->
  <div class="container">
    <BeautifulCard
      v-if="activePage==0"
      :title="'监测源'"
      class="map_monitoring_source"
      :isTriangle='false'
      :cardStyle='cardStyle'
      v-loading="loading"
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
              v-model="dataForm.areaId"
              clearable
              placeholder="请选择"
              @change="getDataList"
            >
              <el-option
                v-for="item in dictOptions.areaList"
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
              v-model="dataForm.monitoringSourceName"
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
      >
      </BeautifulTableList>

    </BeautifulCard>
    <!-- 监测点数据 -->
    <MonitoringSpot
      v-else
      @monitoringSpotBack='monitoringSpotBack'
      :monitoringSspotData='monitoringSspotData'
    />
    <div
      class="map"
      v-loading="mapLoading"
    >
      <AirQualityMap
        :center='center'
        :isMarkHandle='true'
        :coordinateList='coordinateList'
        @markHandle='markHandle'
        :mapColorList='mapColorList'
      />
      <div class="map_title">地图</div>
      <div class="map_switch_box">
        <div class="switch_box">
          <div><span>视频:</span>
            <el-switch
              :width="30"
              @change="switchChange('value1')"
              v-model="switch_value1"
            >
            </el-switch>
          </div>
          <div><span>喷淋:</span>
            <el-switch
              :width="30"
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
      loading: true,
      mapLoading: true,
      activePage: 0,
      dictOptions: {
        // 行政区域
        areaList: [
          { id: 'xz-1', name: '区域1' },
          { id: 'xz-2', name: '区域2' },
          { id: 'xz-3', name: '区域3' },
          { id: 'xz-4', name: '区域4' }
        ]
      },
      dataForm: {
        areaId: '',
        monitoringSourceName: ''
      },
      cardStyle: { padding: '0px' },
      // 表格表头
      columns: [
        { name: '监测点', prop: 'name', key: 1, tooltip: 9 },
        { name: 'PM2.5', prop: 'value', key: 2, isSort: true }
      ],
      // 检测源 表格数据
      dataList: [],
      // 监测点数据
      monitoringSspotData: {
        title: '云-徐州传染病医院',
        pieData: {
          title: '监测点数据',
          value: 80,
          name: 'pm2.5',
          unit: '62ug/m³'
        },
        detailList: [{ name: '温度', value: '75 ℃' },
        { name: 'pm2.5', value: '62ug/m³' },
        { name: '湿度', value: '15%' },
        { name: 'pm10', value: '21ug/m³' },
        { name: '气压', value: '135' },
        { name: '二氧化氮', value: '254' },
        { name: '风速', value: '23' },
        { name: '二氧化氮', value: '254' },
        { name: '二氧化硫', value: '5425' }]
      },
      // 地图标记
      coordinateList: [{ lat: 34.701373, lng: 116.596327, status: '2', value: null },
      { lat: 34.691447, lng: 116.66433, value: 130, status: '2' },
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
      center: { lng: 116.413315, lat: 39.927636 },
      // 地图右下角的switch 和相关data
      switch_value1: '',
      switch_value2: '',
      mapNumList: [0, 35, 75, 115, 150, 250, 500],
      api: {
        areaApi: 'integration/area/tree',
        monitoringSourceApi: 'integration/dustMonitoringSource/list',
        paramTypesApi: 'integration/dustMonitoringSource/paramList', // 参数类型
        jczdListApi: 'integration/dustMonitoringSource/listAllArea' // 监测站点
      }
    }
  },
  created () {
    this.getArea()
  },
  mounted () {
    this.$nextTick(() => {
      this.getDictData()
    })
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
      let item = this.dataList.find(i => i.id === e)
      this.monitoringSspotData = item.monitoringSspotData
      console.log(item)
      this.activePage = 1
    },
    switchChange (value) {
      if (value === 'value1') {
        // 视频switch
      } else {
        // 喷淋switch
      }
    },
    // 行政区域
    getArea () {
      this.$http({
        url: this.api.areaApi
      }).then(res => {
        // console.log(res)
        const { data, status } = res
        if (status === 200) {
          this.dictOptions.areaList = data.data || []
          sessionStorage.setItem('areaList', JSON.stringify(data.data))
          this.dataForm.areaId = data.data[0].id
          this.getDataList()
          this.loading = false
        } else {
          this.loading = false
          this.$message.error('获取行政数据错误')
        }
      })
    },
    getDataList () {
      this.$http({
        url: this.api.monitoringSourceApi,
        method: 'post',
        data: this.dataForm
      }).then(res => {
        //  console.log(res)
        const { data, status } = res
        if (status === 200) {
          const { center, list } = data.data
          this.mapLoading = false
          this.center = center
          this.dataList = list
          let coordinateList = []
          list.map(i => {
            coordinateList.push({ ...i.mapLngLat, value: i.value, status: i.status, id: i.id })
          })
          this.coordinateList = coordinateList
        } else {
          this.mapLoading = false
          this.$message.error('获取数据错误')
        }
      })
    },
    // 参数
    getDictData () {
      // 参数类型
      this.$http({
        url: this.api.paramTypesApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          sessionStorage.setItem('paramTypesList', JSON.stringify(data))
        } else {
          this.$message.error(msg || '获取参数类型数据错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
      // 检测站点
      this.$http({
        url: this.api.jczdListApi,
        method: 'post',
        data: { areaIds: [], monitoringSourceName: '' }
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.$store.commit('global/setDusDictData', { type: 'station', list: data })
        } else {
          this.$store.commit('global/setDusDictData', { type: 'station', list: [] })
          this.$message.error(msg || '监测站点获取失败！')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
        this.$store.commit('global/setDusDictData', { type: 'station', list: [] })
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.card-content .tableList .be-head-item {
  color: red;
  position: relative;
}
.tableList {
  position: relative;
  height: calc(100% - 100px);
  .order_sj {
    position: absolute;
    top: 10px;
    right: 10px;
    div {
      width: 5px;
      height: 5px;
      background-color: red;
      // border: transparent transparent 1px transparent;
    }
  }
}

.container {
  display: flex;
  height: 100%;
  .map_monitoring_source,
  .map_monitoring_spot {
    width: 25rem;
    height: 100%;
    overflow: hidden;
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
      font-size: 0.88rem;
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