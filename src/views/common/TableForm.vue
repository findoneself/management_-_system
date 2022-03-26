<template>
  <div class="tform-wrapper">
    <div class="tform-form">
      <slot name="headform" />
    </div>
    <div class="tform-contnent">
      <div
        class="tform-table-title"
        v-if="tformHeader.isTableHead"
      >
        <h2>{{ tformHeader.title || '' }}</h2>
        <small>{{ tformHeader.small || '' }}</small>
        <div
          class="tform-btnlist"
          v-show="tformHeader.btnType && tformHeader.btnList.length > 0"
        >
          <template v-if="tformHeader.btnType === 'elbtn'">
            <el-button
              v-for="item in tformHeader.btnList"
              :key="item.id || ''"
              :size="item.size || ''"
              :type="item.type || ''"
              @click="buttonClick(item)"
            >{{ item.name || '' }}</el-button>
          </template>
          <template v-else>
            <div
              v-for="item in tformHeader.btnList"
              :key="item.id"
              class="tabs-button-item"
              :class="item.id === curBtnId && 'tabs-button-active'"
              @click="buttonClick(item)"
            >{{ item.name }}</div>
          </template>
        </div>
      </div>
      <div
        class="tfrom-table"
        v-show="isTable"
      >
        <BeautifulTableList
          :loading="loading"
          :loading-text="loadingText"
          :loading-icon="loadingIcon"
          :stripe="stripe"
          :cell-height="cellHeight"
          :is-header="isHeader"
          :index-obj="indexObj"
          :oper-obj="operObj"
          :data-list="dataList"
          :columns="columns"
        />
      </div>
      <div
        class="tform-custom"
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-spinner="loadingIcon"
        v-show="!isTable"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 引入的表格组件，需要什么props或methods请在props中添加
import BeautifulTableList from '_com/common/BeautifulTableList'
export default {
  name: 'TableForm',
  components: {
    BeautifulTableList
  },
  props: {
    // ------公共表格组件的数据
    // 加载loading
    loading: Boolean,
    loadingText: {
      type: String,
      default: '数据加载中...'
    },
    loadingIcon: {
      type: String,
      default: 'el-icon-loading'
    },
    // 是否需要表头
    isHeader: {
      type: Boolean,
      default: true
    },
    // cell高度，单位为rem
    cellHeight: String,
    // 序号内容
    indexObj: Object,
    // 操作内容
    operObj: Object,
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: true
    },
    // 表格数据
    dataList: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    // 表头数据
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    // -----组件内的参数
    // 表格顶部信息，其中按钮可以扩展为多个按钮
    // isTableHead：是否显示顶部;btnType：按钮类型（elbtn/custom/false）;btnList：按钮数据;title：顶部标题;small：小文字
    // 按钮类型：elbtn需要传基本的四个参数，自定义必须传id和name
    tformHead: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否需要显示表格
    isTable: {
      type: Boolean,
      default: true
    },
    // 是否高亮当前选中的行
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    // 当前自定义按钮点击的id
    curBtnId: {
      type: String,
      default: ''
    }
  },
  computed: {
    tformHeader () {
      // 按钮{ id: 'export', name: '导出Excel', type: '', size: 'mini' }
      return Object.assign({
        isTableHead: true,
        btnType: false,
        btnList: [{ id: 'export', name: '导出Excel', type: 'primary', size: 'medium' }],
        title: '测试标题',
        small: ''
      }, this.tformHead)
    }
  },
  mounted () {
    console.log(Boolean(this.$slots.headform))
  },
  methods: {
    // 按钮点击
    buttonClick (item) {
      this.$emit('buttonClick', item)
    }
  }
}
</script>

<style scoped>
.tform-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tform-contnent {
  flex: 1;
}
.tform-form {
  padding: 18px;
  flex-shrink: 0;
  background: var(--head-bgcolor);
  border: 1px solid var(--head-bdcolor);
}
.tfrom-table,
.tform-custom {
  height: calc(100% - 100px);
}
.el-table {
  margin-top: 0;
}
.tform-table-title {
  position: relative;
  text-align: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tform-table-title > h2 {
  font-size: 20px;
  line-height: 180%;
  font-weight: bold;
}
.tform-table-title > small {
  font-size: 16px;
  line-height: 180%;
  color: inherit;
}
.tform-btnlist {
  position: absolute;
  top: 24px;
  right: 30px;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}
.tform-btnlist .el-button {
  margin-left: 10px;
}
.tabs-button-item {
  margin: 0;
}
</style>