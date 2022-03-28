<template>
  <BeDialog
    ref="dialog"
    @onCancel="onCancel"
  >
    <BeautifulWrapper
      is-title
      :title="dialogTitle"
      :border-icon="['close']"
      :wraStyle="{outPadding: '0px'}"
      @closeClick="closeClick"
    >
      <template v-if="dialogTitle === '报警记录'">
        <TableForm
          :loading="dataLoading"
          :tform-head="{isTableHead: false}"
          :data-list="dataList"
          :columns="warnColumns"
        >
          <el-form
            :inline="true"
            slot="headform"
            size="small"
            :model="dataForm"
            label-width="7rem"
          >
            <el-form-item
              label="项目名称："
              label-width="auto"
            >
              <el-input
                placeholder="输入点位名称搜索"
                v-model="dataForm.projectName"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="报警类型：">
              <el-select
                v-model="dataForm.warnType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dictOptions.warnTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进场时间：">
              <el-date-picker
                v-model="dataForm.jcDate"
                type="date"
                clearable
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="出场时间：">
              <el-date-picker
                v-model="dataForm.ccDate"
                type="date"
                clearable
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="searchClick"
              >查询</el-button>
              <el-button @click="refreshClick">重置</el-button>
            </el-form-item>
          </el-form>
        </TableForm>
      </template>
      <template v-else-if="dialogTitle === '项目报警'">
        <TableForm
          :loading="dataLoading"
          :tform-head="{isTableHead: false}"
          :data-list="dataList"
          :columns="proColumns"
        >
          <el-form
            :inline="true"
            slot="headform"
            size="small"
            :model="dataForm"
            label-width="7rem"
          >
            <el-form-item
              label="分组名称："
              label-width="auto"
            >
              <el-select
                v-model="dataForm.groupName"
                clearable
                placeholder="分组名称"
              >
                <el-option
                  v-for="item in dictOptions.groupTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="异常类型：">
              <el-select
                v-model="dataForm.alertType"
                clearable
              >
                <el-option
                  v-for="item in dictOptions.alertTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="点位名称：">
              <el-input
                placeholder="输入点位名称搜索"
                v-model="dataForm.projectName"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="dataForm.startTime"
                clearable
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="出场时间：">
              <el-date-picker
                v-model="dataForm.endTime"
                clearable
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="searchClick"
              >查询</el-button>
              <el-button @click="refreshClick">重置</el-button>
            </el-form-item>
          </el-form>
        </TableForm>
      </template>
    </BeautifulWrapper>
  </BeDialog>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeDialog from '_com/common/BeDialog'
import TableForm from '_vie/common/TableForm'

export default {
  name: 'TableDIalog',
  components: {
    BeautifulWrapper,
    BeDialog,
    TableForm
  },
  data () {
    return {
      // 字典数据
      dictOptions: {
        // 分组数据
        groupTypes: [],
        // 报警类型
        warnTypes: [],
        // 异常类型
        alertTypes: []
      },
      // 弹窗标题
      dialogTitle: '',
      // loading加载
      dataLoading: false,
      // 表格数据
      dataList: [],
      // 报警记录表头
      warnColumns: [
        { name: '监测点', prop: 'jcd', key: 4 },
        { name: '时间', prop: 'sj', tooltip: true, key: 2 },
        { name: '温度', prop: 'wd', key: 3 }
      ],
      // 项目报警表头
      proColumns: [],
      // 表单数据
      dataForm: {
        // 点位/项目名称
        projectName: '',
        // 报警类型
        warnType: '',
        // 进场时间
        jcDate: '',
        // 出场时间
        ccDate: '',
        // 分组名称
        groupName: '',
        // 异常类型
        alertType: '',
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: ''
      }
    }
  },
  created () {
    this.initDict()
    // 设置默认日期
    // const now = this.$format.getSysDateString()
    // this.dataForm.jcDate = now
    // this.dataForm.ccDate = now
    // this.dataForm.startTime = now
    // this.dataForm.endTime = now
  },
  methods: {
    // 初始化字典数据
    initDict () {
      const dict = this.$store.state.global.dictData
      if (dict.warnType && dict.warnType.length > 0) {
        this.dictOptions.warnTypes = dict.warnType
      }
      if (dict.alertType && dict.alertType.length > 0) {
        this.dictOptions.alertTypes = dict.alertType
      }
      if (dict.groupType && dict.groupType.length > 0) {
        this.dictOptions.groupTypes = dict.groupType
      }
    },
    // 打开弹窗
    open (title = '') {
      this.dialogTitle = title
      this.$refs.dialog.showDialog(true)
    },
    // 关闭弹窗
    closeClick () {
      this.$refs.dialog.showDialog(false)
    },
    // 关闭回调事件
    onCancel () {
      this.$emit('onCancel')
    },
    // 获取表格数据
    getTableData () {

    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
.el-select,
.el-input {
  width: 180px;
}
</style>