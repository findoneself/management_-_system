<template>
  <!--视频管控 -->
  <BeautifulWrapper
    :wraStyle="{ inPadding: '0px' }"
    :is-title="false"
    :border-icon="['top', 'right', 'bottom', 'left']"
  >
    <!-- 右侧按钮 -->
    <div
      slot="menuRight"
      class="menu-btn"
    >
      <!--   @click="menuBtnClick(val,index)" -->
      <i
        v-for="val in menuButtons"
        :key="val"
        class="menubtn-item "
        :class="[val, currentBtn === val && 'menubtn-active']"
      ></i>
    </div>
    <div
      class="video-content video-one"
      v-if="currentPage === 1"
    >
      <!--        id='videoItem10'
        style="width:79%"  -->
      <BeVideo
        :src="currentSrc"
        :options="{autoplay: true}"
        ref="oneVideo"
      />
      <!-- <object
        id="videoItem10"
        class="vlc"
        type="application/x-vlc-plugin"
        events='True'
        width='100%'
      >
        <param
          name='url'
          value='rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov'
        />

        <param
          name='volume'
          value='50'
        />

        <param
          name='autoplay'
          value='true'
        />

        <param
          name='loop'
          value='false'
        />
        <param
          name='fullscreen'
          value='true'
        />
        <param
          name='stretchToFit'
          value='1'
        />
      </object> -->
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
        <div>
          <el-form
            :inline="true"
            slot="headform"
            size="medium"
            class="demo-form-inline"
          >
            <el-form-item class="el_form_county">
              <el-select
                v-model="dataForm.areaId"
                clearable
                placeholder="请选择"
                @change="getProjectData"
              >
                <el-option
                  v-for="item in dictOptions.areaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el_form_county">
              <el-select
                v-model="dataForm.groupId"
                clearable
                placeholder="请选择"
                @change="getProjectData"
              >
                <el-option
                  v-for="item in dictOptions.nameList"
                  :key="item.groupId"
                  :label="item.groupName"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label-width="5rem"
              class="el_form_search"
            >
              <el-input
                v-model="dataForm.projectName"
                placeholder="搜索项目名称"
              >
              </el-input>
              <i
                v-if="dataForm.projectName"
                class="el-icon-circle-close"
                @click="deleteJcd"
              ></i>
              <i
                class="el-icon-search"
                @click="getProjectData"
              ></i>
            </el-form-item>
          </el-form>
        </div>
        <!-- :tree-props="{children: 'deviceList', hasChildren: 'hasChildren'}"  row-key="projectId"-->
        <BeautifulTableEl
          :columns="projectColumns"
          :dataList="projectList"
          :operObj="{isOperation: false}"
          stripe
          isExpand
          :loading="projectLoading"
        >
          <div
            class="project-expand"
            slot-scope="{row}"
            slot="expand"
          >
            <div
              v-for="(item,index) in row.deviceList"
              :key="index"
              :class="activeCell === item.deviceId ? 'activeCell-light':''"
              @click="e=>{getVideo(e,item)}"
            >
              <el-form
                label-position="left"
                inline
                class="demo-table-expand"
              >
                <el-form-item label="设备名称">
                  <span>{{ item.title }}</span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </BeautifulTableEl>
        <!-- <el-pagination
          @current-change="handlePageChange"
          :current-page="dataForm.pageIndex"
          :page-size="dataForm.pageSize"
          layout="prev, pager, next"
          :total="projectTotal"
        >
        </el-pagination> -->
      </BeautifulCard>
      <ul
        class="video-list"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
        :class="currentBtn === 'el-icon-one' ?'video-list--one':currentBtn === 'el-icon-menu'? 'video-list--four' : 'video-list--nine'"
      >
        <li
          class="video-item"
          v-for="(vi,idx) in videoList"
          :key="vi.id"
          v-loading="vi.videoLoading"
        >
          <!-- <video
            muted
            style="width:100%;height:100%;object-fit: fill;"
            :ref="'videoItem' + vi.id"
            :id="'videoItem' + idx"
            :options="{preload: 'none'}"
            :loading='vi.videoLoading'
          /> -->
          <video
            :id="'videoItem' + idx"
            class="video-js vjs-default-skin fillWidth"
            controls
            data-setup='{}'
          >
            <source
              src="http://153.36.201.214:9040/camera?device=3301061002402&channel=0&streamtype=0&token=acDUPgcie&type=std.m3u8"
              type="application/x-mpegURL"
            >
          </video>
          <!-- <BeVideo
            :src="vi.videoSrc"
            :ref="'videoItem' + vi.id"
            :options="{preload: 'none'}"
          />
          <div
            class="video-model"
            @click="modelMouseenter(vi, $event)"
            @mouseleave="modelMouseleave(vi, $event)"
          ></div> -->
          <!-- <div
            class="video-model"
            @click="modelClick(vi)"
          ></div> -->
        </li>
      </ul>
    </div>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulTableEl from '_com/common/BeautifulTableEl'
import BeVideo from '_com/common/BeVideo'
import BeautifulCard from '_com/common/BeautifulCard'
// import BeautifulTableList from '_com/common/BeautifulTableList'

export default {
  name: 'VideoIndex',
  components: {
    BeautifulWrapper,
    BeautifulTableEl,
    BeautifulCard,
    BeVideo
    // BeautifulTableList
  },
  data () {
    return {
      // 下拉字典
      dictOptions: {
        areaList: [],
        nameList: ['扬尘视频', 'AI视频', '车辆冲洗视频']
      },
      // tabs列表
      tabsList: [
        { id: '1', title: '扬尘视频' },
        { id: '2', title: 'AI视频' },
        { id: '3', title: '车辆冲洗视频' }
      ],
      currentPage: 0,
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
        ['ZoomWide', 'ZoomTile'],
        ['FocusNear', 'FocusFar'],
        ['IrisSmall', 'IrisLarge']
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
      videoLoading: true,
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
        areaId: '',
        groupId: '扬尘视频',
        projectName: '',
        pageIndex: 1,
        pageSize: 10
      },
      // 宫格视频列表
      videoList: [{ id: '1', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '2', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '3', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '4', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '5', videoName: '项目1516', videoLoading: false, videoSrc: '4', poster: '' },
      { id: '6', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '7', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '8', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '9', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' }],
      // 接口地址
      api: {
        videoApi: '/integration/videoDevice/getRtsp',
        projectApi: 'integration/videoDevice/getProjectsAndDevices',
        areaApi: 'integration/videoDevice/getArealist',
        groupApi: 'integration/videoGroup/getGroupList', // 分组
        controlApi: '/integration/videoDevice/ptzControl'
      },
      // 防抖timer
      timer: null,
      activeCell: 0,
      clickNum: 0, // 点击次数
      lastBtn: 'el-icon-one',
      deviceId: '',
      channel: ''

    }
  },
  created () {
    this.menuBtnClick('el-icon-one', 0)
  },
  mounted () {
    this.getAreaData()
    this.getGroupList()
    // this.loadingVideo()
  },
  methods: {
    tabsClick (item) {
      console.log(item)
    },
    // tabs右侧模式点击
    menuBtnClick (val, index) {
      // this.currentPage = 0
      let last = this.lastBtn && this.menuButtons.findIndex(i => i === this.lastBtn)
      // console.log('lastindex', last, 'clickNum', this.clickNum)
      if (this.clickNum !== 0) {
        if (last === 0) {
          this.clickNum = 1
        } else if (last === 1) {
          this.clickNum = this.clickNum % 4
        } else {
          this.clickNum = this.clickNum % 9
        }
      }
      // console.log('clickNum', this.clickNum)
      this.currentBtn = val
      this.lastBtn = this.currentBtn
      let videoLists = [{ id: '1', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '2', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '3', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '4', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '5', videoName: '项目1516', videoLoading: false, videoSrc: '4', poster: '' },
      { id: '6', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '7', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '8', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' },
      { id: '9', videoName: '项目1516', videoLoading: false, videoSrc: '', poster: '' }]
      if (index === 0) {
        this.videoList = videoLists.splice(0, 1)
      } else if (index === 1) {
        this.videoList = videoLists.splice(0, 4)
      } else {
        this.videoList = videoLists.splice(0, 9)
      }
    },
    // 控制台圆盘按钮点击
    consoleClick (index) {
      // /控制方向:上:DirectionUp 下:DirectionDown 左:DirectionLeft 右:DirectionRight 左上:DirectionLeftUp 左下:DirectionLeftDown
      // 右上:DirectionRightUp 右下:DirectionRightDown
      let btnList = ['DirectionUp', 'DirectionRightUp', 'DirectionRight', 'DirectionRightDown', 'DirectionDown', 'DirectionLeftDown', 'DirectionLeft', 'DirectionLeftUp']
      console.log(index)
      let ptzCmd = btnList[index - 1]
      this.$http({
        url: this.api.controlApi,
        method: 'post',
        data: {
          deviceId: '3301061001680',
          channel: '0',
          ptzCmd
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(msg || '操作失败')
        }
      }, () => {
      })
    },
    // 控制台按钮点击
    consoleBtnClick (val) {
      this.$http({
        url: this.api.controlApi,
        method: 'post',
        data: {
          deviceId: '3301061001680',
          channel: '0',
          ptzCmd: val
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.$message.success('操作成功')
        } else {
          this.$message.error(msg || '操作失败')
        }
      }, () => {

      })

    },
    // 项目点击
    rowClick ({ row }) {
      this.currentProject = row
      console.log(row.projectName)

    },
    // 项目页码改变
    handlePageChange (val) {
      this.dataForm.pageIndex = val
      this.getProjectData()
    },
    // 视频遮罩点击
    modelClick (vid) {
      console.log(vid)
      // this.currentBtn = 'el-icon-one'
      // this.currentSrc = vid.videoSrc
    },
    // 鼠标经过
    modelMouseenter (item, e) {
      // let item = this.videoList[idx]
      console.log(item, e)
      if (item.videoSrc) {
        this.deviceId = item.deviceId
        this.channel = item.channel
      } else {
        this.$message.error('请选择设备')
      }

      this.currentSrc = 'http://153.36.201.214:9040/camera?device=3301061002402&channel=0&streamtype=0&token=acDUPgcie&type=std.m3u8'
      // if (item.deviceId && item.channel) {
      //   this.currentPage = 1
      // }
      // 显示播放图标
      // e.target.classList.add('video-model-icon')
      // 设置防抖，鼠标移入播放视频
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$refs['videoItem' + item.id][0].videoPlayer().play()
      }, 1200)
      // if (this.currentBtn !== 'el-icon-one') {

      // }
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
        const { rows, code, msg } = res.data
        if (code === 200) {
          this.dictOptions.areaList = rows || []
          if (rows && rows.length > 0) {
            // this.dataForm.areaId = rows[0].areaId
            this.getProjectData()
          }
        } else {
          this.$message.error(msg || '获取行政区域错误')
          this.dictOptions.areaList = []
          this.dataForm.areaId = ''
        }
      }, () => {
        this.dictOptions.areaList = []
        this.dataForm.areaId = ''
      })
    },
    // 分组下拉选择
    getGroupList () {
      this.$http({
        url: this.api.groupApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.dictOptions.nameList = data || []
          if (data && data.length > 0) {
            this.dataForm.groupId = data[0].groupId
          }
        } else {
          this.$message.error(msg || '获取行政区域错误')
          this.dictOptions.nameList = []
          this.dataForm.groupId = ''
        }
      }, () => {
        this.dictOptions.nameList = []
        this.dataForm.groupId = ''
      })
    },
    // 获取项目数据
    getProjectData () {
      this.projectLoading = true
      // let val = this.$api.toQueryString(params)
      this.$http({
        url: this.api.projectApi,
        method: 'post',
        data: this.dataForm
      }).then(res => {
        this.projectLoading = false
        const { data, code, msg } = res.data
        if (code === 200) {
          let list = data || []
          list.map(item => {
            item.id = item.projectId
          })
          this.projectList = list
          // 暂时用数据长度，后面需要接口返回总数
          this.projectTotal = list.length
        } else {
          this.projectTotal = 0
          this.projectList = []
          this.$message.error(msg || '获取数据错误')
        }
      }, (err) => {
        this.projectLoading = false
        this.projectList = []
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    // 点击左侧列表设备
    getVideo (e, item) {
      this.activeCell = item.deviceId
      this.clickNum++
      const { channel, deviceId } = item
      this.$http({
        url: this.api.videoApi,
        method: 'post',
        data: { // device=3301061001680&channel=0
          deviceId,
          channel
        }
      }).then(res => {
        this.getVideoFlv(deviceId, channel)
        const { code, msg } = res.data
        if (code === 200) {
          this.getVideoFlv(deviceId, channel, msg)
        } else {
          // this.$message.error(msg || '获取视频错误')
        }
      }, () => {
        // this.$message.error('获取视频错误')

      })
    },
    // 获取视频列表
    getVideoFlv (deviceId, channel) {
      // console.log(this.lastBtn, this.currentBtn)
      let clickNum = this.clickNum - 1
      // let last = this.menuButtons.findIndex(i => i === this.lastBtn)
      let num = this.menuButtons.findIndex(i => i === this.currentBtn)
      let msg = 'http://153.36.201.214:9040/camera?device=3301061002402&channel=0&streamtype=0&token=acDUPgcie&type=std.m3u8'
      let index = ''
      if (num === 0) { // 当前只有一个视频框
        index = 0
        // let url = 'http://153.36.201.214:8088//Service/testPlayerVideo?URI=http://myeye.xuzhouzhihui.com:9050/camera?device=3301061000760&channel=0&streamtype=0&token=83b7271ANz3J330247&type=std.flv' // `http://153.36.201.214:8088/Service/testPlayerVideo?URI=${msg}`
        // window.open(url)
      } else if (num === 1) { // 当前为4个视频框
        index = clickNum % 4
      } else { // 当前为9个视频框
        index = clickNum % 9
      }
      this.$set(this.videoList, index, {
        videoSrc: msg,
        deviceId,
        channel,
        id: this.videoList[index].id,
        videoLoading: true
      })
      // console.log(this.videoList)
      setTimeout(() => {
        this.$set(this.videoList[index], 'videoLoading', false)
        // this.$message.error('此视频因格式问题或者太大暂无法播放，请稍后再试')
      }, 3000)
      // this.palyVideo(msg, index)
    },

    palyVideo (msg, index, flag) {
      console.log(msg, index, flag)
      // this.videoList.forEach((item, index) => {
      // if (this.$flvjs.isSupported()) {
      //   let player = null
      //   let videoElement = document.getElementById(`videoItem${index}`)
      //   player = this.$flvjs.createPlayer({
      //     type: 'flv', // => 媒体类型 flv 或 mp4
      //     isLive: true, // => 是否为直播流
      //     hasAudio: true, // => 是否开启声音
      //     url: msg // => 视频流地址
      //   }, {
      //     enableStashBuffer: false,
      //     fixAudioTimestampGap: false,
      //     isLive: true
      //   })
      //   player.attachMediaElement(videoElement) // => 绑DOM
      //   player.load()
      //   if (flag) {
      //     player.play()
      //   }
      //   player.on(this.$flvjs.Events.ERROR, (errType, errDetail) => {
      //     console.log('errorType:', errType)
      //     console.log('errDetail', errDetail)
      //     this.destoyrVideo(player)
      //   })

      // } else {
      //   this.$message.error('不支持flv格式视频')
      // }
      this.vloading = false
      // })
    },
    deleteJcd () {
      this.dataForm.projectName = ''
    },
    destoyrVideo (play) {
      play.pause()
      play.unload()
      play.destroy()
      play = null
    },
    loadingVideo () {
      var vlc = document.getElementById('videoItem10')
      vlc.video.aspectRatio = '16:9'
      vlc.playlist.playItem('rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov')
    }
  }
}
</script>

<style scoped lang="less">
/deep/.beau-content {
  height: calc(100% - 80px);
}
.demo-form-inline {
  display: flex;
  justify-content: space-between;
  // padding: 2rem 1rem 0.5rem;
  flex-wrap: wrap;
  .el_form_county {
    width: 46%;
  }
  .el_form_search {
    width: 100%;
    // margin-top: 10px;
    position: relative;
    /deep/.el-form-item__content {
      width: 100%;
    }

    /deep/.el-input .el-input__inner {
      padding-left: 1rem;
    }

    i {
      position: absolute;
      top: 50%;
      right: 3rem;
      margin-right: 0.5rem;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .el-icon-search {
      right: 1rem;
    }
  }
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .form-item {
    // width: 46%;
    /deep/.el-form-item__content {
      width: 100%;
    }
  }
  :last-child {
    // width: 100%;
    /deep/.el-form-item__content {
      width: 100%;
    }
  }
}
.menu-btn {
  position: relative;
  z-index: 99;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  .menubtn-item {
    margin-left: 10px;
    font-size: 40px;
    color: #0e5dfb;
    transition: all 0.2s;
    cursor: pointer;
  }
  .el-icon-one {
    width: 34px;
    height: 34px;
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
  //   ['ZoomWide', 'ZoomTile'],
  // ['FocusNear', 'FocusFar'],
  // ['IrisSmall', 'IrisLarge']
  .console-ZoomWide {
    background-image: url("~_ats/img/video-icon-enlarge.png");
  }
  .console-ZoomTile {
    background-image: url("~_ats/img/video-icon-narrow.png");
  }
  .console-FocusNear {
    background-image: url("~_ats/img/video-icon-1.png");
  }
  .console-FocusFar {
    background-image: url("~_ats/img/video-icon-2.png");
  }
  .console-IrisSmall {
    background-image: url("~_ats/img/video-icon-zfocus.png");
  }
  .console-IrisLarge {
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
    .beautiful-table-el {
      height: calc(100% - 160px);
    }
    .el-form {
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;
    }
    .el-form-item {
      // margin: 0;
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
  .video-list--one .video-item {
    width: 100%;
    height: 100%;
  }
  .video-list--four .video-item {
    width: 50%;
    height: 50%;
  }
  .video-list--nine .video-item {
    width: 33.33%;
    height: 33.33%;
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
/deep/.video-more .project-card .el-select {
  width: 100%;
}
/deep/.video-more .project-card .el-form {
  margin: 0;
}
.project-expand .activeCell-light {
  background: #132184;
}
.video-more .project-card .beautiful-table-el {
  overflow: auto;
}
/deep/.video-js {
  width: 100%;
  height: 100%;
}
</style>