<template>
  <div
    class="be-image"
    :style="imgStyle"
    v-show="visibale"
  >
    <span
      v-for="val in borderIcons"
      :key="val"
      class="border-icon"
      :class="'border-' + val"
    />
    <i
      class="el-icon-close close-btn"
      @click="closeClick"
      v-show="borderIcon.includes('close')"
    ></i>
    <img
      :src="imageInfo.url"
      :alt="imageInfo.alt"
    >
  </div>
</template>

<script>
export default {
  name: 'BeImage',
  props: {
    // ['top', 'right', 'bottom', 'left', 'triangle', 'close']
    borderIcon: {
      type: Array,
      default () {
        return ['top', 'right', 'bottom', 'left', 'close']
      }
    },
    // 图片容器的宽度
    // 传字符串的时候传px
    wimWidth: {
      type: [Number, String],
      default () {
        return 200
      }
    }
  },
  data () {
    return {
      visibale: false,
      imgStyle: {},
      // 图片信息
      imageInfo: {
        url: '',
        alt: ''
      }
    }
  },
  computed: {
    // 关闭按钮过滤
    borderIcons () {
      return this.borderIcon.filter(val => val !== 'close')
    }
  },
  methods: {
    showImg (e, img) {
      if (!e) return console.error('必须传入event节点')
      if (!img) return console.error('必须传入图片地址')
      if (typeof img === 'string') {
        this.imageInfo.url = img
      } else {
        // 计算位置后再显示
        this.imageInfo = img
        this.imageInfo.url = 'http://bj.xpei.ren/zt/work-note/images/head_user.gif'
      }
      console.log(e)
      console.log(img)
      this.computedStyle(e)
    },
    // 计算位置
    computedStyle (e) {
      // 位置
      let sty = {}
      let wid = parseInt(this.wimWidth)
      // 设置容器大小
      const val = (wid / 16).toFixed(2) + 'rem'
      sty.width = val
      // 设置容器位置
      const dwidth = document.documentElement.clientWidth || document.body.clientWidth
      const dheight = document.documentElement.clientHeight || document.body.clientHeight
      // 如果容器宽度超出了屏幕，则偏左显示
      const x = dwidth - e.clientX > wid ? e.clientX : (e.clientX - wid - 20)
      // 如果容器高度超出了屏幕，则上边显示
      const y = dheight - e.clientY > wid ? e.clientY : e.clientY - wid
      sty.left = (x / 16).toFixed(2) + 'rem'
      sty.top = (y / 16).toFixed(2) + 'rem'
      this.imgStyle = sty
      this.visibale = true
    },
    // 关闭弹窗
    closeClick () {
      this.visibale = false
    }
  }
}
</script>

<style scoped>
.be-image {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  max-width: 500px;
  padding: 10px;
  border: 1px solid var(--wrapper-bdcolor);
  background: #02004d4a;
  box-shadow: inset -1px -1px 10px var(--shadow-color),
    inset 1px 1px 10px var(--shadow-color);
}
.be-image img {
  display: block;
  width: 100%;
  height: auto;
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
.close-btn {
  position: absolute;
  z-index: 21;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #31bcf2;
  cursor: pointer;
}
.close-btn:hover,
.close-btn:active {
  color: var(--triangle-color);
}
</style>