<template>
  <div
    class="beautiful-wrapper"
    :style="{padding: setStyle.outPadding}"
  >
    <div
      class="beau-container"
      :style="{borderWidth: setStyle.borderWidth}"
    >
      <span
        v-for="val in borderIcons"
        :key="val"
        class="border-icon"
        :class="'border-' + val"
      />
      <!-- tabs导航 -->
      <div class="menu-tabs">
        <ul class="menu-tablist">
          <template v-if="!isTitle && tabsList.length > 0">
            <li
              v-for="(item, index) in tabsList"
              :style="{zIndex: 10 - index, cursor: 'pointer'}"
              @click="tabClick(item)"
              :class="currentTabs.id === item.id ? 'tabmenu-active' : ''"
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
      <!-- 内容部分 -->
      <div
        class="beau-content"
        :style="{padding: setStyle.inPadding}"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import MenuTab from '_com/menu/MenuTab'
export default {
  name: 'BeautifulWrapper',
  components: {
    // MenuTab
  },
  props: {
    // outPadding：外边内容padding
    // inPadding:内容区的padding
    // borderWidth：四个边的边框宽度
    wraStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    // 边框图标数组
    borderIcon: {
      type: Array,
      default () {
        return ['top', 'right', 'bottom', 'left', 'triangle']
      }
    },
    // 是否显示标题
    isTitle: {
      type: Boolean,
      default: false
    },
    // tabs数据
    tabsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    // 边框过滤
    borderIcons () {
      return this.isTitle || this.tabsList.length > 0 ? this.borderIcon.filter(val => val !== 'top') : this.borderIcon
    },
    // 容器样式
    setStyle () {
      return Object.assign({
        outPadding: '1.25rem 1.25rem',
        inPadding: '1.25rem 1.25rem',
        borderWidth: '0.125rem 0.125rem'
      }, this.wraStyle)
    },
    // 当前路由
    curRoute: {
      get () {
        return this.$route.meta || false
      }
    },
    // 当前点击的tabs
    currentTabs () {
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
.beau-container {
  position: relative;
  border-style: solid;
  border-color: var(--wrapper-bdcolor);
  box-shadow: inset -3px -3px 30px var(--shadow-color),
    inset 3px 3px 30px var(--shadow-color);
}
.beau-content {
  min-height: 100px;
}
.border-icon {
  position: absolute;
  z-index: 19;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.border-top {
  top: -2px;
  left: -2px;
  width: 73px;
  height: 55px;
  background-image: url("~_ats/img/border-top.png");
}
.border-right {
  top: -2px;
  right: -2px;
  width: 74px;
  height: 56px;
  background-image: url("~_ats/img/border-right.png");
}
.border-bottom {
  bottom: -2px;
  right: -2px;
  width: 60px;
  height: 44px;
  background-image: url("~_ats/img/border-bottom.png");
}
.border-left {
  bottom: -2px;
  left: -2px;
  width: 74px;
  height: 56px;
  background-image: url("~_ats/img/border-left.png");
}
.border-triangle {
  border-style: solid;
  border-width: 5px;
  bottom: 4px;
  right: 4px;
  border-color: transparent var(--triangle-color) var(--triangle-color)
    transparent;
}
/* menu-tab */
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