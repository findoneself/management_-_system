<template>
  <!--备案渣土车 -->
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
  name: 'CarKeepRecord',
  components: {
    BeautifulWrapper
  },
  data () {
    return {
      borderIcon: ['right', 'bottom', 'left', 'close'],
      wraStyle: { inPadding: '0px' }
    }
  }
}
</script>

<style scoped>
</style>