<template>
  <!--在监工程 -->
  <BeautifulWrapper
    :wraStyle="wraStyle"
    :isTitle='true'
    :borderIcon='borderIcon'
    @closeClick='closeClick'
  ></BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'

export default {
  name: 'CarMonitorProject',
  components: {
    BeautifulWrapper
  },
  data () {
    return {
      borderIcon: ['right', 'bottom', 'left', 'close'],
      wraStyle: { inPadding: '0px' }
    }
  },
  methods: {
    closeClick () {

    }
  }
}
</script>

<style scoped>
</style>