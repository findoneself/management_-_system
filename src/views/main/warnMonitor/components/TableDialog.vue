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
          :index-obj="{isIndex: true}"
        >
          <el-form
            :inline="true"
            slot="headform"
            size="small"
            :model="dataForm"
            label-width="6rem"
          >
            <!-- <el-form-item
              label="项目名称："
              key="xmmc"
              v-if=" currentItme.title === '车辆冲洗预警'"
            >
              <el-input
                placeholder="输入项目名称搜索"
                v-model="dataForm.projectName"
                clearable
              >
              </el-input>
            </el-form-item> -->
            <el-form-item
              label="设备名称："
              key="sbmc"
              v-if="currentItme.title !== '整改项目超期'"
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
              key="xmmc"
              v-show=" currentItme.title === '扬尘设备预警'"
            >
              <el-select
                v-model="dataForm.alertType"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dictOptions.alertTypes"
                  :key="item.prop"
                  :label="item.name"
                  :value="item.prop"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="预警分类："
              v-show="currentItme.title === 'AI设备预警'"
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
              label="整改项目："
              v-show="currentItme.title === '整改项目超期'"
              key="zgfl"
            >
              <el-select
                v-model="dataForm.projectId"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dictOptions.projectList"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="时间区间："
              v-if="currentItme.title !== '整改项目超期'"
            >
              <el-date-picker
                v-model="dataForm.dateList"
                type="daterange"
                size="small"
                clearable
                value-format="yyyy-MM-dd"
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
            layout="prev, pager, next, total"
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
          :columns="currentItme.columns"
          :oper-obj="currentItme.title === 'AI设备预警' ? infoOperObj : {}"
          :index-obj="{isIndex: true}"
        ></BeautifulTableList>
        <el-pagination
          @current-change="handleInfoChange"
          :current-page="queryInfo.pageIndex"
          :page-size="queryInfo.pageSize"
          layout="prev, pager, next, total"
          :total="infoTotal"
        >
        </el-pagination>
      </BeautifulWrapper>
    </div>
    <BeImageFixed ref="imageRef" />
    <div
      :loading='imgLoading'
      v-if="dialogVisibleImg"
      class="bigImgCenter"
    >
      <i
        class="el-icon-close"
        @click="dialogVisibleImg=false"
      ></i>
      <img
        width="100%"
        :src="imgSrc"
        class="avatar"
      >
    </div>
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
        modifyList: [],
        projectList: []
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
        modifyType: '',
        projectName: '', // 项目名称
        projectId: ''
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
      // 图片弹窗
      dialogVisibleImg: false,
      imgLoading: false,
      imgSrc: '',
      api: {
        alertDataApi: 'integration/aicr/algorithm', // 预警下拉
        AiListApi: 'integration/aicr/camera/alert/list', // ai列表
        peojectListApi: '/integration/rectification/getTjList',
        paramTypesApi: 'integration/dustMonitoringSource/paramList',
        dustList: 'integration/warn/dust/list', // 扬尘设备预警列表
        zgtypeApi: 'integration/rectification/getProjectXl', // 整改分类下拉
        dustDetail: 'integration/warn/dust/info', // 扬尘详情
        noiseDetail: 'integration/warn/noise/info', // 噪声详情
        noiseList: 'integration/warn/noise/list'
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
          this.dataForm.alertType = data.algoConfig[0].task_key
          this.getList()
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')

      })
    },
    getList () {
      const { title } = this.currentItme
      const { dateList, alertType, name, projectId } = this.dataForm
      let params = {}
      let url = ''
      if (title === 'AI设备预警') {
        params = {
          startDate: dateList[0],
          endDate: dateList[1],
          orderByCt: 'asc',
          alertType: alertType || '',
          name: name || '',
          page: this.queryAll.pageIndex,
          size: this.queryAll.pageSize
        }
        url = this.api.AiListApi
      } else if (title === '整改项目超期') {
        params = {
          projectName: this.dictOptions.projectList.find(i => i.value === projectId).lable,
          rectificationName: ''
        }
        url = this.api.peojectListApi
      } else if (title === '扬尘设备预警') {
        url = this.api.dustList
        params = {
          monitoringSourceName: name,
          warnType: alertType ? this.dictOptions.alertTypes.find(i => i.prop === alertType).name : '',
          pageNum: this.queryAll.pageIndex,
          pageSize: this.queryAll.pageSize,
          startDate: dateList[0] + ' 00:00:00',
          endDate: dateList[1] + ' 23:59:59',
          orderBy: 'asc'
        }
      } else if (title === '噪声设备预警') {
        params = {
          warnType: 'noise',
          monitoringSourceName: name,
          pageNum: this.queryAll.pageIndex,
          pageSize: this.queryAll.pageSize,
          startDate: dateList[0] + ' 00:00:00',
          endDate: dateList[1] + ' 23:59:59',
          orderBy: 'asc'
        }
        url = this.api.noiseList
      }
      let data = this.$api.toQueryString(params)
      this.$http({
        url: url + data,
        method: (title === '扬尘设备预警' || title === '噪声设备预警') ? 'post' : 'get'
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        if (code === 200) {
          if (title === 'AI设备预警') {
            this.dataTotal = data.total
            this.dataList = data.rows
          } else if (title === '整改项目超期') {
            this.dataTotal = res.data.total
            this.dataList = res.data.rows
            console.log(data.rows)
          } else if (title === '扬尘设备预警' || title === '噪声设备预警') {
            this.dataList = data.rows
            this.dataTotal = data.total
          }
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
      this.isShowInfo = false
    },
    open (item) {
      this.currentItme = item
      this.$refs.tableDialog.showDialog(true)
      if (item.title === '整改项目超期') {
        this.columns = [
          { name: '整改项目', prop: 'projectName', key: 2 },
          { name: '整改类型', prop: 'rectificationName', key: 3 },
          { name: '建设单位联系人', prop: 'constructorContacts', key: 4 },
          { name: '建设单位联系电话', prop: 'constructorTel', key: 5 }]
        this.getzgType()
      } else if (item.title === '扬尘设备预警' || item.title === '噪声设备预警') {
        this.columns = [{ name: '监测点', prop: 'monitoringSourceName', key: 3 },
        { name: '预警次数', prop: 'count', key: 2 }, { name: '建设单位联系人', prop: 'constructorContacts', key: 4 },
        { name: '建设单位联系电话', prop: 'constructorTel', key: 5 }]
        this.getparamsList()
      } else if (item.title === 'AI设备预警') {
        this.columns = [
          { name: '设备名称', prop: 'name', key: 2 },
          { name: '预警数量', prop: 'count', key: 3 },
          { name: '建设单位联系人', prop: 'constructorContacts', key: 4 },
          { name: '建设单位联系电话', prop: 'constructorTel', key: 5 }
        ]
        this.getAlertData()
      }
      // {

      //   this.getList()
      // }

      this.init()
      // this.getWarnData()

    },
    // 页码改变
    handleCurrentChange (val) {
      this.queryAll.pageIndex = val
      this.getList()
    },
    // 详情页面改变
    handleInfoChange (val) {
      this.queryInfo.pageIndex = val
      this.warnLogClick(this.currentInfo)
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
    imgClick (item) {
      // const { title } = this.currentItme // 当前弹窗
      this.imgSrc = item.url
      this.dialogVisibleImg = true
      // this.$refs.imageRef.showImg(e, item)
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
    // 列表点击查看详情
    warnLogClick (item) {
      if (item.monitoringSourceId !== this.currentInfo.monitoringSourceId) {
        this.queryInfo = {
          pageIndex: 1,
          pageSize: 20
        }
      }
      this.currentInfo = item
      console.log(item)
      const { cameraId } = item
      this.isShowInfo = true
      const { title } = this.currentItme // 当前弹窗
      if (title === 'AI设备预警') {
        let params = {
          keyword: cameraId,
          page: this.queryInfo.pageSize,
          size: this.queryInfo.pageIndex
        }
        let data = this.$api.toQueryString(params)
        this.$http({ url: 'integration/aicr/alert/list' + data }).then(res => {
          const { data, msg, code } = res.data
          if (code === 200) {
            this.infoDataList = data.alertList
            if (data.pageVO) {
              this.infoTotal = data.pageVO.total
            }
          } else {
            this.$message.error(msg || '获取详情数据失败！')
            this.infoDataList = []
          }
        }, () => {
          this.loadings.sssjLoading = false
        })
      } else if (title === '整改项目超期') {
        this.infoDataList = [item]
        this.infoTotal = 1
      } else if (title === '扬尘设备预警') {
        const { dateList, alertType } = this.dataForm
        let params = {
          monitoringSourceId: item.monitoringSourceId,
          orderBy: 'asc',
          startDate: dateList[0],
          endDate: dateList[1],
          warnType: alertType ? this.dictOptions.alertTypes.find(i => i.prop === alertType).name : '',
          pageNum: this.queryInfo.pageIndex,
          pageSize: this.queryInfo.pageSize
        }
        let data = this.$api.toQueryString(params)
        this.$http({ url: this.api.dustDetail + data, method: 'post' }).then(res => {
          const { data, msg, code } = res.data
          if (code === 200) {
            if (title === '扬尘设备预警') {
              data.rows.map(i => (i.warnType === 'PM25') && (i.warnType = 'PM2.5'))
            }
            this.infoDataList = data.rows
            this.infoTotal = data.total
          } else {
            this.$message.error(msg || '获取详情数据失败！')
            this.infoDataList = []
          }
        }, () => {
          this.loadings.sssjLoading = false
        })
      } else if (title === '噪声设备预警') {
        const { dateList } = this.dataForm
        let params = {
          warnType: 'noise',
          monitoringSourceId: item.monitoringSourceId,
          pageNum: this.queryInfo.pageIndex,
          pageSize: this.queryInfo.pageSize,
          startDate: dateList[0] + ' 00:00:00',
          endDate: dateList[1] + ' 23:59:59',
          orderBy: 'asc'
        }
        let data = this.$api.toQueryString(params)
        this.$http({
          url: this.api.noiseDetail + data,
          method: 'post'
        }).then(res => {
          const { data, msg, code } = res.data
          if (code === 200) {
            this.infoDataList = data.rows
            this.infoTotal = data.total
          } else {
            this.$message.error(msg || '获取详情数据失败！')
            this.infoDataList = []
          }
        })
      }
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
        this.infoTotal = 0
        this.infoDataList = []
      })
    },
    // 重置表单
    refreshClick () {
      this.dataForm = {
        name: '',
        // 时间区间
        dateList: [],
        // 报警类型
        alertType: '',
        // 整改分类
        modifyType: '',
        projectName: '', // 项目名称
        projectId: ''
      }
      this.init()
      this.isShowInfo = false
      this.getList()
    },
    // 整改下拉
    getzgType () {
      this.$http({
        url: this.api.zgtypeApi
      }).then(res => {
        this.dataLoading = false
        const { data, msg, code } = res.data
        console.log(data)
        if (code === 200) {
          this.dictOptions.projectList = data
          this.dataForm.projectId = data[0].value
          // this.AiForm.alertType = data.algoConfig[0].task_key
          this.getList()
        } else {
          this.$message.error(msg || '获取报警类型错误')
        }
      }, () => {
        this.$message.error('获取报警类型错误')
      })
    },
    // 扬尘参数下拉
    getparamsList () {
      this.$http({
        url: this.api.paramTypesApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          let arr1 = []
          data.map(i => {
            (i.prop === 'a34004' || i.name === 'PM10') && arr1.push(i)
          })
          if (this.currentItme.title === '扬尘设备预警') {
            this.dictOptions.alertTypes = arr1
            this.dataForm.alertType = arr1[0].prop
          }
          this.getList()
          sessionStorage.setItem('paramTypesList', JSON.stringify(data))
        } else {
          this.$message.error(msg || '获取参数类型数据错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
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