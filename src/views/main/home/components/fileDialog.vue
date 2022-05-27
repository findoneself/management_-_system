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
      columns: [{ name: '文件标题', prop: 'documentTitle', key: 1 },
      { name: '行政区域', prop: 'areaName', key: 5 },
      { name: '网格员名字', prop: 'fullName', key: 2 },
      { name: '描述', prop: 'describ', key: 3 },
      { name: '创建时间', prop: 'createTime', key: 4 }
      ],
      columns1: [{ name: '文件标题', prop: 'documentTitle', key: 1 },
      { name: '行政区域', prop: 'areaName', key: 5 },
      { name: '网格员名字', prop: 'fullName', key: 2 },
      { name: '描述', prop: 'describ', key: 3 },
      { name: '创建时间', prop: 'createTime', key: 4 }
      ],
      columns2: [{ name: '备案号', prop: 'projectRecordNum', key: 1 },
      { name: '项目名称', prop: 'projectName', key: 2 },
      { name: '施工单位', prop: 'builder', key: 3 },
      { name: '项目地址', prop: 'projectAddress', key: 4 },
      { name: '备案日期', prop: 'beianTime', key: 5 }],
      dataList: [],
      operObj: {
        isOperation: true,
        headName: '操作',
        operButton: [
          {
            text: '详情',
            click: this.lookDetail
          }
        ]
      },
      api: {
        tbListApi: '/integration/notification/getNoReadlist', // 通报未读列表
        historyTbApi: '/integration/notification/getHistorylistFromWg', // 通报历史列表
        historyFileApi: '/integration/document/getHistorylistFromWg', // 文件历史列表
        fileListApi: '/integration/document/getNoReadlist', // 文件未读列表
        lookDetailApi: '/integration/documentMiddleNotification/intoMiddle', // 阅读
        patrolDataApi: '/integration/check/getCount', // 巡查整改
        wgyListExport: '/integration/check/getCountExport', // 网格员导出
        weiduFileExport: '/integration/document/getNoReadlistExport', // 文件未读导出
        weiduTBExport: '/integration/notification/getNoReadlistExport', // 未读通报 导出
        lishiTBExport: '/integration/notification/getHistorylistFromWgExport', // 历史通报导出
        lishiFileExport: '/integration/document/getHistorylistFromWgExport', // 历史文件导出
        projectBigExport: 'integration/project/getMiddleNumberExport' // 项目总数导出
      }
    }
  },
  props: {
    dataLists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    open (name) {
      this.title = name
      this.$refs.tableDialog.showDialog(true)
      this.columns = this.columns1
      if (name === '文件未读') {
        this.getData(this.api.fileListApi)
      } else if (name === '文件历史') {
        this.getData(this.api.historyFileApi)
      } else if (name === '通报未读') {
        this.getData(this.api.tbListApi)
      } else if (name === '通报历史') { // 通报历史
        this.getData(this.api.historyTbApi)
      } else if (name === '网格员') {
        this.getCount(this.api.patrolDataApi)
      } else {
        setTimeout(() => {
          this.dataList = this.dataLists
          console.log(this.dataLists)
        }, 500)
        this.columns = this.columns2
        this.operObj = {}
      }
    },
    getData (url) {
      this.$http({
        url: url,
        method: 'post',
        data: {
          phoneNumber: sessionStorage.getItem('userId')
        }
      }).then(res => {
        const { rows, code, msg } = res.data
        if (code === 200) {

          if (this.title === '文件未读') {
            this.columns[0].prop = 'documentTitle'
          } else {
            this.columns[0].prop = 'notificationTitle'
          }

          // if (this.title === '网格员') {
          //   this.dataList = res.data.data.peopleList
          // }
          this.dataList = rows
        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
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
      this.$refs.tableDialog.showDialog(false)
      this.$emit('getFileData')
    },
    exportList () {
      console.log('导出开始')
      // exclType.type //1:大屏首页中间大数字 2:大屏首页房建 3:大屏首页市政道路   4:大屏首页轨道交通
      // 5:大屏首页拆迁工地  6:大屏首页园林项目
      // 7:大屏首页  8:大屏首页其他
      let url = ''
      let title = ''
      let params = {
        phoneNumber: sessionStorage.getItem('userId')
      }
      let projectIndex = ['项目汇总', '房建', '市政道路/工程', '轨道交通', '拆迁工地', '园林项目', '山体/宕口修复', '其他']
      if (this.title === '网格员') {
        url = this.api.wgyListExport
        title = '网格员列表'
      } else if (this.title === '文件未读') {
        title = '文件未读'
        url = this.api.weiduFileExport
      } else if (this.title === '文件通报') {
        title = '文件通报'
        url = this.api.weiduTBExport
      } else if (this.title === '文件历史') {
        title = '文件历史'
        url = this.api.lishiFileExport
      } else if (this.title === '通报历史') {
        title = '通报历史'
        url = this.api.lishiTBExport
      } else {
        title = this.title
        url = this.api.projectBigExport
        params = {
          type: projectIndex.findIndex(i => i === this.title) + 1
        }
      }
      this.$api.downloadBlob(url, params, title, function (data) {
      })
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