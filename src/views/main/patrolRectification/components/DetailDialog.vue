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
          @click="addHandle"
        >新增</el-button>
      </TableForm>
    </BeautifulWrapper>
    <div
      class="addBox"
      v-if="isAddVisible"
    >
      <div class="title">
        <h2>{{dialogTitle}}</h2>
        <i
          class="el-icon-close"
          @click="closeClickAdd"
        ></i>
      </div>
      <el-form
        :inline="true"
        size="medium"
        class="demo-form-inline"
      >
        <el-form-item label="名称">
          <el-input
            v-model="name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button @click="addSubmit">提交</el-button>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      class="deleteDia"
      @close="handleClose"
      :modal='false'
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
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
            click: this.editHandle
          },
          {
            text: '删除',
            click: this.deleteItem
          }
        ]
      },
      dialogTitle: '',
      isAddVisible: false,
      name: '',
      deleteDialogVisible: false
    }
  },
  methods: {
    closeClick () {
      this.$emit('closeDialog')
    },
    lookDetail (item, e) { // 查看图片
      console.log(item, e)
    },
    editHandle (item) {
      this.dialogTitle = '修改巡查记录'
      this.isAddVisible = true
      this.name = item.name
    },
    deleteItem (item) {
      // 请求接口删除 item
      console.log(item)
      this.deleteDialogVisible = true
    },
    addHandle () {
      this.dialogTitle = '新增巡查记录'
      this.isAddVisible = true
    },
    closeClickAdd () {
      this.isAddVisible = false
      this.name = ''
    },
    addSubmit () {
      this.$http({
        url: '/xczg/getEchartData',
        data: this.name
      }).then(res => {
        // 如果获取到数据
        if (res.code === 200) {
          console.log(res)
          this.$message.info('提交成功！')
          this.closeClickAdd()
        } else {
          this.$message.error('提交失败！')
        }
      })
    },
    handleClose () {
      this.deleteDialogVisible = false
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
.addBox {
  width: 30%;
  height: 300px;
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
  .demo-form-inline {
    margin: 40px;
  }
  .button {
    text-align: center;
    margin: 20px 0;
  }
}
.deleteDia {
  width: 30%;
  height: 50px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>