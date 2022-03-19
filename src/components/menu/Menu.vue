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
      menuList: [],
      // 菜单路由数据
      menuRoutes: []
    }
  },
  created () {
    this.init()
  },
  computed: {
    id () {
      return this.$store.state.global.userInfo
    }
  },
  methods: {
    init () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList')) || []
      this.menuRoutes = JSON.parse(sessionStorage.getItem('menuRoutes')) || []
      this.$store.commit('global/saveMenuList', this.menuList)
      this.$store.commit('global/saveMenuRouteList', this.menuRoutes)
      const curMenu = JSON.parse(sessionStorage.getItem('currentMenu'))
      if (curMenu) {
        this.$store.commit('global/setActiveMenu', curMenu)
      }
    }
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