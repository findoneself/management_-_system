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
      <TableForm
        :loading="dataLoading"
        :tform-head="{isTableHead: false}"
        :data-list="dataList"
        :columns="columns"
        :operObj="operObj"
      >
        <el-form
          :inline="true"
          slot="headform"
          size="small"
          :model="dataForm"
          label-width="7rem"
        >
          <template v-if="dialogTitle === '分类排名'">
            <el-form-item
              label="项目名称："
              key="xmmc"
              label-width="5.2rem"
            >
              <el-input
                placeholder="输入点位名称搜索"
                v-model="dataForm.projectName"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="报警类型："
              key="bjlx"
            >
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
            <el-form-item
              label="进场时间："
              key="jcsj"
            >
              <el-date-picker
                v-model="dataForm.startTime"
                type="date"
                clearable
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="出场时间："
              key="ccsj"
            >
              <el-date-picker
                v-model="dataForm.endTime"
                type="date"
                clearable
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </template>
          <template v-else-if="dialogTitle === '报警记录'">
            <el-form-item
              label="分组名称："
              key="fzmc"
              label-width="5.2rem"
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
            <el-form-item
              label="异常类型："
              key="yclx"
            >
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
            <el-form-item
              label="点位名称："
              key="dwmc"
            >
              <el-input
                placeholder="输入点位名称搜索"
                v-model="dataForm.projectName"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="开始时间："
              key="kssj"
            >
              <el-date-picker
                v-model="dataForm.startTime"
                clearable
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="结束时间："
              key="jssj"
            >
              <el-date-picker
                v-model="dataForm.endTime"
                clearable
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button
              type="primary"
              @click="getTableData"
            >查询</el-button>
            <el-button @click="refreshClick">重置</el-button>
          </el-form-item>
        </el-form>
        <el-pagination
          slot="pagination"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageIndex"
          :page-size="queryInfo.pageSize"
          layout="prev, pager, next, total, jumper"
          :total="total"
        >
        </el-pagination>
      </TableForm>
    </BeautifulWrapper>
    <BeImage ref="imageRef" />
  </BeDialog>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeDialog from '_com/common/BeDialog'
import BeImage from '_com/common/BeImage'
import TableForm from '_vie/common/TableForm'

export default {
  name: 'TableDialog',
  components: {
    BeautifulWrapper,
    BeDialog,
    TableForm,
    BeImage
  },
  data () {
    return {
      // 所有字典数据
      dicts: this.$store.state.global.dictData,
      // 字典数据
      dictOptions: {
        // 分组数据
        groupTypes: [],
        // 报警类型
        warnTypes: [],
        // 异常类型
        alertTypes: []
      },
      // 查询参数
      queryInfo: {
        pageIndex: 1,
        pageSize: 3,
        order: 'desc',
        sidx: 'startTime'
      },
      // 数据总数
      total: 0,
      // 弹窗标题
      dialogTitle: '',
      // loading加载
      dataLoading: false,
      // 表格数据
      dataList: [],
      // 表头
      columns: [],
      // 表单数据
      dataForm: {
        // 点位/项目名称
        projectName: '',
        // 报警类型
        warnType: '',
        // 分组名称
        groupName: '',
        // 异常类型
        alertType: '',
        // 开始时间/进场时间
        startTime: '',
        // 结束时间/出场时间
        endTime: ''
      },
      // 分类排名操作栏
      operObj: {
        isOperation: true,
        headName: '报警截图',
        operButton: [
          {
            text: '查看',
            click: this.imgClick
          }
        ]
      }
    }
  },
  created () {
    // 设置默认日期
    // const now = this.$format.getSysDateString()
    // this.dataForm.startTime = now
    // this.dataForm.endTime = now
  },
  methods: {
    // 初始数据
    init (title) {
      this.dialogTitle = title
      // 初始化列表信息
      if (title === '报警记录') {
        this.operObj.isOperation = true
        this.columns = [
          { name: '分组名称', prop: 'groupName', key: 1 },
          { name: '点位名称', prop: 'projectName', tooltip: true, key: 2 },
          { name: '异常类型', prop: 'alertType', key: 3 },
          { name: '时间', prop: 'startTime', key: 4 }
        ]
      } else {
        this.operObj.isOperation = false
        this.columns = [
          { name: '序号', prop: 'id', key: 1 },
          { name: '项目名称', prop: 'projectName', tooltip: true, key: 2 },
          { name: '报警次数', prop: 'num', key: 3 }
        ]
      }
      // 初始化字典
      if (this.dicts.warnType && this.dicts.warnType.length > 0) {
        this.dictOptions.warnTypes = this.dicts.warnType
      }
      if (this.dicts.alertType && this.dicts.alertType.length > 0) {
        this.dictOptions.alertTypes = this.dicts.alertType
      }
      if (this.dicts.groupType && this.dicts.groupType.length > 0) {
        this.dictOptions.groupTypes = this.dicts.groupType
      }
    },
    // 打开弹窗
    open (title = '') {
      this.$refs.dialog.showDialog(true)
      this.init(title)
      this.getTableData()
    },
    // 关闭弹窗
    closeClick () {
      this.$refs.dialog.showDialog(false)
    },
    // 重置表单
    refreshClick () {
      this.dataForm = {
        projectName: '',
        warnType: '',
        groupName: '',
        alertType: '',
        startTime: '',
        endTime: ''
      }
    },
    // 关闭回调事件
    onCancel () {
      this.refreshClick()
      this.dataList = []
      this.$emit('onCancel')
    },
    // 图片点击
    imgClick (item, e) {
      console.log(item)
      console.log(e)
      this.$refs.imageRef.showImg(e, item)
    },
    // 页码改变
    handleCurrentChange (val) {
      this.queryInfo.pageIndex = val
      this.getTableData()
    },
    // 获取表格数据
    getTableData () {
      // ---获取报警历史统计数据
      this.dataLoading = true
      // 参数处理
      let params = this._cloneDeep(this.queryInfo)
      let url = ''
      let errmsg = ''
      if (this.dialogTitle === '报警记录') {
        url = '/aixb/getBjjlData'
        errmsg = '获取报警记录数据失败！'
        params.projectName = this.dataForm.projectName
        params.groupName = this.dataForm.groupName
        params.alertType = this.dataForm.alertType
        params.startTime = this.dataForm.startTime
        params.endTime = this.dataForm.endTime
      } else if (this.dialogTitle === '分类排名') {
        url = '/aixb/getFlpmData'
        errmsg = '获取分类排名数据失败！'
        params.projectName = this.dataForm.projectName
        params.warnType = this.dataForm.warnType
        params.startTime = this.dataForm.startTime
        params.endTime = this.dataForm.endTime
        params.sidx = 'num'
      }
      console.log(params)
      this.$http({
        url: url,
        data: params
      }).then(res => {
        this.dataLoading = false
        if (res.code === 200) {
          this.dataList = res.data.list
          this.total = res.data.total
          console.log(res)
        } else {
          this.$message.error(errmsg)
          this.total = 0
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error(errmsg)
        const list = [
          { id: 'geewew', groupName: '分组1', projectName: '防空雷达技术反馈', alertType: '反光衣', startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'gwg', groupName: '分组2', projectName: '防空雷达技术反馈', alertType: '行人闯入', startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'geewhwwew', groupName: '分组1', projectName: '防空雷达技术反馈', alertType: '打电话', startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'geegsdwew', groupName: '分组1', projectName: '防空雷达技术反馈', alertType: '抽烟', startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'geegeewew', groupName: '分组2', projectName: '防空雷达技术反馈', alertType: '反光衣', startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geejwew', groupName: '分组1', projectName: '防空雷达技术反馈', alertType: '行人闯入', startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geeerwew', groupName: '分组2', projectName: '防空雷达技术反馈', alertType: '打电话', startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geesjjwew', groupName: '分组1', projectName: '防空雷达技术反馈', alertType: '抽烟', startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geejjjwew', groupName: '分组2', projectName: '防空雷达技术反馈', alertType: '反光衣', startTime: '2022-03-04', endTime: '2022-03-011' }
        ]
        const list2 = [
          { id: 'geewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'gwg', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'geewhwwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'geegsdwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
          { id: 'geegeewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geejwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geeerwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geesjjwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
          { id: 'geejjjwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
        ]
        // 保存当前处理完成的数据
        this.total = this.dialogTitle === '报警记录' ? list.length : list2.length
        this.dataList = this.dialogTitle === '报警记录' ? list : list2
      })
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