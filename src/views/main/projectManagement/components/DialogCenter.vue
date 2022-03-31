<template>
  <div class="dialogVisibleCenter">
    <i
      class="el-icon-close"
      @click="closeIcon"
    ></i>
    <div class="title">
      <span>{{dialogCenterData.dataForm1.title}}</span>
    </div>
    <div class="content">
      <div class="data">
        <div
          v-for="item in   dialogCenterData.dataForm1.data1"
          :key="item.value"
        >
          {{item.name}}:{{item.value.length>25?item.value.slice(0,20)+'...':item.value}}
        </div>
      </div>
      <div class="data">
        <div
          v-for="item in     dialogCenterData.dataForm1.data2"
          :key="item.value"
        >
          {{item.name}}:{{item.value.length>25?item.value.slice(0,20)+'...':item.value}}
        </div>
      </div>
      <div class="dataForm2_title">
        <div>{{dialogCenterData.dataForm2.title}}</div>
      </div>
      <div class="data">
        <div
          v-for="item in dialogCenterData.dataForm2.data1"
          :key="item.value"
        >
          {{item.name}}:{{item.value.length>25?item.value.slice(0,20)+'...':item.value}}
        </div>
      </div>
      <div class="data1">
        <div
          v-for="item in dialogCenterData.dataForm2.data2"
          :key="item.value"
        >
          {{item.name}}:{{item.value.length>25?item.value.slice(0,20)+'...':item.value}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {

  },
  props: {
    dialogVisibleCenter: {
      typr: Boolean,
      default: false
    },
    dialogCenterData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closeIcon () {
      console.log('关闭中心弹窗')
      this.$emit('closeDialogCenter')
    }
  }
}
</script>
<style lang="less" scoped>
.dialogVisibleCenter {
  width: 60%;
  height: 70%;
  position: relative;
  background: #00123e;
  box-shadow: inset -1px -1px 15px var(--shadow-color),
    inset 1px 1px 15px var(--shadow-color);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
}
.el-icon-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.title {
  color: #1274d5;
  font-size: 20px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #fff;
  span {
    border-bottom: 1px solid #1687f1;
    padding: 0 1rem 0.5rem;
  }
}
.content {
  padding: 1rem;
}
.data,
.data1 {
  display: flex;
  color: #fff;
  flex-wrap: wrap;
  align-items: center;

  div {
    width: 33.33%;
    height: 50px;
    display: flex;
    align-items: center;
  }
}
.dataForm2_title {
  border-bottom: 1px solid #fff;
  margin: 20px 0;
  position: relative;
  height: 5px;
  div {
    color: #fff;
    padding: 0 3rem;
    height: 10px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #00123e;
  }
}
.data1 {
  div {
    width: 25%;
  }
}
</style>