<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header height="auto">
      <home-header />
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 v-if="isRouterAlive" -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入子组件
import HomeHeader from '_com/header/HomeHeader'


export default {
  name: 'Main',
  components: {
    HomeHeader
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    userId: {
      get () {
        return 'a'
        // return this.$store.state.user.id
      },
      set (val) {
        console.log(val)
        // this.$store.commit('updateUserId', val)
      }
    }
  },
  watch: {
    $route: {
      handler: 'routeHandle',
      immediate: true
    }
  },
  methods: {
    // 路由操作
    routeHandle (to, oldRoute) {
      if (to.name === 'main' && !oldRoute) {
        if (!this.userId) {
          // this.getUserInfo()
        }
        // 保存菜单及其路由数据
        const menuList = JSON.parse(sessionStorage.getItem('menuList')) || []
        const menuRoutes = JSON.parse(sessionStorage.getItem('menuRoutes')) || []
        // 查找默认首页
        const defaultId = this.$store.state.global.userInfo.homeId
        if (defaultId) {
          const isHome = menuRoutes.find(item => item.meta.id === defaultId)
          if (isHome) {
            // 如果存在默认首页，查找当前用户的菜单权限是否存在此菜单
            const isRight = menuList.find(menu => menu.id === isHome.meta.id)
            if (isRight) {
              // 如果权限菜单存在，则跳转至默认首页
              this.$router.push({ name: isHome.name })
            } else {
              // 如果不存在权限
              this.routeDefalut(menuRoutes[0], '当前账户默认首页无权限访问！')
            }
          } else {
            this.routeDefalut(menuRoutes[0], '当前账户默认首页不存在！')
          }
        } else {
          console.log(menuRoutes[0])
          this.routeDefalut(menuRoutes[0], '当前账户未设置首页！')
        }
      } else if (to.name === 'main' && oldRoute) {
        // 说明是回退到登录页
        this.$router.push({ name: 'login' })
      }
    },
    // 跳转默认页面
    routeDefalut (item = { name: 'login' }, msg = '') {
      this.$message.info(msg)
      this.$router.push({ name: item.name })
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-aside {
  transition: width 0.3s;
  background-color: #333744;
}
.el-main {
  padding: 0;
  overflow: visible;
}
</style>
