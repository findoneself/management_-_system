<template>
  <div class="home">
    <!-- <el-container class="home-container"> -->
      <!-- 头部区域 -->
      <!-- <el-header>
        <div>
          <img src="../assets/heima.png" alt />
          <span>后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header> -->
      <!-- 侧边栏和主体区域 -->
      <!-- <el-container> -->
        <!-- 左侧侧边栏 -->
        
        <!-- 右侧主体 -->
        <!-- <el-main> -->
          <router-view></router-view>
        <!-- </el-main> -->
      <!-- </el-container> -->
    <!-- </el-container> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      // 默认高亮的选项
      activePath: ''
    }
  },
  created() {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    var whei = document.documentElement.clientWidth
    console.log(whei,document.documentElement.style.fontSize)
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status != 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      // console.log(res)
    },
    // 点击按钮实现侧边栏的折叠与展开
    toggleSize() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(val) {
      window.sessionStorage.setItem('activePath', val)
      this.activePath = val
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
}
el-container {
  display: block;
}
.el-main{
  background-color: #eee;
}
</style>