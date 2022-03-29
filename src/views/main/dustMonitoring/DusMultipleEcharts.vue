<template>
  <!--多设备统计 -->
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
          v-model="dataForm.jcd"
          clearable
          placeholder="请选择"
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
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="类型："
        label-width="5rem"
      >
        <el-select v-model="dataForm.type">
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
        <el-radio-group v-model="dataForm.paramType">
          <el-radio
            :label="item.id"
            v-for="item in dictOptions.paramTypes"
            :key="item.id"
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
    <MultilineChart v-if="tabsType !== 'table'" />
  </TableForm>
</template>

<script>
import TableForm from '_vie/common/TableForm'
import MultilineChart from './components/MultilineChart'
export default {
  name: 'DusMultipleEcharts',
  components: {
    TableForm,
    MultilineChart
  },
  data () {
    return {
      dataLoading: true,
      columns: [{ name: '湿度', prop: 'jcd', key: 3 },
      { name: '时间', prop: 'sj', tooltip: true, key: 1 },
      { name: '温度', prop: 'wd', key: 2 },
      { name: '气压', prop: 'qy', key: 4 }], // 表头
      dataList: [], // 表格

      echartsType: '', // 图表 有两个选项（检测源和项目 仅限于排名统计页面）
      // 查询表单
      dataForm: {
        area: 'xz-1',
        date: ['2022-01-01', '2022-05-02'],
        type: '',
        paramType: 'wd'
      },
      // 字典数据
      dictOptions: {
        // 行政区域
        areaList: [],
        // 排序
        typeList: [],
        // 参数类型
        paramTypes: [],
        jczdList: [{ id: 'jc-1', name: '站点1' }, { id: 'jc-2', name: '站点2' }, { id: 'jc-3', name: '站点3' }, { id: 'jd-4', name: '站点4' }],
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
      tabsType: '', // 当前表格组件内 显示表格还是图表
      // ehcart----数据
      // x轴
      echartXAxis: [],
      // 数据
      echartSeries: []
    }
  },
  created () {
    this.initDict()
    // 设置默认展示类型和默认echart类型
    this.getDataList()
    this.tabsType = this.dictOptions.tabsTypes[0].id
  },
  methods: {
    initDict () {
      const dict = this.$store.state.global.dictData
      console.log(dict)
      if (dict.paramsType && dict.paramsType.length > 0) {
        this.dictOptions.paramTypes = dict.paramsType
        this.dataForm.paramType = [dict.paramsType[0].id]
      }
      if (dict.xzarea && dict.xzarea.length > 0) {
        this.dictOptions.areaList = dict.xzarea
        this.dataForm.area = dict.xzarea[0].id
      }
      // if (dict.jcStation.length > 0) {
      //   (this.dictOptions.jczdList = dict.jcStation)
      //   this.dataForm.jcd = dict.jcStation[0].id
      // }
      if (dict.type && dict.type.length > 0) {
        (this.dictOptions.typeList = dict.type)
        this.dataForm.type = dict.type[0].id
      }

    },
    buttonClick (item) { // 当前页面 只有图表和表格两个选项
      if (this.tabsType === 'table') {
        // 表格按钮点击回调--导出表格
        console.log(item)
      } else {
        console.log(item)
        // 图表按钮点击回调--切换检测源或者项目
        // this.echartsType = item.id
      }
    },
    // 获取表格和统计数据
    getDataList () {
      this.dataLoading = true
      const params = this._cloneDeep(this.dataForm)
      if (params.date.length > 0) {
        params.startTime = params.date[0]
        params.endTime = params.date[1]
        delete params.date
      }
      if (this.echartsType !== '') {
        // echart图表获取数据参数
        params.echartsType = this.echartsType
      }
      this.$http({
        url: 'dusQuery/getDusrankData',
        data: params
      }).then(res => {
        this.dataLoading = false
        if (res.code === 200) {
          this.dataList = res.data.list
          console.log(res)
        } else {
          this.$message.error('获取统计数据失败！')
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error('获取统计数据失败！')
        // 下面逻辑放在正常返回里面
        const list = [
          { id: '1', jcd: '云-徐州传染病医院', sj: '2022-03-10 00:00:00', wd: '21' },
          { id: '2', jcd: '云-徐州传染病医院', sj: '2022-03-11 00:00:00', wd: '12' },
          { id: '3', jcd: '云-徐州传染病医院', sj: '2022-03-12 00:00:00', wd: '24' },
          { id: '4', jcd: '云-徐州传染病医院', sj: '2022-03-13 00:00:00', wd: '15' },
          { id: '5', jcd: '云-徐州传染病医院', sj: '2022-03-14 00:00:00', wd: '21' },
          { id: '6', jcd: '云-徐州传染病医院', sj: '2022-03-15 00:00:00', wd: '16' },
          { id: '7', jcd: '云-徐州传染病医院', sj: '2022-03-16 00:00:00', wd: '21' },
          { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
          { id: '9', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
          { id: '10', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
          { id: '11', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
          { id: '12', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
          { id: '13', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' }
        ]
        this.dataList = list
        let xAxis = []
        let series = []
        list.map(item => {
          xAxis.push(item.jcd)
          series.push(item.wd)
        })
        this.echartXAxis = xAxis
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
            data: series
          }
        ]
      })
      console.log(this.dataLoading)
      this.dataLoading = false
    },
    // 设置展示类型
    tabsClick (id) {
      console.log(id)
      this.tabsType = id
      if (id === 'echart') {
        // this.echartsType = this.tformHead.btnList[0].id
      }
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = { title: '温度', small: '2022-3-01 ( 小时数据 ）' }
      if (this.tabsType === 'table') {
        info.btnType = 'elbtn'
        info.btnList = [{ id: 'export', name: '导出Excel', type: 'primary', size: 'medium' }]
      }
      return info
    }
  }
}


</script>

<style scoped lang="less">
</style>