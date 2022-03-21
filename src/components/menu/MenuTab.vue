<template>
  <div class="menu-tabs">
    <ul class="menu-tablist">
      <template v-if="!isTitle && tabsList.length > 0">
        <li
          v-for="(item, index) in tabsList"
          :style="{zIndex: 10 - index, cursor: 'pointer'}"
          @click="tabClick(item)"
          :class="curTabs.id === item.id ? 'tabmenu-active' : ''"
          :key="item.id"
        >{{ item.title }}</li>
      </template>
      <li
        v-if="isTitle"
        :style="{zIndex: 10}"
        class="tabmenu-active"
      >{{ curRoute.alias || '' }}</li>
      <template v-if="isTitle || tabsList.length > 0">
        <li class="tab-shadow tab-shadow1"></li>
        <li class="tab-shadow tab-shadow2"></li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuTab',
  props: {
    // 是否显示标题
    isTitle: {
      type: Boolean
    },
    // tabs的数据，{id: '', title: ''}
    tabsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // 当前路由
    curRoute: {
      get () {
        return this.$route.meta || false
      }
    },
    // 当前点击的tabs
    curTabs () {
      const obj = this.$store.state.global.currentTab
      return obj.id ? obj : this.tabsList[0]
    }
  },
  methods: {
    // tabs点击
    tabClick (item) {
      this.$store.commit('global/setCurrentTab', item)
    }
  }
}
</script>

<style scoped>
.menu-tabs {
  overflow: hidden;
}
.menu-tablist {
  display: flex;
  align-items: center;
}
.menu-tablist > li {
  position: relative;
  width: 171px;
  height: 51px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-left: -22px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  background-image: url("~_ats/img/tabmenu.png");
}
.menu-tablist .tabmenu-active {
  background-image: url("~_ats/img/tabmenu-active.png");
}
.menu-tablist .tab-shadow {
  margin-left: -150px;
}
.menu-tablist .tab-shadow1 {
  z-index: 2;
  opacity: 0.5;
}
.menu-tablist .tab-shadow2 {
  z-index: 1;
  opacity: 0.3;
}
</style>