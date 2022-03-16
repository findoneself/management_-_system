<template>
  <div class="home-header">
    头部
  </div>
</template>

<script>
// 导入清除sessionStorage的方法
import { sessionStorageRemove } from '_con/utils'
export default {
  name: 'HomeHeader',
  methods: {
    // 退出账户
    loginOut () {
      // 清除token
      sessionStorageRemove('token')
      // 跳转到登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: inherit;
}
.logo {
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 46px;
    border-radius: 50%;
  }
  span {
    margin-left: 12px;
    font-size: 18px;
    color: #dadada;
  }
}
</style>
