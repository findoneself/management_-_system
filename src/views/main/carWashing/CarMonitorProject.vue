<template>
  <!--在监工程 -->
  <BeautifulWrapper
    :wraStyle="wraStyle"
    :isTitle='true'
    :borderIcon='borderIcon'
    @closeClick='closeClick'
  >
    <TableForm
      :loading="dataLoading"
      :data-list="dataList"
      :columns="columns"
      :is-table="true"
      :tform-head="tformHead"
    >
      <el-form
        :inline="true"
        slot="headform"
        size="medium"
        :model="dataForm"
        class="demo-form-inline"
      >
        <el-form-item label="项目名称：">
          <el-select
            v-model="dataForm.projectName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.projectNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号：">
          <el-select
            v-model="dataForm.projectNum"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.projectNumList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form>
    </TableForm>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import TableForm from '_vie/common/TableForm'

export default {
  name: 'CarMonitorProject',
  components: {
    BeautifulWrapper,
    TableForm
  },
  data () {
    return {
      borderIcon: ['right', 'bottom', 'left', 'close'],
      wraStyle: { inPadding: '0px' },
      dictOptions: {
        projectNameList: [{ name: '沛县', id: '1.1' }, { name: '徐州', id: 2.2 }],
        projectNumList: [{ name: '云-徐州', id: '2.1' }, { name: '云-沛县', id: '2.2' }]
      },
      dataForm: {
        projectNum: '',
        projectName: ''
      },
      dataLoading: true,
      dataList: [{ order: 1, projectNum: 2423, projectName: '昆明斗南鲜花', area: '云南昆明', status: '完成', id: '10' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' }],
      columns: [{ name: '序号', prop: 'order', key: 1 },
      { name: '项目名称', prop: 'projectName', key: '2' },
      { name: '项目编号', prop: 'projectNum', key: '3' },
      { name: '所属行政区域', prop: 'area', key: '4' },
      { name: '状态', prop: 'status', key: 5 }]
    }
  },
  methods: {
    closeClick () {
      this.$router.go(-1)
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = { isTableHead: false }
      return info
    }
  },
  mounted () {
    this.dataLoading = false
  }
}
</script>

<style scoped lang="less">
</style>