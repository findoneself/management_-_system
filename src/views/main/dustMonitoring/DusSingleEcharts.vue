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
          clearable
          placeholder="请选择"
          @change="pickerChange('jkzd')"
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
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="pickerChange"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="类型："
        label-width="5rem"
      >
        <el-select v-model="dataForm.type" @change="typeChange">
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
        <el-checkbox-group v-model="dataForm.paramTypes" @change="pickerChange">
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
     :seriesData ='seriesDatas'
     :xAxisData ='xAxisDatas'/>

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
        typeList: [{id:'zt', name:'昨天数据'}, {id:'jqt', name:'近七天数据'}, {id:'dy', name:'当月数据'}, {id:'dn', name:'当年数据'}],
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
        date: '',
        paramTypes: ['wd'],
        monitoringSourceId: '',
        type: 'zt'
      },
      // 加载
      dataLoading: false,
      // 表格数据---echart原始数据
      dataList: [{ jcd: 21, sj: 15, wd: 24343, qy: 3534 }],
      columns: [
        { name: '湿度', prop: 'jcd', key: 3 },
        { name: '时间', prop: 'sj', tooltip: true, key: 1 },
        { name: '温度', prop: 'wd', key: 2 },
        { name: '气压', prop: 'qy', key: 4 }
      ],
      info:{},
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
      xAxisDatas:['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07', '3.08', '3.09', '3.10', '3.11', '3.12'],
      // 数据
      seriesDatas: [],
      api:{},
      dusindex:false
    }
  },
  created () {
    this.initDict()
    this.dictOptions.areaList = JSON.parse(sessionStorage.getItem('areaList'))||[]
    this.dataForm.area = this.dictOptions.areaList[0].id ||''
     let router = this.$route.path.slice(16)
    if(router==='DusIndex'){
      this.dusindex = true
      this.api = {
        jczdListApi:'/dustMonitoringSource/list/', // 监测站点
        paramTypesApi:'/dustMonitoringSource/paramList', // 参数类型
        dataListApi:'/dustMonitoringSource/deviceData/one' // 列表
      }

    this.getJczdList()
    this.getParamsType()
    this.getDataList()
    }else{
      this.api = {}
    }
    this.tabsClick(this.dictOptions.tabsTypes[0].id)
    this.dataForm.date = this.$format.getTwodaysDate()
  },
  methods: {
    initDict () {
      const dict = this.$store.state.global.dictData
      console.log(dict)
      if (dict.paramsType && dict.paramsType.length > 0) {
        this.dictOptions.paramTypesList = dict.paramsType
        this.dataForm.paramTypes = [dict.paramsType[0].id]
      }
      if (dict.xzarea && dict.xzarea.length > 0) {
        this.dictOptions.areaList = dict.xzarea
        this.dataForm.area = dict.xzarea[0].id
      }
    },
    // 点击回调-当前组件只有导出
    buttonClick () {
      if (this.tabsType === 'table') {
        // 表格按钮点击回调--导出表格

      }
    },
    // 设置展示类型
    tabsClick (id) {
      this.tabsType = id
      if (id === 'echart') {
        // this.echartsType = this.tformHead.btnList[0].id
      }
    },
    // 获取表格和统计数据
    getDataList () {
      this.dataLoading = true
      let {date} = this.dataForm
      this.$http({
        url: this.api.dataListApi,
        method: 'post',
        data:{
          'dateStart': date[0],
          'dateEnd': date[1],
           ...this.dataForm
        }
      }).then(res => {
        this.dataLoading = false
        const {data, status} = res
        console.log(data)
        if (status === 200) {
          const {columns, seriesdata, xaxisdata} = data.data.chart
          let arr = []
          columns.map(i => {
            arr.push({...i, key:i.KEY})
          })
          this.columns = arr
          this.dataList = data.data.table || []
          console.log(this.seriesDatas)
          this.seriesDatas.forEach((i, index) => {
            if (index>=0){
              delete this.seriesDatas[index]
            }
          })
          this.seriesDatas = []
          console.log(this.seriesDatas)
          this.seriesDatas = seriesdata
          this.xAxisDatas = xaxisdata
          console.log(this.seriesDatas)
        } else {
          this.$message.error('获取统计数据失败！')
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error('获取统计数据失败！')
      })
    },
    // 行政区域变化
    areaChange (){
      this.getJczdList()
      this.getDataList()
    },
    pickerChange (value){
      if(value === 'jkzd'){
      this.getInfo()
      }
      this.getDataList()
    },
    // 检测站点
    getJczdList (){
      this.$http({
        url: this.api.jczdListApi+this.dataForm.area,
         method:'post'
      }).then(res => {
        console.log(res)
        const { data, status} = res
        if(status===200){
          this.dictOptions.jczdList = data.data || []
          this.dataForm.monitoringSourceId = this.dictOptions.jczdList[0].id|| ''
          sessionStorage.setItem('jczdList', JSON.stringify(data.data))
          this.getInfo()
          }else{
          this.$message.error('获取行政数据错误')
        }
      })
    },
    // 参数
    getParamsType (){
      this.$http({
        url: this.api.paramTypesApi
      }).then(res => {
        console.log(res)
        const { data, status} = res
        if(status===200){
          this.dictOptions.paramTypesList = data.data || []
          this.dataForm.paramTypes = [this.dictOptions.paramTypesList[0].prop] || []
          sessionStorage.setItem('paramTypesList', JSON.stringify(data.data))
          this.getDataList()
          }else{
          this.$message.error('获取行政数据错误')
        }
      })
    },
    typeChange (value){
      console.log(value)
      let res
      if(value==='zt'){
        res = this.$format.getTwodaysDate()
      }else if(value==='jqt'){
        res = this.$format.getDefaultWorkDatetime()
      }else if(value==='dy'){
        res = this.$format.getMonthStartDatetime()
      }else{
        res=this.$format.getYearStartDatetime()
      }
      console.log(res)
      this.dataForm.date = res
      this.getDataList()
    },
    getInfo (){
      let item = this.dictOptions.jczdList.find(i => i.id===this.dataForm.monitoringSourceId)
      this.info = { title: item.name, small: '2022-03-01 ( 小时数据 )' }
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = {...this.info}
      if (this.tabsType === 'table') {
        info.btnType = 'elbtn'
        info.btnList = [{ id: 'export', name: '导出Excel', type: 'primary', size: 'medium' }]
      }
       console.log(info)
      return info
    }
  }
}
</script>
<style scoped lang="less">
</style>