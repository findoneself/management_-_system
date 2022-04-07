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
            <span
              v-for="ix in 8"
              :key="ix"
              class="console-triangle"
              @click="consoleClick(ix)"
            ></span>
          </div>
          <ul class="console-btnlist">
            <li
              v-for="(btns, bindex) in consoleBtnlist"
              :key="bindex"
            >
              <span
                v-for="val in btns"
                :key="val"
                class="console-btnitem"
                :class="'console-' + val"
                @click="consoleBtnClick(val)"
              ></span>
            </li>
          </ul>
          <el-form
            :model="consoleForm"
            label-width="5rem"
          >
            <el-form-item label="步长：">
              <el-input
                v-model="consoleForm.step"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="预置点：">
              <el-input
                v-model="consoleForm.preset"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
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
      currentSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      // 控制台按钮列表
      consoleBtnlist: [
        ['enlarge', 'narrow'],
        ['1', '2'],
        ['zfocus', 'focus']
      ],
      // 视频控制表单
      consoleForm: {
        step: '',
        preset: ''
      }
    }
  },
  methods: {
    // tabs右侧模式点击
    menuBtnClick (val) {
      this.currentBtn = val
    },
    // 控制台圆盘按钮点击
    consoleClick (index) {

    },
    // 控制台按钮点击
    consoleBtnClick (val) {

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
  // ----单个视频
  .video-player {
    flex: 1;
    height: 100%;
    width: 78%;
  }
  /deep/ .video-js {
    display: flex;
    justify-content: center;
  }
  // 操作盘
  .console-card {
    width: 21%;
    height: 100%;
    flex-shrink: 0;
    /deep/ .card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .console-panel {
    position: relative;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background-color: #035cd2;
    margin: 0 auto;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &::before {
      width: 42%;
      height: 42%;
      border-radius: 50%;
      background-color: #0268ee;
      box-shadow: 0 0 70px #ffffff94;
    }
    &::after {
      width: 11%;
      height: 11%;
      border-radius: 50%;
      transition: all 0.3s;
      border: 5px solid var(--color-text);
    }
    &:hover::after {
      // width: 13%;
      // height: 13%;
    }
  }
  .console-triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: var(--color-text) var(--color-text) transparent transparent;
    transition: all 0.2s;
    border-radius: 14px 8px 14px 0;
    cursor: pointer;
    &:hover,
    &focus {
      border-color: #289cff #289cff transparent transparent;
    }
    &:nth-of-type(1) {
      transform: rotate(-45deg);
      left: 50%;
      top: 30px;
      margin-left: -15px;
    }
    &:nth-of-type(2) {
      transform: rotate(0deg);
      left: 74%;
      margin-left: -15px;
      top: 54px;
    }
    &:nth-of-type(3) {
      transform: rotate(45deg);
      right: 30px;
      margin-top: -15px;
      top: 50%;
    }
    &:nth-of-type(4) {
      transform: rotate(90deg);
      left: 74%;
      margin-left: -15px;
      bottom: 54px;
    }
    &:nth-of-type(5) {
      transform: rotate(135deg);
      left: 50%;
      bottom: 30px;
      margin-left: -15px;
    }
    &:nth-of-type(6) {
      transform: rotate(180deg);
      left: 26%;
      margin-left: -15px;
      bottom: 54px;
    }
    &:nth-of-type(7) {
      transform: rotate(-135deg);
      left: 30px;
      margin-top: -15px;
      top: 50%;
    }
    &:nth-of-type(8) {
      transform: rotate(-90deg);
      left: 26%;
      margin-left: -15px;
      top: 54px;
    }
  }
  // 操作盘下面的按钮
  .console-btnlist {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    > li {
      display: flex;
      justify-content: center;
      width: 50%;
      &:nth-of-type(n + 3) {
        margin-top: 15px;
      }
    }
  }
  .console-btnitem {
    display: block;
    width: 52px;
    height: 52px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #035cd2;
    background-size: 32px;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.2s;
    &:hover,
    &focus {
      background-color: #289cff;
    }
    &:first-of-type {
      margin-right: 15px;
    }
  }
  .console-enlarge {
    background-image: url("~_ats/img/video-icon-enlarge.png");
  }
  .console-narrow {
    background-image: url("~_ats/img/video-icon-narrow.png");
  }
  .console-1 {
    background-image: url("~_ats/img/video-icon-1.png");
  }
  .console-2 {
    background-image: url("~_ats/img/video-icon-2.png");
  }
  .console-zfocus {
    background-image: url("~_ats/img/video-icon-zfocus.png");
  }
  .console-focus {
    background-image: url("~_ats/img/video-icon-focus.png");
  }
  // 操作盘表单
  .el-form {
    margin-bottom: 20px;
  }
  .el-input {
    width: 92%;
  }
  // ----宫格视频
}
</style>