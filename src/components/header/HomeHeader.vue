<template>
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
.head {
  height: 6.9rem;
  background: url('../../assets/img/head.png') no-repeat center center;
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
        background: url('../../assets/img/menubg.png') no-repeat center center;
        background-size: 100%;
        margin: 0 0.93rem;
        width: 6.25rem;
        height: 2.25rem;
        line-height: 2.25rem;
        text-align: center;
        color: #fff;
        a {
          color: #fff;
        }
      }
      .menubgr{
        background: url('../../assets/img/menubgr.png') no-repeat center center;
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
  font-size: 2.5rem;
  line-height: 4.8rem;
  margin: 0;
}

.head h1 img {
  // width: 1.5rem;

  display: inline-block;
  vertical-align: middle;
  margin-right: 0.2rem;
}

</style>
