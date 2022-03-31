<template>
  <!--项目管理 -->
  <BeautifulWrapper
    :borderIcon='borderIcon'
    :wraStyle='wraStyle'
  >
    <div class="container">
      <div class="container_left">
        <!-- 项目总数 -->
        <BeautifulCard
          :title="'项目总数'"
          :isTriangle="false"
        >
          <div class="project_total">
            <ProjectTotalPie></ProjectTotalPie>
            <div class="params">
              <div
                class="item"
                v-for="(item, index) in paramslist"
                :key="index + '.'"
              >
                <div
                  class="color"
                  :style="{ backgroundColor: item.color }"
                ></div>
                <div class="span">{{ item.name }}:
                  <span class="margin">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </BeautifulCard>
        <!-- 业务分类 -->
        <BeautifulCard
          :title="'业务分类'"
          :isTriangle="false"
        >
          <div class="project_total">
            <BusinessSortPie></BusinessSortPie>
            <div class="params business">
              <div
                class="item business"
                v-for="(item, index) in businessSortList"
                :key="index + '.'"
              >
                <div
                  class="color"
                  :style="{ backgroundColor: item.color }"
                ></div>
                <div class="span">{{ item.name }}:
                  <span class="margin">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </BeautifulCard>
        <!-- 每月新增 -->
        <BeautifulCard
          :title="'每月新增'"
          :isTriangle="false"
        >
          <addMonthChart
            :xAxisData='xAxisData'
            :seriesData='seriesData'
          />
        </BeautifulCard>
      </div>
      <!-- 中间地图区域 -->
      <div class="map"></div>
      <!-- 右边列表 -->
      <div class="super_list">
        <BeautifulCard
          :isShowHead="false"
          :isTriangle="false"
        >
          <div class="super_list_top">
            <div class="super_top_title">
              <div class="left_img">
                <img
                  src="~_ats/img/shizhong.png"
                  alt=""
                >
                <div class="zhongjian scale">超期90天未竣工:</div>
                <div class="scale num">123</div>
              </div>
              <div class="scale">更多</div>
            </div>
            <div class="columns">
              <div
                v-for="item in columns"
                :key='item.id'
              >{{item.name}}</div>
            </div>
            <div class="data">
              <div
                class="data_item"
                v-for="item in dataList"
                :key="item.id"
              >
                <div>{{item.jcd}}</div>
                <div>{{item.jcwd}}</div>
                <div>{{item.sgdw}}</div>
                <div>{{item.cqt}}</div>
              </div>
            </div>
          </div>
        </BeautifulCard>
        <BeautifulCard
          :isShowHead="false"
          :isTriangle="false"
        >
          <div class="super_list_top">
            <div class="super_top_title">
              <div class="left_img">
                <img
                  src="~_ats/img/shizhong.png"
                  alt=""
                >
                <div class="zhongjian scale">本月已考评:</div>
                <div class="scale num">123</div>
                <div class="zhongjian scale unkao">本月未考评:</div>
                <div class="scale num2">123</div>
              </div>
              <div class="scale">更多</div>
            </div>
            <div class="columns">
              <div
                v-for="item in columns"
                :key='item.id'
              >{{item.name}}</div>
            </div>
            <div class="data">
              <div
                class="data_item"
                v-for="item in dataList"
                :key="item.id"
              >
                <div>{{item.jcd}}</div>
                <div>{{item.jcwd}}</div>
                <div>{{item.sgdw}}</div>
                <div>{{item.cqt}}</div>
              </div>
            </div>
          </div>
        </BeautifulCard>
      </div>
    </div>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import ProjectTotalPie from './components/ProjectTotalPie.vue'
import BusinessSortPie from './components/BusinessSortPie.vue'
import addMonthChart from './components/addMonthChart.vue'

export default {
  name: 'ProjectIndex',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    ProjectTotalPie,
    BusinessSortPie,
    addMonthChart
  },
  data () {
    return {
      borderIcon: ['top', 'right', 'bottom', 'left'],
      paramslist: [
        {
          name: '房建',
          value: 45,
          color: '#FCFF20'
        },
        {
          name: '市政',
          value: 3434,
          color: '#FF4F01'
        },
        {
          name: '轨道',
          value: 21,
          color: '#FF3D54'
        },
        {
          name: '其他',
          value: 50,
          color: ' #00FFFF'
        }
      ],
      businessSortList: [
        {
          name: 'AI识别',
          value: 45,
          color: '#FCFF20', itemStyle: {
            normal: {
              color: '#FCFF20'
            }
          }
        },
        {
          name: ' 水质',
          value: 34,
          color: '#FF4F01', itemStyle: {
            normal: {
              color: '#FF4F01'
            }
          }
        },
        {
          name: ' 噪声',
          value: 21,
          color: '#FF3D54', itemStyle: {
            normal: {
              color: '#FF3D54'
            }
          }
        },
        {
          name: ' 扬尘',
          value: 50,
          color: ' #00FFFF', itemStyle: {
            normal: {
              color: '#00FFFF'
            }
          }
        },
        {
          name: '智慧工地',
          value: 50,
          color: ' #FFAE00', itemStyle: {
            normal: {
              color: '#FFAE00'
            }
          }
        }
      ],
      wraStyle: { inPadding: '0px' },
      xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月'],
      seriesData: [20, 50, 10, 35, 35, 47],
      // 表格表头
      columns: [
        { name: '项目名称', prop: 'jcd', key: 1 },
        { name: '开发单位', prop: 'jcwd', key: 2 },
        { name: '施工单位', prop: 'sgdw', key: 3 },
        { name: '超期/天', prop: 'cqt', key: 4 }
      ],
      // 表格数据
      dataList: [
        {
          id: '2', jcwd: '开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        },
        {
          id: '3', jcwd: '开发单位开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        },
        {
          id: '4', jcwd: '开发单位开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        },
        {
          id: '1', jcwd: '开发单位开发单位开发单位开发单位开发单位', jcd: '项目名称', cqt: '1223',
          sgdw: '施工单位施工单位施工单位施工单位'
        }]
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  background-color: #03014f;
  height: 100%;
  .map {
    flex: 1;
  }
  .container_left {
    display: flex;
    flex-direction: column;
    height: 100%;
    > div {
      height: 33.33%;
    }
  }
  .project_total {
    width: 25rem;
    height: 100%;
    .params {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 0 0.2rem;
      .item {
        width: 11.8rem;
        // height: 2.7rem;
        text-align: center;
        cursor: pointer;
        margin: 0.25rem;
        background-color: #0b1771;
        border-radius: 0.3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 1rem;
        padding: 0 1rem 0 1.5rem;
        .color {
          width: 1.2rem;
          height: 0.6rem;
          border-radius: 0.3rem;
        }
        .span {
          transform: scale(0.9);
          flex: 1;
          width: 3rem;
          text-align: left;
          // display: flex;
          // // justify-content: flex-start;
          // align-items: center;
          margin-left: 1rem;
          .margin {
            // width: 2.5rem;
            transform: scale(0.9);
            // text-align: left;
            margin-left: 0.4rem;
          }
        }
      }
    }
    .business {
      padding: 0;
      justify-content: flex-start;
      .item.business {
        width: 7.8rem;
        padding: 0 0 0 0.4rem;
        .span {
          margin-left: 0.1rem;
        }
      }
    }
  }
  .add_everyday {
    width: 25rem;
  }
  .super_list {
    display: flex;
    flex-direction: column;
    padding: 0.9rem;
    justify-content: space-between;
    > div {
      width: 23.75rem;
      // flex: 1;
      height: 49%;
    }
    /deep/.card-content {
      height: 100%;
      padding: 0 !important;
    }
    .super_list_top {
      height: 100%;
      .super_top_title {
        display: flex;
        justify-content: space-between;
        height: 11%;
        align-items: center;
        border-bottom: 1px solid #3b67e3;
        padding: 15px 19px 15px 15px;
        .left_img {
          display: flex;
          align-items: center;
          img {
            width: 1.4375rem;
            height: 1.4375rem;
          }
          .zhongjian {
            margin: 0 0.2rem;
          }
          .num {
            color: #ff791f;
          }
          .num2 {
            color: #18d9ae;
          }
          .unkao {
            margin-left: 1.5rem;
          }
        }
        .scale {
          transform: scale(0.9);
        }
      }
      .columns {
        display: flex;
        height: 10%;
        justify-content: space-around;
        align-items: center;
        color: #00eff4;
        border-bottom: 1px solid #3b67e3;
      }
      .data {
        height: 78%;
        align-items: center;
        .data_item {
          display: flex;
          height: 25%;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          border-bottom: 1px solid #3b67e3;
          > div {
            width: 5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        .data_item:last-child {
          border: none;
        }
      }
    }
    .super_list_bottom {
    }
  }
}
</style>