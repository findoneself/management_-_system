<template>
  <div class="menu-tab">
    <ul class="menu-tabs">
      <li
        v-for="item in subMenuList"
        :key="item.id"
      >{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuTab',
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>