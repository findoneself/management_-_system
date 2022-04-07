<template>
  <div class="base-header">
    <!-- title -->
    <h1><span
        style="cursor: pointer;"
        @click="logoClick"
      >{{ systemTitle }}</span></h1>
    <Menu />
    <!-- 账户信息 -->
    <div class="user-info">
      <div class="logout">
        <span
          class="logout-text"
          @click="loginOut"
        >退出</span>
        <span class="logout-line"></span>
        <i
          class="el-icon-caret-bottom logout-btn"
          @click="moreClick"
        ></i>
      </div>
      <div
        class="user-photo"
        @click="userClick"
      >
        <div class="user-phopo-img">
          <img
            v-if="userInfo.photo"
            :src="userInfo.photo"
            :alt="userInfo.fullname"
          >
          <img
            v-else
            src="~_ats/img/logo.jpg"
          >
        </div>
      </div>
    </div>
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
      systemTitle: '江苏本初一体化管理平台',
      // 默认首页
      home: {},
      userInfo: {} || this.$store.state.global.userInfo
    }
  },
  mounted () {
    // 查找默认首页
    const menuRoutes = this.$store.state.global.menuRoutes
    this.home = menuRoutes.find(item => item.meta.type === 'home') || { name: 'home-Home' }
  },
  methods: {
    // 退出账户
    loginOut () {
      // 清除token
      this.$cookie.delete('token')
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 三角点击更多
    moreClick () { },
    // 用户头像点击
    userClick () { },
    // logo标题点击
    logoClick () {
      this.$router.push({ name: this.home.name })
    }
  }
}
</script>

<style lang="less" scoped>
.base-header {
  position: relative;
  height: 110px;
  background-size: 100% 100%;
  // position: relative;
  z-index: 100;
}

.base-header h1 {
  color: var(--protitle-color);
  text-align: center;
  font-size: 33px;
  line-height: 80px;
  background: url("~_ats/img/head_two.png") no-repeat center center;
  background-size: 100% 100%;
}

.base-header h1 img {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}
// 用户信息
.user-info {
  position: absolute;
  z-index: 99;
  top: 6px;
  right: 12px;
  .logout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 96px;
    height: 34px;
    background: #082fa4;
    border: 1px solid #0c7bff;
    border-radius: 4px;
    padding: 0 6px;
  }
  .logout-text {
    width: 47px;
    text-align: right;
    padding: 0 3px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    color: var(--color-text);
    transition: color 0.2s;
  }
  .logout-text:hover,
  .logout-text:focus,
  .logout-btn:hover,
  .logout-btn:focus {
    color: var(--triangle-color);
  }
  .logout-line {
    width: 2px;
    height: 16px;
    background: #428efe;
    opacity: 0.5;
    border-radius: 1px;
  }
  .logout-btn {
    cursor: pointer;
    font-size: 18px;
    margin-top: -3px;
    transition: color 0.2s;
  }
  .user-photo {
    position: absolute;
    top: 50%;
    margin-top: -23px;
    left: -37px;
    width: 46px;
    height: 46px;
    border-radius: 10% 50% 50% 50%;
    padding: 5px;
    background: url("~_ats/img/user-photo.png") no-repeat center / 100% 100%
      #0934ae;
  }
  .user-phopo-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #0c7bff;
  }
}
</style>
