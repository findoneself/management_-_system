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
      :title="'扬尘设备预警'"
      class="waning_item"
    >
      <div class="button_list">
        <el-button
          type="primary"
          @click="moreClick(item)"
        >更多</el-button>
        <div>
          <el-select
            v-model="dustForm.date"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="dustForm.date"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <BeEchartBar
        :show-title="false"
        :options="{xAxis: {axisLabel:{ rotate: 45 }}}"
        :xAxis="echartXAxis"
        :series="echartSeries"
      />

    </BeautifulCard>
    <BeautifulCard
      :isTriangle="false"
      :title="'噪声设备预警'"
      class="waning_item"
    ></BeautifulCard>
    <BeautifulCard
      :isTriangle="false"
      :title="'车辆冲洗设备预警'"
      class="waning_item"
    ></BeautifulCard>
    <BeautifulCard
      :isTriangle="false"
      :title="'AI设备预警'"
      class="waning_item"
    ></BeautifulCard>
    <BeautifulCard
      :isTriangle="false"
      :title="'整改设备超期预警'"
      class="waning_item"
    ></BeautifulCard>
    <TableDialog ref="moreDialog" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import BeEchartBar from '_com/common/BeEchartBar'
import TableDialog from './components/TableDialog'

export default {
  name: '',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    BeEchartBar,
    TableDialog
  },
  data () {
    return {
      borderIcon: ['top', 'right', 'bottom', 'left'],
      wraStyle: { inPadding: '0px' },
      dataList: [{ name: '今日', id: '3' }],
      dustForm: {
        date: ''
      },
      echartXAxis: '',
      echartSeries: ''
    }
  },
  created () {
    this.getMapData()
  },
  methods: {
    // 获取统计图数据
    getMapData () {
      const list = [
        { id: '1', jcd: '云-徐州传染病医院', sj: '2022-03-10 00:00:00', wd: '21' },
        { id: '2', jcd: '云-徐州传染病医院', sj: '2022-03-11 00:00:00', wd: '12' },
        { id: '3', jcd: '云-徐州传染病医院', sj: '2022-03-12 00:00:00', wd: '24' },
        { id: '4', jcd: '云-徐州传染病医院', sj: '2022-03-13 00:00:00', wd: '15' },
        { id: '5', jcd: '云-徐州传染病医院', sj: '2022-03-14 00:00:00', wd: '21' },
        { id: '6', jcd: '云-徐州传染病医院', sj: '2022-03-15 00:00:00', wd: '16' },
        { id: '7', jcd: '云-徐州传染病医院', sj: '2022-03-16 00:00:00', wd: '21' },
        { id: '8', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
        { id: '9', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
        { id: '10', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
        { id: '11', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
        { id: '12', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' },
        { id: '13', jcd: '云-徐州传染病医院', sj: '2022-03-17 00:00:00', wd: '20' }
      ]
      this.dataList = list
      let xAxis = []
      let series = []
      list.map(item => {
        xAxis.push(item.jcd)
        series.push(item.wd)
      })
      this.echartXAxis = xAxis
      this.echartSeries = [
        {
          type: 'bar',
          barMaxWidth: 23,
          barGap: '10%',
          label: {
            show: true
          },
          itemStyle: {
            normal: {
              color: '#486AFF',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'top',
                formatter: function (p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          },
          data: series
        }
      ]
    },
    moreClick (item) {
      this.$refs.moreDialog.open(item)
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
/deep/.el-select {
  width: 100px;
  margin-right: -5px;
  padding: 0;
  transform: scale(0.8);
}
</style>