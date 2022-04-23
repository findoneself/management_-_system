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
        fileListApi: '/integration/document/getNoReadlist', // 文件未读列表
        lookDetailApi: '/integration/documentMiddleNotification/intoMiddle'
      }
    }
  },
  methods: {
    open (name) {
      this.$refs.tableDialog.showDialog(true)
      if (name === '文件') {
        this.title = '文件未读'
        this.getData(this.api.fileListApi)
      } else {
        this.title = '通报未读'
        this.getData(this.api.tbListApi)
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
          this.dataList = rows
        } else {
          this.$message.error(msg || '获取超期项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    closeClick () {
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