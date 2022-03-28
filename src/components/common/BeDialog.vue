<template>
  <!-- 弹窗组件 -->
  <el-dialog
    width="100%"
    height="100%"
    top="0px"
    :visible.sync="visible"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :modal="modal"
    class="be-dialog"
    @closed="onCancel"
  >
    <slot></slot>
    <!-- 底部按钮部分 -->
  </el-dialog>
</template>

<script>
export default {
  name: 'BeDialog',
  props: {
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  watchL: {
    $route: {
      handler () {
        this.visible = false
      }
    }
  },
  methods: {
    // 弹窗显示与隐藏
    showDialog (flag = false) {
      this.visible = flag
    },
    // 弹窗关闭回调
    onCancel () {
      this.visible = false
      this.$emit('onCancel')
    }
  }
}
</script>

<style scoped lang="less">
.be-dialog {
  position: absolute;
}
/deep/ .el-dialog {
  margin: 0;
  height: 100%;
  background: transparent;
  color: inherit;
}
/deep/ .el-dialog__body {
  color: inherit;
  height: 100%;
  padding: 10px 30px;
}
/deep/ .el-dialog__header {
  display: none;
}
</style>