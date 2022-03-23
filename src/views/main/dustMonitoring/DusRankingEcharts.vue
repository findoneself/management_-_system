<template>
  <!--排名统计 -->
  <TableForm
    :loading="dataLoading"
    stripe
    is-clear-border
    :data-list="dataList"
    :columns="columns"
    :index-obj="{isIndex: false}"
    :oper-obj="rankOperList"
    :is-table="tabsType === 'table'"
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
        <el-select v-model="dataForm.order">
          <el-option
            v-for="item in dictOptions.orderList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数类型：">
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
    <div
      class="echart-tab"
      v-show="tabsType === 'echart'"
    >
      <BeEchartBar
        :show-title="false"
        :xAxis="echartXAxis"
        :series="echartSeries"
      />
    </div>
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
          { id: 'desc', name: '降序' },
          { id: 'asc', name: '升序' }
        ],
        // 参数类型
        paramTypes: [],
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
        order: 'asc',
        paramType: 'wd'
      },
      // 展示数据类型
      tabsType: 'echart',
      // 表格表头
      columns: [
        { name: '监测点', prop: 'jcd', key: 4 },
        { name: '时间', prop: 'sj', tooltip: true, key: 2 },
        { name: '温度', prop: 'wd', key: 3 }
      ],
      // 表格数据---echart原始数据
      dataList: [],
      // 操作按钮
      rankOperList: {
        isOperation: false,
        width: 270,
        operButton: [
          {
            text: '修改',
            click: this.updateClick
          },
          {
            text: '详情',
            click: this.orderDetailClick
          }, {
            text: '删除',
            click: this.removeClick
          }, {
            text: '下载附件',
            click: this.orderDetailClick
          }, {
            text: '短信提醒',
            click: this.noteClick
          }
        ]
      },
      // ehcart----数据
      // x轴
      echartXAxis: [],
      // 数据
      echartSeries: []
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = { title: '温度', small: '2022-3-01 ( 小时数据 ）' }
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
    }
  },
  created () {
    this.initDict()
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    // 初始化字典数据
    initDict () {
      const dict = this.$store.state.global.dictData
      if (dict.paramsType && dict.paramsType.length > 0) {
        this.dictOptions.paramTypes = dict.paramsType
        this.dataForm.paramType = dict.paramsType[0].id
      }
      if (dict.xzarea && dict.xzarea.length > 0) {
        this.dictOptions.areaList = dict.xzarea
        this.dataForm.area = dict.xzarea[0].id
      }
    },
    // 设置展示类型
    tabsClick (id) {
      this.tabsType = id
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
      }, (err) => {
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
          { id: '11', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' }
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
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              'normal': {
                'color': 'rgba(255,144,128,1)',
                'label': {
                  'show': true,
                  'textStyle': {
                    'color': '#fff'
                  },
                  'position': 'inside',
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
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .tform-contnent {
  height: calc(100% - 178px);
}
</style>