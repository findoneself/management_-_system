<template>
  <div
    class="beautiful-card"
    :style="{borderWidth: setCardStyle.borderWidth}"
  >
    <div
      class="card-header"
      v-if="isShowHead"
    >
      <h2>{{ title }}</h2>
      <span class="card-title-icon icon1"></span>
      <span class="card-title-icon icon2"></span>
      <span class="card-title-line"></span>
    </div>
    <div
      :class="isShowHead ? 'card-content' : 'card-content-notitle'"
      :style="{padding: setCardStyle.padding}"
    >
      <slot></slot>
    </div>
    <template v-if="isTriangle">
      <span
        v-for="val in riangle"
        :key="val"
        :class="'triangle-' + val"
        class="triangle-icon"
      ></span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BeautifulCard',
  props: {
    // card样式
    cardStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否需要三角
    isTriangle: {
      type: Boolean,
      default: true
    },
    // 三角的数据
    riangle: {
      type: Array,
      default () {
        return ['top', 'right', 'bottom', 'left']
      }
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示标题
    isShowHead: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    setCardStyle () {
      return Object.assign({
        padding: '1.2rem 0.875rem',
        borderWidth: '0.0625rem 0.0625rem'
      }, this.cardStyle)
    }
  }
}
</script>

<style scoped>
.beautiful-card {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border-color: var(--card-bdcolor);
  border-style: solid;
  box-shadow: inset -3px -3px 30px var(--shadow-color),
    inset 3px 3px 30px var(--shadow-color);
}
.card-header {
  position: relative;
  /* width: 140px; */
  padding: 0 14px;
  text-align: center;
  line-height: 32px;
  background-color: var(--card-title-bgcolor);
}

.card-header::after,
.card-header::before {
  content: "";
  position: absolute;
  top: 0;
  border-width: 16px 4px;
  border-style: solid;
}
.card-header::before {
  left: -8px;
  border-color: var(--card-title-bgcolor) var(--card-title-bgcolor) transparent
    transparent;
}
.card-header::after {
  right: -8px;
  border-color: var(--card-title-bgcolor) transparent transparent
    var(--card-title-bgcolor);
}
.card-header > h2 {
  width: 100%;
  font-size: 16px;
  padding: 0 5px;
  letter-spacing: 2px;
  color: var(--card-title-color);
}
.card-title-icon {
  position: absolute;
  bottom: -4px;
  width: 12px;
  height: 0;
  border-width: 4px 1px 0 1px;
  border-style: solid;
  border-color: var(--card-title-bgcolor) transparent transparent transparent;
}
.icon1 {
  left: 0;
}
.icon2 {
  right: 0;
}
.card-title-line {
  position: absolute;
  bottom: -3px;
  left: 50%;
  height: 1px;
  border-radius: 2px;
  transform: translateX(-50%);
  width: calc(100% - 28px);
  background-color: var(--card-title-linecolor);
}
.card-content {
  width: 100%;
  height: calc(100% - 32px);
}
.card-content-notitle {
  width: 100%;
  height: 100%;
}
.triangle-icon {
  position: absolute;
  border-style: solid;
  border-width: 4px;
}
.triangle-top {
  top: 4px;
  left: 4px;
  border-color: var(--triangle-color) transparent transparent
    var(--triangle-color);
}
.triangle-right {
  top: 4px;
  right: 4px;
  border-color: var(--triangle-color) var(--triangle-color) transparent
    transparent;
}
.triangle-bottom {
  bottom: 4px;
  right: 4px;
  border-color: transparent var(--triangle-color) var(--triangle-color)
    transparent;
}
.triangle-left {
  bottom: 4px;
  left: 4px;
  border-color: transparent transparent var(--triangle-color)
    var(--triangle-color);
}
</style>