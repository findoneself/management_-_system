<template>
  <!-- 巡查 -->
  <div style="height:100%">
    <!-- <TableForm
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
    </TableForm>
    <DetailDialog
      :dialogVisible="dialogVisible"
      :title="title"
      :dataList="DialogDataList"
      @closeDialog='closeDialog'
    ></DetailDialog> -->
  </div>
</template>

<script>
// import TableForm from '_vie/common/TableForm'
// import DetailDialog from './components/DetailDialog.vue'
export default {
  name: 'Partrol',
  components: {
    // TableForm,
    // DetailDialog
  },
  data () {
    return {
      dataLoading: false,
      projectName: '',
      columns: [
        { name: '分组名称', prop: 'groupName', key: 1 },
        { name: '点位名称', prop: 'projectName', tooltip: true, key: 2 },
        { name: '异常类型', prop: 'alertType', key: 3 },
        { name: '时间', prop: 'startTime', key: 4 },
        { name: '结束时间', prop: 'endTime', key: 5 }
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
        { id: '242145641', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '2446421401', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' },
        { id: '24214564231', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
      ],
      operObj: {
        isOperation: true,
        headName: '操作',
        operButton: [
          {
            text: '详情',
            click: this.lookDetail
          },
          {
            text: '查看',
            click: this.lookImage
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
      ]
    }
  },
  methods: {
    lookDetail (item, e) { // 查看详情
      this.dialogVisible = true
      console.log(item, e, '详情打开弹窗', this.dialogVisible)
    },
    lookImage (item, e) { // 查看图片
      console.log(item, e, '图片')
    },
    closeDialog () {
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
</style>