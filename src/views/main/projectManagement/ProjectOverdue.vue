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
        :index-obj="{isIndex: true, width: '5rem'}"
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

          <el-button
            type="primary"
            @click="getMoreData"
          >查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form>
      </TableForm>
    </BeautifulWrapper>
    <DialogCenter
      v-if="dialogVisibleCenter"
      :dialogCenterData='dataColumns'
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
    }
  },
  data () {
    return {
      dataList: [],
      projectName: '',
      dataLoading: false,
      dialogVisibleCenter: false,
      columns: [
        { name: '备案号', prop: 'projectRecordNum', key: 1 },
        { name: '项目名称', prop: 'projectName', key: 2 },
        { name: '施工单位', prop: 'builder', key: 3 },
        { name: '项目地址', prop: 'projectAddress', key: 4 },
        { name: '备案日期', prop: 'beianTime', key: 5 }
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
      dataColumns: [{ name: '项目编号', prop: 'projectNum', value: '' },
      { name: '备案号', prop: 'projectRecordNum', value: '' },
      { name: '项目名称', prop: 'projectName', value: '' },
      { name: '行政区域名称', prop: 'areaName', value: '' },
      { name: '项目地址', prop: 'projectAddress', value: '' },
      { name: '建设单位', prop: 'constructor', value: '' },
      { name: '建设单位组织机构代码', prop: 'constructorOrgCode', value: '' },
      { name: '建设单位联系人', prop: 'constructorContacts', value: '' },
      { name: '建设单位联系电话', prop: 'constructorTel', value: '' },
      { name: '施工单位', prop: 'builder', value: '' },
      { name: '施工单位组织机构代码', prop: 'builderOrgCode', value: '' },
      { name: '施工单位联系人', prop: 'builderContacts', value: '' },
      { name: '施工单位联系电话', prop: 'builderTel', value: '' },
      { name: '项目备案时间', prop: 'beianTime', value: '' },
      { name: '项目竣工状态', prop: 'completeStatu', value: '' }
      ],
      api: {
        moreApi: 'integration/project/getOver90Projects' // 超期90天
      }
    }
  },
  created () {
    this.getMoreData()
  },
  methods: {
    getMoreData () {
      let data = {
        projectName: this.projectName
      }
      let params = this.$api.toQueryString(data)
      this.$http({
        url: this.api.moreApi + params
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          const { list } = data
          this.dataList = list

        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    closeClick () {
      this.$emit('closeDialog')
      this.dialogVisibleCenter = false
    },
    lookDetail (item, e) {
      console.log(item, e)
      Object.keys(item).map(j => {
        this.dataColumns.map(o => {
          if (o.prop === j) {
            console.log(item[j])
            o.value = item[j] || ''
          }
        })
      })

      this.dialogVisibleCenter = true
    },
    closeDialogCenter () {
      this.dialogVisibleCenter = false
    },
    reset () {
      this.projectName = ''
      this.getMoreData()
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
</style>