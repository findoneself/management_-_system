<template>
  <!--项目管理 -->
  <div>
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
          <BeautifulCard
            :title="'每月新增'"
            :isTriangle="false"
          >
            <div class="add_everyday"></div>
          </BeautifulCard>
        </div>
        <!-- 中间地图区域 -->
        <div class="map"></div>
        <!-- 右边列表 -->
        <div class="super_list">
          <div class="super_list_top"></div>
          <div class="super_list_bottom"></div>
        </div>
      </div>
    </BeautifulWrapper>
  </div>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import ProjectTotalPie from './components/ProjectTotalPie.vue'
import BusinessSortPie from './components/BusinessSortPie.vue'
export default {
  name: 'ProjectIndex',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    ProjectTotalPie,
    BusinessSortPie
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
      wraStyle: { inPadding: '0px' }
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
  }
  .project_total {
    width: 25rem;
    height: 19.4rem;
    .params {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow: hidden;
      padding: 0 0.2rem;
      margin-top: 0.5rem;
      .item {
        width: 11.8rem;
        height: 2.7rem;
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
    height: 18.6875rem;
  }
  .super_list {
    display: flex;
    flex-direction: column;
    padding: 0.625rem;
    .super_list_top,
    .super_list_bottom {
      width: 23.75rem;
      height: 455px;
      border: 1px solid red;
    }
  }
}
</style>