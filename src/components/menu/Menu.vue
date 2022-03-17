<template>
  <div class="menu">
    <div
      class="menu-item"
      v-for="item in menuList"
      :key="item.id"
    >
      <!-- 一级菜单 -->
      <div
        class="menu-value"
        @click="menuClick(item)"
        :class="item.isActive ? 'active-menu' : ''"
        v-if="!item.list || item.list.length === 0"
      >{{ item.name }}</div>
      <template v-else>
        <div class="menu-value">{{ item.name }}</div>
        <!-- 二级菜单 -->
        <ul class="sub-menu">
          <li
            class="submenu-item"
            v-for="sub in menu.list"
            :class="item.isActive ? 'active-menu' : ''"
            @click="menuClick(sub)"
            :key="sub.id"
          >{{ sub.name }}</li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
// 导入Vuex
import { mapMutations } from 'vuex'
export default {

  name: 'Menu',
  data () {
    return {
      // 菜单列表
      menuList: [
        {
          id: '1',
          name: '预警监控',
          list: [
            {
              id: '1-1', name: '测试1', parentId: '1', children: [
                { id: '1-1-1', name: 'wgwg', parentId: '1-1' }
              ]
            },
            { id: '1-2', name: '测试2', parentId: '1' },
            { id: '1-3', name: '测试3', parentId: '1' },
            { id: '1-4', name: '测试4', parentId: '1' }
          ]
        },
        { id: '2', name: '扬尘监测' },
        { id: '3', name: '噪声监测' },
        { id: '4', name: '车洗裸土' },
        { id: '5', name: 'AI识别' },
        { id: '6', name: '项目管理' },
        { id: '7', name: '巡查整改' },
        { id: '8', name: '管理员' }
      ],
      // 权限菜单列表
      rightMenuRoutes: [
        { id: '1', path: '/dustMonitoring' },
        { id: '2', path: '/noiseMonitoring' },
        { id: '3', path: '/carWashing' },
        { id: '4', path: '/aiDistinguish' }
      ]
    }
  },
  methods: {
    ...mapMutations(['setBreadCrumb', 'setActiveMenu']),
    menuClick (item) {
      item.isActive
      this.routeHandle(item)
    },
    // 路由操作
    routeHandle (menu) {
      // 设置面包屑导航
      const { obj } = this.$utils.familyTree(this.menuList, menu.id)
      // 查找菜单是否存在权限
      var route = this.rightMenuRoutes.find(item => item.id === menu.id)
      if (route.length > 0) {
        this.$router.push(route.path)
        this.setBreadCrumb(obj)
        this.setActiveMenu(menu)
      }
    }
  }
}
</script>

<style scoped>
</style>