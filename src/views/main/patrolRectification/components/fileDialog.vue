<template>
  <BeDialog ref="tableDialog">
    <BeautifulWrapper
      is-title
      :title="title"
      class="num-wrapper"
      :border-icon="['close']"
      :wraStyle="{outPadding: '0px'}"
      :style="{width: '70%',height:'80%',margin:'0 auto',transform:'translateY(20%)'}"
      @closeClick="closeClick"
    >
      <div
        slot="menuRight"
        style="margin:20px 10%"
      >
        <el-button @click="exportList">导出Excel</el-button>
      </div>
      <BeautifulTableList
        cell-height="2.2rem"
        :data-list="dataList"
        :columns="columns"
        :operObj='operObj'
        :index-obj="{isIndex: true, width: '5rem'}"
      />
    </BeautifulWrapper>
  </BeDialog>
</template>
<script>
import BeDialog from '_com/common/BeDialog'
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulTableList from '_com/common/BeautifulTableList'

export default {
  components: {
    BeDialog,
    BeautifulWrapper,
    BeautifulTableList

  },
  data () {
    return {
      title: '',
      columns: [],
      columns1: [{ name: '项目名称', prop: 'projectName', key: 1, tooltip: 5 },
      // { name: '开发单位', prop: 'constructor', key: 2 },
      { name: '施工单位', prop: 'builder', key: 3 },
      { name: '行政区域名称', prop: 'areaName', key: 4 },
      { name: '备注', prop: 'remark', key: 5 },
      { name: '创建时间', prop: 'createTime', key: 6 }],
      columns2: [{ name: '整改项目', prop: 'projectName', key: 1 },
      { name: '整改类型', prop: 'rectificationName', key: 2 },
      { name: '整改内容', prop: 'rectificationContent', tooltip: 15, key: 3 },
      { name: '整改开始日期', prop: 'rectificationBeginTime', key: 4 },
      { name: '整改结束日期', prop: 'rectificationEndTime', key: 5 },
      { name: '网格员', prop: 'fullName', key: 8 }],
      dataList: [],
      dataListItemList: [],
      key: '', // 标识是哪一类
      operObj: {
        // isOperation: true,
        // headName: '操作',
        // operButton: [
        //   {
        //     text: '详情',
        //     click: this.lookDetail
        //   }
        // ]
      },
      api: {
        patrolDataApi: 'integration/check/getCount', // 网格员统计
        xctj: '/integration/patrol/tongJiXunCha', // 巡查整改
        zgtj: '/integration/patrol/tongJiZhengGai', // 整改统计
        zgyqtj: '/integration/patrol/tongJiZhengGaiYuQi', // 整改逾期
        yhtj: '/integration/patrol/tongJiIsZhengGai', // 已整改未整改
        imgDataApi: '/integration/rectification/suiShouPai', // 随手拍
        fourTUExport: '/integration/patrol/tongJiIsZhengGaiExport', // 是否整改导出
        yuqiExport: '/integration/patrol/tongJiZhengGaiYuQiExport', // 整改逾期导出
        xuncExport: '/integration/patrol/tongJiXunChaExport', // 巡查统计导出
        zgtjExport: '/integration/patrol/tongJiZhengGaiExport'// 整改统计导出
      }
    }
  },
  props: {
    date: {
      type: Array,
      default () {
        return []
      }
    },
    dataListItem: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    dataListItem () {
      return this.dataListItemList = this.dataListItem
    }

  },
  methods: {
    open (name, key) {
      // ['xctj', 'zgtj', 'zgyqtj', 'yhtj'],
      console.log(this.date, key, this.dataListItemList)
      this.title = name
      this.key = key
      this.$refs.tableDialog.showDialog(true)
      if (name === '已整改未整改') {
        this.columns = this.columns1
        this.getData(this.api.yhtj)
      } else if (name === '已整改' || name === '未整改') {
        this.columns = this.columns1
        setTimeout(() => {
          this.dataList = this.dataListItemList
        }, 500)
      } else if (name === '整改统计') {
        this.columns = this.columns2
        this.getData(this.api.zgtj)
      } else if (name === '整改逾期统计') {
        this.getData(this.api.zgyqtj)
      } else if (key === 'xctj') { // 巡查统计子数据
        this.columns = this.columns1
        setTimeout(() => {
          this.dataList = this.dataListItemList
        }, 500)
      } else if (key === 'zgtj') { // 整改统计子数据
        this.columns = this.columns2
        setTimeout(() => {
          this.dataList = this.dataListItemList
        }, 500)
      } else if (key === 'zgyqtj') { // 整改逾期子数据
        this.columns = this.columns1
        setTimeout(() => {
          this.dataList = this.dataListItemList
        }, 500)
      }
    },
    getData (url) {
      this.$http({
        url: url,
        method: 'post',
        data: {
          phoneNumber: sessionStorage.getItem('userId'),
          from: this.date[0],
          end: this.date[1]
        }
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          if (this.title === '已整改未整改') {
            this.dataList = data.allProjects
          } else if (this.title === '整改统计') {
            this.dataList = data.allZgList
          } else if (this.title === '整改逾期统计') {
            this.dataList = data.allZgYuQiList
          } else if (this.title === '巡查统计') {
            this.dataList = data.allXunChaList
          }

        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    exportList () {
      let url = ''
      let title = this.title
      let params = {
        phoneNumber: sessionStorage.getItem('userId'),
        from: this.date[0],
        end: this.date[1]
      }
      if (this.title === '已整改未整改' || this.title === '已整改' || this.title === '未整改') {
        url = this.api.fourTUExport
        let typeList = ['已整改未整改', '已整改', '未整改']
        params = {
          type: typeList.findIndex(i => i === this.title) + 1,
          ...params
        }
      } else if (this.title === '整改统计' || this.key === 'zgtj') {
        // 1-总数列表导出  否则就传对应列表的名字 name的值
        url = this.api.zgtjExport
        params = {
          type: this.title === '整改统计' ? 1 : this.title,
          ...params
        }
      } else if (this.title === '整改逾期统计' || this.key === 'zgyqtj') {
        params = {
          type: this.title === '整改逾期统计' ? 1 : this.title,
          ...params
        }
        url = this.api.yuqiExport
      } else if (this.title === '巡查统计' || this.key === 'xctj') {
        url = this.api.xuncExport
        params = {
          type: this.title === '巡查统计' ? 1 : this.title,
          ...params
        }
      }
      this.$api.downloadBlob(url, params, title, function (data) {
      })
    },
    getCount (url) {
      this.$http({
        url: url
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.dataList = data.peopleList
          this.operObj = {}
        } else {
          this.$message.error(msg || '获取网格员数据错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    closeClick () {
      // this.dataListItem = []
      this.$refs.tableDialog.showDialog(false)
      this.$emit('getFileData')
    },
    lookDetail (item) {
      let params = {}
      if (this.title === '文件未读') {
        params = { documentId: item.documentId }
      } else {
        params = {
          notificationId: item.notificationId
        }
      }
      console.log(params)
      this.$http({
        url: this.api.lookDetailApi,
        method: 'post',
        data: {
          phoneNumber: sessionStorage.getItem('userId'),
          ...params
        }
      }).then(res => {
        const { code, msg } = res.data
        if (code === 200) {
          this.$message.success(msg || '操作成功')
          if (this.title === '文件未读') {
            this.getData(this.api.fileListApi)
          } else {
            this.getData(this.api.tbListApi)
          }
        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    }
  }
}
</script>