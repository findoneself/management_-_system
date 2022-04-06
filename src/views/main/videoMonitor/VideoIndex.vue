<template>
  <!--扬尘检测首-地图 -->
  <BeautifulWrapper
    :wraStyle="currentTabs === '1' ? { inPadding: '0px' } : {}"
    :tabsList="tabsList"
    v-model="currentTabs"
  >
    <!-- 右侧按钮 -->
    <div
      slot="menuRight"
      class="menu-btn"
    >
      <i
        v-for="val in menuButtons"
        :key="val"
        class="menubtn-item"
        :class="[val, currentBtn === val && 'menubtn-active']"
        @click="menuBtnClick(val)"
      ></i>
    </div>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
export default {
  name: 'VideoIndex',
  components: {
    BeautifulWrapper
  },
  data () {
    return {
      // tabs列表
      tabsList: [
        { id: '1', title: '扬尘视频' },
        { id: '2', title: 'AI视频' },
        { id: '3', title: '车辆冲洗视频' }
      ],
      // 当前选择的tabs
      currentTabs: '1',
      currentBtn: 'el-icon-one',
      // 右侧按钮列表
      menuButtons: ['el-icon-one', 'el-icon-menu', 'el-icon-s-grid']
    }
  }
}
</script>

<style scoped lang="less">
.menu-btn {
  position: relative;
  z-index: 99;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  .menubtn-item {
    margin-left: 10px;
    font-size: 26px;
    color: #289cff;
    cursor: pointer;
  }
  .el-icon-one {
    width: 20px;
    height: 20px;
    display: block;
    background-color: #289cff;
    border-radius: 2px;
  }
}
</style>