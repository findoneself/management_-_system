<template>
  <!--超过90天未竣工 -->
  <el-dialog
    :visible.sync="dialogVisible"
    id="dialog"
    :modal='false'
  >
    <BeautifulWrapper
      :wraStyle="{ inPadding: '0px' }"
      :isTitle='true'
      style="width:100%;geight:100%"
      :title="title"
      @closeClick="closeClick"
      :borderIcon="['right', 'bottom', 'left', 'close']"
    >
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
      </TableForm>
    </BeautifulWrapper>
    <DialogCenter
      v-if="dialogVisibleCenter"
      :dialogCenterData='dialogCenterData'
      @closeDialogCenter='closeDialogCenter'
    />
  </el-dialog>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import TableForm from '_vie/common/TableForm'
import DialogCenter from './components/DialogCenter.vue'
export default {
  name: 'ProjectOverdue',
  components: {
    BeautifulWrapper,
    TableForm,
    DialogCenter
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      projectName: '',
      dataLoading: false,
      dialogVisibleCenter: false,
      columns: [
        { name: '分组名称', prop: 'groupName', key: 1 },
        { name: '点位名称', prop: 'projectName', tooltip: true, key: 2 },
        { name: '异常类型', prop: 'alertType', key: 3 },
        { name: '时间', prop: 'startTime', key: 4 },
        { name: '结束时间', prop: 'endTime', key: 5 }
      ],
      operObj: {
        isOperation: true,
        headName: '操作',
        operButton: [
          {
            text: '详情',
            click: this.lookDetail
          }
        ]
      },
      dialogCenterData: {
        dataForm1: {
          title: '项目信息',
          data1: [{ name: '监督备案号', value: 'AJ32978658658737435(监督一科)' },
          { name: '项目编码', value: '124235436546546' },
          { name: '项目名称', value: '天虹精英汇项目一标段1-3,5,9-14#楼，配' },
          { name: '项目地址', value: '衢宁县城天虹大道东7823647' }],
          data2: [{ name: '监督备案号', value: 'AJ329786586587335(监督一科)' },
          { name: '项目编码', value: '12423543654006' },
          { name: '项目名称', value: '天虹精英汇项目一标段1-3,5,9-14#楼，配2434253' }]
        },
        dataForm2: {
          title: '五方单位信息',
          data1: [{ name: '建设单位', value: 'AJ32978658658737435(监督一科)' },
          { name: '项目负责人', value: '124235436546546' },
          { name: '联系方式', value: '14932746732' },
          { name: '建设单位', value: 'AJ32978658658737435(监督一科)' },
          { name: '项目负责人', value: '124235436546546' },
          { name: '联系方式', value: '14932746732' }, { name: '建设单位', value: 'AJ32978658658737435(监督一科)' },
          { name: '项目负责人', value: '124235436546546' },
          { name: '联系方式', value: '14932746732' }, { name: '建设单位', value: 'AJ32978658658737435(监督一科)' },
          { name: '项目负责人', value: '124235436546546' },
          { name: '联系方式', value: '14932746732' }],
          data2: [{ name: '监督备案号', value: 'AJ329786586587335' },
          { name: '项目编码', value: '1242354' },
          { name: '项目名称', value: '天虹精英汇5' },
          { name: '项目编码', value: '12423543' }]
        }
      }
    }
  },
  methods: {
    closeClick () {
      this.$emit('closeDialog')
      this.dialogVisibleCenter = false
    },
    lookDetail (item, e) {
      console.log(item, e)
      this.dialogVisibleCenter = true
    },
    closeDialogCenter () {
      this.dialogVisibleCenter = false
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
#dialog {
  margin: 8.125rem 1.25rem 1.25rem 1.25rem;
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
  /deep/.el-dialog {
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
  /deep/.el-dialog__header {
    display: none;
  }
  /deep/.el-dialog__body {
    height: 100%;
    padding: 0;
    .beautiful-wrapper {
      padding: 0 !important;
    }
  }
}
/deep/ .menu-tablist > li {
  width: 226px;
  color: #fff;
}
/deep/ .menu-tablist .tab-shadow {
  margin-left: -206px;
}
.el-button {
  color: #fff;
}
.el-input {
  width: 20rem;
}
/deep/.be-ishead-content {
  // height: 0;
}
</style>