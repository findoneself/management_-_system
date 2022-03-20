<template>
  <div class="beautiful-wrapper">
    <div class="beau-container">
      <span
        v-for="val in borderIcons"
        :key="val"
        class="border-icon"
        :class="'border-' + val"
      />
      <!-- tabs导航 -->
      <MenuTab
        :tabs-list="tabsList"
        :is-title="isTitle"
      ></MenuTab>
      <div class="beau-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTab from '_com/menu/MenuTab'
export default {
  name: 'BeautifulWrapper',
  components: {
    MenuTab
  },
  props: {
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
    borderIcons () {
      return this.isTitle || this.tabsList.length > 0 ? this.borderIcon.filter(val => val !== 'top') : this.borderIcon
    }
  }
}
</script>

<style scoped>
.beautiful-wrapper {
  padding: 20px;
}
.beau-container {
  position: relative;
  border: 2px solid #0e5dfb;
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
  border-color: transparent #39dffb #39dffb transparent;
}
</style>