<template>
  <!--合规车次 -->
  <BeautifulWrapper
    :wraStyle="wraStyle"
    :title="title"
    :isTitle='true'
    :borderIcon='borderIcon'
    @closeClick='closeClickWrapper'
  >
    <TableForm
      :loading="dataLoading"
      :data-list="dataList"
      :columns="columns"
      :is-table="true"
      :tform-head="tformHead"
      :operObj="operObj"
    >
      <el-form
        :inline="true"
        slot="headform"
        size="medium"
        :model="dataForm"
        class="demo-form-inline"
      >
        <el-form-item
          size="small"
          label="项目名称："
        >
          <el-input v-model="dataForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="车辆牌号：">
          <el-input v-model="dataForm.carNum"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型：">
          <el-select
            v-model="dataForm.carModel"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.carModelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进场时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="dataForm.date1"
            style="width: 100%;"
          ></el-date-picker>

        </el-form-item>
        <el-form-item label="出场时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="dataForm.date2"
            style="width: 100%;"
          ></el-date-picker>

        </el-form-item>
        <el-button
          type="primary"
          @click="searchList"
        >查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form>
    </TableForm>
    <BeImageFixed ref="imageRef" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import TableForm from '_vie/common/TableForm'
import BeImageFixed from '_com/common/BeImageFixed'

export default {
  name: 'CarCompliance',
  components: {
    BeautifulWrapper,
    TableForm,
    BeImageFixed
  },
  data () {
    return {
      dataLoading: false,
      borderIcon: ['right', 'bottom', 'left', 'close'],
      wraStyle: { inPadding: '0px' },
      title: '',
      dictOptions: {
        projectNameList: [{ name: '沛县', id: '1.1' }, { name: '徐州', id: 2.2 }],
        carNumList: [{ name: '浙123244', id: '0' }, { name: '琼333333', id: '2' }],
        carModelList: [{ name: '沛县', id: '1.1' }, { name: '徐州', id: 2.2 }]

      },
      dataForm: {
        carNum: '',
        projectName: '',
        carModel: '',
        date1: '',
        date2: ''
      },
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
        { id: '242141', projectName: '防空雷达技术反馈', num: 56, startTime: '2022-03-04', endTime: '2022-03-011' }
      ],
      operObj: {
        isOperation: true,
        headName: '图片',
        operButton: [
          {
            text: '查看',
            click: this.imgClick
          }
        ]
      }
    }
  },
  methods: {
    searchList () {
      // 获取列表信息
    },
    resetForm () {
      this.dataForm = {
        carNum: '',
        projectName: '',
        carModel: '',
        date1: '',
        date2: ''
      }
      // 再次获取列表
    },
    closeClickWrapper () {
      this.$router.go(-1)
    },
    // 点击图片
    imgClick (item, e) {
      console.log(item, e)
      this.$refs.imageRef.showImg(e, item)
    },
    // 关闭弹窗
    closeClick () {
      this.$refs.dialog.showDialog(false)
    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = { isTableHead: false }
      return info
    }
  },
  created () {
  },
  mounted () {
    this.dataLoading = false
    this.title = this.$route.params.name
  }

}
</script>

<style scoped lang="less">
/deep/ .menu-tablist > li {
  width: 226px;
}
/deep/ .menu-tablist .tab-shadow {
  margin-left: -206px;
}
.el-input {
  width: 150px;
}
/deep/.el-form-item__content {
  width: 150px;
}
</style>