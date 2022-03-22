<template>
  <!-- 基于el-table封装的组件 -->
  <el-table
    v-loading="loading"
    :element-loading-text="loadingText"
    :element-loading-spinner="loadingIcon"
    ref="tableRef"
    :data="dataList"
    :height="height"
    :border="border"
    :stripe="stripe"
    :empty-text="emptyText"
    :max-height="maxHeight"
    :style="{ 'min-height': `${minHeight}px` }"
    :row-key="rowKey"
    :tree-props="treeProps"
    :row-class-name="addEvenClass"
    :header-row-class-name="headerClassName"
    :header-cell-style="headerCellStyle"
    :cell-style="cellStyle"
    :highlight-current-row="highlightCurrent"
    :show-header="isShowHeader"
    :tooltip-effect="tooltipEffect"
    :size="size"
    @row-click="rowClick"
    @row-dblclick="rowDblClick"
    @selection-change="selectionChange"
    @expand-change="expandClick"
    class="beautiful-table-el"
    :class="isClearBorder ? 'clear-table-border' : ''"
  >
    <!-- 多选功能 -->
    <el-table-column
      v-if="dataList.length > 0 && columns.length > 0 && isSelect"
      type="selection"
      width="50"
      align="center"
    >
    </el-table-column>
    <!-- 展开功能 -->
    <el-table-column
      v-if="dataList.length > 0 && columns.length > 0 && isExpand"
      type="expand"
      :label="expandLabel"
      :width="50 + (expandLabel.length * 10)"
      align="center"
    >
      <template slot-scope="scope">
        <slot
          name="expand"
          v-bind="{ row: scope.row }"
        ></slot>
      </template>
    </el-table-column>
    <!-- 序号功能 -->
    <el-table-column
      v-if="dataList.length > 0 && columns.length > 0 && tableIndex.isIndex"
      :width="tableIndex.width"
      :fixed="tableIndex.fixed"
      label="序号"
      type="index"
      align="center"
    ></el-table-column>
    <!-- 表格列表数据 -->
    <template v-if="dataList.length > 0">
      <template v-for="(column, index) in sortColumns">
        <el-table-column
          :label="column.name ? column.name : ''"
          :key="column.key ? column.key : index"
          :width="column.width ? column.width : ''"
          :min-width="column.minWidth ? column.minWidth : ''"
          :prop="column.prop ? column.prop : ''"
          :fixed="column.fixed ? column.fixed : false"
          :sortable="column.isSort ? column.isSort : false"
          :formatter="column.formatter && column.formatter()"
          :resizable="column.isResiz ? column.isResiz : true"
          :align="column.align ? column.align : 'center'"
          :show-overflow-tooltip="column.tooltip ? column.tooltip : false"
        >
          <template slot-scope="scope">
            <slot
              :name="column.slotName"
              v-bind="{ row: scope.row }"
            >
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </template>
    <!-- 操作按钮功能 -->
    <el-table-column
      v-if="dataList.length > 0 && columns.length > 0 && tableOper.isOperation"
      label="操作"
      :width="tableOper.width"
      :fixed="tableOper.fixed"
      align="center"
    >
      <template slot-scope="scope">
        <template v-if="tableOper.isUnifiedOper">
          <el-link
            class="table-link"
            v-for="(btn, index) in tableOper.operButton"
            :key="btn.key ? btn.key : index"
            :type="btn.type ? btn.type : ''"
            :disabled="btn.disabled ? btn.disabled : false"
            :underline="btn.underline || tableOper.btnUnderline || false"
            :icon="btn.icon ? btn.icon : ''"
            @click.stop="btn.params || tableOper.btnParams ? btn.click(scope.row) : btn.click()"
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
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'BeautifulTableEl',
  props: {
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
    loadingText: {
      type: String,
      default: '数据加载中...'
    },
    loadingIcon: {
      type: String,
      default: 'el-icon-loading'
    },
    // 表格高度
    height: [String, Number],
    // 表格最大高度
    maxHeight: [String, Number],
    // 表格最小高度
    minHeight: [Number],
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
    // 行内样式
    rowCss: {
      type: Object,
      default () {
        return {}
      }
    },
    // 空文本显示的提示内容
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 表格尺寸
    size: {
      type: String,
      default: '',
      validator: function (value) {
        return value === 'medium' || 'small' || 'mini'
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
    // 表格默认id
    rowKey: {
      type: String,
      default: 'id'
    },
    // tooltip的显示风格
    tooltipEffect: {
      type: String,
      default: 'light',
      validator: function (value) {
        return value === 'dark' || 'light'
      }
    },
    // 是否显示表头
    isShowHeader: {
      type: Boolean,
      default: true
    },
    // 是否需要多选功能
    isSelect: {
      type: Boolean,
      default: false
    },
    // 是否需要展开功能
    isExpand: {
      type: Boolean,
      default: false
    },
    // 展开表头名称
    expandLabel: {
      type: String,
      default: ''
    },
    // 序号内容
    indexObj: {
      type: Object,
      default () {
        return {}
      }
    },
    // 树表格参数
    treeProps: {
      type: Object,
      default () {
        return { children: 'children' }
      }
    },
    // 操作内容
    operObj: {
      type: Object,
      default () {
        return {}
      }
    },
    // 奇数行类名
    oddClass: {
      type: String,
      default: 'odd-table-style'
    },
    // 偶数行类名
    evenClass: {
      type: String,
      default: 'even-table-style'
    },
    // 表格头类名
    headerClassName: {
      type: String,
      default: ''
    },
    // 表格头行样式
    headerCellStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    // 表格行样式
    cellStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    // 是否高亮当前选中的行
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    // 是否开启单选功能
    isRowClick: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 监听数据变化重新渲染，避免定位错位
    dataList () {
      this.$nextTick(() => {
        this.$refs.tableRef.doLayout()
      })
    }
  },
  // 进入路由重新渲染，避免定位错位
  activated () {
    this.$refs.tableRef.doLayout()
  },
  computed: {
    // 定义默认序号列数据
    tableIndex () {
      return Object.assign({
        isIndex: true,
        width: 60,
        fixed: false
      }, this.indexObj)
    },
    // 定义默认操作列数据
    // 默认每个按钮都有各自的属性，如果属性不存在，则查看是否存在公共的
    // operButton集合字段：type(类型), text(文本), click(点击),  params(是否传参row), underline(下划线), icon(图标)
    // isOperation是否需要操作列，isUnifiedOper是否统一操作列，否则自定义
    tableOper () {
      return Object.assign({
        operButton: [],
        isOperation: true,
        isUnifiedOper: true,
        btnUnderline: false,
        btnParams: true,
        width: '100',
        fixed: false
      }, this.operObj)
    },
    // 列排序处理
    sortColumns () {
      let column = this.columns
      function compare (property) {
        if (!property) return
        return function (a, b) {
          var value1 = a[property]
          var value2 = b[property]
          return value1 - value2
        }
      }
      return column.sort(compare('key'))
    }
  },
  methods: {
    // 为表格奇偶行设置不同class
    addEvenClass ({ row, rowIndex }) {
      let i = rowIndex % 2
      return i ? this.oddClass : this.evenClass
    },
    // 表格行点击事件
    rowClick (row) {
      if (this.isRowClick) {
        this.$emit('rowClick', row)
      }
    },
    // 表格行双击事件
    rowDblClick (row) {
      this.$emit('rowDblClick', row)
    },
    // 表格多选监听事件
    selectionChange (arr) {
      if (this.isSelect) {
        this.$emit('selectionChange', arr)
      }
    },
    // 展开收缩回调
    expandClick (row, expand) {
      if (this.isExpand) {
        this.$emit('expandChange', row, expand)
      }
    }
  }
}
</script>

<style scoped>
.table-link {
  margin: 0 3px;
}
/* 样式暂无 */
.clear-table-border {
}
</style>
