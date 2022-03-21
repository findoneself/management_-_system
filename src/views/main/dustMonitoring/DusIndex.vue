<template>
  <!--扬尘检测首-地图 -->
  <BeautifulWrapper :tabsList="tabsList">
    <DustMap v-if="currentTabs.id === '1'" />
    <DusMultipleEcharts v-else-if="currentTabs.id === '2'" />
    <DusRankingEcharts v-else-if="currentTabs.id === '3'" />
    <DusSingleEcharts v-else />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import DusMultipleEcharts from './DusMultipleEcharts'
import DusRankingEcharts from './DusRankingEcharts'
import DusSingleEcharts from './DusSingleEcharts'
import DustMap from './DustMap'
export default {
  name: 'DustMonitoring',
  components: {
    BeautifulWrapper,
    DusMultipleEcharts,
    DusRankingEcharts,
    DusSingleEcharts,
    DustMap
  },
  data () {
    return {
      tabsList: [
        { id: '1', title: '地图' },
        { id: '2', title: '单设备统计' },
        { id: '3', title: '多设备统计' },
        { id: '4', title: '排名统计' }
      ]
    }
  },
  computed: {
    // 当前点击的tab
    currentTabs () {
      return this.$store.state.global.currentTab || {}
    }
  }
}
</script>

<style scoped>
</style>