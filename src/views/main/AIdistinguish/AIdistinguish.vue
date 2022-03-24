<template>
  <!-- AI识别 -->
  <BeautifulWrapper
    :is-title="false"
    :border-icon="['top', 'right', 'triangle', 'left']"
    :wraStyle="{ inPadding: '0px' }"
  >
    <div class="ai-left">
      <BeautifulCard
        title="监控点位"
        class="jkdw-card"
        :isTriangle='false'
      >
        <div class="form-select">
          <el-select
            v-model="dataForm.jkdw"
            clearable
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.jkdwList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="video">
          <video
            :src="dictOptions.videoSrc"
            controls="controls"
          >
          </video>
        </div>
      </BeautifulCard>
      <BeautifulCard
        class="bjfl-card"
        title="报警分类统计"
        :isTriangle='false'
      ></BeautifulCard>
      <BeautifulCard
        class="sssj-card"
        title="实时数据"
        :isTriangle='false'
      >
        <BeautifulTableList
          :loading="loadings.sssjLoading"
          :is-header="false"
          cell-height="2.2rem"
          :data-list="dataList.sssjList"
          :columns="columns.sssjColumns"
        />
      </BeautifulCard>
      <BeautifulCard
        class="bjls-card"
        title="报警历史统计"
        :isTriangle='false'
      ></BeautifulCard>
    </div>
    <BeautifulCard
      class="xmbj-card"
      title="项目报警统计排行"
      :isTriangle='false'
    >
      <div class="form-select">
        <el-select
          v-model="dataForm.xmbjDate"
          clearable
          size="mini"
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictOptions.xmbjList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <BeautifulTableList
        :loading="loadings.xmbjLoading"
        cell-height="2.2rem"
        :index-obj="{isIndex: true, width: '5rem'}"
        :data-list="dataList.xmbjList"
        :columns="columns.xmbjColumns"
      />
    </BeautifulCard>
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import BeautifulTableList from '_com/common/BeautifulTableList'
export default {
  name: 'AIdistinguish',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    BeautifulTableList
  },
  data () {
    return {
      dictOptions: {
        jkdwList: [],
        xmbjList: [],
        videoSrc: ''
      },
      // 所有加载效果
      loadings: {
        sssjLoading: false,
        xmbjLoading: false
      },
      // 所有表头
      columns: {
        sssjColumns: [
          { name: '位置', prop: 'address', key: 1 },
          { name: '日期', prop: 'date', key: 2 }
        ],
        xmbjColumns: [
          { name: '项目名称', prop: 'name', key: 1 },
          { name: '报警数量', prop: 'count', key: 2 }
        ]
      },
      // 所有数据
      dataList: {
        sssjList: [],
        xmbjList: []
      },
      dataForm: {
        jkdw: '',
        xmbjDate: ''
      }
    }
  },
  created () {
    this.initDict()
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 初始化字典数据
    initDict () {
      const dict = this.$store.state.global.dictData
      if (dict.jkdwType && dict.jkdwType.length > 0) {
        this.dictOptions.jkdwList = dict.jkdwType
        this.dataForm.jkdw = dict.jkdwType[0].id
      }
      if (dict.xmbjDate && dict.xmbjDate.length > 0) {
        this.dictOptions.xmbjList = dict.xmbjDate
        this.dataForm.xmbjDate = dict.xmbjDate[0].id
      }
    },
    // 获取所有数据
    getData () {
      // 获取监控点位视频地址
      this.$http({
        url: `/aixb/getVideoData/${this.dataForm.jkdw}`
      }).then(res => {
        this.loadings.sssjLoading = false
        if (res.code === 200) {
          this.dictOptions.videoSrc = res.data.url
          console.log(res)
        } else {
          this.$message.error('视频已失效！')
          this.dataList.videoSrc = ''
        }
      }, () => {
        this.$message.error('视频已失效！')
        this.dictOptions.videoSrc = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      })
      // 获取实时数据
      this.loadings.sssjLoading = true
      this.$http({ url: '/aixb/getSssjData' }).then(res => {
        this.loadings.sssjLoading = false
        if (res.code === 200) {
          this.dataList.sssjList = res.data.list
          console.log(res)
        } else {
          this.$message.error('获取实时数据失败！')
          this.dataList.sssjList = []
        }
      }, () => {
        this.loadings.sssjLoading = false
        this.$message.error('获取实时数据失败！')
        this.dataList.sssjList = [
          { id: '1212', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '165', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '1215542', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '124', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '145452', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '1256', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '1565232', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '15652445', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '156222', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '15652565', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '1565323232', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '152', address: '和平路南阳花园西侧1号门', date: '2022-11-12' },
          { id: '1552', address: '和平路南阳花园西侧1号门', date: '2022-11-12' }
        ]
      })
      // 获取项目报警统计排行
      this.loadings.xmbjLoading = true
      this.$http({
        url: '/aixb/getXmbjData',
        data: {
          order: 'asc',
          date: this.dataForm.xmbjDate || ''
        }
      }).then(res => {
        this.loadings.xmbjLoading = false
        if (res.code === 200) {
          this.dataList.xmbjList = res.data.list
          console.log(res)
        } else {
          this.$message.error('获取项目报警统计排行失败！')
          this.dataList.xmbjList = []
        }
      }, () => {
        this.loadings.xmbjLoading = false
        this.$message.error('获取项目报警统计排行失败！')
        this.dataList.xmbjList = [
          { id: '1212', name: '项目名称项目名称', count: 16 },
          { id: '165', name: '项目名称项目名称', count: 26 },
          { id: '1215542', name: '项目名称项目名称', count: 36 },
          { id: '124', name: '项目名称项目名称', count: 47 },
          { id: '145452', name: '项目名称项目名称', count: 49 },
          { id: '1256', name: '项目名称项目名称', count: 60 },
          { id: '1565232', name: '项目名称项目名称', count: 75 },
          { id: '15652445', name: '项目名称项目名称', count: 80 },
          { id: '156222', name: '项目名称项目名称', count: 83 },
          { id: '15652565', name: '项目名称项目名称', count: 90 },
          { id: '1565323232', name: '项目名称项目名称', count: 116 },
          { id: '152', name: '项目名称项目名称', count: 126 },
          { id: '1552', name: '项目名称项目名称', count: 128 }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
.beautiful-wrapper,
.ai-left {
  display: flex;
  justify-content: space-between;
}
/deep/ .beau-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.be-table-list /deep/ .cell {
  font-size: 14px;
}
.ai-left {
  width: 75%;
  height: 100%;
  flex-wrap: wrap;
  .beautiful-card {
    height: 50%;
  }
}
.form-select {
  text-align: right;
  padding-bottom: 15px;
  .el-select {
    width: 150px;
  }
}
.jkdw-card,
.sssj-card {
  width: 34%;
  flex-shrink: 0;
}
.jkdw-card .video,
.xmbj-card .be-table-list {
  height: calc(100% - 43px);
}
.bjfl-card,
.bjls-card {
  width: 66%;
}
.xmbj-card {
  width: 25%;
  text-align: right;
}
</style>