<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    // document.documentElement.style.fontSize =
    //   document.documentElement.clientWidth / 120 + "px";
  },
  mounted () {
    // window.onresize = () => {
    //   return (() => {
    //     document.documentElement.style.fontSize =
    //       document.documentElement.clientWidth / 120 + "px";
    //     console.log(
    //       document.documentElement.style.fontSize,
    //       document.documentElement.clientWidth
    //     )
    //   })()
    // }
  }
}
</script>

<style>
@import "~_ats/css/base.css";
</style>
