<template>
  <!-- 手写展示数据list -->
  <div class="be-table-list">
    <div
      class="be-table-ul"
      :class="stripe && 'be-table--stripe'"
    >
      <div
        class="be-table-li be-table-header"
        v-if="isHeader"
      >
        <!-- 序号表头列 -->
        <div
          v-if="dataList.length > 0 && columns.length > 0 && tableIndex.isIndex"
          :style="cellHeight ? {width: tableIndex.width, height: cellHeight} : {width: tableIndex.width}"
          class="be-table-index cell"
        >序号</div>
        <!-- 所有表头列 -->
        <div
          class="cell"
          v-for="item in tabColumns"
          :style="cellHeight ? {height: cellHeight} : {}"
          :key="item.prop"
        >{{ item.name|| '' }}</div>
        <!-- 操作列 -->
        <div
          class="be-table-oper cell"
          :style="cellHeight ? {width: tableIndex.width, height: cellHeight} : {width: tableIndex.width}"
          v-if="dataList.length > 0 && columns.length > 0 && tableOper.isOperation"
        >操作</div>
      </div>
      <div
        class="be-table-content"
        :class="isHeader ? 'be-ishead-content' : 'be-nohead-content'"
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-spinner="loadingIcon"
      >
        <ul style="height: 100%">
          <li
            class="be-table-li be-table-item"
            v-for="(item, iindex) in dataList"
            :key="item.id"
          >
            <!-- 序号列 -->
            <div
              v-if="dataList.length > 0 && columns.length > 0 && tableIndex.isIndex"
              :style="cellHeight ? {width: tableIndex.width, minHeight: cellHeight} : {width: tableIndex.width}"
              class="be-table-index cell"
            >{{ iindex + 1 }}</div>
            <!-- 所有字段列 -->
            <div
              class="cell"
              v-for="(value, vindex) in columns"
              :style="cellHeight ? {minHeight: cellHeight} : {}"
              :key="'value-' + vindex"
            >{{ item[value.prop] || '' }}</div>
            <!-- 操作列，传参复杂 -->
            <div
              class="be-table-oper cell"
              :style="cellHeight ? {width: tableIndex.width, minHeight: cellHeight} : {width: tableIndex.width}"
              v-if="dataList.length > 0 && columns.length > 0 && tableOper.isOperation"
            >
              <template v-if="tableOper.isUnifiedOper">
                <el-link
                  class="table-link"
                  v-for="(btn, index) in tableOper.operButton"
                  :key="btn.key ? btn.key : index"
                  :type="btn.type ? btn.type : ''"
                  :disabled="btn.disabled ? btn.disabled : false"
                  :underline="btn.underline || tableOper.btnUnderline || false"
                  :icon="btn.icon ? btn.icon : ''"
                  @click.stop="btn.click(scope.row)"
                >
                  {{ btn.text }}
                </el-link>
              </template>
              <template v-else>
                <slot
                  name="oper"
                  v-bind="{ row: scope.row }"
                ></slot>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeautifulTableList',
  props: {
    // 加载loading
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '数据加载中...'
    },
    loadingIcon: {
      type: String,
      default: 'el-icon-loading'
    },
    // 是否斑马纹
    stripe: {
      type: Boolean,
      default: true
    },
    // 表格高度
    height: {
      type: String,
      default: '100%'
    },
    // cell高度，单位为rem
    cellHeight: String,
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
    // 是否需要表头
    isHeader: {
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
      required: true,
      default () {
        return []
      }
    }
  },
  computed: {
    // 定义默认序号列数据
    tableIndex () {
      return Object.assign({
        isIndex: false,
        width: '3.75rem'
      }, this.indexObj)
    },
    // 表头排序
    tabColumns () {
      const col = this.$utils.compareSort(this.columns, 'key')
      return col
    },
    // 定义默认操作列数据
    // 默认每个按钮都有各自的属性，如果属性不存在，则查看是否存在公共的
    // operButton集合字段：type(类型), text(文本), click(点击), underline(下划线), icon(图标)
    // isOperation是否需要操作列，isUnifiedOper是否统一操作列，否则自定义
    tableOper () {
      return Object.assign({
        operButton: [],
        isOperation: false,
        isUnifiedOper: true,
        btnUnderline: false,
        width: '6.25rem'
      }, this.operObj)
    }
  }
}
</script>

<style scoped lang="less">
</style>