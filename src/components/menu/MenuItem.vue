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
      >
        <div
          class="menu-bg"
          :class="isScale && 'menu-bgscale'"
        ></div>
        <div class="menu-text">{{ item.title }}</div>
      </div>
      <!-- 二级菜单 -->
      <ul
        class="sub-menu"
        v-if="item.catType === 'sub' && item.children && item.children.length > 0"
      >
        <li
          class="submenu-item"
          v-for="sub in item.children"
          :class="curRoute.id === sub.id ? 'sub-active' : ''"
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
      menuRoutes: []
    }
  },
  created () {
    this.menuRoutes = this.$store.state.global.menuRoutes
  },
  computed: {
    // 当前路由
    curRoute () {
      return this.$route.meta || {}
    },
    // 当前菜单的父级菜单
    currentParId () {
      return this.curRoute.parentId === '00' ? this.curRoute.id : this.curRoute.parentId
    }
  },
  methods: {
    menuClick (item) {
      if (item.type === 'menu') {
        this.routeHandle(item)
      } else if (item.catType && item.catType === 'tabs') {
        this.routeHandle(item, 'parentId')
      }
    },
    // 路由操作
    routeHandle (item, val = 'id') {
      // if (item.right) {
      //   this.$message.info('暂无权限')
      //   return
      // }
      const isRoute = this.menuRoutes.find(menu => menu && menu.meta[val] === item.id)
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
.menu-list {
  display: flex;
  align-items: center;
  /* width: 500px; */
}
.menu-item {
  position: relative;
  width: 120px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  margin: 0 8px;
  font-size: 20px;
}
.menu-value {
  position: relative;
  width: inherit;
  height: inherit;
  line-height: inherit;
}
.active-menu .menu-bg,
.menu-value:hover .menu-bg {
  box-shadow: var(--menu-hovercolor) 0px 0px 48px inset,
    var(--menu-hovercolor) 0px 0px 10px;
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
  background-color: var(--card-title-bgcolor);
  border: 1px solid var(--submenu-bdcolor);
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