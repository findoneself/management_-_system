<template>
  <!--扬尘检测首-地图 -->
  <BeautifulWrapper
    :wraStyle="currentTabs === '1' ? { inPadding: '0px' } : {}"
    :tabsList="tabsList"
    v-model="currentTabs"
  >
    <PatrolEchart v-if="currentTabs === '1'" />
    <Rectification v-else-if="currentTabs === '3'" />
    <Partrol v-else-if="currentTabs === '2'" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import PatrolEchart from './PatrolEchart'
import Partrol from './Partrol'
import Rectification from './Rectification'
export default {
  name: 'PatrolIndex',
  components: {
    BeautifulWrapper,
    PatrolEchart,
    Partrol,
    Rectification
  },
  data () {
    return {
      tabsList: [
        { id: '1', title: '统计' },
        { id: '2', title: '巡查' },
        { id: '3', title: '整改' }
      ],
      currentTabs: '1'
    }
  }
}
</script>

<style scoped>
</style>