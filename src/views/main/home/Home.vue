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
            <li>本月检查项目：<span>{{ patrolData.inspect.project }}</span></li>
            <li>本月检查次数：<span>{{ patrolData.inspect.num1 }}</span></li>
            <li>本月检查次数：<span>{{ patrolData.inspect.num2 }}</span></li>
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
          <div class="time">
            <span class="span">{{ projectInfo.year }}年</span> <span>{{ projectInfo.month }}月</span>
          </div>
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
          <el-date-picker
            prefix-icon="el-icon-time"
            class="gkzd-date"
            size="mini"
            v-model="gkzdDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <ul class="gkzd-list">
          <li
            class="gkzd-list-item"
            v-for="(item, index) in paramslist"
            :key="index + '.'"
          >
            <span>{{ item.name }}：</span>
            <span>{{ item.value }}</span>
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
        <WarningNum></WarningNum>
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
        <InstallNum></InstallNum>
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
        <div class="file_img">
          <img
            src="~_ats/img/book.png"
            alt=""
          />
          <span>文件</span>
          <span>132(只读）</span>
          <span>214324</span>
        </div>
        <div class="file_img">
          <img
            src="~_ats/img/tb.png"
            alt=""
          />
          <span>通报</span>
          <span>132(只读）</span>
          <span>214324</span>
        </div>
      </BeautifulCard>
    </div>
  </div>
</template>

<script>
import BeautifulCard from '_com/common/BeautifulCard'
import PatrolMap from './components/patrolMap'
import WarningNum from './components/warningNum'
import InstallNum from './components/installNmu'
export default {
  name: 'Home',
  components: {
    BeautifulCard,
    PatrolMap,
    WarningNum,
    InstallNum
  },
  data () {
    return {
      // 国控站点日期
      gkzdDate: new Date(),
      // 统计时间区间
      echartDate: [],
      // 巡查整改数据
      patrolData: {
        inspect: {
          project: 2245,
          num1: 2654,
          num2: 6562
        },
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
        year: '',
        month: '',
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
      ]
    }
  },
  created () {
    this.getdate()
    const cdate = new Date()
    this.projectInfo.year = cdate.getFullYear()
    this.projectInfo.month = cdate.getMonth()
    this.projectInfo.count = this.projectInfo.count.split('')
  },
  methods: {
    getdate () {
      let res = this.$utils.getDate()
      this.date = res
      let end = res.split('-')
      Number(end[2]) < 31 && (end[2] = (Number(end[2]) + 1).toString())
      console.log(end.join('-'), Number(end[1]))
      this.startDate = res
      this.endDate = end.join('-')
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
    .gkzd-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      height: calc(100% - 35px);
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
      .images_item5 {
        margin-top: -32px;
      }
      .images_item3 {
        margin-top: 32px;
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
      .images_item3 .images_value,
      .images_item5 .images_value {
        background: url("~_ats/img/img1.png") no-repeat center center;
        background-size: 100% 100%;
        width: 140px;
        height: 140px;
      }
      .images_item2 .images_value,
      .images_item4 .images_value {
        background: url("~_ats/img/img2.png") no-repeat center center;
        background-size: 100% 100%;
        width: 170px;
        height: 170px;
      }
      .images_item3 .images_value {
        width: 200px;
        height: 200px;
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
        left: 3.8rem;
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
      margin: 2rem 0 0.5rem 0;
      span {
        width: 28%;
        color: #39f8ff;
      }
    }
    .file_img {
      display: flex;
      text-align: center;
      justify-content: space-around;
      align-items: center;
      background-color: #12298d;
      // height: 6.5rem;
      border-radius: 1rem;
      margin-bottom: 1rem;
      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }
}
</style>
