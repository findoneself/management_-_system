<template>
  <!--视频管控 -->
  <BeautifulWrapper
    :wraStyle="{ inPadding: '0px' }"
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
    <div class="video-content">
      <template v-if="currentBtn === 'el-icon-one'">
        <BeVideo :src="currentSrc" />
        <BeautifulCard
          title="点位操作"
          :isTriangle='false'
          class="console-card"
          :card-style="{borderWidth: '0.125rem 0 0 0.125rem'}"
        >
          <div class="console-panel">

          </div>
        </BeautifulCard>
      </template>
    </div>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeVideo from '_com/common/BeVideo'
import BeautifulCard from '_com/common/BeautifulCard'

export default {
  name: 'VideoIndex',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    BeVideo
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
      // 当前点击的右侧按钮
      currentBtn: 'el-icon-one',
      // 右侧按钮列表
      menuButtons: ['el-icon-one', 'el-icon-menu', 'el-icon-s-grid'],
      // 当前视频的src地址
      currentSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
    }
  },
  methods: {
    menuBtnClick (val) {
      this.currentBtn = val
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
    color: #0e5dfb;
    transition: all 0.2s;
    cursor: pointer;
  }
  .el-icon-one {
    width: 20px;
    height: 20px;
    display: block;
    background-color: #0e5dfb;
    border-radius: 2px;
  }
  .menubtn-active {
    color: #289cff;
  }
  .menubtn-active.el-icon-one {
    background-color: #289cff;
  }
}
.video-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  .video-player {
    flex: 1;
    height: 100%;
  }
  /deep/ .video-js {
    display: flex;
    justify-content: center;
  }
  .console-card {
    width: 21%;
    height: 100%;
  }
}
</style>