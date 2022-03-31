<template>
  <!--噪声检测首-地图 -->
  <BeautifulWrapper
    :wraStyle="currentTabs === '1' ? { inPadding: '0px' } : {}"
    :tabsList="tabsList"
    v-model="currentTabs"
  >
    <DusMap v-if="currentTabs === '1'" />
    <DusSingleEcharts v-else-if="currentTabs === '2'" />
    <DusMultipleEcharts v-else-if="currentTabs === '3'" />
    <DusRankingEcharts v-else-if="currentTabs === '4'" />
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
        { id: '1', title: '地图' },
        { id: '2', title: '单设备统计' },
        { id: '3', title: '多设备统计' },
        { id: '4', title: '排名统计' }
      ],
      currentTabs: '1'
    }
  }
}
</script>

<style scoped>
</style>