<template>
  <!-- 预警管控首页 -->
  <BeautifulWrapper
    :isMenuTab='false'
    :borderIcon='borderIcon'
    :wraStyle='wraStyle'
    class="waning_list"
  >
    <BeautifulCard
      :isTriangle="false"
      :title="item.title"
      class="waning_item"
      v-for="(item) in carDataList"
      :key='item.key'
    >
      <div class="button_list">
        <el-button
          @click="moreClick(item)"
          type="primary"
        >更多</el-button>
        <div v-if="item.key=='ycscyj'">
          <el-select
            v-model="dustForm.paramType"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'pm')"
          >
            <el-option
              v-for="item in paramTypesList"
              :key="item.prop"
              :label="item.name"
              :value="item.prop"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="dustForm.dateList"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            :clearable="false"
            @change="getMapData(api.dustApi,item.key)"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div v-if="item.key=='zssbyj'">
          <el-date-picker
            v-model="noiseForm.dateList"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            :clearable="false"
            @change="getMapData(api.noiseApi,item.key)"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div v-if="item.key=='clcxsbyj'">
          <el-select
            v-model="carForm.date"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'date')"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="item.key=='aisbyj'">
          <el-select
            v-model="AiForm.alertType"
            clearable
            placeholder="请选择"
            @change="getMapData(api.AiApi,item.key)"
          >
            <el-option
              v-for="item in alertTypes"
              :key="item.task_key"
              :label="item.name"
              :value="item.task_key"
            ></el-option>
          </el-select>
          <!-- <el-form-item label="时间：">  @change="getMapData"-->
          <el-date-picker
            v-model="AiForm.dateList"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            :clearable="false"
            @change="getMapData(api.AiApi,item.key)"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <!-- <el-select
            v-model="AiForm.pm"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'pm')"
          >
            <el-option
              v-for="item in paramTypesList"
              :key="item.prop"
              :label="item.name"
              :value="item.prop"
            ></el-option>
          </el-select> -->
        </div>
        <div v-if="item.key=='zgsbcqyj'">
          <el-select
            v-model="projectForm.zgtype"
            clearable
            placeholder="请选择"
            @change="getMapData(api.zgtypeData,item.key)"
          >
            <el-option
              v-for="item in zgtypeList"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-date-picker
            v-model="projectForm.dateList"
            type="daterange"
            size="small"
            value-format="yyyy-MM-dd"
            :clearable="false"
            @change="getMapData(api.projectApi,item.key)"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker> -->
        </div>
      </div>
      <MonitorBar
        :color='item.color'
        :id='item.key'
        :xAxisData='item.xAxisData'
        :seriesData='item.seriesData'
      />
    </BeautifulCard>
    <TableDialog ref="moreDialog" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import MonitorBar from './components/MonitorBar.vue'
import TableDialog from './components/TableDialog'

export default {
  name: '',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    TableDialog,
    MonitorBar

  },
  data () {
    return {
      borderIcon: ['top', 'right', 'bottom', 'left'],
      wraStyle: { inPadding: '0px' },
      // 今日下拉框
      dataList: [{ name: '今日', id: '3' }, { name: '明日', id: '5' }],
      // pm2.5等参数下拉框
      paramTypesList: [{ name: 'pm2.5', id: 'pmq-1' }, { name: '温度', id: 'wd1' }, { name: '湿度', id: 'sd1' }],
      // 整改下拉框
      zgtypeList: [{ name: '整改分类', id: 'gq-1' }],
      // 安全帽下拉框
      alertTypes: [{ name: '安全帽', id: 'aq-1' }],
      dustForm: {
        dateList: [],
        paramType: ''

      },
      noiseForm: {
        dateList: []
      },
      carForm: {
        date: '今日'
      },
      AiForm: {
        alertType: '',
        dateList: []
      },
      projectForm: {
        zgtype: '',
        dateList: []
      },
      carDataList: [{
        title: '扬尘设备预警',
        key: 'ycscyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 1 },
          { name: '预警分类', prop: 'warnTypeName', key: 2 },
          { name: '数值', prop: 'num', key: 3, width: '13%' }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20, 20, 31, 12],
        color: '#3D73F2'
      }, {
        title: '噪声设备预警',
        key: 'zssbyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 1, isSort: true },
          { name: '数值', prop: 'num', key: 3, isSort: true }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [2, 10, 15, 30, 20, 33, 23],
        color: '#23DBFC'
      },
      //  {
      //   title: '车辆冲洗设备预警',
      //   key: 'clcxsbyj',
      //   columns: [
      //     { name: '日期', prop: 'datetime', key: 2 },
      //     { name: '结果', prop: 'result', key: 3 }
      //   ],
      //   xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
      //   seriesData: [20, 50, 10, 35, 35, 47, 20],
      //   color: '#FFAD2D'
      // },
      {
        title: 'AI设备预警',
        key: 'aisbyj',
        columns: [
          { name: '点位名称', prop: 'cameraName', key: 2, tooltip: 7 },
          { name: '异常类型', prop: 'alertType', key: 3 },
          { name: '时间', prop: 'createdAt', key: 4, tooltip: 10 }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20],
        color: '#CD482E'
      }, {
        title: '整改项目超期预警',
        key: 'zgsbcqyj',
        columns: [
          { name: '整改内容', prop: 'rectificationContent', key: 4, tooltip: 15 },
          { name: '整改结束日期', prop: 'rectificationEndTime', key: 3, tooltip: 10 }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20],
        color: '#9662FF'
      }],
      api: {
        AiApi: 'integration/aicr/camera/alert/list', // Ai统计图
        alertDataApi: 'integration/aicr/algorithm', // AI预警下拉
        paramTypesApi: 'integration/dustMonitoringSource/paramList',
        zgtypeApi: 'integration/rectification/getProjectXl', // 整改分类下拉
        zgtypeData: 'integration/rectification/getXunChaTj' // 整改统计图
      }
    }
  },
  created () {
    const now = this.$format.getTwodaysDate()
    this.AiForm.dateList = [now[0], now[1]]
    this.dustForm.dateList = [now[0], now[1]]
    this.noiseForm.dateList = [now[0], now[1]]
    this.projectForm.dateList = [now[0], now[1]]
    this.getAlertData()
    this.getparamsList()
    this.getzgType()
  },
  methods: {
    // 获取统计图数据
    getMapData (api, key) {
      let params = {}
      if (key === 'aisbyj') {
        const { dateList, alertType } = this.AiForm
        params = {
          startDate: dateList[0],
          endDate: dateList[1],
          orderByCt: 'asc',
          alertType: alertType || '',
          page: 1,
          size: 10
        }
      } else if (key === 'zgsbcqyj') {
        const { zgtype } = this.projectForm
        params = {
          projectName: this.zgtypeList.find(i => i.value === zgtype).lable, // ,
          projectId: zgtype
        }
      }
      let data = this.$api.toQueryString(params)
      this.$http({
        url: api + data
      }).then(res => {
        const { code, msg, data } = res.data
        if (code === 200) {
          let item = this.carDataList.find(i => i.key === key)
          let arr1 = []
          let arr2 = []
          if (key === 'aisbyj') {
            data.rows.map(i => {
              arr1.push(i.name)
              arr2.push(i.count)
            })
          } else if (key === 'zgsbcqyj') {
            console.log(data)
          }


          item.xAxisData = arr1
          item.seriesData = arr2
        } else {
          this.$message.error(msg || '操作失败')
        }
      }, () => {
      })
    },
    moreClick (item = {}) {
      if (item.title === '整改项目超期预警') {
        console.log(123)
        item.title = '整改项目超期'
      }
      this.$refs.moreDialog.open(item)
    },
    pickerHandel (key, val) {
      console.log(key, val)
    },
    getAlertData () {
      this.$http({
        url: this.api.alertDataApi
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          this.alertTypes = data.algoConfig
          // this.AiForm.alertType = data.algoConfig[0].task_key
          this.getMapData(this.api.AiApi, 'aisbyj')
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')
      })
    },
    getparamsList () {
      this.$http({
        url: this.api.paramTypesApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          // if (this.router === 'DusIndex') {
          this.paramTypesList = data
          this.dustForm.paramType = data[0].prop
          // } else {
          // this.dictOptions.paramTypesList = [data.find(i => i.name === '噪声')] || []
          // }
          sessionStorage.setItem('paramTypesList', JSON.stringify(data))
        } else {
          this.$message.error(msg || '获取参数类型数据错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    getzgType () {
      this.$http({
        url: this.api.zgtypeApi
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        console.log(data)
        if (code === 200) {
          this.zgtypeList = data
          this.projectForm.zgtype = data[0].value
          // this.AiForm.alertType = data.algoConfig[0].task_key
          // this.getMapData(this.api.zgtypeData, 'zgsbcqyj')
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')
      })
    }

  }
}
</script>

<style lang="less" scoped>
.waning_list {
  display: flex;
  justify-content: flex-start;
  .waning_item {
    width: 33.33%;
    height: 50%;
    .button_list {
      display: flex;
      justify-content: space-between;
    }
  }
}
button.el-button {
  width: 6rem;
  height: 2.5rem;
  border: none;
  transform: scale(0.8);
}
.waning_item .el-select {
  width: 120px;
  margin-right: -5px;
  padding: 0;
  transform: scale(0.8);
}
.el-range-editor--small.el-input__inner {
  width: 15rem;
  margin-left: 1rem;
}
</style>