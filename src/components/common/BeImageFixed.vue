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
      :src="imageInfo.imgUrl"
      :alt="imageInfo.imgAlt"
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
    maxWidth: {
      type: [Number, String],
      default () {
        return 300
      }
    }
  },
  data () {
    return {
      // 是否显示
      visibale: false,
      // 图片容器大小
      imgStyle: {},
      // 图片信息
      imageInfo: {
        imgUrl: '',
        imgAlt: ''
      }
    }
  },
  computed: {
    // 关闭按钮过滤
    borderIcons () {
      return this.borderIcon.filter(val => val !== 'close')
    },
    // 计算最大宽度
    maxwid () {
      return (parseInt(this.maxWidth) / 16).toFixed(2) + 'rem'
    }
  },
  methods: {
    showImg (e, img) {
      this.visibale = true
      if (!e) return console.error('必须传入event节点')
      if (!img) return console.error('必须传入图片地址')
      const url = typeof img === 'string' ? img : img.imgUrl
      let imgNew = new Image()
      imgNew.src = url
      // 判断是否有缓存
      if (imgNew.complete) {
        this.computedStyle(e, imgNew)
      } else {
        // 加载完成执行
        imgNew.onload = () => {
          this.computedStyle(e, imgNew)
        }
      }
    },
    // 计算位置
    computedStyle (e, img) {
      // 位置
      let sty = {}
      sty.maxWidth = this.maxwid
      // 最大宽度，因为是容器的最大宽度，不是图片，要喝图片本身比较就得减去两边的padding
      const mawid = parseInt(this.maxWidth) - 20
      // 获取可视窗口的宽高
      const dwidth = document.documentElement.clientWidth || document.body.clientWidth
      const dheight = document.documentElement.clientHeight || document.body.clientHeight
      // 定义如果图片宽度大于最大宽度，则使用最大宽度，否则使用图片宽度
      const iwidth = mawid > img.width ? img.width : mawid
      // 高度根据比例来计算
      const iheight = parseInt(iwidth / img.width * img.height)
      // 如果容器宽度超出了屏幕，则偏左显示
      const x = dwidth - e.clientX > iwidth ? (e.clientX + 10) : (e.clientX - iwidth - 35)
      // 如果容器高度超出了屏幕，则上边显示
      const y = dheight - e.clientY > iheight ? e.clientY : e.clientY - iheight - 15
      sty.width = ((iwidth + 20) / 16).toFixed(2) + 'rem'
      sty.height = ((iheight + 20) / 16).toFixed(2) + 'rem'
      sty.left = (x / 16).toFixed(2) + 'rem'
      sty.top = (y / 16).toFixed(2) + 'rem'
      this.imgStyle = sty
      this.imageInfo.imgUrl = img.src
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
.close-btn {
  position: absolute;
  z-index: 21;
  top: 6px;
  right: 6px;
  font-size: 16px;
  font-weight: bold;
  color: #31bcf2;
  cursor: pointer;
}
.close-btn:hover,
.close-btn:active {
  color: var(--triangle-color);
}
</style>