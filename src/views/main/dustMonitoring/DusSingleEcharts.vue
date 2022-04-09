<template>
  <!--单设备统计 -->
  <TableForm
    :loading="dataLoading"
    :data-list="dataList"
    :columns="columns"
    :is-table="tabsType === 'table'"
    :cur-btn-id="echartsType"
    @buttonClick="buttonClick"
    :tform-head="tformHead"
  >
    <el-form
      :inline="true"
      slot="headform"
      size="medium"
      :model="dataForm"
      class="demo-form-inline"
    >
      <el-form-item label="行政区域：">
        <el-select
          v-model="dataForm.area"
          clearable
          placeholder="请选择"
          @change="areaChange"
        >
          <el-option
            v-for="item in dictOptions.areaList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监测站点：">
        <el-select
          v-model="dataForm.monitoringSourceId"
          placeholder="请选择"
          @change="getDataList"
        >
          <el-option
            v-for="item in dictOptions.jczdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="时间："
        label-width="5rem"
      >
        <el-date-picker
          v-model="dataForm.date"
          type="daterange"
          align="right"
          unlink-panels
          clearable
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="getDataList"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="类型："
        label-width="5rem"
      >
        <el-select
          v-model="dataForm.type"
          @change="typeChange"
        >
          <el-option
            v-for="item in dictOptions.typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="参数类型："
        style="width: 100%;"
      >
        <el-checkbox-group
          v-model="dataForm.paramTypes"
          @change="getDataList"
        >
          <el-checkbox
            :label="item.prop"
            v-for="item in dictOptions.paramTypesList"
            :key="item.prop"
          >{{ item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据图表：">
        <div class="tabs-button">
          <div
            v-for="item in dictOptions.tabsTypes"
            :key="item.id"
            class="tabs-button-item"
            :class="item.id === tabsType && 'tabs-button-active'"
            @click="tabsClick(item.id)"
          >{{ item.name }}</div>
        </div>
      </el-form-item>
    </el-form>

    <MultilineChart
      v-if="tabsType !== 'table'"
      :seriesData='seriesDatas'
      :xAxisData='xAxisDatas'
    />
  </TableForm>
</template>

<script>
import TableForm from '_vie/common/TableForm'
import MultilineChart from './components/MultilineChart'

export default {
  name: 'DusSingleEcharts',
  components: {
    TableForm,
    MultilineChart
  },
  data () {
    return {
      // 字典数据
      dictOptions: {
        // 行政区域
        areaList: [],
        // 监测站点
        jczdList: [],
        // 类型
        typeList: [{ id: 'zt', name: '昨天数据' }, { id: 'jqt', name: '近七天数据' }, { id: 'dy', name: '当月数据' }, { id: 'dn', name: '当年数据' }],
        // 参数类型
        paramTypesList: [],
        // 数据图表
        tabsTypes: [
          { id: 'echart', name: '图形' },
          { id: 'table', name: '表格' }
        ]
      },
      // 查询表单
      dataForm: {
        area: 'xz-1',
        date: [],
        paramTypes: ['wd'],
        monitoringSourceId: '',
        type: 'zt'
      },
      // 加载
      dataLoading: false,
      // 表格数据---echart原始数据
      dataList: [{ jcd: 21, sj: 15, wd: 24343, qy: 3534 }],
      columns: [],
      // echarts的参数类型
      echartsType: '',
      // 时间快捷选项
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 展示数据类型 图形和表格切换
      tabsType: '',
      // ehcart----数据
      // x轴
      xAxisDatas: [],
      // 数据
      seriesDatas: [],
      api: {
        dataListApi: 'integration//dustMonitoringSource/deviceData/one/chart',
        tableListApi: 'integration/dustMonitoringSource/deviceData/one/table', // 列表
        exportExcelApi: 'integration/dustMonitoringSource/deviceData/one/export'
      }
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      let item = this.dictOptions.jczdList.find(i => i.id === this.dataForm.monitoringSourceId) || { name: '' }
      let info = {
        title: item.name,
        small: (this.dataForm.date.length > 0 ? `${this.dataForm.date[0]}-${this.dataForm.date[1]}` : '') + '（分钟数据）'
      }
      if (this.tabsType === 'table') {
        info.btnType = 'elbtn'
        info.btnList = [{ id: 'export', name: '导出Excel', type: 'primary', size: 'medium' }]
      }
      return info
    },
    currentRoute () {
      let router = this.$route.path.slice(16)
      if (router === 'DusIndex') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.tabsClick(this.dictOptions.tabsTypes[0].id)
    this.dataForm.date = this.$format.getTwodaysDate()
  },
  mounted () {
    this.initDict()
  },
  methods: {
    // 点击回调-当前组件只有导出
    buttonClick () {
      if (this.tabsType === 'table') {
        // 表格按钮点击回调--导出表格
        let params = this.getTimeParams()
        this.$api.downloadBlob(this.api.exportExcelApi, params, '单设备统计', function (data) {
          console.log(data)
        })
      }
    },
    // 设置展示类型
    tabsClick (id) {
      this.tabsType = id
    },
    // 行政区域改变
    areaChange (val) {
      const isJczd = this.dictOptions.areaList.find(item => item.id === val)
      if (isJczd) this.dictOptions.jczdList = isJczd.children || []
      if (isJczd.children && isJczd.children.length > 0) {
        this.dataForm.monitoringSourceId = isJczd.children[0].id
        this.getDataList()
      }
    },
    // 获取表格和统计数据
    getDataList () {
      this.dataLoading = true
      let params = this.getTimeParams()
      this.$http({
        url: this.api.dataListApi,
        method: 'post',
        data: params
      }).then(res => {
        this.dataLoading = false
        const { data, code, msg } = res.data
        if (code === 200) {
          // 图表数据
          if (data) {
            const { columns, seriesdata, xaxisdata } = data
            let arr = columns.map(i => {
              i.key = i.KEY
              return i
            })
            this.columns = [{ prop: 'dataTime', name: '时间', key: 0 }, ...arr]
            this.seriesDatas = seriesdata || []
            this.xAxisDatas = xaxisdata || []
          }
          this.getTableData()
        } else {
          this.$message.error(msg || '获取统计数据失败！')
          this.dataList = []
          this.seriesDatas = []
          this.xAxisDatas = []
        }
      }, (err) => {
        this.dataLoading = false
        this.$message.error(err.data.msg || '获取统计数据失败！')
        this.dataList = []
        this.seriesDatas = []
        this.xAxisDatas = []
      })
    },
    getTableData () {
      this.dataLoading = true
      let params = this.getTimeParams()
      this.$http({
        url: this.api.tableListApi,
        method: 'post',
        data: params
      }).then(res => {
        console.log(res.data)
        this.dataLoading = false
        const { data, code, msg } = res.data
        if (code === 200) {
          this.dataList = data || []
        } else {
          this.$message.error(msg || '获取数据失败！')
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error('获取数据失败！')
      })
    },
    // 事件类型改变
    typeChange (value) {
      let res
      if (value === 'zt') {
        res = this.$format.getTwodaysDate()
      } else if (value === 'jqt') {
        res = this.$format.getDefaultWorkDatetime()
      } else if (value === 'dy') {
        res = this.$format.getMonthStartDatetime()
      } else {
        res = this.$format.getYearStartDatetime()
      }
      this.dataForm.date = res
      this.getDataList()
    },
    initDict () {
      // 行政区域数据
      this.dictOptions.areaList = JSON.parse(sessionStorage.getItem('areaList')) || []
      this.dataForm.area = this.dictOptions.areaList[0].id || ''
      // 参数类型数据
      let data = JSON.parse(sessionStorage.getItem('paramTypesList'))
      if (!this.currentRoute) {
        this.dictOptions.paramTypesList = [data.find(i => i.name === '噪声')] || []
      } else {
        this.dictOptions.paramTypesList = data || []
      }
      if (this.dictOptions.paramTypesList.length > 0) {
        this.dataForm.paramTypes = [this.dictOptions.paramTypesList[0].prop] || []
      }
      // 将检测站点和行政区域处理成树结构
      let stations = this.$store.state.global.dusDicts.station || []
      this.dictOptions.areaList.map(item => {
        const list = stations.filter(s => s.areaId === item.id)
        item.children = list
      })
      const tree = this.dictOptions.areaList
      // 默认监测站点数据
      this.dictOptions.jczdList = tree[0].children || []
      if (tree[0].children && tree[0].children.length > 0) {
        this.dataForm.monitoringSourceId = tree[0].children[0].id
      }
      this.getDataList()
    },
    getTimeParams () {
      const params = this._cloneDeep(this.dataForm)
      params.dateStart = params.date[0]
      params.dateEnd = params.date[1]
      return params
    }
  }
}
</script>
<style scoped lang="less">
</style>