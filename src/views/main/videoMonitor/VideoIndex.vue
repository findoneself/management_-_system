<template>
  <!--视频管控 -->
  <BeautifulWrapper
    :wraStyle="{ inPadding: '0px' }"
    :tabsList="tabsList"
    v-model="currentTabs"
  >
    <!-- 右侧按钮 -->
    <!-- <div
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
    <div
      class="video-content video-one"
      v-if="currentBtn === 'el-icon-one'"
    >
      <BeVideo
        :src="currentSrc"
        :options="{autoplay: true}"
        ref="oneVideo"
      />
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
    </div>
    <div
      class="video-content video-more"
      v-else
    >
      <BeautifulCard
        :is-show-head="false"
        :isTriangle='false'
        class="project-card"
        :card-style="{borderWidth: '0.125rem 0.125rem 0 0 '}"
      >
        <el-form
          :inline="true"
          size="small"
        >
          <el-form-item>
            <el-select
              v-model="dataForm.areaIds"
              clearable
              placeholder="请选择"
              @change="getProjectData"
            >
              <el-option
                v-for="item in dictOptions.areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="搜索项目名称"
              v-model="dataForm.projectName"
            >
              <i
                slot="suffix"
                @click="getProjectData"
                style="cursor:pointer"
                class="el-input__icon el-icon-search"
              ></i>
            </el-input>
          </el-form-item>
        </el-form>
        <BeautifulTableList
          :loading="projectLoading"
          cell-height="2.2rem"
          highlight-currow
          :defaultRowIndex="0"
          :index-obj="{isIndex: true, width: '5rem'}"
          :data-list="projectList"
          :columns="projectColumns"
          @rowClick="rowClick"
        />
        <el-pagination
          @current-change="handlePageChange"
          :current-page="dataForm.pageIndex"
          :page-size="dataForm.pageSize"
          layout="prev, pager, next"
          :total="projectTotal"
        >
        </el-pagination>
      </BeautifulCard>
      <ul
        class="video-list"
        v-loading="videoLoading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
        :class="currentBtn === 'el-icon-menu' ? 'video-list--four' : 'video-list--nine'"
      >
        <li
          class="video-item"
          v-for="vi in videoList"
          :key="vi.id"
        >
          <BeVideo
            :src="vi.videoSrc"
            :ref="'videoItem' + vi.id"
            :options="{preload: 'none'}"
          />
          <div
            class="video-model"
            @click="modelClick(vi)"
            @mouseenter="modelMouseenter(vi, $event)"
            @mouseleave="modelMouseleave(vi, $event)"
          ></div>
        </li>
      </ul>
    </div> -->
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
// import BeVideo from '_com/common/BeVideo'
// import BeautifulCard from '_com/common/BeautifulCard'
// import BeautifulTableList from '_com/common/BeautifulTableList'

export default {
  name: 'VideoIndex',
  components: {
    BeautifulWrapper
    // BeautifulCard,
    // BeVideo,
    // BeautifulTableList
  },
  data () {
    return {
      // 下拉字典
      dictOptions: {
        areaList: []
      },
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
      currentSrc: '',
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
      },
      // ---宫格视频
      // 项目加载
      projectLoading: false,
      // 视频加载
      videoLoading: false,
      // 当前点击的项目
      currentProject: {},
      // 视频数据总数
      projectTotal: 0,
      // 数据
      projectList: [],
      // 表头
      projectColumns: [
        { prop: 'projectName', name: '项目名称' }
      ],
      // 宫格视频表单
      dataForm: {
        areaIds: '',
        projectName: '',
        pageIndex: 1,
        pageSize: 10
      },
      // 宫格视频列表
      videoList: [],
      // 接口地址
      api: {
        videoApi: '',
        projectApi: '',
        areaApi: 'integration/area/tree'
      },
      // 防抖timer
      timer: null
    }
  },
  mounted () {

    // this.getAreaData()
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

    },
    // 项目点击
    rowClick (item) {
      this.currentProject = item
      this.getVideoList()
    },
    // 项目页码改变
    handlePageChange (val) {
      this.dataForm.pageIndex = val
      this.getProjectData()
    },
    // 视频遮罩点击
    modelClick (vid) {
      this.currentBtn = 'el-icon-one'
      this.currentSrc = vid.videoSrc
    },
    // 鼠标移入
    modelMouseenter (vid, e) {
      // 显示播放图标
      e.target.classList.add('video-model-icon')
      // 设置防抖，鼠标移入播放视频
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.currentBtn !== 'el-icon-one') {
        this.timer = setTimeout(() => {
          this.$refs['videoItem' + vid.id][0].videoPlayer().play()
        }, 1200)
      }
    },
    // 鼠标移出
    modelMouseleave (vid, e) {
      // 结束播放视频
      this.$refs['videoItem' + vid.id][0].videoPlayer().load()
      // 清除防抖定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 隐藏播放图标
      e.target.classList.remove('video-model-icon')
    },
    // 行政区域
    getAreaData () {
      this.$http({
        url: this.api.areaApi
      }).then(res => {
        const { data, code } = res.data
        if (code === 200) {
          this.dictOptions.areaList = data || []
          if (data && data.length > 0) {
            this.dataForm.areaIds = data[0].id
            this.getProjectData()
          }
        } else {
          this.dictOptions.areaList = []
          this.dataForm.areaIds = ''
        }
      }, () => {
        this.dictOptions.areaList = []
        this.dataForm.areaIds = ''
      })
    },
    // 获取项目数据
    getProjectData () {
      this.projectLoading = true
      const params = this._cloneDeep(this.dataForm)
      this.$http({
        url: this.api.projectApi,
        method: 'post',
        data: params
      }).then(res => {
        this.projectLoading = false
        const { data, code, msg, total } = res.data
        if (code === 200) {
          this.projectList = data || []
          if (data && data.length > 0) {
            this.currentProject = data[0]
            this.getVideoList()
          }
          this.projectTotal = total
        } else {
          this.projectList = [
            { id: '1', projectName: '项目1516' },
            { id: '2', projectName: '项目1516' },
            { id: '3', projectName: '项目1516' },
            { id: '4', projectName: '项目1516' },
            { id: '5', projectName: '项目1516' },
            { id: '6', projectName: '项目1516' },
            { id: '7', projectName: '项目1516' },
            { id: '8', projectName: '项目1516' },
            { id: '9', projectName: '项目1516' },
            { id: '10', projectName: '项目1516' },
            { id: '11', projectName: '项目1516' },
            { id: '12', projectName: '项目1516' },
            { id: '13', projectName: '项目1516' },
            { id: '14', projectName: '项目1516' },
            { id: '1565', projectName: '项目1516' }
          ]
          this.currentProject = this.projectList[0]
          this.getVideoList()
          this.projectTotal = this.projectList.length
          this.$message.error(msg || '获取数据错误')
        }
      }, (err) => {
        this.projectLoading = false
        this.$message.error(err.data.msg || err.data.error)
        this.projectList = []
      })
    },
    // 获取视频列表
    getVideoList () {
      this.videoLoading = true
      this.$http({
        url: this.api.videoApi + '/' + (this.currentProject.id || '')
      }).then(res => {
        this.videoLoading = false
        const { data, code, msg } = res.data
        if (code === 200) {
          this.videoList = data || []
          if (data && data.length > 0) {
            this.currentSrc = data[0].videoSrc
          }
        } else {
          this.videoList = [
            { id: '1', videoName: '项目1516', videoSrc: 'https://media.w3.org/2010/05/sintel/trailer.mp4', poster: '' },
            { id: '2', videoName: '项目1516', videoSrc: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4', poster: '' },
            { id: '3', videoName: '项目1516', videoSrc: 'https://www.w3schools.com/html/movie.mp4', poster: '' },
            { id: '4', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '5', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '6', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '7', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '8', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '9', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '10', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '11', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '12', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '13', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '14', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' },
            { id: '1565', videoName: '项目1516', videoSrc: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', poster: '' }
          ]
          this.currentSrc = this.videoList[0].videoSrc
          this.$message.error(msg || '获取视频数据失败')
        }
      }, (err) => {
        this.videoLoading = false
        this.$message.error(err.data.msg || err.data.error)
        this.videoList = []
      })
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
  width: 100%;
}
.video-one {
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
  .el-form {
    margin-bottom: 20px;
  }
  // 操作盘表单
  .console-card {
    .el-input {
      width: 92%;
    }
  }
}
.video-more {
  // ----宫格视频
  .project-card {
    width: 21%;
    height: 100%;
    flex-shrink: 0;
    .be-table-list {
      height: calc(100% - 108px);
    }
    .el-form {
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;
    }
    .el-form-item {
      margin: 0;
    }
    .el-select {
      width: 130px;
    }
  }
  .video-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    width: 50%;
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
  /deep/ .vjs-big-play-button {
    display: none;
  }
  .video-item {
    position: relative;
    border: 1px solid var(--wrapper-bdcolor);
  }
  .video-list--four .video-item {
    width: 25%;
    height: 185px;
  }
  .video-list--nine .video-item {
    width: 11.11%;
    height: 100px;
  }
  .video-player {
    width: 100%;
    height: 100%;
  }
  // 遮罩效果
  .video-model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      transition: all 0.3s;
      opacity: 0;
    }
    &::before {
      width: 42px;
      height: 42px;
      border: 5px solid #a29a9a;
      border-radius: 50%;
      right: 10px;
      top: 10px;
    }
    &::after {
      width: 0;
      height: 0;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent transparent #a29a9a;
      right: 14px;
      top: 21px;
    }
  }
  .video-list--nine .video-model {
    &::before,
    &::after {
      transform: scale(0.6);
      transform-origin: right;
    }
    &::before {
      top: 0;
    }
    &::after {
      top: 11px;
      right: 12px;
    }
  }
  .video-model-icon {
    &::before,
    &::after {
      opacity: 1;
    }
  }
}
</style>