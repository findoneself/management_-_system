<template>
  <!--扬尘检测首-地图 -->
  <div class="container">
    <BeautifulCard
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
      />
    </BeautifulCard>
    <MonitoringSpot />
    <div></div>
    <div class="map"></div>
  </div>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import BeautifulTableList from '_com/common/BeautifulTableList'
import MonitoringSpot from './components/MonitoringSpot.vue'
export default {
  name: 'DusMap',
  components: {
    BeautifulCard,
    BeautifulTableList,
    MonitoringSpot

  },
  data () {
    return {
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
        { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' },
        { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' },
        { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' }
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
      }
    }
  },
  methods: {
    iconSearchHandle () {

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
  }
}
</style>