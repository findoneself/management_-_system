<template>
  <!--项目管理 -->
  <div>
    <BeautifulWrapper :borderIcon='borderIcon'>
      <div class="container">
        <div class="container_left">
          <!-- 项目总数 -->
          <BeautifulCard
            :title="'项目总数'"
            :isTriangle="false"
          >
            <div class="project_total">
              <div></div>
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

        </div>
      </div>
    </BeautifulWrapper>
  </div>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'

export default {
  name: 'ProjectIndex',
  components: {
    BeautifulWrapper,
    BeautifulCard
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
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
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
        height: 2.4rem;
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
  }
}
</style>