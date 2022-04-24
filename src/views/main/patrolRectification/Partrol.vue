<template>
  <!-- 巡查 -->
  <div style="height:100%">
    <TableForm
      :loading="dataLoading"
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
      :isForm='false'
      :dataForm1='paramsObj'
      @closeDialog='closeDialog'
    ></DetailDialog>
    <div
      class="addBox deleteDia"
      v-if="deleteDialogVisible"
    >
      <div class="title">
        <h2>删除</h2>
        <i
          class="el-icon-close"
          @click="deleteDialogVisible = false"
        ></i>
      </div>
      <h3>确定删除这条巡查记录吗？</h3>
      <div class="button">
        <el-button @click="deleteSubmit">确定</el-button>
        <el-button
          class="cancel"
          @click="deleteDialogVisible = false"
        >取消</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisibleImg">
      <img
        width="100%"
        :src="imgSrc"
        class="avatar"
      >
    </el-dialog>
    <DialogCenter
      v-if="dialogVisibleCenter"
      :title='dialogCenterTitle'
      :dialogCenterData='dataColumns'
      @closeDialogCenter='dialogVisibleCenter=false'
    />
  </div>
</template>

<script>
import TableForm from '_vie/common/TableForm'
import DetailDialog from './components/DetailDialog.vue'
import DialogCenter from '../projectManagement/components/DialogCenter.vue'

export default {
  name: 'Partrol',
  components: {
    TableForm,
    DetailDialog,
    DialogCenter
  },
  data () {
    return {
      dataLoading: false,
      projectName: '',
      columns: [
        { name: '项目名称', prop: 'projectName', key: 1 },
        { name: '巡查分类', prop: 'patrolName', key: 2 },
        { name: '巡查时间', prop: 'patrolTime', key: 4 },
        { name: '巡查内容', prop: 'patrolContent', key: 5 },
        { name: '网格员', prop: 'fullName', key: 6 }
      ],
      dataList: [
        { id: 'geewew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09', imgSrc: ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1115%2F0ZR1095111%2F210ZP95111-7-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653226696&t=f19f1fa29e8977b5ae3a8beff4a0764c', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653226795&t=9294e44c40d6eea6cf72854a469ec49e'] },
        { id: 'gwg', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09', imgSrc: '' },
        { id: 'geewhwwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09', imgSrc: '' },
        { id: 'geegsdwew', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-09', imgSrc: '' },
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
        { id: '242145641', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2446421401', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '24214564231', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
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
            text: '查看图片',
            click: this.lookImage
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
      paramsObj: {},
      title: '', // 新增修改的弹窗title
      // 删除弹窗
      deleteDialogVisible: false,
      // 删除
      deleteObj: {},
      dialogVisibleImg: false, // 图片弹窗
      imgSrc: '', // 图片url
      // 详情弹窗
      dialogVisibleCenter: false,
      dialogCenterTitle: '',
      dataColumns: [
        { name: '项目名称', prop: 'projectName', value: '' },
        { name: '巡查分类', prop: 'patrolType', value: '' },
        { name: '巡查时间', prop: 'patrolTime', value: '' },
        { name: '巡查内容', prop: 'patrolContent', value: '' },
        { name: '网格员', prop: 'fullName', value: '' },
        { name: '是否完结', prop: 'patrolTheEnd', value: '' }
      ],
      api: {
        dataListApi: '/integration/patrol/listFromWg', // 列表
        deleteApi: '/integration/patrol/fromWG/' // 删除巡查记录
      }
    }
  },
  created () { this.getDataList() },
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
          this.dataList = rows || []
        } else {
          this.$message.error(msg || '获取数据错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    lookDetail (item) { // 查看详情
      this.dialogVisibleCenter = true
      this.dialogCenterTitle = '巡查详情'
      Object.keys(item).map(j => {
        this.dataColumns.map(o => {
          if (o.prop === j) {
            console.log(item[j])
            o.value = item[j] || ''
          }
        })
      })
    },
    lookImage (item) { // 查看图片
      if (item.fileList.length > 0) {
        this.imgLoading = true
        this.$http({
          url: 'communal/file/download/' + item.fileList[0].fileUrl,
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
        this.$message.error('暂无巡查图片')
      }

    },
    addHandle () { // 新增弹窗
      this.dialogVisible = true
      this.title = '新增巡查记录'
      this.paramsObj = {
        projectList: [], // 巡查项目
        patrolName: '', // 巡查分类
        patrolTypeId: '', // 巡查分类id
        patrolContent: '', // 巡查内容
        patrolTime: '', // 时间
        fileList: []// 图片
      }
    },
    editHandle (item) { // 修改弹窗
      this.title = '修改整改记录'
      this.dialogVisible = true
      let { fileList } = item
      let fileLists = []
      fileList && fileList.map(i => {
        fileLists.push({ name: i.fileUrl, ...i })
      })
      item.fileList = fileLists
      this.paramsObj = item
      console.log(item)
    },
    deleteItem (item) { // 删除弹窗
      this.deleteDialogVisible = true
      this.deleteObj = item
      console.log(item)
    },
    deleteSubmit () { // 调取删除接口
      this.$http({
        url: this.api.deleteApi,
        method: 'post',
        data: {
          rectificationId: this.deleteObj.patrolId
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