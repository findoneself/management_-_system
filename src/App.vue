<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 20 + 'px'
  },
  mounted() {
    let that = this
    window.onresize = () => {
      return (() => {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px'
        console.log(document.documentElement.style.fontSize,document.documentElement.clientWidth)
     })()
    }
  },
}
</script>

<style>
</style>
