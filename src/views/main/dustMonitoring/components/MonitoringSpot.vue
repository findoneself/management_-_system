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
    <MonitoringSpotPie :pieData='monitoringSspotData.pieData' />
    <div class="monitoring_spot_detail">
      <div
        v-for="(item,index) in monitoringSspotData.detailList"
        :key="index+'0'"
        class="monitoring_spot_detail_item"
        :style="{ backgroundColor: index % 4 == 0 || index % 4 == 1? '#0B1771' : '' }"
      >
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <div class="monitoring_spot_detail_back_button">
      <div @click="monitoringSpot">返回</div>
    </div>
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
    monitoringSspotData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      cardStyle: { padding: '0px' }
    }
  },
  methods: {
    monitoringSpot () {
      this.$emit('monitoringSpotBack')
    }
  }
}
</script>
<style lang="less" scoped>
.map_monitoring_spot {
  position: relative;
  width: 25rem;
  .monitoring_spot_title {
    // width: 100%;
    text-align: center;
    margin: 2rem 0 1.5rem 0;
  }
  .monitoring_spot_detail {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // height: 40%;
    margin-top: 1.5rem;
    padding: 0 1rem;
    .monitoring_spot_detail_item {
      display: flex;
      align-items: center;
      padding-left: 1.5rem;
      // margin: 0 1rem 0 0;
      font-size: 10px;
      width: 11.25rem;
      height: 2rem;
      div {
        transform: scale(0.7);
      }
    }
  }
  .monitoring_spot_detail_back_button {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 8%;
    div {
      width: 5rem;
      height: 30px;
      border-radius: 5px;
      line-height: 30px;
      text-align: center;
      background-color: #0a44ff;
    }
  }
}
</style>