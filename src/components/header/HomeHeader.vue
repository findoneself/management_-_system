<template>
  <div class="head">
    <h1>{{ systemTitle }}</h1>
    <Menu />
    <!-- <div class="menus">
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
    </div> -->
  </div>

</template>

<script>
import Menu from '_com/menu/Menu'
export default {
  name: 'HomeHeader',
  components: {
    Menu
  },
  data () {
    return {
      systemTitle: '大数据统筹管理系统'
    }
  },
  methods: {
    // 退出账户
    loginOut () {
      // 清除token
      this.$utils.sessionStorageRemove('token')
      // 跳转到登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  height: 110px;
  background: url("../../assets/img/head.png") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  z-index: 100;
}

.head h1 {
  color: #fff;
  text-align: center;
  font-size: 33px;
  line-height: 80px;
}

.head h1 img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
</style>
