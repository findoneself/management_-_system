<template>
  <!-- 预警监控首页 -->
  <BeautifulWrapper
    :isMenuTab='false'
    :borderIcon='borderIcon'
    :wraStyle='wraStyle'
    class="waning_list"
  >
    <BeautifulCard
      :isTriangle="false"
      :title="item.title"
      class="waning_item"
      v-for="(item) in carDataList"
      :key='item.key'
    >
      <div class="button_list">
        <el-button
          @click="moreClick(item)"
          type="primary"
        >更多</el-button>
        <div v-if="item.key=='ycscyj'">
          <el-select
            v-if="item.date"
            v-model="dustForm.date"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'date')"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-if="item.pm"
            v-model="dustForm.pm"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'pm')"
          >
            <el-option
              v-for="item in pm"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="item.key=='zssbyj'">
          <el-select
            v-if="item.date"
            v-model="noiseForm.date"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'date')"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>

        </div>
        <div v-if="item.key=='clcxsbyj'">
          <el-select
            v-model="carForm.date"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'date')"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="item.key=='aisbyj'">
          <el-select
            v-model="AiForm.aqmao"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'aqm')"
          >
            <el-option
              v-for="item in aqmao"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="AiForm.pm"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'pm')"
          >
            <el-option
              v-for="item in pm"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="item.key=='zgsbcqyj'">
          <el-select
            v-model="projectForm.zgtype"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'zgtype')"
          >
            <el-option
              v-for="item in zgtype"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="projectForm.pm"
            clearable
            placeholder="请选择"
            @change="pickerHandel(item.key,'pm')"
          >
            <el-option
              v-for="item in pm"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <MonitorBar
        :color='item.color'
        :id='item.key'
        :xAxisData='item.xAxisData'
        :seriesData='item.seriesData'
      />
    </BeautifulCard>
    <TableDialog ref="moreDialog" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import MonitorBar from './components/MonitorBar.vue'
import TableDialog from './components/TableDialog'

export default {
  name: '',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    TableDialog,
    MonitorBar

  },
  data () {
    return {
      borderIcon: ['top', 'right', 'bottom', 'left'],
      wraStyle: { inPadding: '0px' },
      // 今日下拉框
      dataList: [{ name: '今日', id: '3' }, { name: '明日', id: '5' }],
      // pm2.5下拉框
      pm: [{ name: 'pm2.5', id: 'pmq-1' }, { name: '温度', id: 'wd1' }, { name: '湿度', id: 'sd1' }],
      // 整改下拉框
      zgtype: [{ name: '整改分类', id: 'gq-1' }],
      // 安全帽下拉框
      aqmao: [{ name: '安全帽', id: 'aq-1' }],
      dustForm: {
        date: '今日',
        pm: 'pm2.5'

      },
      noiseForm: {
        date: '明日'
      },
      carForm: {
        date: '今日'
      },
      AiForm: {
        aqmao: '安全帽',
        pm: 'pm2.5'
      },
      projectForm: {
        zgtype: '整改分类',
        pm: '温度'
      },
      xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
      seriesData: [20, 50, 10, 35, 35, 47, 20],
      carDataList: [{
        title: '扬尘设备预警',
        key: 'ycscyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 1 },
          { name: '预警分类', prop: 'warnTypeName', key: 2 },
          { name: '数值', prop: 'num', key: 3, width: '13%' }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20],
        color: '#3D73F2',
        picker: ['date', 'pm2.5'],
        date: true,
        pm: true
      }, {
        title: '噪声设备预警',
        key: 'zssbyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 1 },
          { name: '数值', prop: 'num', key: 3 }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [2, 10, 15, 30, 20, 33, 23],
        color: '#23DBFC',
        picker: ['date'],
        date: true
      }, {
        title: '车辆冲洗设备预警',
        key: 'clcxsbyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 2 },
          { name: '结果', prop: 'result', key: 3 }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20],
        color: '#FFAD2D',
        picker: ['date'],
        date: true
      }, {
        title: 'AI设备预警',
        key: 'aisbyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 2 },
          { name: '预警分类', prop: 'warnlx', key: 3 }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20],
        color: '#CD482E',
        picker: ['aqm', 'pm2.5'],
        pm: true,
        aqm: true
      }, {
        title: '整改设备超期预警',
        key: 'zgsbcqyj',
        columns: [
          { name: '日期', prop: 'datetime', key: 1 },
          { name: '预警分类', prop: 'warnlx', key: 2 },
          { name: '超期天数', prop: 'overdueDays', key: 3, width: '18%' }
        ],
        xAxisData: ['云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州', '云-徐州'],
        seriesData: [20, 50, 10, 35, 35, 47, 20],
        color: '#9662FF',
        picker: ['aqm', 'pm2.5'],
        zgtype: true,
        pm: true
      }]
    }
  },
  created () {
    this.getMapData()
  },
  methods: {
    // 获取统计图数据
    getMapData () {
    },
    moreClick (item = {}) {
      this.$refs.moreDialog.open(item)
    },
    pickerHandel (key, val) {
      console.log(key, val)
    }

  }
}
</script>

<style lang="less" scoped>
.waning_list {
  display: flex;
  justify-content: flex-start;
  .waning_item {
    width: 33.33%;
    height: 50%;
    .button_list {
      display: flex;
      justify-content: space-between;
    }
  }
}
button.el-button {
  width: 6rem;
  height: 2.5rem;
  border: none;
  transform: scale(0.8);
}
.waning_item .el-select {
  width: 100px;
  margin-right: -5px;
  padding: 0;
  transform: scale(0.8);
}
</style>