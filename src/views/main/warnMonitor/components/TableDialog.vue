<template>
  <BeDialog ref="tableDialog">
    wgew
  </BeDialog>
</template>

<script>
import BeDialog from '_com/common/BeDialog'
export default {
  name: 'TableDialog',
  components: {
    BeDialog
  },
  props: {

  },
  data () {
    return {
      currentItme: {}
    }
  },
  methods: {
    open (item) {
      this.currentItme = item
      this.$refs.tableDialog.showDialog(true)
    }
  }
}
</script>

<style scoped>
</style>