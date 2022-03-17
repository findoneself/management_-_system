<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    document.documentElement.style.fontSize =
<<<<<<< HEAD
      document.documentElement.clientWidth / 120 + "px";
=======
      document.documentElement.clientWidth / 20 + 'px'
>>>>>>> df6968eaa354c6922d9f6e7285ea865e6a0c274b
  },
  mounted () {
    let that = this
    window.onresize = () => {
      return (() => {
        document.documentElement.style.fontSize =
<<<<<<< HEAD
          document.documentElement.clientWidth / 120 + "px";
=======
          document.documentElement.clientWidth / 20 + 'px'
>>>>>>> df6968eaa354c6922d9f6e7285ea865e6a0c274b
        console.log(
          document.documentElement.style.fontSize,
          document.documentElement.clientWidth
        )
      })()
    }
  }
}
</script>

<style>
@import "~_ats/css/base.css";
</style>
