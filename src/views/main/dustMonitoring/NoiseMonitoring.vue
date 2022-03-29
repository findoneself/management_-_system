<template>
  <!--噪声检测首-地图 -->
  <BeautifulWrapper
    :wraStyle="currentTabs.id === '5' ? { inPadding: '0px' } : {}"
    :tabsList="tabsList"
  >
    <DusMap v-if="currentTabs.id === '5'" />
    <DusSingleEcharts v-else-if="currentTabs.id === '6'" />
    <DusMultipleEcharts v-else-if="currentTabs.id === '7'" />
    <DusRankingEcharts v-else-if="currentTabs.id === '8'" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import DusMultipleEcharts from './DusMultipleEcharts'
import DusRankingEcharts from './DusRankingEcharts'
import DusSingleEcharts from './DusSingleEcharts'
import DusMap from './DusMap'
export default {
  name: 'NoiseMonitoring',
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
        { id: '5', title: '地图' },
        { id: '6', title: '单设备统计' },
        { id: '7', title: '多设备统计' },
        { id: '8', title: '排名统计' }
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