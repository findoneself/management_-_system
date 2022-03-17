<template>
  <div class="home">
    <!-- <el-container class="home-container"> -->
    <!-- 头部区域 -->
    <el-header style="height:1.2rem"> 
      <div class="head">
        <h1>大数据统筹管理系统</h1>
        <div class="menus">
          <div class="menulist menuleft">
            <div class="menubg">
              <router-link to="/main">预警管控</router-link>
            </div>
            <div class="menubg">
              <router-link to="/dustMonitoring">扬尘监测</router-link>
            </div>
            <div class="menubg">
              <router-link to="/page1">噪声监测</router-link>
            </div>
            <div class="menubg">
              <router-link to="/page1">车洗裸土</router-link>
            </div>
          </div>
          <div class="menulist menuright">
            <div class="menubg menubgr">
              <router-link to="/main">AI识别</router-link>
            </div>
            <div class="menubg menubgr">
              <router-link to="/dustMonitoring">项目管理</router-link>
            </div>
            <div class="menubg menubgr">
              <router-link to="/page1">巡查整改</router-link>
            </div>
            <div class="menubg menubgr">管理员</div>
          </div>
        </div>
      </div>
    </el-header>
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
      activeIndex: 0,
      menulist: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      isCollapse: false,
      // 默认高亮的选项
      activePath: '',
    }
  },
  created() {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    var whei = document.documentElement.clientWidth
    console.log(whei, document.documentElement.style.fontSize)
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
    },
  },
}
</script>
<style lang="less" scoped>
.head {
  height: 1.05rem;
  background: url('../assets/img/head.png') no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  z-index: 100;
  .menus {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: -0.1rem;
    .menulist {
      // 
      display: flex;
      
      .menubg,
      .menubgr {
        background: url('../assets/img/menubg.png') no-repeat center center;
        background-size: 100%;
        margin: 0 0.1rem;
        width: 1.1rem;
        height: 0.35rem;
        line-height: 0.35rem;
        text-align: center;
        color: #fff;
        a {
          color: #fff;
        }
      }
      .menubgr{
        background: url('../assets/img/menubgr.png') no-repeat center center;
        background-size: 100%;
      }
    }
    .menuleft{
      float: left;
    }
    .menuright{
      float: right;
    }
  }
}

.head h1 {
  color: #fff;
  text-align: center;
  font-size: 0.4rem;
  line-height: 0.8rem;
  margin: 0;
}

.head h1 img {
  // width: 1.5rem;

  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}

.home {
  height: 100%;
}
el-container {
  display: block;
}
.el-main {
  background-color: #eee;
}
</style>