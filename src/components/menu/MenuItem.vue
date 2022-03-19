<template>
  <div
    class="menu-list"
    v-if="menuList.length > 0"
  >
    <div
      class="menu-item"
      v-for="(item) in menuList"
      :key="item.key"
    >
      <!-- 一级菜单 -->
      <div
        class="menu-value"
        @click="menuClick(item)"
        :class="currentParId === item.id ? 'active-menu' : ''"
        v-if="item.menuType === 'tab' || !item.children || item.children.length === 0"
      >
        <div
          class="menu-bg"
          :class="isScale && 'menu-bgscale'"
        ></div>
        <div class="menu-text">{{ item.title }}</div>
      </div>
      <template v-else>
        <div
          class="menu-value"
          :class="currentParId === item.id ? 'active-menu' : ''"
        >
          <div
            class="menu-bg"
            :class="isScale && 'menu-bgscale'"
          ></div>
          <div class="menu-text">{{ item.title }}</div>
        </div>
        <!-- 二级菜单，如果父菜单设置的模式是sub，则加载 -->
        <ul
          class="sub-menu"
          v-if="item.menuType === 'sub'"
        >
          <li
            class="submenu-item"
            v-for="sub in item.children"
            :class="currentMenuId === sub.id ? 'sub-active' : ''"
            @click="menuClick(sub)"
            :key="sub.key"
          >
            <div
              class="menu-bg"
              :class="isScale && 'menu-bgscale'"
            ></div>
            <div>{{ sub.title }}</div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    // item的 背景是否水平转换
    isScale: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 权限菜单列表
      rightMenuRoutes: []
    }
  },
  created () {
    this.rightMenuRoutes = this.$store.state.global.menuRoutes
  },
  computed: {
    // 当前点击的菜单
    currentMenu () {
      return this.$store.state.global.activeMenu
    },
    // 当前点击的菜单id
    currentMenuId () {
      if (this.currentMenu && this.currentMenu.meta) {
        return this.currentMenu.meta.id
      } else {
        return false
      }
    },
    // 当前菜单的父级菜单
    currentParId () {
      if (this.currentMenu) {
        return this.currentMenu.parentId === '00' ? this.currentMenu.meta.id : this.currentMenu.parentId
      } else {
        return ''
      }
    }
  },
  methods: {
    menuClick (item) {
      const isRoute = this.rightMenuRoutes.find(menu => menu && menu.meta.id === item.id)
      if (isRoute && isRoute.name) {
        this.$store.commit('global/setActiveMenu', isRoute)
        this.routeHandle(isRoute)
      } else {
        this.routeHandle({ name: '404' })
      }
    },
    // 路由操作
    routeHandle (menu) {
      this.$router.push({ name: menu.name })
      // 查找菜单是否存在权限
      var route = this.rightMenuRoutes.find(item => item.id === menu.id)
       console.log(route.path)
      // if (route.length > 0) {
       
        this.$router.push(route.path)
        // 设置当前点击菜单状态管理
        this.setActiveMenu(menu)
      // }
    }
  }
}
</script>

<style scoped>
.menu-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-item {
  position: relative;
  width: 110px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  margin: 0 7px;
  color: #fff;
}
.menu-value {
  position: relative;
  width: inherit;
  height: inherit;
  line-height: inherit;
}
.active-menu .menu-bg,
.menu-value:hover .menu-bg {
  box-shadow: rgb(255 255 255 / 64%) 0px 0px 48px inset,
    rgb(255 255 255 / 64%) 0px 0px 10px;
  -webkit-clip-path: polygon(-15% -17%, 90% 0px, 111% 100%, 0 200%);
}
.menu-bg {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  background: url("~_ats/img/menubg.png") no-repeat center center/ 100%;
}
.menu-bgscale {
  transform: scale(-1, 1);
}
.menu-text {
  height: inherit;
  width: inherit;
  text-align: center;
  line-height: inherit;
}
.sub-menu {
  display: none;
  position: absolute;
  z-index: 999;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #0f2b8c;
  border: 1px solid #0c4edf;
  border-top: 0;
  padding: 0 5px;
  text-align: center;
  font-size: 14px;
}
.submenu-item {
  position: relative;
}
.menu-item:hover .sub-menu {
  display: block;
}
.submenu-item:hover .menu-bg,
.sub-active .menu-bg {
  width: 100%;
  height: 100%;
  background: url("~_ats/img/menubg.png") no-repeat center center/ 100%;
}
</style>