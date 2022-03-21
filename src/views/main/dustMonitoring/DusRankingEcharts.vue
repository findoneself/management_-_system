<template>
  <!--排名统计 -->
  <TableForm>
    <el-form
      :inline="true"
      slot="tformheader"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="行政区域">
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
      <el-form-item label="时间">
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
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >查询</el-button>
      </el-form-item>
    </el-form>
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
        date: []
      }
    }
  }
}
</script>

<style scoped>
</style>