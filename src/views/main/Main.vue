<template>
  <el-container class="base-wrapper">
    <!-- 头部区域 -->
    <home-header />
    <!-- 页面主体区 -->
    <el-container class="base-container">
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 v-if="isRouterAlive" -->
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view :key="$route.name"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入子组件
import HomeHeader from '_com/header/HomeHeader'
import dictList from '_pls/dict'

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
  mounted () {
    this.$nextTick(() => {
      // 获取所有字典数据，处理后存储在vuex
      // this.initAllDict()
    })
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
        // 获取当前用户的默认首页id是否存在
        const defaultId = this.$store.state.global.userInfo.homeId
        // 查找默认首页
        const home = menuRoutes.find(item => item.meta.type === 'home')
        if (defaultId) {
          // 查找当前用户默认首页的路由
          const isHome = menuRoutes.find(item => item.meta.id === defaultId)
          if (isHome) {
            // 查找当前路由是否在用户的菜单权限中
            const isRight = menuList.find(menu => menu.id === isHome.meta.id)
            if (isRight) {
              // 如果权限菜单存在，则跳转至用户的默认首页
              this.$router.push({ name: isHome.name })
            } else {
              // 如果不存在权限
              this.routeDefalut(home, '当前账户首页无权限访问，跳转至默认首页！')
            }
          } else {
            this.routeDefalut(home, '当前账户首页不存在，跳转至默认首页！')
          }
        } else {
          this.routeDefalut(home, '当前账户未设置首页，跳转至默认首页！')
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
    },
    // 获取所有字典数据
    initAllDict () {
      this.$http({
        url: '/dict/getAllDict'
      }).then(res => {
        if (res.code === 200) {
          const list = res.data.list
          let temp = {}
          list.map(item => {
            if (temp[item.type]) {
              temp[item.type].list.push(item)
            } else {
              temp[item.type] = { list: [item] }
            }
          })
          this.$store.commit('global/setDictData', temp)
        }
      }, () => {
        this.$message.warning('初始化字典失败！')
        const list = dictList
        let temp = {}
        list.map(item => {
          if (temp[item.type]) {
            temp[item.type].push(item)
          } else {
            temp[item.type] = [item]
          }
        })
        this.$store.commit('global/setDictData', temp)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.base-wrapper {
  height: 100%;
  display: block;
}
.base-container {
  display: block;
  height: calc(100% - 110px);
}
.el-main {
  height: 100%;
  padding: 0;
  overflow: visible;
}
</style>
