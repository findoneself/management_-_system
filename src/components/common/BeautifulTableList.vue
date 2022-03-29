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
          :style="cellHeight ? {height: cellHeight, width: item.width, flex: item.width ? 'none' : 1} : {width: item.width, flex: item.width ? 'none' : 1}"
          :key="item.prop"
        >{{ item.name|| '' }}</div>
        <!-- 操作列 -->
        <div
          class="be-table-oper cell"
          :style="cellHeight ? {width: tableOper.width, height: cellHeight} : {width: tableOper.width}"
          v-if="dataList.length > 0 && columns.length > 0 && tableOper.isOperation"
        >{{ tableOper.headName }}</div>
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
            :class="curRowIndex === iindex ? 'be-tableli--active' : ''"
            @click="rowClick(item, iindex)"
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
              :style="cellHeight ? {minHeight: cellHeight, width: value.width, flex: value.width ? 'none' : 1} : {width: value.width, flex: value.width ? 'none' : 1}"
              :key="'value-' + vindex"
              @click="cellClick(value, vindex, item, iindex)"
            >{{ item[value.prop] || '' }}</div>
            <!-- 操作列，传参复杂 -->
            <div
              class="be-table-oper cell"
              :style="cellHeight ? {width: tableOper.width, minHeight: cellHeight} : {width: tableOper.width}"
              v-if="dataList.length > 0 && columns.length > 0 && tableOper.isOperation"
            >
              <template v-if="tableOper.isUnifiedOper">
                <el-link
                  class="table-link"
                  v-for="(btn, index) in tableOper.operButton"
                  :key="btn.key ? btn.key : index"
                  :type="btn.type ? btn.type : 'primary'"
                  :disabled="btn.disabled ? btn.disabled : false"
                  :underline="btn.underline || tableOper.btnUnderline || false"
                  :icon="btn.icon ? btn.icon : ''"
                  @click.stop="btn.click(item, $event)"
                >
                  {{ btn.text }}
                </el-link>
              </template>
              <template v-else>
                <slot
                  name="oper"
                  v-bind="{row: item, rowIndex: iindex}"
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
  data () {
    return {
      curRowIndex: null
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
    // isOperation是否需要操作列，isUnifiedOper是否统一操作列，否则自定义，headName表头名称
    tableOper () {
      return Object.assign({
        operButton: [],
        isOperation: false,
        isUnifiedOper: true,
        btnUnderline: false,
        headName: '操作',
        width: '6.25rem'
      }, this.operObj)
    }
  },
  watch: {
    // 监听数据改变，清空当前点击项
    dataList: {
      handler () {
        this.curRowIndex = null
      }
    }
  },
  methods: {
    // 行点击
    rowClick (row, rowIndex) {
      this.$emit('rowClick', { row, rowIndex })
    },
    // 单元格点击，四个参数，单元格信息，单元格索引，行信息，行索引
    cellClick (cell, cellIndex, row, rowIndex) {
      this.curRowIndex = rowIndex
      this.$emit('cellClick', { cell, cellIndex, row, rowIndex })
    }
  }
}
</script>

<style scoped lang="less">
</style>