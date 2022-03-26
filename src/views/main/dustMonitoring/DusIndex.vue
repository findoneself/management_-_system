<template>
  <!--扬尘检测首-地图 -->
  <BeautifulWrapper
    :wraStyle="currentTabs.id === '1' ? { inPadding: '0px' } : {}"
    :tabsList="tabsList"
  >
    <DusMap v-if="currentTabs.id === '1'" />
    <DusMultipleEcharts v-else-if="currentTabs.id === '3'" />
    <DusSingleEcharts v-else-if="currentTabs.id === '2'" />
    <DusRankingEcharts v-else />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import DusMultipleEcharts from './DusMultipleEcharts'
import DusRankingEcharts from './DusRankingEcharts'
import DusSingleEcharts from './DusSingleEcharts'
import DusMap from './DusMap'
export default {
  name: 'DustMonitoring',
  components: {
    BeautifulWrapper,
    DusMultipleEcharts,
    DusRankingEcharts,
    DusSingleEcharts,
    DusMap
  },
  data () {
    return {
      tabsList: [
        { id: '1', title: '地图' },
        { id: '2', title: '单设备统计' },
        { id: '3', title: '多设备统计' },
        { id: '4', title: '排名统计' }
      ],
      wraStyle: { inPadding: '0px' }
    }
  },
  computed: {
    // 当前点击的tab
    currentTabs () {
      const obj = this.$store.state.global.currentTab
      return obj.id ? obj : this.tabsList[0]
    }
  }
}
</script>

<style scoped>
</style>