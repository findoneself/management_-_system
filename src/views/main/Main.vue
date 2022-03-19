<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height:8.75rem">
      <home-header />
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 v-if="isRouterAlive" -->
        <router-view  />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入子组件
import HomeHeader from '_com/header/HomeHeader'


export default {
  name: 'Home',
  // provide () {
  //   return {
  //     // 创建一个依赖，可以刷新路由页面
  //     againAddGoods: this.againAddGoods
  //   }
  // },
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
    routeHandle (menu, omenu) {
      if (!this.userId) {
        // this.getUserInfo()
      }
      this.$router.push({ name: 'home-Home' })
      // this.handleUserInputRouter()
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
