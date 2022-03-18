<template>
  <div class="menu">
    <MenuItem :menu-list="menuList.slice(0, 4)" />
    <MenuItem
      :menu-list="menuList.slice(4)"
      is-scale
    />
  </div>
</template>

<script>
// 导入Vuex
import MenuItem from './MenuItem.vue'
export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  data () {
    return {
      // 菜单列表
      menuList: [
        { id: '7', key: 7, name: '巡查整改' },
        {
          id: '1',
          key: 1,
          name: '预警监控',
          list: [
            { id: '1-1', key: 1, name: '测试1', parentId: '1' },
            { id: '1-2', key: 2, name: '测试2', parentId: '1' },
            { id: '1-3', key: 3, name: '测试3', parentId: '1' },
            { id: '1-4', key: 4, name: '测试4', parentId: '1' }
          ]
        },
        { id: '2', key: 2, name: '扬尘监测' },
        { id: '3', key: 3, name: '噪声监测' },
        { id: '4', key: 4, name: '车洗裸土' },
        {
          id: '5', key: 5, name: 'AI识别', list: [
            { id: '1-1', key: 1, name: 'AI识别安装率', parentId: '1' },
            { id: '1-2', key: 2, name: '测试2', parentId: '1' },
            { id: '1-3', key: 3, name: '测试3', parentId: '1' },
            { id: '1-4', key: 4, name: '测试4', parentId: '1' }
          ]
        },
        { id: '6', key: 6, name: '项目管理' },
        { id: '8', key: 8, name: '管理员' }
      ]
    }
  },
  mounted () {
    this.menuList = this.$utils.compareSort(this.menuList, 'key')
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: -10px;
  padding: 0 12px;
  z-index: 99;
}
</style>