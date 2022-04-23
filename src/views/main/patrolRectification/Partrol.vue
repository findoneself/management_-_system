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
      :dataList="DialogDataList"
      @closeDialog='dialogVisible = false'
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

  </div>
</template>

<script>
import TableForm from '_vie/common/TableForm'
import DetailDialog from './components/DetailDialog.vue'
export default {
  name: 'Partrol',
  components: {
    TableForm,
    DetailDialog
  },
  data () {
    return {
      dataLoading: false,
      projectName: '',
      columns: [
        { name: '项目名称', prop: 'projectName', key: 1 },
        { name: '巡查分类', prop: 'patrolType', tooltip: true, key: 2 },
        { name: '巡查时间', prop: 'patrolTime', key: 4 },
        { name: '巡查内容', prop: 'alertType', key: 5 },
        { name: '网格员', prop: 'gridmemberId', key: 6 }
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
      // 详情弹窗
      dialogVisible: false,
      title: '巡查记录',
      DialogDataList: [
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
        { id: '242145641', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2446122141', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '24244641', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
      ],
      // 删除弹窗
      deleteDialogVisible: false,
      dialogVisibleImg: false,
      imgSrc: '',
      api: {
        dataListApi: '/integration/patrol/listFromWg'
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
      this.dialogVisible = true
      console.log(item, e, '详情打开弹窗', this.dialogVisible)
    },
    lookImage (item, e) { // 查看图片
      console.log(item, e, '图片')
      if (item.imgSrc) {
        this.dialogVisibleImg = true
      } else {
        this.$message.error('暂无巡查图片')
      }
      this.imgSrc = item.imgSrc
    },
    addHandle () {
      this.dialogVisible = true
      this.title = '新增巡查记录'
    },
    editHandle (item, e) {
      this.title = '修改整改记录'
      this.dialogVisible = true
      this.paramsObj = item
    },
    deleteItem (item, e) {
      console.log(item, e, '图片')
      this.deleteDialogVisible = true
    },
    deleteSubmit () {
      // 调取删除接口
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