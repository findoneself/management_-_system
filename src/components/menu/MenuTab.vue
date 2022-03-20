<template>
  <div class="menu-tabs">
    <ul class="menu-tablist">
      <template v-if="isMenu">
        <li
          v-for="(item, index) in subMenuList"
          :style="{zIndex: 10 - index, cursor: 'pointer'}"
          @click="tabMenuClick(item)"
          :class="curRoute.id === item.id ? 'tabmenu-active' : ''"
          :key="item.id"
        >{{ item.title }}</li>
      </template>
      <li
        v-else
        :style="{zIndex: 10}"
        class="tabmenu-active"
      >{{ curRoute.alias || '' }}</li>
      <li class="tab-shadow tab-shadow1"></li>
      <li class="tab-shadow tab-shadow2"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuTab',
  props: {
    // 是否显示菜单
    isMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 权限菜单列表
      menuRoutes: [],
      // 菜单列表
      menuList: this.$store.state.global.menuList,
      // 子菜单列表
      subMenuList: []
    }
  },
  computed: {
    curRoute: {
      get () {
        return this.$route.meta || false
      }
    }
  },
  created () {
    // 初始化子菜单
    this.initMenu()
  },
  methods: {
    initMenu () {
      if (this.curRoute) {
        // 查找当前路由的父节点
        const curId = this.curRoute.parentId === '00' ? 'id' : 'parentId'
        const isMenu = this.menuList.find(item => item.id === this.curRoute[curId])
        if (isMenu && isMenu.catType && isMenu.catType === 'tabs') {
          // 如果路由节点存在切catType为tabs，则过滤出子菜单
          this.subMenuList = isMenu.children || []
        }
      }
      this.menuRoutes = this.$store.state.global.menuRoutes
    },
    // 菜单点击
    tabMenuClick (item) {
      const isRoute = this.menuRoutes.find(menu => menu && menu.meta.id === item.id)
      if (isRoute && isRoute.name) {
        this.$router.push({ name: isRoute.name })
      } else {
        this.$router.push({ name: '404' })
      }
    }
  }
}
</script>

<style scoped>
.menu-tabs {
  overflow: hidden;
}
.menu-tablist {
  display: flex;
  align-items: center;
}
.menu-tablist > li {
  position: relative;
  width: 171px;
  height: 51px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: -22px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url("~_ats/img/tabmenu.png");
}
.menu-tablist .tabmenu-active {
  background-image: url("~_ats/img/tabmenu-active.png");
}
.menu-tablist .tab-shadow {
  margin-left: -150px;
}
.menu-tablist .tab-shadow1 {
  z-index: 2;
  opacity: 0.5;
}
.menu-tablist .tab-shadow2 {
  z-index: 1;
  opacity: 0.3;
}
</style>