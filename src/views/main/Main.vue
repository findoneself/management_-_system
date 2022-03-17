<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height:1.2rem">
      <home-header />
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view v-if="isRouterAlive" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入子组件
import HomeHeader from '_com/header/HomeHeader'


export default {
  name: 'Home',
  provide () {
    return {
      // 创建一个依赖，可以刷新路由页面
      againAddGoods: this.againAddGoods
    }
  },
  data () {
    return {
      isRouterAlive: true,
      menuList: [],
      // 第三方图标数组
      iconList: [
        'iconfont iconusers',
        'iconfont icontijikongjian',
        'iconfont iconshangpin',
        'iconfont icondanju',
        'iconfont iconbaobiao'
      ],
      isAsideTogglet: false
    }
  },
  components: {
    HomeHeader
  },
  created () {
    // 获取菜单数据
    this.getMenus()
  },
  methods: {
    // 获取左侧导航列表数据
    async getMenus () {

    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  padding-left: 0;
}
.el-aside {
  transition: width 0.3s;
  background-color: #333744;
}
.el-main {
}
</style>
