<template>
  <!--AI识别安装率 -->
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
          <el-input v-model="dataForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目编号：">
          <el-input v-model="dataForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="安装进度：">
          <el-select
            v-model="dataForm.nstallProgress"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.installProgressList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          @click="searchList"
        >查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form>
    </TableForm>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import TableForm from '_vie/common/TableForm'

export default {
  name: 'CarAIinstall',
  components: {
    BeautifulWrapper,
    TableForm
  },
  data () {
    return {
      borderIcon: ['right', 'bottom', 'left', 'close'],
      wraStyle: { inPadding: '0px' },
      dictOptions: {
        installProgressList: [{ name: '已完成', id: '0-1' }, { name: '未安装', id: '1-1' }, { name: '安装中', id: '2-1' }]
      },
      dataForm: {
        projectNum: '',
        projectName: '',
        installProgress: ''
      },
      dataLoading: true,
      dataList: [{ order: 1, projectNum: 2423, projectName: '昆明斗南鲜花', area: '云南昆明', status: '完成', id: '10' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '11' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '12' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '13' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '14' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '15' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '16' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '17' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '18' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '19' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '21' },
      { order: 2, projectNum: 23, projectName: '淮安医院', area: '江苏', status: '完成', id: '22' }],
      columns: [{ name: '序号', prop: 'order', key: 1 },
      { name: '项目名称', prop: 'projectName', key: '2' },
      { name: '项目编号', prop: 'projectNum', key: '3' },
      { name: '所属行政区域', prop: 'area', key: '4' },
      { name: '状态', prop: 'status', key: 5 }]
    }
  },
  methods: {
    searchList () {
      // 获取列表信息
    },
    resetForm () {
      this.dataForm = {
        projectNum: '',
        projectName: '',
        installProgress: ''
      }
      // 再次获取列表
    },
    closeClick () { this.$router.go(-1) }
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

<style lang="less" scoped>
/deep/ .menu-tablist > li {
  width: 226px;
}
/deep/ .menu-tablist .tab-shadow {
  margin-left: -206px;
}
</style>