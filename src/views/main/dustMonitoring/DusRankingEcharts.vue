<template>
  <!--排名统计 -->
  <TableForm
    :loading="dataLoading"
    height="30rem"
    stripe
    is-clear-border
    :dataList="dataList"
    :columns="columns"
    :index-obj="{isIndex: false}"
    :oper-obj="{isOperation: false}"
    :is-table="tabsType === 'table'"
  >
    <el-form
      :inline="true"
      slot="tformheader"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="行政区域：">
        <el-select
          v-model="dataForm.xzqy"
          placeholder="行政区域"
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
        label="时间："
        label-width="5rem"
      >
        <el-date-picker
          v-model="dataForm.date"
          type="daterange"
          align="right"
          unlink-panels
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
        <div
          v-for="item in dictOptions.tabsTypes"
          :key="item.id"
          class="tabs-button"
          @click="tabsClick(item.id)"
        >{{ item.name }}</div>
      </el-form-item>
    </el-form>
    <div
      class="echart-tab"
      v-show="tabsType === 'echart'"
    >
      echart
    </div>
  </TableForm>
</template>

<script>
import TableForm from '_vie/common/TableForm'
export default {
  name: 'DusRankingEcharts',
  components: {
    TableForm
  },
  data () {
    return {
      // 字典数据
      dictOptions: {
        // 行政区域
        xzqyList: [
          { id: 'xz-1', name: '区域1' },
          { id: 'xz-2', name: '区域2' },
          { id: 'xz-3', name: '区域3' },
          { id: 'xz-4', name: '区域4' }
        ],
        // 排序
        orderList: [
          { id: 'desc', name: '降序' },
          { id: 'asc', name: '升序' }
        ],
        // 参数类型
        paramTypes: [
          { id: 'kz', name: '控制' },
          { id: 'wd', name: '温度' },
          { id: 'sd', name: '湿度' },
          { id: 'qy', name: '气压' },
          { id: 'fs', name: '风速' },
          { id: 'fx', name: '风向' },
          { id: 'pm2.5', name: 'Pm2.5' },
          { id: 'pm10', name: 'Pm10' },
          { id: 'eyht', name: '二氧化氮 ' },
          { id: 'eyhl', name: '二氧化硫' },
          { id: 'yyht', name: '一氧化碳' },
          { id: 'o3', name: 'O3' },
          { id: 'tvoc', name: 'TVOC' },
          { id: 'zy', name: '噪音' },
          { id: 'tsp', name: 'TSP' },
          { id: 'yy', name: '油烟' }
        ],
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
      // 查询表单
      dataForm: {
        xzqy: '',
        date: [],
        order: '',
        paramType: ''
      },
      // 展示数据类型
      tabsType: 'table',
      // 表格表头
      columns: [
        { name: '监测点', prop: 'jcd', key: 1 },
        { name: '时间', prop: 'sj', tooltip: true, key: 2 },
        { name: '温度', prop: 'jcwd', key: 3 }
      ],
      // 表格数据
      dataList: [
        { id: '1', jcd: '云-徐州传染病医院', sj: '2022-03-10 00:00:00', jcwd: '21' },
        { id: '2', jcd: '云-徐州传染病医院', sj: '2022-03-11 00:00:00', jcwd: '12' },
        { id: '3', jcd: '云-徐州传染病医院', sj: '2022-03-12 00:00:00', jcwd: '24' },
        { id: '4', jcd: '云-徐州传染病医院', sj: '2022-03-13 00:00:00', jcwd: '15' },
        { id: '5', jcd: '云-徐州传染病医院', sj: '2022-03-14 00:00:00', jcwd: '21' },
        { id: '6', jcd: '云-徐州传染病医院', sj: '2022-03-15 00:00:00', jcwd: '16' },
        { id: '7', jcd: '云-徐州传染病医院', sj: '2022-03-16 00:00:00', jcwd: '21' },
        { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', jcwd: '20' }
      ]
    }
  },
  methods: {
    // 设置展示类型
    tabsClick (id) {
      this.tabsType = id
    }
  }
}
</script>

<style scoped>
</style>