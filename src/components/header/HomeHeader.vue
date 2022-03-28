<template>
  <div class="base-header">
    <h1><span
        style="cursor: pointer;"
        @click="logoClick"
      >{{ systemTitle }}</span></h1>
    <Menu />
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
      systemTitle: '大数据统筹管理系统',
      home: {}
    }
  },
  created () {
    // 查找默认首页
    const menuRoutes = this.$store.state.global.menuRoutes
    this.home = menuRoutes.find(item => item.meta.type === 'home') || { name: 'home-Home' }
  },
  methods: {
    // 退出账户
    loginOut () {
      // 清除token
      this.$utils.sessionStorageRemove('token')
      // 跳转到登录页
      this.$router.push('/login')
    },
    // logo标题点击
    logoClick () {
      this.$router.push({ name: this.home.name })
    }
  }
}
</script>

<style lang="less" scoped>
.base-header {
  height: 110px;
  background: url("~_ats/img/head.png") no-repeat center center;
  background-size: 100% 100%;
  // position: relative;
  z-index: 100;
}

.base-header h1 {
  color: var(--protitle-color);
  text-align: center;
  font-size: 33px;
  line-height: 80px;
}

.base-header h1 img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
</style>
