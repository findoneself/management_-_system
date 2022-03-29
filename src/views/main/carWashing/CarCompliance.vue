<template>
  <!--合规车次 -->
  <BeautifulWrapper
    :wraStyle="wraStyle"
    :title="title"
    :borderIcon='borderIcon'
    @closeClick='closeClick'
  ></BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
// import TableForm from '_vie/common/TableForm'
export default {
  name: 'CarCompliance',
  components: {
    BeautifulWrapper
    // TableForm
  },
  data () {
    return {
      borderIcon: ['right', 'bottom', 'left', 'close'],
      wraStyle: { inPadding: '0px' },
      title: '合规车次'
    }
  },
  methods: {
    closeClick () {

    }
  },
  computed: {
    tformHead () {
      // 需要取参数类型和选择日期的信息
      const info = { isTableHead: false }
      return info
    }
    // ,
    // title () {
    //   return this.$route.params.name
    // }
  },
  created () {
  },
  mounted () {
    this.dataLoading = false
    // this.title = this.$route.params.name
  }
}
</script>

<style scoped>
</style>