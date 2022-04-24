<template>
  <!-- 整改 -->
  <div style="height:100%">
    <TableForm
      :loading="false"
      :data-list="dataList"
      :columns="columns"
      :is-table="true"
      :tform-head="tformHead"
      :operObj='operObj'
    >
      <el-form
        :inline="true"
        slot="headform"
        size="medium"
        class="demo-form-inline"
      >
        <el-form-item class="input_project">
          <el-input
            v-model="projectName"
            placeholder="请输入项目名称或施工单位名称查询"
          ></el-input>
          <i class="el-icon-search"></i>
        </el-form-item>

        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form>
      <el-button
        slot="headform"
        type="primary"
        style="margin-top:1rem"
        @click="addHandle"
      >新增</el-button>
    </TableForm>
    <DetailDialog
      :dialogVisible="dialogVisible"
      :title="title"
      :isForm='true'
      :dataForm='paramsObj'
      @closeDialog='closeDialog'
    ></DetailDialog>
    <div
      class="deleteDia"
      v-if="deleteDialogVisible"
    >
      <div class="title">
        <h2>删除</h2>
        <i
          class="el-icon-close"
          @click="deleteDialogVisible = false"
        ></i>
      </div>
      <h3>确定删除这条整改记录吗？</h3>
      <div class="button">
        <el-button @click="deleteSubmit">确定</el-button>
        <el-button
          class="cancel"
          @click="deleteDialogVisible = false"
        >取消</el-button>
      </div>
    </div>
    <DialogCenter
      v-if="dialogVisibleCenter"
      :title='dialogCenterTitle'
      :dialogCenterData='dataColumns'
      @closeDialogCenter='dialogVisibleCenter=false'
    />
    <el-dialog
      :loading='imgLoading'
      :visible.sync="dialogVisibleImg"
    >
      <img
        width="100%"
        :src="imgSrc"
        class="avatar"
      >
    </el-dialog>
  </div>
</template>

<script>
import TableForm from '_vie/common/TableForm'
import DetailDialog from './components/DetailDialog.vue'
import DialogCenter from '../projectManagement/components/DialogCenter.vue'

export default {
  name: 'Rectification',
  components: {
    TableForm,
    DetailDialog,
    DialogCenter
  },
  data () {
    return {
      projectName: '',
      columns: [
        { name: '整改项目', prop: 'projectName', key: 1 },
        { name: '整改类型', prop: 'rectificationName', key: 2 },
        { name: '整改内容', prop: 'rectificationContent', tooltip: 15, key: 3 },
        { name: '整改开始日期', prop: 'rectificationBeginTime', key: 4 },
        { name: '整改结束日期', prop: 'rectificationEndTime', key: 5 },
        { name: '网格员', prop: 'fullName', key: 8 },
        { name: '管理员', prop: 'managerName', key: 9 }
      ],
      dataList: [
        { id: 'geewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'gwg', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'geewhwwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'geegsdwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09' },
        { id: 'geegeewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geejwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geeerwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geesjjwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-010' },
        { id: 'geejjjwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '242141', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2434', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2421', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '242149661', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '244642141', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '242145641', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
      ],
      operObj: {
        isOperation: true,
        headName: '操作',
        width: '16rem',
        operButton: [
          {
            text: '详情',
            click: this.lookDetail
          },
          {
            text: '整改前',
            click: this.lookImage1
          },
          {
            text: '整改后',
            click: this.lookImage2
          },
          {
            text: '修改',
            click: this.editHandle
          },
          {
            text: '删除',
            click: this.deleteItem
          }
        ]
      },
      // 新增修改弹窗
      dialogVisible: false,
      title: '',
      paramsObj: {},
      // 详情弹窗
      dialogVisibleCenter: false,
      // 详情弹窗数据
      dialogCenterTitle: '',
      dataColumns: [{ name: '整改项目', prop: 'projectName', value: '' },
      { name: '整改类型', prop: 'rectificationName', value: '' },
      { name: '整改内容', prop: 'rectificationContent', value: '' },
      { name: '整改开始日期', prop: 'rectificationBeginTime', value: '' },
      { name: '整改结束日期', prop: 'rectificationEndTime', value: '' },
      { name: '网格员', prop: 'fullName', value: '' },
      { name: '管理员', prop: 'managerName', value: '' },
      { name: '完结时间', prop: 'wjTime', value: '' }
      ],
      // 删除
      deleteObj: {},
      deleteDialogVisible: false,
      // 图片弹窗和url
      imgLoading: false,
      dialogVisibleImg: false,
      imgSrc: '',
      api: {
        dataListApi: '/integration/rectification/listFromWg', // 列表
        deleteApi: '/integration/rectification/fromWG/', // 删除整改记录 /rectification/fromWG
        editApi: '/integration/rectification/edit'
      }
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      let data = {
        projectName: this.projectName
      }
      let params = this.$api.toQueryString(data)
      this.$http({
        url: this.api.dataListApi + params
      }).then(res => {
        const { rows, code, msg } = res.data
        if (code === 200) {
          console.log(rows)
          this.dataList = rows || []
          // const { over90, list } = data
          // let arr = []
          // list && list.map(i => {
          //   arr.push({ ...i, 'devUint': i.constructor })
          // })
          // this.dataList = arr || []
          // this.more90day = over90
        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    lookDetail (item, e) { // 查看详情
      console.log(item, e, '详情')
      this.dialogVisibleCenter = true
      this.dialogCenterTitle = '整改详情'
      Object.keys(item).map(j => {
        this.dataColumns.map(o => {
          if (o.prop === j) {
            console.log(item[j])
            o.value = item[j] || ''
          }
        })
      })
    },
    lookImage1 (item) { // 整改前查看图片 beforeFileList
      if (item.beforeFileList.length > 0) {
        this.imgLoading = true
        this.$http({
          url: 'communal/file/download/' + item.beforeFileList[0].fileUrl,
          responseType: 'blob'
        }).then(res => {
          console.log(res)
          const { data, status } = res
          if (status === 200) {
            let url = window.URL.createObjectURL(data)
            this.imgSrc = url
            this.dialogVisibleImg = true
          } else {
            this.$message.error('获取图片错误')
          }
        }, (err) => {
          this.$message.error(err.data.msg || err.data.error)
        })
      } else {
        this.$message.error('暂无整改前图片')
      }
    },
    lookImage2 (item) { // 查看图片 afterFileList
      if (item.afterFileList.length > 0) {
        this.$http({
          url: 'communal/file/download/' + item.afterFileList[0].fileUrl,
          responseType: 'blob'
        }).then(res => {
          console.log(res)
          const { data, status } = res
          if (status === 200) {
            let url = window.URL.createObjectURL(data)
            this.imgSrc = url
            this.dialogVisibleImg = true
          } else {
            this.$message.error('获取图片错误')
          }
        }, (err) => {
          this.$message.error(err.data.msg || err.data.error)
        })
      } else {
        this.$message.error('暂无整改后图片')
      }
    },
    addHandle () {
      this.dialogVisible = true
      this.title = '新增整改记录'
      this.paramsObj = {
        projectName: '', // 整改项目
        rectificationName: '', // 整改类型
        rectificationContent: '', // 整改内容
        rectificationBeginTime: '', // 开始时间
        rectificationEndTime: '', // 整改结束
        beforeFileList: [], // 整改前的图片
        afterFileList: [] // 整改后图片
      }
    },
    editHandle (item) {
      this.title = '修改整改记录'
      this.dialogVisible = true
      let { beforeFileList, afterFileList } = item
      let beforeFileLists = []
      beforeFileList && beforeFileList.map(i => {
        beforeFileLists.push({ name: i.fileUrl, ...i })
      })
      let afterFileLists = []
      afterFileList && beforeFileList.map(i => {
        afterFileLists.push({ name: i.fileUrl, ...i })
      })
      item.beforeFileList = beforeFileLists
      item.afterFileList = afterFileLists
      console.log(item)
      this.paramsObj = item
    },
    deleteItem (item) {
      this.deleteDialogVisible = true
      this.deleteObj = item
    },
    deleteSubmit () { // 删除调接口
      this.$http({
        url: this.api.deleteApi,
        method: 'post',
        data: {
          rectificationId: this.deleteObj.rectificationId
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.$message.success('操作成功')
          this.deleteDialogVisible = false
          this.getDataList()
        } else {
          this.$message.error(msg || '删除失败')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    closeDialog (val) {
      if (val) {
        this.getDataList()
      }
      this.dialogVisible = false
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = { isTableHead: false }
      return info
    }

  }
}
</script>

<style lang="less" scoped>
.input_project {
  position: relative;
  .el-icon-search {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #fff;
  }
}
.el-input {
  width: 20rem;
}
.deleteDia {
  width: 30%;
  height: 250px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0b1771;
  color: #fff;
  border: 1px solid #0a44ff;
  .title {
    padding: 20px;
    border-bottom: 1px solid #fff;
    display: flex;
    justify-content: space-between;
    .el-icon-close {
      font-size: 20px;
    }
  }
  .button {
    text-align: center;
    margin: 20px 0;
  }
  h3 {
    text-align: center;
    margin: 45px;
  }
}
</style>