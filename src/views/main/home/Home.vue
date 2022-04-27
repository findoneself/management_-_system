<template>
  <div class="home-container">
    <div class="home_top">
      <!-- 巡察整改 -->
      <BeautifulCard
        title="巡查整改"
        class="home_top_left"
      >
        <div class="inspect">
          <ul class="inspect_time">
            <li
              v-for="(item, index) in patrolData.inspect"
              :key="index"
            >{{item.name}} : <span>{{ item.num }}</span></li>
          </ul>
          <div class="inspect_people">
            <div class="first">网络员：</div>
            <img src="~_ats/img/people.png" />
            <div class="people_num">{{ patrolData.people }}人</div>
          </div>
        </div>
        <PatrolMap :data-list="patrolData.patrolList"></PatrolMap>
      </BeautifulCard>
      <!-- 中间项目总数 -->
      <div class="home_top_center">
        <div class="totalnum">
          <!-- <div class="time">
            <span class="span">{{ projectInfo.year }}年</span> <span>{{ projectInfo.month }}月</span>
          </div> -->
          <div class="bignum">
            <div class="bginum-text">
              <span
                class="bginum-text-item"
                v-for="(val, index) in projectInfo.count"
                :key="index"
              >{{ val }}</span>
            </div>
          </div>
          <div class="total_text">
            <span>项目总数</span>
            <span></span>
          </div>

        </div>
        <div class="images">
          <img
            class="total_y"
            src="~_ats/img/total_num.png"
            alt=""
          >
          <div
            class="images_item"
            :class="'images_item' + (index +1)"
            v-for="(item, index) in projectInfo.list"
            :key="item.id"
          >
            <div class="images_value">{{ item.num }}</div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <!-- 国控站点 -->
      <BeautifulCard
        class="home_top_right"
        title="国控站点"
      >
        <div class="picker">
          <el-select
            v-model="stationCode"
            placeholder="请选择"
            @change="stationChange"
          >
            <el-option
              v-for="item in stationList"
              :key="item.stationCode"
              :label="item.station"
              :value="item.stationCode"
            ></el-option>
          </el-select>
        </div>
        <ul class="gkzd-list">
          <li
            class="gkzd-list-item"
            v-for="(item, index) in paramslist"
            :key="index + '.'"
          >
            <span>{{ item.name }}:</span>
            <span>{{ (item.value&&item.value.length>5)?item.value.slice(0,3)+'...':item.value }}</span>
          </li>
        </ul>
      </BeautifulCard>
    </div>
    <div class="home_bottom">
      <!-- 报警趋势分析 -->
      <BeautifulCard
        :title="'报警统计趋势分析'"
        class="home_bottom_left"
      >
        <div class="picker dataPicker">
          时间区间：
          <el-date-picker
            v-model="echartDate"
            type="daterange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <WarningNum
          :xAxisData='xAxisData'
          :seriesData='seriesData'
        />
        <div class="button">
          <img
            class="left_img"
            src="~_ats/img/right.png"
            alt=""
          />
          <img
            class="right_img"
            src="~_ats/img/right.png"
            alt=""
          />
        </div>
      </BeautifulCard>
      <!-- 各县区安装数量统计 -->
      <BeautifulCard
        :title="'各县区安装数量统计'"
        class="home_bottom_center"
      >
        <InstallNum
          :xAxisData='xAxisDataInstall'
          :seriesData='seriesDataInstall'
        />
        <div class="button">
          <img
            class="left_img"
            src="~_ats/img/right.png"
            alt=""
          />
          <img
            class="right_img"
            src="~_ats/img/right.png"
            alt=""
          />
        </div>
      </BeautifulCard>
      <!-- 文件通报 -->
      <BeautifulCard
        :title="'文件通报'"
        class="home_bottom_right"
      >
        <div class="tipes">
          <span>今日</span>
          <span>历史</span>
        </div>
        <div
          class="file_img"
          v-for="item in fileData"
          :key="item.name"
        >
          <img
            v-if="item.name==='文件'"
            src="../../../assets/img/book.png"
          />
          <img
            v-else
            src="../../../assets/img/tb.png"
          />
          <span>{{item.name}}</span>
          <span @click="lookFile(item.name+'未读')">{{item.num}}({{item.type}})</span>
          <span @click="lookFile(item.name+'历史')">{{item.history}}</span>
        </div>

      </BeautifulCard>
    </div>
    <fileDialog
      ref="fileDialog"
      @getFileData='getFileData'
    />
  </div>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import PatrolMap from '_vie/common/patrolMap'
import WarningNum from './components/warningNum'
import InstallNum from './components/installNmu'
import fileDialog from './components/fileDialog.vue'

export default {
  name: 'Home',
  components: {
    BeautifulCard,
    PatrolMap,
    WarningNum,
    InstallNum,
    fileDialog
  },
  data () {
    return {
      // 国控站点日期
      gkzdDate: new Date(),
      stationList: [],
      stationCode: '',
      // 统计时间区间
      echartDate: [],
      // 巡查整改数据
      patrolData: {
        inspect: [{
          name: '本月检查项目', num: 2654
        }, { name: '本月检查次数', num: 2353 }, {
          name: '本月检查次数', num: 12324
        }],
        people: 45661,
        patrolList: [
          { name: '巡查单', count: 256643, percent: 80 },
          { name: '停工单', count: 256643, percent: 60 },
          { name: '督办单', count: 256643, percent: 40 },
          { name: '整改单', count: 256643, percent: 50 }
        ]
      },

      // 中间当前时间
      projectInfo: {
        count: '56562',
        list: [
          { id: 'xm1', name: '项目1', num: 3145 },
          { id: 'xm2', name: '项目2', num: 3145 },
          { id: 'xm3', name: '项目3', num: 3145 },
          { id: 'xm4', name: '项目4', num: 3145 },
          { id: 'xm5', name: '项目5', num: 3145 }
        ]
      },
      // 国控数据
      paramslist: [
        { id: '1', name: '参数类型', value: 2134 },
        { id: '2', name: '参数类型', value: 2134 },
        { id: '3', name: '参数类型', value: 2134 },
        { id: '4', name: '参数类型', value: 2134 },
        { id: '5', name: '参数类型', value: 2134 },
        { id: '6', name: '参数类型', value: 2134 },
        { id: '7', name: '参数类型', value: 2134 },
        { id: '8', name: '参数类型', value: 2134 },
        { id: '9', name: '参数类型', value: 2134 },
        { id: '10', name: '参数类型', value: 2134 },
        { id: '11', name: '参数类型', value: 2134 },
        { id: '12', name: '参数类型', value: 2134 },
        { id: '13', name: '参数类型', value: 2134 },
        { id: '14', name: '参数类型', value: 2134 },
        { id: '54', name: '参数类型', value: 2134 },
        { id: '45', name: '参数类型', value: 2134 },
        { id: '47', name: '参数类型', value: 2134 }
      ],
      // 报警统计图
      xAxisData: ['3.01', '3.02', '3.03', '3.04', '3.05', '3.06', '3.07'],
      seriesData: [20, 50, 10, 35, 35, 47, 20],
      // 安装区县统计图
      xAxisDataInstall: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      seriesDataInstall: [{
        name: 'D',
        data: [30, 32, 31, 34, 90, 30, 20]
      },
      {
        name: 'Mail Ad',
        data: [20, 12, 10, 34, 90, 30, 20]
      },
      {
        name: 'Affiliate Ad',
        data: [10, 22, 21, 54, 10, 30, 40]
      }, {
        name: 'Video Ad',
        data: [10, 22, 21, 54, 10, 30, 40]
      }],
      fileData: [{ name: '文件', num: 132, type: '未读', history: 132455 },
      { name: '通报', num: 132, type: '未读', history: 132455 }],
      api: {
        patrolDataApi: 'integration/check/getCount', // 巡查整改
        projectTotalApi: 'integration/project/getMiddleNumber', // 中间大数字
        gkzdApi: 'integration/epmapStation/epmapStationList', // 国控站点下拉框数据
        getStationDataApi: 'integration/epmapStation/epmapStationData/', // 国控站点根据下拉框的参数列表
        getFileApi: '/integration/document/getNoReadNumberFromWg', // 文件通报
        getInstallApi: '/integration/project/getGqxAzTjr' // 各县区安装数量
      }

    }
  },
  created () {
    this.getPatrolData()
    this.getProjectData()
    this.getgkzdData()
    this.getFileData()
    this.getInstallData()
  },
  methods: {
    getgkzdData () {
      this.$http({
        url: this.api.gkzdApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.stationList = data
          this.stationCode = data[0].stationCode
          this.stationChange()
        } else {
          this.$message.error(msg || '获取国控站点数据错误')
        }
      })
    },
    getPatrolData () { // projectTotalApi
      this.$http({
        url: this.api.patrolDataApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.patrolData = data
        } else {
          this.$message.error(msg || '获取巡察整改数据错误')
        }
      })
    },
    getProjectData () { // projectTotalApi
      this.$http({
        url: this.api.projectTotalApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          data.count = data.count.toString()
          this.projectInfo = data
        } else {
          this.$message.error(msg || '获取项目总数错误')
        }
      })
    },
    stationChange () {
      this.$http({
        url: this.api.getStationDataApi + this.stationCode
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          let arr = []
          for (let key in data) {
            arr.push({ name: key, value: data[key] })
            // console.log(data[key].length)
          }
          this.paramslist = arr
        } else {
          this.$message.error(msg || '获取巡察整改数据错误')
        }
      })
    },
    getFileData () {
      this.$http({
        url: this.api.getFileApi,
        method: 'post',
        data: {
          phoneNumber: sessionStorage.getItem('userId')
        }
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.fileData = data
        } else {
          this.$message.error(msg || '获取国控站点数据错误')
        }
      })
    },
    getInstallData () {
      this.$http({
        url: this.api.getInstallApi
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.xAxisDataInstall = data.xAxisDataInstall
          this.seriesDataInstall = data.seriesDataInstall
        } else {
          this.$message.error(msg || '获取国控站点数据错误')
        }
      })
    },
    lookFile (name) {
      this.$refs.fileDialog.open(name)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .picker {
    height: 35px;
    text-align: right;

    .gkzd-date {
      width: 9rem;
    }
  }
  .home_top,
  .home_bottom {
    display: flex;
    justify-content: space-between;
    .dataPicker {
      position: absolute;
      right: 5%;
      top: 20%;
    }
  }
  .home_top {
    height: 57.5%;
  }
  .home_bottom {
    height: 40%;
  }
  .inspect {
    background-color: #103387;
    border-radius: 0.5rem;
    border: 1px solid #334c9e;
    display: flex;
    align-items: stretch;
    font-size: 14px;
    .inspect_time,
    .inspect_people {
      width: 50%;
    }
    .inspect_time {
      border-right: 1px solid #183b8f;
      > li {
        display: flex;
        align-items: center;
        padding: 0 14px;
        height: 50px;
        :nth-of-type(n + 2) {
          border-top: 1px solid #183b8f;
        }
        span {
          font-weight: bold;
          color: var(--high-color);
        }
      }
    }
    .inspect_people {
      text-align: center;
      .first {
        display: flex;
        align-items: center;
        padding-left: 14px;
        height: 50px;
      }
      img {
        display: inline-block;
        width: 3rem;
      }
      .people_num {
        font-size: 24px;
        color: var(--high-color);
        margin-top: 0.5rem;
      }
    }
  }
  .home_top_left,
  .home_top_right {
    width: 23.75rem;
    flex-shrink: 0;
  }
  .home_top_right {
    .picker {
      margin: 0.8rem 0 1.25rem 0;
    }
    .gkzd-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      height: calc(100% - 70px);
      overflow-y: scroll;
    }
    .gkzd-list-item {
      width: calc(50% - 5px);
      display: inline-flex;
      align-items: center;
      height: 40px;
      background: rgba(19, 60, 145, 0.85);
      border: 1px solid #334c9e;
      margin: 5px 0;
      padding: 4px 15px;
      background-color: #133c91;
      border-radius: 4px;
    }
  }
  // --------
  .home_top_center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .totalnum {
      position: relative;
      top: -1.5rem;
      color: var(--color-text);
      text-align: center;
      .time {
        position: relative;
        top: -0.5rem;
        padding: 0 20px;
        width: 170px;
        margin: 0 auto;
        font-size: 20px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          margin: 0 5px;
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          margin-top: -8px;
          width: 11px;
          height: 16px;
          background: url("~_ats/img/icon_brackets.png") no-repeat center/ 100%
            auto;
        }
        &::before {
          left: 0;
        }
        &::after {
          right: 0;
          transform: scale(-1, 1);
        }
      }
      .bignum {
        position: relative;
        padding: 0 72px;
        height: 140px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 0;
          margin-top: 0;
          width: 58px;
          height: 140px;
          background: url("~_ats/img/num_left.png") no-repeat center/ 100% auto;
        }
        &::before {
          left: 0;
        }
        &::after {
          right: 0;
          transform: scale(-1, 1);
        }
        .bginum-text {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 89px;
          font-family: "DS-Digital";
        }
        .bginum-text-item {
          position: relative;
          display: inline-block;
          width: 72px;
          height: 103px;
          border: 2px solid #29c0ff;
          margin: 0 4px;
          border-radius: 8px;
          z-index: 1;
        }
      }
      .total_text {
        font-size: 28px;
        font-family: YouSheBiaoTiHei;
        font-weight: bold;
        color: var(--high-color);
        letter-spacing: 4px;
        margin-top: 6px;
      }
    }
    .images {
      position: relative;
      top: -16px;
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      padding: 0 2.5rem;
      margin-top: 10px;
      .total_y {
        width: 14.56rem;
        position: absolute;
        top: -12px;
      }
      .images_item {
        display: inline-block;
        font-size: 1rem;
        color: #fff;
        position: relative;
        font-weight: bold;
      }
      .images_item1,
      .images_item7 {
        margin-top: -32px;
      }
      .images_item2,
      .images_item6 {
        margin-top: -5px;
      }
      .images_item3,
      .images_item5 {
        margin-top: 30px;
      }
      .images_item4 {
        margin-top: 60px;
      }
      .images_value {
        font-size: 22px;
        font-family: HYLingXinJ;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        &:hover {
          transform: scale(1.2);
        }
      }
      .images_item1 .images_value,
      .images_item7 .images_value,
      .images_item3 .images_value,
      .images_item5 .images_value {
        background: url("~_ats/img/img1.png") no-repeat center center;
        background-size: 100% 100%;
        width: 8rem;
        height: 8rem;
      }
      .images_item3 .images_value,
      .images_item5 .images_value {
        width: 10rem;
        height: 10rem;
      }
      .images_item2 .images_value,
      .images_item4 .images_value,
      .images_item6 .images_value {
        background: url("~_ats/img/img2.png") no-repeat center center;
        background-size: 100% 100%;
        width: 9rem;
        height: 9rem;
      }
      .images_item4 .images_value {
        width: 12rem;
        height: 12rem;
      }
    }
  }
  .home_bottom_left {
    .pickers {
      display: flex;
      justify-content: flex-end;
      .picker {
        transform: scale(0.7);
        text-align: right;
      }
      /deep/.el-input__prefix {
        top: 0;
        left: 7rem;
      }
      /deep/.el-input__inner {
        height: 2.5rem;
        margin-left: 0.5rem;
      }
    }
  }
  .home_bottom {
    justify-content: space-between;
  }
  .home_bottom_left,
  .home_bottom_right,
  .home_bottom_center {
    width: 38.13rem;
    // height: 28.13rem;
    border: 1px solid blue;
    position: relative;
    .button {
      img {
        width: 0.6rem;
        height: 1rem;
        position: absolute;
      }
      .left_img {
        transform: rotate(180deg);
        position: absolute;
        bottom: 1.28rem;
        left: 2.8rem;
      }
      .right_img {
        bottom: 1.28rem;
        right: 2rem;
      }
    }
    .tipes {
      display: flex;
      justify-content: flex-end;
      text-align: center;
      margin: 2rem 0 1rem 0;
      span {
        width: 22%;
        color: #39f8ff;
      }
    }
    .file_img {
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
      background-color: #12298d;
      padding: 10px 0;
      border-radius: 1rem;
      margin-bottom: 1rem;
      img {
        width: 3.5rem;
        height: 3.5rem;
        margin: 0.5rem;
      }
    }
  }
}
</style>
