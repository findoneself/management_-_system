<template>
  <div class="menu">
    <MenuItem :menu-list="menuList.slice(0, 4)" />
    <MenuItem
      :menu-list="menuList.slice(4)"
      is-scale
    />
  </div>
</template>

<script>
// 导入Vuex
import MenuItem from './MenuItem.vue'
export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  data () {
    return {
      // 菜单列表
      menuList: []
    }
  },
  created () {
    this.menuList = JSON.parse(sessionStorage.getItem('menuList')) || []
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -10px;
  padding: 0 12px;
  z-index: 99;
}
</style>