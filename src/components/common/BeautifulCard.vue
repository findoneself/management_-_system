<template>
  <div class="beautiful-card"  :style="{width: width,height:height}">
    <div class="card-header">
      <h2 :style="{color: titleColor}">{{ title }}</h2>
      <span class="card-title-icon icon1"></span>
      <span class="card-title-icon icon2"></span>
      <span class="card-title-line"></span>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <span
      v-for="val in 4"
      :key="val"
      class="triangle-icon"
      :style="{borderWidth: triangleSize, borderColor: triangleColor}"
    ></span>
  </div>
</template>

<script>
export default {
  name: 'BeautifulCard',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: '#fff'
    },
    // 三角颜色
    triangleColor: {
      type: String,
      default: '#39dffb'
    },
    width:{
      type:String,
      default:'23.75rem'
    },
    height:{
      type:String,
      default:'33.13rem'
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
.beautiful-card {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  --title-bgcolor: #0f2b8c;
  border: 1px solid #3048b8;
  box-shadow: inset -3px -3px 30px rgba(48, 82, 184, 0.5),
    inset 3px 3px 30px rgba(48, 82, 184, 0.5);
}
.card-header {
  position: relative;
  width: 140px;
  text-align: center;
  line-height: 30px;
  background-color: var(--title-bgcolor);
}

.card-header::after,
.card-header::before {
  content: "";
  position: absolute;
  top: 0;
  border-width: 15px 4px;
  border-style: solid;
}
.card-header::before {
  left: -8px;
  border-color: var(--title-bgcolor) var(--title-bgcolor) transparent
    transparent;
}
.card-header::after {
  right: -8px;
  border-color: var(--title-bgcolor) transparent transparent
    var(--title-bgcolor);
}
.card-header > h2 {
  width: 100%;
  font-size: 16px;
  padding: 0 5px;
  letter-spacing: 2px;
}
.card-title-icon {
  position: absolute;
  bottom: -4px;
  width: 12px;
  height: 0;
  border-width: 4px 1px 0 1px;
  border-style: solid;
  border-color: var(--title-bgcolor) transparent transparent transparent;
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
  background-color: #4d82ca;
}
.card-content {
  padding: 1.2rem .625rem;
}
.triangle-icon {
  position: absolute;
  border-style: solid;
  border-width: 4px;
}
.triangle-icon:nth-of-type(1) {
  top: 4px;
  left: 4px;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
}
.triangle-icon:nth-of-type(2) {
  top: 4px;
  right: 4px;
  border-left-color: transparent !important;
  border-bottom-color: transparent !important;
}
.triangle-icon:nth-of-type(3) {
  bottom: 4px;
  left: 4px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
}
.triangle-icon:nth-of-type(4) {
  bottom: 4px;
  right: 4px;
  border-top-color: transparent !important;
  border-left-color: transparent !important;
}
</style>