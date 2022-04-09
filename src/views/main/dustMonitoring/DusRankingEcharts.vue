<template>
  <!--排名统计 -->
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
          placeholder="请选择"
          @change="pinckerChange('area')"
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
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="排序："
        label-width="5rem"
      >
        <el-select
          v-model="dataForm.orderBy"
          @change="pinckerChange"
        >
          <el-option
            v-for="item in dictOptions.orderList"
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
        <el-radio-group
          v-model="dataForm.paramType"
          @change="pinckerChange"
        >
          <el-radio
            :label="item.prop"
            v-for="item in dictOptions.paramTypesList"
            :key="item.prop"
          >{{ item.name}}</el-radio>
        </el-radio-group>
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
    <BeEchartBar
      :show-title="false"
      :options="{xAxis: {axisLabel:{ rotate: 45 }}}"
      :xAxis="echartXAxis"
      :series="echartSeries"
    />
  </TableForm>
</template>

<script>
import TableForm from '_vie/common/TableForm'
import BeEchartBar from '_com/common/BeEchartBar'
export default {
  name: 'DusRankingEcharts',
  components: {
    TableForm,
    BeEchartBar
  },
  data () {
    return {
      // 字典数据
      dictOptions: {
        // 行政区域
        areaList: [],
        // 排序
        orderList: [
          { id: '降序', name: '降序' },
          { id: '升序', name: '升序' }
        ],
        // 参数类型
        paramTypesList: [],
        tabsTypes: [
          { id: 'echart', name: '图形' },
          { id: 'table', name: '表格' }
        ]
      },
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
      // 加载效果
      dataLoading: false,
      // 查询表单
      dataForm: {
        area: 'xz-1',
        date: ['2022-01-01', '2022-05-02'],
        orderBy: '升序',
        paramType: 'wd',
        monitoringSourceIds: []
      },
      // 展示数据类型
      tabsType: '',
      // echarts的参数类型
      echartsType: '',
      // 表格表头
      columns: [
        { name: '监测点', prop: 'monitoringSourceName', key: 4 },
        { name: '时间', prop: 'dataTime', key: 2 },
        { name: '温度', prop: 'paramValue', key: 3 }
      ],
      // 表格数据---echart原始数据
      dataList: [],
      // ehcart----数据
      // x轴
      echartXAxis: [],
      // 数据
      echartSeries: [],
      api: {
        echartsDataApi: 'integration/dustMonitoringSource/deviceData/order/chart',
        exportExcelApi: 'integration/dustMonitoringSource/deviceData/order/export',
        tableListApi: 'integration/dustMonitoringSource/deviceData/order/table'
      }
    }
  },

  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      let params = this.dictOptions.paramTypesList.find(i => i.prop === this.dataForm.paramType)
      let item = this.dictOptions.areaList.find(i => i.id === this.dataForm.area) || { name: '' }
      let info = {
        title: item.name + params.name + '排名',
        small: (this.dataForm.date.length > 0 ? `${this.dataForm.date[0]}-${this.dataForm.date[1]}` : '') + '（分钟数据）'
      }
      if (this.tabsType === 'table') {
        info.btnType = 'elbtn'
        info.btnList = [{ id: 'export', name: '导出Excel', type: 'primary', size: 'medium' }]
      } else if (this.tabsType === 'echart') {
        info.btnType = 'custom'
        info.btnList = [{
          id: 'jcy',
          name: '检测源'
        }, {
          id: 'xm',
          name: '项目'
        }]
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
  watch: {
    dataForm: {
      handler () {
        console.log(this.dictOptions.paramTypesList, this.dataForm.paramType)
        let res = this.dictOptions.paramTypesList.find(i => i.prop === this.dataForm.paramType)
        console.log(res.name)
        this.columns.find(i => i.prop === 'paramValue').name = res.name
        console.log(this.columns[2])
      },
      deep: true
    }
  },
  created () {
    this.initDict()
    // 设置默认展示类型和默认echart类型
    this.tabsClick(this.dictOptions.tabsTypes[0].id)
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 初始化字典数据
    initDict () {
      this.dictOptions.areaList = JSON.parse(sessionStorage.getItem('areaList')) || []
      this.dataForm.area = this.dictOptions.areaList[0].id || ''
      let data = JSON.parse(sessionStorage.getItem('paramTypesList')) || []
      if (!this.currentRoute) {
        this.dictOptions.paramTypesList = [data.find(i => i.name === '噪声')] || []
      } else {
        this.dictOptions.paramTypesList = data || []
      }
      if (this.dictOptions.paramTypesList.length > 0) {
        this.dataForm.paramType = this.dictOptions.paramTypesList[0].prop
      }
      this.getjczdList()
    },
    // 获取表格和统计数据
    getDataList () {
      this.dataLoading = true
      let params = this.getTimeParams()
      this.$http({
        url: this.api.echartsDataApi,
        method: 'post',
        data: params
      }).then(res => {
        this.dataLoading = false
        const { data, code, msg } = res.data
        if (code === 200) {
          if (data) {
            const { dataY, dataX } = data
            // let arr = []
            // columns.map(i => {
            //   arr.push({ ...i, key: i.KEY })
            // })

            // this.columns = [{ prop: 'dataTime', name: '时间', key: 0 }, ...arr]
            this.echartSeries = [
              {
                type: 'bar',
                barMaxWidth: 23,
                barGap: '10%',
                label: {
                  show: true
                },
                itemStyle: {
                  normal: {
                    color: '#486AFF',
                    label: {
                      show: true,
                      textStyle: {
                        color: '#fff'
                      },
                      position: 'top',
                      formatter: function (p) {
                        return p.value > 0 ? (p.value) : ''
                      }
                    }
                  }
                },
                data: dataY
              }
            ]
            this.echartXAxis = dataX
          }
          this.getTableData()
        } else {
          this.$message.error(msg || '获取统计数据失败！')
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error('获取统计数据失败！')
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
    // 设置展示类型
    tabsClick (id) {
      this.tabsType = id
      if (id === 'echart') {
        this.echartsType = this.tformHead.btnList[0].id
      }
    },
    // 点击回调
    buttonClick (item) {
      if (this.tabsType === 'table') {
        // 表格按钮点击回调--导出表格
        let params = this.getTimeParams()
        this.$api.downloadBlob(this.api.exportExcelApi, params, '排名统计', function (data) {
          console.log(data)
        })
      } else {
        // 图表按钮点击回调--切换检测源或者项目
        this.echartsType = item.id
        console.log(item.id)
      }
    },
    getTimeParams () {
      const params = this._cloneDeep(this.dataForm)
      params.dateStart = params.date[0]
      params.dateEnd = params.date[1]
      return params
    },
    pinckerChange (val) {
      if (val === 'area') {
        // 变更监测站点数据
        this.getMonitoringSourceIds()
      }
      this.getDataList()
    },
    getjczdList () {
      // 将检测站点和行政区域处理成树结构
      let stations = this.$store.state.global.dusDicts.station || []
      this.dictOptions.areaList.map(item => {
        const list = stations.filter(s => s.areaId === item.id)
        item.children = list
      })
      this.getMonitoringSourceIds()
    },
    getMonitoringSourceIds () {
      let arr = []
      let list = this.dictOptions.areaList
      let area = this.dataForm.area
      list.map(i => {
        if (i.id === area) {
          i.children.map(i => {
            arr.push(i.id)
          })
        }
      })
      this.dataForm.monitoringSourceIds = arr
      console.log(list, area, arr)
    }
  }
}
</script>

<style scoped lang="less">
</style>