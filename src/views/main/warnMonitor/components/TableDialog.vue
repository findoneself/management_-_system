<template>
  <BeDialog ref="tableDialog">
    <div class="more-wrapper">
      <BeautifulWrapper
        is-title
        :title="currentItme.title"
        class="num-wrapper"
        :border-icon="['close']"
        :wraStyle="{outPadding: '0px'}"
        :style="{width: isShowInfo ? '69%' : '100%'}"
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
            label-width="6rem"
          >
            <el-form-item
              label="项目名称："
              key="xmmc"
              v-if="currentItme.title === '整改项目超期' || currentItme.title === '车辆冲洗预警'"
            >
              <el-input
                placeholder="输入项目名称搜索"
                v-model="dataForm.projectName"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="设备名称："
              key="sbmc"
              v-else
            >
              <el-input
                placeholder="输入设备名称搜索"
                v-model="dataForm.name"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="预警分类："
              v-show="currentItme.title === 'AI设备预警' || currentItme.title === '扬尘设备预警'"
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
              label="整改分类："
              v-show="currentItme.title === '整改项目超期'"
              key="zgfl"
            >
              <el-select
                v-model="dataForm.modifyType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dictOptions.modifyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间区间：">
              <el-date-picker
                v-model="dataForm.dateList"
                type="daterange"
                size="small"
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="getList"
              >查询</el-button>
              <el-button @click="refreshClick">重置</el-button>
            </el-form-item>
          </el-form>
          <el-pagination
            slot="pagination"
            @current-change="handleCurrentChange"
            :current-page="queryAll.pageIndex"
            :page-size="queryAll.pageSize"
            layout="prev, pager, next, total, jumper"
            :total="dataTotal"
          >
          </el-pagination>
        </TableForm>
      </BeautifulWrapper>
      <BeautifulWrapper
        :is-title="false"
        :style="{width: isShowInfo ? '30%' : '0%'}"
        class="info-wrapper"
        :border-icon="[]"
        :wraStyle="{outPadding: '0px'}"
      >
        <BeautifulTableList
          :loading="infoLoading"
          :data-list="infoDataList"
          :index-obj="{isIndex: true}"
          :columns="currentItme.columns"
          :oper-obj="currentItme.title === 'AI设备预警' ? infoOperObj : {}"
        ></BeautifulTableList>
        <el-pagination
          @current-change="handleInfoChange"
          :current-page="queryInfo.pageIndex"
          :page-size="queryInfo.pageSize"
          layout="prev, pager, next, total, jumper"
          :total="infoTotal"
        >
        </el-pagination>
      </BeautifulWrapper>
    </div>
    <BeImageFixed ref="imageRef" />
  </BeDialog>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulTableList from '_com/common/BeautifulTableList'
import BeDialog from '_com/common/BeDialog'
import BeImageFixed from '_com/common/BeImageFixed'
import TableForm from '_vie/common/TableForm'
export default {
  name: 'TableDialog',
  components: {
    BeDialog,
    BeautifulWrapper,
    BeImageFixed,
    BeautifulTableList,
    TableForm
  },
  props: {

  },
  data () {
    return {
      // 所有字典数据
      dicts: this.$store.state.global.dictData,
      // 字典数据
      dictOptions: {
        // 报警类型
        alertTypes: [],
        // 整改分类
        modifyList: []
      },
      // 当前点击的类目
      currentItme: {},
      // 表单数据
      dataForm: {
        // 点位/项目名称
        name: '',
        // 时间区间
        dateList: [],
        // 报警类型
        alertType: '',
        // 整改分类
        modifyType: ''
      },
      // loading加载
      dataLoading: false,
      // 查询参数
      queryAll: {
        pageIndex: 1,
        pageSize: 20
      },
      // 数据总数
      dataTotal: 0,
      // 左侧公用表头
      columns: [],
      // 左侧公用数据
      dataList: [],
      // 左侧公用操作栏
      operObj: {
        isOperation: true,
        headName: '预警记录',
        operButton: [
          {
            text: '查看',
            click: this.warnLogClick
          }
        ]
      },
      // -----右侧详情信息
      // 是否显示详情
      isShowInfo: false,
      // 加载
      infoLoading: false,
      // 详情数据
      infoDataList: [],
      // 右侧详情查询参数
      queryInfo: {
        pageIndex: 1,
        pageSize: 20,
        order: 'desc',
        sidx: 'datetime'
      },
      // 详情列表操作栏
      infoOperObj: {
        isOperation: true,
        headName: '图片',
        operButton: [
          {
            text: '查看',
            click: this.imgClick
          }
        ]
      },
      // 当前点击的统计数据
      currentInfo: {},
      // 详情总数
      infoTotal: 0,
      api: {
        alertDataApi: 'integration/aicr/algorithm', // 预警下拉
        AiListApi: 'integration/aicr/camera/alert/list' // ai列表
      }
    }
  },
  methods: {
    // 初始数据
    init () {
      // 初始化字典
      const now = this.$format.getTwodaysDate()
      this.dataForm.dateList = [now[0], now[1]]
      // if (this.dicts.warnType && this.dicts.warnType.length > 0) {
      //   this.dictOptions.warnList = this.dicts.warnType
      // }
      // if (this.dicts.modifyType && this.dicts.modifyType.length > 0) {
      //   this.dictOptions.modifyList = this.dicts.modifyType
      // }
    },
    getAlertData () {
      this.$http({
        url: this.api.alertDataApi
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          this.dictOptions.alertTypes = data.algoConfig
          this.getList()
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')

      })
    },
    getList () {
      //   url = 'integration/aicr/camera/alert/list'
      //   errmsg = '获取分类排名数据失败！'
      //   params.name = this.dataForm.name || ''
      //   params.alertType = this.dataForm.alertType || ''
      //   params.startDate = this.dataForm.startDate
      //   params.orderByCt = 'asc'
      //   params.endDate = this.dataForm.endDate
      //   params.page = this.queryInfo.page
      //   params.size = this.queryInfo.size
      // }
      const { dateList, alertType, name } = this.dataForm
      let params = {
        startDate: dateList[0],
        endDate: dateList[1],
        orderByCt: 'asc',
        alertType: alertType || '',
        name: name || '',
        page: this.queryAll.pageIndex,
        size: this.queryAll.pageSize
      }
      console.log(params)
      let data = this.$api.toQueryString(params)
      this.$http({
        url: this.api.AiListApi + data
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          this.dataList = data.rows
          this.dataTotal = data.total


        } else {
          this.$message.error(msg || '获取数据错误')
          this.total = 0
          this.dataList = []
        }
      }, () => {
        this.dataLoading = false
        this.$message.error('获取数据错误')
        // 保存当前处理完成的数据
        this.total = 0
        this.dataList = []
      })
    },
    open (item) {
      this.currentItme = item
      this.$refs.tableDialog.showDialog(true)
      if (item.title === '整改项目超期' || item.title === '车辆冲洗预警') {
        this.columns = [
          { name: '序号', prop: 'id', key: 1 },
          { name: '项目名称', prop: 'projectName', key: 2 },
          { name: '预警数量', prop: 'num', key: 3 }
        ]
      } else {
        this.columns = [
          // { name: '序号', prop: 'id', key: 1 },
          { name: '设备名称', prop: 'name', key: 2 },
          { name: '预警数量', prop: 'count', key: 3 }
        ]
      }
      this.init()
      // this.getWarnData()
      this.getAlertData()
    },
    // 页码改变
    handleCurrentChange (val) {
      this.queryAll.pageIndex = val
      this.getWarnData()
    },
    // 详情页面改变
    handleInfoChange (val) {
      this.queryInfo.pageIndex = val
      this.getWarnInfo()
    },
    // 关闭弹窗
    closeClick () {
      this.isShowInfo = false
      this.infoDataList = []
      this.dataList = []
      this.$refs.imageRef.closeClick()
      this.$refs.tableDialog.showDialog(false)
    },
    // 图片点击
    imgClick (item, e) {
      this.$refs.imageRef.showImg(e, item)
    },
    // 获取预警统计数据
    getWarnData () {
      this.dataLoading = true
      let params = this._cloneDeep(this.queryAll)
      params.key = this.currentItme.id
      this.$http({
        url: '/warn/getWarnData',
        data: params
      }).then(res => {
        this.dataLoading = false
        if (res.code === 200) {
          this.dataList = res.data.list
          this.dataTotal = res.data.total
          console.log(res)
        } else {
          this.$message.error(`获取${this.currentItme.title}统计失败！`)
          this.dataList = []
          this.dataTotal = 0
        }
      }, () => {
        this.dataLoading = false
        this.$message.error(`获取${this.currentItme.title}统计失败！`)
        const list = [
          { id: '1212', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '165', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '1215542', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '124', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '145452', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '1256', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '1565232', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '15652445', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '156222', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '15652565', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '1565323232', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '152', deviceName: '设备名称', projectName: '项目名称', num: 56 },
          { id: '1552', deviceName: '设备名称', projectName: '项目名称', num: 56 }
        ]
        this.dataTotal = list.length
        this.dataList = list
      })
    },
    // 预警记录点击
    warnLogClick (item) {
      this.currentInfo = item
      this.isShowInfo = true
      this.getWarnInfo()
    },
    // 获取预警记录详情
    getWarnInfo () {
      this.infoLoading = true
      let params = this._cloneDeep(this.queryInfo)
      params.projectId = this.currentInfo.id
      params.key = this.currentItme.id
      this.$http({
        url: '/warn/getWarnInfo',
        data: params
      }).then(res => {
        this.infoLoading = false
        if (res.code === 200) {
          this.infoDataList = res.data.list
          this.infoTotal = res.data.total
          console.log(res)
        } else {
          this.$message.error(`获取${this.currentItme.title}记录失败！`)
          this.infoDataList = []
          this.infoTotal = 0
        }
      }, () => {
        this.infoLoading = false
        this.$message.error(`获取${this.currentItme.title}记录失败！`)
        const list = [
          { id: '1212', num: 25, datetime: '2022-02-02 11:00:00', warnTypeName: 'pm2.5', imgUrl: 'http://bj.xpei.ren/zt/work-note/images/head_user.gif' },
          { id: '165', num: 76, datetime: '2022-02-01 12:00:00', warnTypeName: 'pm2.5' },
          { id: '1215542', num: 454, datetime: '2022-02-06 12:00:00', warnTypeName: 'pm2.5' },
          { id: '124', num: 73, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '145452', num: 15, datetime: '2022-02-07 12:00:00', warnTypeName: 'pm2.5' },
          { id: '1256', num: 45, datetime: '2022-02-08 12:00:00', warnTypeName: 'pm2.5' },
          { id: '1565232', num: 435, datetime: '2021-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '15652445', num: 45, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '156222', num: 45, datetime: '2021-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '15652565', num: 45, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '1565323232', num: 45, datetime: '2020-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '152', num: 45, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '1552', num: 45, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: 'gww', num: 45, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' },
          { id: '15gwhw52', num: 45, datetime: '2022-02-02 12:00:00', warnTypeName: 'pm2.5' }
        ]
        this.infoTotal = list.length
        this.infoDataList = list
      })
    },
    // 重置表单
    refreshClick () {
      this.dataForm = {
        name: '',
        dateList: [],
        alertType: '',
        modifyType: ''
      }
      this.init()
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.more-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100%;
  .el-input,
  .el-select {
    width: 150px;
  }
}
.info-wrapper,
.num-wrapper {
  overflow: hidden;
  transition: all 0.2s;
}
.el-form-item {
  margin-bottom: 0;
}

.be-table-list {
  height: calc(100% - 54px);
}
/deep/ .menu-tablist > li {
  width: 226px;
}
/deep/ .menu-tablist .tab-shadow {
  margin-left: -206px;
}
</style>