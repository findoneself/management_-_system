<template>
  <!--车洗裸土 -->
  <div class="container">
    <div class="content_left">
      <BeautifulCard class="control" :isTriangle="false" :title="'管控信息'">
        <div class="params">
          <div
            class="item"
            v-for="(item, index) in paramslist"
            :key="index + '/'"
          >
            <div></div>
            <div class="span">{{ item.name }}</div>
            <div class="span">
              <div class="margin" :style="{ color: item.color }">
                {{ item.value }}
              </div>
              <span class="company">{{ item.company }}</span>
            </div>
          </div>
        </div>
      </BeautifulCard>
      <BeautifulCard
        class="car_in_out"
        :isTriangle="false"
        :title="'车辆出入记录'"
      >
        <div class="record">
          <el-select
            class="select_car_time"
            popper-class="select_car_time"
            @change="carTimeChange"
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in carTImeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <CarInAndOutMap></CarInAndOutMap>
        <div class="recordlist">
          <div
            class="record_item"
            v-for="(item, index) in recordList"
            :key="index"
            :style="{ backgroundColor: index % 2 == 0 ? '#0B1771' : '#02004D' }"
          >
            <div>
              <div
                class="colorBox"
                :style="{ backgroundColor: item.color }"
              ></div>
            </div>
            <div class="scale width">{{ item.name }}</div>
            <div class="scale">{{ item.value }}次</div>
            <div class="lookat">查看</div>
          </div>
        </div>
      </BeautifulCard>
    </div>
    <!-- 右侧地图区域 -->
    <div class="content_right">
      <!-- 上半部分 -->
      <div class="map_video">
        <div class="map"></div>
        <BeautifulCard class="online_video" :isTriangle="false" :title="'在线视频'">
          <div ></div>
        </BeautifulCard>
      </div>
    </div>
  </div>
</template>

<script>
import BeautifulCard from "_com/common/BeautifulCard";
import CarInAndOutMap from "./index_components/CarInAndOutMap.vue";
export default {
  name: "CarWashing",
  components: {
    BeautifulCard,
    CarInAndOutMap,
  },
  data() {
    return {
      paramslist: [
        { name: "在监工程总数", value: "16", company: "项", color: "#39FFEF" },
        { name: "备案渣土车", value: "16", company: "辆", color: "#3DB6FC" },
        { name: "AI识别安装率", value: "16", company: "%", color: "#0BD3A6" },
        { name: "准运渣土车", value: "16", company: "辆", color: "#FF6D15" },
        {
          name: "土方运输总数",
          value: "16",
          company: "万方",
          color: "#FFB31F",
        },
        { name: "违规渣土车", value: "0", company: "辆", color: "#B94AFF" },
      ],
      carTImeList: [
        {
          value: "选项1",
          label: "近一周",
        },
        {
          value: "选项2",
          label: "近一月",
        },
        {
          value: "选项3",
          label: "近一年",
        },
      ],
      value: "选项1",
      recordList: [
        { value: 40, name: "合规车次", color: "#FCFF20" },
        { value: 22, name: "无证黑车", color: "#FF9920" },
        { value: 33, name: "文明状态异常", color: "#FF4F01" },
        { value: 28, name: "道路许可证过期", color: "#FF3D54" },
        { value: 20, name: "准运证过期", color: "#00FFFF" },
      ],
    };
  },
  methods: {
    carTimeChange(value) {
      console.log(value);
      //  发起环状饼图的数据请求
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 1.25rem;
  display: flex;
}
.content_left {
  display: flex;
  flex-direction: column;
  .control {
    width: 25rem;
    height: 22.45rem;
    .params {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 0 0.2rem;
      margin-top: 0.5rem;
      .item {
        width: 11.1rem;
        text-align: center;
        cursor: pointer;
        height: 5rem;
        margin: 0.25rem;
        background-color: #133c91;
        border-radius: 0.3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 1rem;
        padding: 1rem;
        align-items: flex-start;
        .span {
          display: flex;
          align-items: center;
          transform: scale(0.9);
          text-align-last: justify;
          margin-top: 0.4rem;
          .margin {
            font-size: 1.5rem;
            width: 2.5rem;
            text-align: left;
          }
        }
      }
    }
  }
  .car_in_out {
    width: 25rem;
    height: 35rem;
    background-color: #02004d;
    .record {
      text-align: right;
      padding: 0.5rem;
      /deep/.el-select-dropdown {
        border: none !important;
        background: #192f4a !important;
        z-index: 999;
      }
    }
    .recordlist {
      display: flex;
      flex-direction: column;
      align-items: center;

      .record_item {
        display: flex;
        width: 22.5rem;
        height: 2.3rem;
        background-color: #02004d;
        justify-content: space-around;
        align-items: center;
        line-height: 2.3rem;
        font-size: 0.88rem;
        div {
          flex: 1;
        }
        .lookat {
          color: #00ffff;
          transform: scale(0.9);
          cursor: pointer;
        }
        .scale {
          transform: scale(0.8);
        }
        .width {
          flex: 25%;
        }
        .colorBox {
          width: 1.3rem;
          height: 0.56rem;
          margin-left: 1.3rem;
          border-radius: 0.5rem;
        }
      }
    }
    .select_car_time {
      width: 6.63rem;
      height: 2.88rem;
      font-size: 0.88rem;

      /deep/.el-input--suffix .el-input__inner {
        // width: 9rem;
        height: 1.88rem;
        padding-left: 0.5rem;
        color: #fff;
        font-size: 0.88rem;
        background-color: #040560;
        border: 0.0625rem solid #040560;
        box-shadow: inset -1px -1px 10px rgba(48, 82, 184, 0.5),
          inset 1px 1px 10px rgba(48, 82, 184, 0.5);
      }
      /deep/.el-input__prefix,
      .el-input__suffix {
        // top: .1875rem;
      }
      /deep/.el-select-dropdown {
        border: none !important;
        background: #192f4a !important;
        z-index: 999;
      }
      /deep/.el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background-color: #040560;
      }
    }
  }
}
.content_right{
flex: 1;
.map_video{
  display: flex;
  .map{
    flex: 1;
  }
  .online_video{
    width: 25rem;
    height: 37.5rem;
  }
}
}
</style>