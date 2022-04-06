<template>
  <!--超过90天未竣工 -->
  <el-dialog
    :visible.sync="dialogVisible"
    id="detail_dialog"
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
        :oper-obj="operObj"
        :columns-num="2"
        :data-list="dataList"
        :columns="columns"
        :tform-head="tformHead"
      >
        <el-button
          slot="headform"
          type="primary"
        >新增</el-button>
      </TableForm>
    </BeautifulWrapper>
  </el-dialog>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import TableForm from '_vie/common/TableForm'
export default {
  name: 'ProjectOverdue',
  components: {
    BeautifulWrapper,
    TableForm
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: true
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
      columns: [
        { name: '名称', prop: 'projectName', tooltip: true, key: 2 },
        { name: '日期', prop: 'startTime', key: 4 }
      ],
      operObj: {
        isOperation: true,
        headName: '操作',
        width: '10rem',
        operButton: [
          {
            text: '查看',
            click: this.lookDetail
          },
          {
            text: '修改',
            click: this.lookDetail
          },
          {
            text: '删除',
            click: this.lookDetail
          }
        ]
      }
    }
  },
  methods: {
    closeClick () {
      this.$emit('closeDialog')
    },
    lookDetail (item, e) { // 查看图片
      console.log(item, e)
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
#detail_dialog {
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
/deep/.be-table-item .cell {
  color: #fff;
}
/deep/.be-ishead-content {
  // height: 0;
}
/deep/.be-table-list,
.be-table-ul {
  padding: 1rem;
}
</style>