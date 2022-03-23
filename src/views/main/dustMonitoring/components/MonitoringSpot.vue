<template>
  <BeautifulCard
    :title="'监测点数据'"
    class="map_monitoring_spot"
    :isTriangle='false'
    :cardStyle='cardStyle'
  >
    <div class="monitoring_spot_title">
      {{monitoringSspotData.title}}
    </div>
    <MonitoringSpotPie />
  </BeautifulCard>
</template>
<script>
import BeautifulCard from '_com/common/BeautifulCard'
import MonitoringSpotPie from './MonitoringSpotPie.vue'
export default {
  components: {
    BeautifulCard,
    MonitoringSpotPie
  },
  props: {

  },
  data () {
    return {
      cardStyle: { padding: '0px' },
      monitoringSspotData: {
        title: '云 - 徐州传染病医院',
        pieData: {},
        detailList: [{ name: '温度', value: '75 ℃' },
        { name: 'pm2.5', value: '62ug/m³' },
        { name: '湿度', value: '15%' },
        { name: 'pm10', value: '21ug/m³' },
        { name: '气压', value: '135' },
        { name: '二氧化氮', value: '254' },
        { name: '风速', value: '23' },
        { name: '二氧化硫', value: '5425' }]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.map_monitoring_spot {
  width: 25rem;
  .monitoring_spot_title {
    // width: 100%;
    text-align: center;
    margin: 4rem 0;
  }
}
</style>