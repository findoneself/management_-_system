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
              label-width="5.4rem"
            >
              <el-input
                placeholder="输入项目名称搜索"
                v-model="dataForm.name"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="报警类型："
              key="bjlx"
            >
              <el-select
                v-model="dataForm.alertType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dictOptions.alertTypes"
                  :key="item.task_key"
                  :label="item.name"
                  :value="item.task_key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="进场时间："
              key="jcsj"
            >
              <el-date-picker
                v-model="dataForm.startDate"
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
                v-model="dataForm.endDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
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
              label-width="5.4rem"
            >
              <el-cascader
                v-model="dataForm.groupName"
                :show-all-levels="false"
                :options="dictOptions.groupTypes"
                size="small"
                :props="{emitPath: false, value: 'groupId', label: 'label'}"
                @change="groupTypeChange"
              ></el-cascader>

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
                  :key="item.task_key"
                  :label="item.name"
                  :value="item.task_key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="点位名称："
              key="dwmc"
            >
              <el-select
                v-model="dataForm.keyword"
                clearable
              >
                <el-option
                  v-for="item in dictOptions.keywordList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="开始时间："
              key="kssj"
            >
              <el-date-picker
                v-model="dataForm.startDate"
                clearable
                @change="comeDate"
                value-format="yyyy-MM-dd HH:mm:ss"
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
                v-model="dataForm.endDate"
                clearable
                value-format="yyyy-MM-dd HH:mm:ss"
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
        <!-- <div
          slot="oper"
          slot-scope="{row}"
        >
          <el-link
            @click="imgClick(row)"
            type='primary'
            :disabled='!row.url'
          >查看</el-link>
        </div> -->
        <el-pagination
          slot="pagination"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageIndex"
          :page-size="queryInfo.size"
          layout="prev, pager, next, total, jumper"
          :total="total"
        >
        </el-pagination>
      </TableForm>
    </BeautifulWrapper>
    <div
      :loading='imgLoading'
      v-if="dialogVisibleImg"
      class="bigImgCenter"
    >
      <i
        class="el-icon-close"
        @click="closeImgClick"
      ></i>
      <img
        width="100%"
        :src="imgSrc"
        class="avatar"
      >
    </div>
    <BeImageFixed ref="imageRef" />
  </BeDialog>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeDialog from '_com/common/BeDialog'
import BeImageFixed from '_com/common/BeImageFixed'
import TableForm from '_vie/common/TableForm'

export default {
  name: 'TableDialog',
  components: {
    BeautifulWrapper,
    BeDialog,
    TableForm,
    BeImageFixed
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
        alertTypes: [],
        // 点位
        keywordList: []
      },
      // 查询参数
      queryInfo: {
        page: 1,
        size: 20,
        order: 'desc'
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
        name: '',
        // 分组名称
        groupName: '',
        // 异常类型
        alertType: '',
        // 开始时间/进场时间
        startDate: '',
        // 结束时间/出场时间
        endDate: '',
        keyword: ''
      },
      // 查看图片
      dialogVisibleImg: false,
      imgSrc: '',
      imgLoading: false,
      // 报警记录操作栏
      operObj: {
        isOperation: true,
        isIndex: false,
        headName: '报警截图',
        operButton: [
          {
            text: '查看',
            click: this.imgClick
          }
        ]
      },

      api: {
        alertDataApi: 'integration/aicr/algorithm', // 异常/报警类型 下拉框
        projectApi: 'integration/aicr/camera/tree', // 分组名称也是点位级联下拉
        dianweiApi: 'integration/aicr/camera/list/'
      }
    }
  },
  created () {
    this.getAlertData()
    this.getprojectData()
    // 设置默认日期

  },
  methods: {
    // 初始数据
    init (title) {
      this.dialogTitle = title
      // 初始化列表信息
      if (title === '报警记录') {
        this.operObj.isOperation = true
        this.operObj.isIndex = false
        this.columns = [
          // { name: '分组名称', prop: 'id', key: 1 },
          { name: '点位名称', prop: 'cameraName', key: 2 },
          { name: '异常类型', prop: 'alertType', key: 3 },
          { name: '时间', prop: 'createdAt', key: 4 }
        ]
      } else {
        this.operObj.isOperation = false
        this.operObj.isIndex = true
        this.columns = [
          { name: '项目名称', prop: 'name', key: 2 },
          { name: '报警次数', prop: 'count', key: 3 }
        ]
      }
      const now = this.$format.getTwodaysDate()
      this.dataForm.startDate = now[0] + ' 00:00:00'
      this.dataForm.endDate = now[1] + ' 23:59:59'
      // 初始化字典
      // if (this.dicts.warnType && this.dicts.warnType.length > 0) {
      //   this.dictOptions.warnTypes = this.dicts.warnType
      // }
      // if (this.dicts.alertType && this.dicts.alertType.length > 0) {
      //   this.dictOptions.alertTypes = this.dicts.alertType
      // }
      // if (this.dicts.groupType && this.dicts.groupType.length > 0) {
      //   this.dictOptions.groupTypes = this.dicts.groupType
      // }
    },
    getprojectData () {
      this.$http({
        url: this.api.projectApi
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          this.dictOptions.groupTypes = data.treeData
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')

      })
    },
    getAlertData () {
      this.$http({
        url: this.api.alertDataApi //  alertDataApi: 'integration/aicr/algorithm',
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          this.dictOptions.alertTypes = data.algoConfig
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')

      })
    },
    groupTypeChange () {
      this.$http({
        url: this.api.dianweiApi + this.dataForm.groupName
      }).then(res => {
        console.log(res)
        const { data, msg, code } = res.data
        if (code === 200) {
          // this.dictOptions.groupTypes = data.treeData
          this.dictOptions.keywordList = data.cameraList
          console.log(res)
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')

      })
    },
    // 打开弹窗
    open (title = '') {
      this.$refs.dialog.showDialog(true)
      this.init(title)
      this.getTableData()
    },
    // 关闭弹窗
    closeClick () {
      this.$refs.imageRef.closeClick()
      this.$refs.dialog.showDialog(false)
    },
    // 重置表单
    refreshClick () {
      const now = this.$format.getTwodaysDate()
      this.dataForm = {
        projectName: '',
        keyword: '',
        groupName: '',
        alertType: '',
        startDate: now[0] + ' 00:00:00',
        endDate: now[1] + ' 23:59:59'
      }
      this.getTableData()
    },
    // 关闭回调事件
    onCancel () {
      this.refreshClick()
      this.dataList = []
      // this.$emit('onCancel')
    },
    // 图片点击
    imgClick (item) {
      this.imgSrc = item.url
      this.dialogVisibleImg = true
      // this.$refs.imageRef.showImg(e, item)
    },
    closeImgClick () {
      this.dialogVisibleImg = false
    },
    // 页码改变
    handleCurrentChange (val) {
      this.queryInfo.page = val
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
        url = 'integration/aicr/alert/list'
        errmsg = '获取报警记录数据失败！'
        params.keyword = this.dataForm.keyword || ''
        params.alertType = this.dataForm.alertType || ''
        params.startDate = this.dataForm.startDate
        params.endDate = this.dataForm.endDate
        params.page = this.queryInfo.page
        params.size = this.queryInfo.size
      } else if (this.dialogTitle === '分类排名') {
        url = 'integration/aicr/camera/alert/list'
        errmsg = '获取分类排名数据失败！'
        params.name = this.dataForm.name || ''
        params.alertType = this.dataForm.alertType || ''
        params.startDate = this.dataForm.startDate
        params.orderByCt = 'asc'
        params.endDate = this.dataForm.endDate
        params.page = this.queryInfo.page
        params.size = this.queryInfo.size
      }
      console.log(params)
      let data = this.$api.toQueryString(params)
      this.$http({
        url: url + data
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          if (this.dialogTitle === '分类排名') {
            this.dataList = data.rows
            this.total = data.total
          } else {
            this.dataList = data.alertList || []
            if (data.pageVO) {
              const { total } = data.pageVO
              this.total = total
            } else {
              this.total = 0
            }
          }
        } else {
          this.$message.error(msg || '获取数据错误')
          this.total = 0
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error(errmsg)
        // 保存当前处理完成的数据
        this.total = 0
        this.dataList = []
      })
    },
    comeDate (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
}
.el-select,
.el-input {
  width: 180px;
}
.bigImgCenter {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 55%;
  min-height: 500px;
  background: #fff;
  text-align: right;
  .el-icon-close {
    font-size: 20px;
    margin: 15px;
    color: #000;
  }
}
</style>