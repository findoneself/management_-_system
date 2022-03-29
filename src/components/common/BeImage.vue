<template>
  <!-- 没做完，为了实现条数据都有一个查看图片的，响应更快 -->
  <div
    class="be-image"
    :style="imgStyle"
  >
    <span
      v-for="val in borderIcons"
      :key="val"
      class="border-icon"
      :class="'border-' + val"
    />
    <i
      class="el-icon-close close--icon"
      @click="closeClick"
      v-show="borderIcon.includes('close')"
    ></i>
    <img :src="imgUrl">
  </div>
</template>

<script>
export default {
  name: 'BeImage',
  props: {
    borderIcon: {
      type: Array,
      default () {
        return ['top', 'right', 'bottom', 'left', 'close']
      }
    },
    // 图片容器的宽度单位rem
    // 传字符串的时候传
    maxWidth: {
      type: String,
      default: '18.75rem'
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgStyle: {}
    }
  },
  computed: {
    // 关闭按钮过滤
    borderIcons () {
      return this.borderIcon.filter(val => val !== 'close')
    }
  },
  watch: {
    imgUrl: {
      handler (val) {
        this.computedStyle(val)
      },
      immediate: true
    }
  },
  methods: {
    // 关闭弹窗
    closeClick () {
      this.$emit('closeClick')
    },
    // 计算位置
    computedStyle (url) {
      let sty = {}
      sty.maxWidth = this.maxWidth
      let imgNew = new Image()
      imgNew.src = url
      // 判断是否有缓存
      if (imgNew.complete) {
        sty.width = ((imgNew.width + 20) / 16).toFixed(2) + 'rem'
        this.imgStyle = sty
      } else {
        // 加载完成执行
        imgNew.onload = () => {
          sty.width = ((imgNew.width + 20) / 16).toFixed(2) + 'rem'
          this.imgStyle = sty
        }
      }
    }
  }
}
</script>

<style scoped>
.be-image {
  position: fixed;
  z-index: 99;
  max-width: 500px;
  padding: 10px;
  transition: all 0.5s;
  border: 1px solid var(--wrapper-bdcolor);
  background: #02004d4a;
  box-shadow: inset -1px -1px 10px var(--shadow-color),
    inset 1px 1px 10px var(--shadow-color);
}
.be-image img {
  display: block;
  width: 100%;
  height: 100%;
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
  width: 27px;
  height: 20px;
  background-image: url("~_ats/img/border-top.png");
}
.border-right {
  top: -2px;
  right: -2px;
  width: 27px;
  height: 20px;
  background-image: url("~_ats/img/border-right.png");
}
.border-bottom {
  bottom: -2px;
  right: -2px;
  width: 27px;
  height: 20px;
  background-image: url("~_ats/img/border-bottom.png");
}
.border-left {
  bottom: -2px;
  left: -2px;
  width: 27px;
  height: 20px;
  background-image: url("~_ats/img/border-left.png");
}
.close--icon {
  top: 6px;
  right: 6px;
  font-size: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>