<template>
  <div class="tform-wrapper">
    <div class="tform-head">
      <slot name="tformheader" />
    </div>
    <div class="tform-contnent">
      <div
        class="tfrom-table"
        v-show="isTable"
      >
        <div
          class="tform-table-title"
          v-if="tableHeader.isTableHead"
        >
          <h2>{{ tableHeader.title || '' }}</h2>
          <small>{{ tableHeader.small || '' }}</small>
          <div
            class="tform-btnlist"
            v-show="tableHeader.isButton && tableHeader.btnList.length > 0"
          >
            <el-button
              v-for="item in tableHeader.btnList"
              :key="item.id || ''"
              :size="item.size"
              :type="item.type || 'primary'"
              @click="buttonClick(item)"
            >{{ item.name || '' }}</el-button>
          </div>
        </div>
        <BeautifulTableEl
          ref="tableEl"
          :is-clear-border="isClearBorder"
          :loading="loading"
          :height="height"
          :stripe="stripe"
          :border="border"
          :size="size"
          :index-obj="indexObj"
          :oper-obj="operObj"
          :data-list="dataList"
          :columns="columns"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 引入的表格组件，需要什么props或methods请在props中添加
import BeautifulTableEl from '_com/common/BeautifulTableEl'
export default {
  name: 'TableForm',
  components: {
    BeautifulTableEl
  },
  props: {
    // ------公共表格组件的数据
    // 是否清除表格所有边框
    isClearBorder: {
      type: Boolean,
      default: false
    },
    // 加载loading
    loading: {
      type: Boolean,
      default: false
    },
    // 表格高度
    height: [String, Number],
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 表格边框
    border: {
      type: Boolean,
      default: false
    },
    // 表格尺寸
    size: {
      type: String,
      default: '',
      validator: function (value) {
        return value === 'medium' || 'small' || 'mini'
      }
    },
    // 序号内容
    indexObj: {
      type: Object,
      default () {
        return {}
      }
    },
    // 操作内容
    operObj: {
      type: Object,
      default () {
        return {}
      }
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
    // isTableHead：是否显示顶部;isButton：是否显示按钮;btnList：按钮数据;title：顶部标题;small：小文字
    tableHead: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否需要显示表格
    isTable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tableHeader () {
      // 按钮{ id: 'export', name: '导出Excel', type: '', size: 'mini' }
      return Object.assign({
        isTableHead: true,
        isButton: true,
        btnList: [{ id: 'export', name: '导出Excel', type: '', size: 'mini' }],
        title: '测试标题',
        small: ''
      }, this.tableHead)
    }
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
}
.tform-head {
  padding: 18px;
  min-height: 82px;
  background: var(--head-bgcolor);
  border: 1px solid var(--head-bdcolor);
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
  font-weight: bold;
}
.tform-table-title > small {
  font-size: 16px;
  color: inherit;
}
.tform-btnlist {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}
.tform-btnlist .el-button {
  margin-left: 10px;
}
</style>