<template>
  <div class="container">
    <div class="home_top">
      <!-- 巡察整改 -->
      <BeautifulCard
        :width="'23.75rem'"
        :height="'33.13rem'"
        title="巡查整改"
        class="home_top_left"
      >
        <div class="inspect">
          <div class="inspect_time">
            <div>本月检查次数:<span>2132</span></div>
            <div>本月检查次数:<span>2132</span></div>
            <div class="last">本月检查次数:<span>2132</span></div>
          </div>
          <div class="inspect_people">
            <div class="first">网络员：</div>
            <img src="../../../assets/img/people.png" alt="" />
            <div class="people_num">12345人</div>
          </div>
        </div>
        <div>
          <PatrolMap></PatrolMap>
        </div>
      </BeautifulCard>
      <!-- 中间项目总数 -->
      <div class="home_top_center">
        <div class="totalnum">
          <div class="time">
            <img
              class="left_img"
              src="../../../assets/img/right.png"
              alt=""
            />
            <div><span class="span">2021年</span> <span>01月</span></div>
            <img
              src="../../../assets/img/right.png"
              alt=""
            />
          </div>
          <div class="bignum">
            <img
              class="big_img"
              src="../../../assets/img/num_left.png"
              alt=""
            />
            <div></div>
            <div></div>
            <div></div>
            <img
              class="big_i"
              src="../../../assets/img/num_right.png"
              alt=""
            />
          </div>
          <div class="total_text">
            <span>项</span><span>目</span><span>总</span><span>数</span><span>:</span>
          </div>
        </div>
        <div class="images">
          <div class="images_item images_item1">
            <div class="img1"></div>
            <span>项目分类</span>
          </div>
          <div class="images_item images_item2">
            <div class="img2"></div>
            <span>项目分类</span>
          </div>
          <div class="images_item images_item3">
            <div class="img3"></div>
            <span>项目分类</span>
          </div>
          <div class="images_item images_item4">
            <div class="img4"></div>
            <span>项目分类</span>
          </div>
          <div class="images_item images_item5">
            <div class="img5"></div>
            <span>项目分类</span>
          </div>
        </div>
      </div>
      <!-- 国控站点 -->
      <BeautifulCard class="home_top_right" title="国控站点">
        <div class="picker">
          <el-date-picker
            prefix-icon="el-icon-arrow-down"
            class="date"
            v-model="date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="params">
          <div
            class="item"
            v-for="(item, index) in paramslist"
            :key="index + '.'"
          >
            <div class="span">{{ item.name }}:</div>
            <div class="span margin">{{ item.value }}</div>
          </div>
        </div>
      </BeautifulCard>
      <div></div>
    </div>
    <div class="home_bottom">
      <BeautifulCard :title="'报警统计趋势分析'" class="home_bottom_left">
        <div class="pickers">
          <div class="picker">
            <span>开始时间：</span>
            <el-date-picker
              prefix-icon="el-icon-arrow-down"
              class="date"
              v-model="startDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <div class="picker">
            <span>结束时间：</span>
            <el-date-picker
              prefix-icon="el-icon-arrow-down"
              class="date"
              v-model="endDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </div>
      </BeautifulCard>
      <BeautifulCard :title="'各县区安装数量统计'" class="home_bottom_center">
        <div></div>
      </BeautifulCard>
      <BeautifulCard :title="'文件通报'" class="home_bottom_right">
        <div></div>
      </BeautifulCard>
    </div>
  </div>
</template>

<script>
import BeautifulCard from "_com/common/BeautifulCard";
import PatrolMap from "_com/patrolMap/patrolMap";
export default {
  name: 'Home',
  components: {
    BeautifulCard,
    PatrolMap,
  },
  data() {
    return {
      date: "",
      startDate:'',
      endDate:'',
      paramslist: [
        {
          name: "参数类型",
          value: 2134,
        },
        {
          name: "参数类型",
          value: 2134,
        },
        {
          name: "参数类型",
          value: 2134,
        },
        {
          name: "参数类型",
          value: 2134,
        },
      ],
    };
  },
  created() {
    this.getdate();
  },
  methods: {
    getdate() {
      let res = this.$utils.getDate();
      this.date = res;
      let end = res.split('-')
       
     
      Number(end[2])<31&&(end[2]=(Number(end[2])+1).toString())
       console.log( end.join('-'), Number(end[1]))
      this.startDate = res
      this.endDate = end.join('-')
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 1.25rem;
  .home_top,
  .home_bottom {
    display: flex;
    justify-content: space-around;
    .home_bottom_left {
      .pickers {
        display: flex;
        //  align-items: center;
        justify-content: flex-end;
        .picker {
          transform: scale(0.8);
          text-align: right;
          // margin-left: auto;
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 9rem;
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
  }
  .home_top_left,
  .home_top_right {
    width: 23.75rem;
    height: 33.13rem;
    .inspect {
      background-color: #103387;
      border-radius: 0.5rem;
      // width: 21.6rem;
      height: 9.4rem;
      display: flex;
      .inspect_time,
      .inspect_people {
        width: 50%;
        text-align: center;
        .first {
          height: 3.18rem;
          line-height: 3.18rem;
          font-size: 0.5rem;
          transform: scale(0.9);
          text-align: left;
        }
        img {
          width: 3rem;
          height: 2.88rem;
        }
        .people_num {
          font-size: 1.5rem;
          color: #59e6ff;
          margin-top: 0.5rem;
        }
      }
      .inspect_time {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-right: 1px solid #183b8f;
        div {
          height: 3.18rem;
          border-bottom: 1px solid #183b8f;
          text-align: center;
          line-height: 3.18rem;
          font-size: 0.5rem;
          transform: scale(0.9);
          span {
            color: #59e6ff;
            margin-left: 0.5rem;
          }
        }
        .last {
          border: none;
        }
      }
    }
  }
  .home_top_right,
  .home_bottom_left {
    .picker {
      height: 2.88rem;
      text-align: right;
      .date {
        text-align: right;
      }
    }
    /deep/.el-input__inner {
      width: 9rem;
      height: 1.88rem;
      padding-left: 0.5rem;
      color: #fff;
      font-size: 0.88rem;
      background-color: #040560;
      border: 0.0625rem solid #040560;
      box-shadow: inset -1px -1px 10px rgba(48, 82, 184, 0.5),
        inset 1px 1px 10px rgba(48, 82, 184, 0.5);
    }
    /deep/.el-input__prefix {
      top: -0.3rem;
      left: 12rem;
    }
    /deep/ .el-input__suffix {
      display: none;
    }
    .params {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      .item {
        width: 10.63rem;
        text-align: center;
        line-height: 3.1rem;
        height: 3.1rem;
        margin: 0.2rem;
        background-color: #133c91;
        border-radius: 0.3rem;
        .span {
          font-size: 0.88rem;
          transform: scale(0.9);
          display: inline-block;
        }
        .margin {
          margin-left: 0.2rem;
        }
      }
    }
  }
  .home_top_center {
    flex: 1;
    .totalnum {
      display: flex;
      flex-direction: column;
      height: 12.2rem;
      color: #fff;
      text-align: center;
      position: relative;
      .time {
        text-align: center;
        position: absolute;
        top: -1rem;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: 0.69rem;
          height: 1rem;
        }
        .left_img {
          transform: rotate(180deg);
        }
        div {
          display: inline;
          margin: 0 1.75rem;
          .span {
            margin-right: 1.25rem;
          }
          .span,
          span {
            font-size: 1.31rem;
          }
        }
      }
      .bignum {
        margin-top: 1.5rem;
        div {
          display: inline-block;
          margin-right: 0.4rem;
        }
        .big_img {
          margin-right: 0.8rem;
        }
        .big_i {
          margin-left: 0.4rem;
        }
        img,
        div {
          width: 4.13rem;
          height: 6.56rem;
          border: 1px solid #3ccaff;
          border-radius: 1rem;
          // margin: 0 0.4rem;
        }
        .big_img,
        .big_i {
          border: none;
        }
      }
      .total_text {
        color: #39f8ff;
        font-size: 1.6rem;
        margin-top: 0.5rem;
        span {
          margin: 0.2rem;
        }
      }
    }
    .images {
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      padding: 0 2.5rem;
      .images_item {
        display: flex;
        flex-direction: column;
        display: inline-block;
        font-size: 1rem;
        color: #fff;
        position: relative;
      }
      .images_item1,
      .images_item5 {
        margin-top: -2rem;
      }
      .images_item3 {
        margin-top: 2rem;
      }
      .img1,
      .img3,
      .img5 {
        background: url("../../../assets/img/img1.png") no-repeat center center;
        background-size: 100% 100%;
        width: 10rem;
        height: 10rem;
        margin-bottom: 0.9rem;
      }
      .img2,
      .img4 {
        background: url("../../../assets/img/img2.png") no-repeat center center;
        background-size: 100% 100%;
        width: 12rem;
        height: 12rem;
        margin-bottom: 0.9rem;
      }
      .img3 {
        width: 15rem;
        height: 15rem;
      }
    }
  }
  .home_bottom {
    justify-content: space-between;
    margin: 1.25rem 0;
  }
  .home_bottom_left,
  .home_bottom_right,
  .home_bottom_center {
    width: 38.13rem;
    height: 28.13rem;
    border: 1px solid blue;
  }
}
</style>
