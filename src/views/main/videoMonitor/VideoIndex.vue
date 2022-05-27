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
      <!--    -->
      <i
        v-for="(val,index ) in menuButtons"
        :key="val"
        class="menubtn-item "
        @click="menuBtnClick(val,index)"
        :class="[val, currentBtn === val && 'menubtn-active']"
      ></i>
    </div>
    <div
      class="video-content video-one"
      v-if="currentPage === 1"
      v-loading='currentPageLoading'
    >
      <!--        id='videoItem10'
        style="width:79%"  -->
      <!-- <BeVideo
        :src="currentSrc"
        :options="{autoplay: true}"
        ref="oneVideo"
      /> -->
      <video
        id='videoItem10'
        controls
        autoplay
        ref="videoItem10"
        style="width:100%;height:100%;object-fit: fill;"
      ></video>
      <BeautifulCard
        title="点位操作"
        :isTriangle='false'
        class="console-card"
        :card-style="{borderWidth: '0.125rem 0 0 0.125rem'}"
      >
        <div class="console-panel">
          <span
            v-for="(ix,index) in topBtnList"
            :key="index"
            :title='ix.name'
            class="console-triangle"
            @click="consoleClick(ix.label)"
          ></span>
        </div>
        <ul class="console-btnlist">
          <li
            v-for="(btns, bindex) in consoleBtnlist"
            :key="bindex"
          >
            <span
              v-for="(val,index) in btns"
              :key="index"
              :title="val.name"
              class="console-btnitem"
              :class="'console-' + val.label"
              @click="consoleBtnClick(val.label)"
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
              type="number"
              :min='1'
            ></el-input>
          </el-form-item>
          <el-form-item label="预置点：">
            <el-input
              v-model="consoleForm.preset"
              clearable
              type="number"
              :min='0'
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
            <!-- <el-form-item class="el_form_county">
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
            </el-form-item> -->
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
                v-model="dataForm.title"
                placeholder="搜索设备名称"
              >
              </el-input>
              <i
                v-if="dataForm.title"
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
                <el-form-item>
                  <span :title='item.title'>{{ item.title.length>15?item.title.slice(0,20)+'...':item.title }}</span>
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
          :key="vi.id+idx"
          v-loading="vi.videoLoading"
        >
          <video
            controls
            style="width:100%;height:100%;object-fit: fill;"
            :ref="'videoItem' + vi.id"
            :id="'videoItem'+idx"
            autoplay
            @click="modelMouseenter(vi, $event)"
          ></video>
          <!-- <BeVideo
            :src="vi.videoSrc"
            :ref="'videoItem' + vi.id"
            :options="{preload: 'none',}"
          />
          <div
            class="video-model"

          ></div> -->
          <!-- <div  @mouseleave="modelMouseleave(vi, $event)"
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
// import BeVideo from '_com/common/BeVideo'
import BeautifulCard from '_com/common/BeautifulCard'
// import BeautifulTableList from '_com/common/BeautifulTableList'
import Hls from 'hls.js'
var hls = null
export default {
  name: 'VideoIndex',
  components: {
    BeautifulWrapper,
    BeautifulTableEl,
    BeautifulCard
    // BeVideo
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
      // 操作loading
      currentPageLoading: false,
      // 当前选择的tabs
      currentTabs: '1',
      // 当前点击的右侧按钮
      currentBtn: 'el-icon-one',
      // 右侧按钮列表
      menuButtons: ['el-icon-one', 'el-icon-menu', 'el-icon-s-grid'],
      // 当前视频的src地址
      bigNum: 10,
      currentSrc: '',
      topBtnList: [{ label: 'DirectionUp', name: '上' },
      { label: 'DirectionRightUp', name: '右上' },
      { label: 'DirectionRight', name: '右' },
      { label: 'DirectionRightDown', name: '右下' },
      { label: 'DirectionDown', name: '下' },
      { label: 'DirectionLeftDown', name: '左下' },
      { label: 'DirectionLeft', name: '左' },
      { label: 'DirectionLeftUp', name: '左上' }],
      // 控制台按钮列表
      consoleBtnlist: [
        [{ label: 'ZoomWide', name: '放大' }, { label: 'ZoomTile', name: '缩小' }],
        [{ label: 'FocusNear', name: '聚焦+' }, { label: 'FocusFar', name: '聚焦-' }],
        [{ label: 'IrisSmall', name: '光圈-' }, { label: 'IrisLarge', name: '光圈+' }]
      ],
      // 视频控制表单
      consoleForm: {
        step: 1,
        preset: 0
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
        // areaId: '',
        groupId: '',
        title: '',
        pageIndex: 1,
        pageSize: 10
      },
      // 宫格视频列表
      videoList: [{ id: '1', videoLoading: false, videoSrc: '' }],
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
  computed: {
    currentNum () {
      return this.currentBtn === 'el-icon-one' ? 1 : this.currentBtn === 'el-icon-menu' ? 4 : 9
    }
  },
  watch: {
    currentNum (val, old) {
      this.clickNum = this.clickNum > old ? old : this.clickNum
      if (val > old) {
        for (let i = 0; i < val - old; i++) {
          this.videoList.push({ id: Math.random(), videoLoading: false, videoSrc: '' })
        }
      } else {
        this.videoList = this.videoList.slice(0, val)
      }
    }
  },
  created () {
    this.menuBtnClick('el-icon-one', 0)
    this.getAreaData()
    this.getGroupList()
  },
  mounted () {
    this.getProjectData()
  },
  beforeDestroy () {
    console.log('销毁', hls)
    hls.destroy()
    hls = null
  },
  methods: {
    tabsClick (item) {
      console.log(item)
    },
    // tabs右侧 1、4、9 模式点击
    menuBtnClick (val, index) {
      this.currentBtn = val
      this.currentPage = 0
      let last = this.lastBtn && this.menuButtons.findIndex(i => i === this.lastBtn)
      let num = this.menuButtons.findIndex(i => i === this.currentBtn)
      if (this.clickNum !== 0) {
        if (last === 0) {
          this.clickNum = 1
        } else if (last === 1) {
          console.log('last:', last, num)
          if (last < num && this.clickNum > 3) {
            this.clickNum = 4
          } else {
            this.clickNum = this.clickNum % 4
          }
        } else {
          this.clickNum = this.clickNum % 9
        }
      }
      this.lastBtn = this.currentBtn
    },
    // 控制台圆盘按钮点击
    consoleClick (ptzCmd) {
      this.currentPageLoading = true
      // /控制方向:上:DirectionUp 下:DirectionDown 左:DirectionLeft 右:DirectionRight 左上:DirectionLeftUp 左下:DirectionLeftDown
      // 右上:DirectionRightUp 右下:DirectionRightDown
      // let btnList = ['DirectionUp', 'DirectionRightUp', 'DirectionRight', 'DirectionRightDown', 'DirectionDown', 'DirectionLeftDown', 'DirectionLeft', 'DirectionLeftUp']
      console.log(ptzCmd)
      // let ptzCmd = btnList[index - 1]
      this.$http({
        url: this.api.controlApi,
        method: 'post',
        data: {
          deviceId: this.deviceId,
          channel: this.channel,
          ptzCmd,
          ...this.consoleForm
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          setTimeout(() => {
            this.currentPageLoading = false
            this.$message.success('操作成功')
          }, 2000)
        } else {
          this.$message.error(msg || '操作失败')
          this.currentPageLoading = false

        }
      }, () => {
      })
    },
    // 控制台按钮点击
    consoleBtnClick (val) {
      this.currentPageLoading = true
      this.$http({
        url: this.api.controlApi,
        method: 'post',
        data: {
          deviceId: this.deviceId,
          channel: this.channel,
          ptzCmd: val
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          setTimeout(() => {
            this.currentPageLoading = false
            this.$message.success('操作成功')
          }, 2000)
        } else {
          this.currentPageLoading = false
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
    // 鼠标点击视频
    modelMouseenter (item, e) {
      // let item = this.videoList[idx]
      if (item.videoSrc) {
        this.deviceId = item.deviceId
        this.channel = item.channel
      } else {
        this.$message.error('请选择设备')
      }
      this.$http({
        url: this.api.videoApi,
        method: 'post',
        data: { // device=3301061001680&channel=0
          deviceId: item.deviceId,
          channel: item.channel
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.currentPage = 1
          this.currentPageLoading = true
          setTimeout(() => {
            this.loadingVideo(msg, 10)
            this.currentPageLoading = false
          }, 3000)
          this.activeCell = ''
        } else {
          this.$message.error(msg || '获取视频错误')
        }
      }, () => {
        // this.$message.error('获取视频错误')
      })
      // 'http://153.36.201.214:9040/camera?device=3301061002402&channel=0&streamtype=0&token=acDUPgcie&type=std.m3u8'

      // 显示播放图标
      // e.target.classList.add('video-model-icon')
      // 设置防抖，鼠标移入播放视频
      // if (this.timer) {
      //   clearTimeout(this.timer)
      // }
      // this.timer = setTimeout(() => {
      //   this.$refs['videoItem' + item.id][0].videoPlayer().play()
      // }, 1200)
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
            // this.dataForm.groupId = data[0].groupId
          }
          this.getProjectData()
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
      const { channel, deviceId } = item
      this.$http({
        url: this.api.videoApi,
        method: 'post',
        data: { // device=3301061001680&channel=0
          deviceId,
          channel
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.clickNum++
          this.getVideoFlv(deviceId, channel, msg)
        } else {
          this.$message.error(msg || '获取视频错误')
        }
      }, () => {
        this.$message.error('获取视频错误')
      })
    },
    // 获取视频列表
    getVideoFlv (deviceId, channel, msg) {
      let clickNum = this.clickNum - 1
      let num = this.menuButtons.findIndex(i => i === this.currentBtn)
      // let msg1 = 'http://153.36.201.214:9040/camera?device=3301061002402&channel=0&streamtype=0&token=acDUPgcie&type=std.m3u8'
      // let msg1 = 'http://183.167.208.113:83/openUrl/RtgjsDm/live.m3u8'
      let index = ''
      if (num === 0) { // 当前只有一个视频框
        index = 0
      } else if (num === 1) { // 当前为4个视频框
        index = clickNum % 4
      } else { // 当前为9个视频框
        index = clickNum % 9
      }
      console.log(msg)
      this.$set(this.videoList, index, {
        videoSrc: msg,
        deviceId,
        channel,
        id: this.videoList[index].id,
        videoLoading: true
      })
      // this.$nextTick(() => {
      this.loadingVideo(msg, index)
      // })
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
      this.dataForm.title = ''
    },
    destoyrVideo (play) {
      play.pause()
      play.unload()
      play.destroy()
      play = null
    },
    // 加载hls流
    loadingVideo (msg, index) {
      // let url = 'http://myeye.xuzhouzhihui.com:9040/camera?device=3301061001356&channel=0&streamtype=0&token=J3d8c1A1a60rde2zX2&type=std.m3u8'
      let video = document.getElementById(`videoItem${index}`)
      // let video = ref(null)
      // var Hls = window.Hls
      if (Hls.isSupported()) {
        hls = new Hls()
        hls.loadSource(msg)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.value.play()
          // video.paly()
        })
      }
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
    width: 100%;
    /deep/.el-form-item__content {
      width: 50%;
    }
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
    height: 99.5%;
  }
  .video-list--four .video-item {
    width: 50%;
    height: 49.5%;
  }
  .video-list--nine .video-item {
    width: 33.33%;
    height: 33.18%;
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