<template>
  <!-- AI识别 -->
  <BeautifulWrapper
    :is-title="false"
    :border-icon="['top', 'right', 'triangle', 'left']"
    :wraStyle="{ inPadding: '0px' }"
  >
    <BeautifulCard
      class="xmfl-card"
      title="项目分类统计"
      :isTriangle='false'
    >
      <div
        style="width: 100%; height: 100%"
        v-loading="loadings.xmflLoading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <div id="xmflEchart"></div>
        <ul class="echart-legend">
          <li
            v-for="(item, bindex) in xmflOption.list"
            class="echart-legend-item"
            @click="echartClick(bindex, 'xmflOption')"
            :class="bindex === xmflOption.curIndex ? 'active-legend' : ''"
            :key="item.id"
          >
            <i :style="{backgroundColor: xmflOption.colors[bindex]}"></i>
            <span class="legend-name">{{ item.name }}：{{ item.count }}</span>
          </li>
        </ul>
      </div>
    </BeautifulCard>
    <BeautifulCard
      title="监控点位"
      class="jkdw-card"
      :isTriangle='false'
    >
      <div class="form-select">
        <el-cascader
          v-model="dataForm.jkdw"
          :show-all-levels="false"
          :options="dictOptions.jkdwList"
          size="small"
          :props="{emitPath: false, value: 'id', label: 'name'}"
          @change="getJkdwVideos"
        ></el-cascader>
      </div>
      <div class="video">
        <video
          :src="videoSrc"
          controls="controls"
        >
        </video>
      </div>
    </BeautifulCard>
    <BeautifulCard
      class="bjfl-card"
      title="报警分类统计"
      :isTriangle='false'
    >
      <div
        style="width: 100%; height: 100%"
        v-loading="loadings.bjflLoading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <div id="bjflEchart"></div>
        <ul class="echart-legend">
          <li
            v-for="(item, bindex) in bjflOption.list"
            class="echart-legend-item"
            @click="echartClick(bindex, 'bjflOption')"
            :style="{color: bindex === bjflOption.curIndex ? bjflOption.colors[bindex] : 'inherit'}"
            :key="item.id"
          >
            <i :style="{backgroundColor: bjflOption.colors[bindex]}"></i>
            <span class="legend-name">{{ item.name }}：{{ item.count }}</span>
          </li>
        </ul>
      </div>
    </BeautifulCard>
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
    >
      <el-form
        class="form-select"
        inline
      >
        <el-button
          size="small"
          @click="dialogClick(dialogTitle.bjls)"
          type="primary"
        >{{ dialogTitle.bjls }}</el-button>
        <el-form-item label="时间：">
          <el-date-picker
            v-model="dataForm.dateList"
            type="daterange"
            @change="getBjlsData"
            size="small"
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div
        class="bjls-content"
        v-loading="loadings.bjlsLoading"
        element-loading-text="数据加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <div id="bjlsEchart"></div>
        <ul class="echart-legend">
          <li
            v-for="(item, bindex) in bjlsOption.list"
            class="echart-legend-item"
            @click="echartClick(bindex, 'bjlsOption')"
            :class="bindex === bjlsOption.curIndex ? 'active-legend' : ''"
            :key="item.id"
          >
            <i :style="{backgroundColor: bjlsOption.colors[bindex]}"></i>
            <span class="legend-name">{{ item.name }}：{{ item.count }}</span>
          </li>
        </ul>
      </div>
    </BeautifulCard>
    <div class="xmbj-card">
      <BeautifulCard
        title="项目报警统计排行"
        class="xmbj-list"
        :isTriangle='false'
      >
        <div class="form-select">
          <el-button
            size="small"
            @click="dialogClick(dialogTitle.xmbj)"
            type="primary"
          >{{ dialogTitle.xmbj }}</el-button>
          <el-select
            v-model="dataForm.dayDate"
            clearable
            @change="getXmbjData"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.dayList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <BeautifulTableList
          :loading="loadings.xmbjLoading"
          cell-height="2.2rem"
          highlight-currow
          :index-obj="{isIndex: true, width: '5rem'}"
          :data-list="dataList.xmbjList"
          :columns="columns.xmbjColumns"
          @rowClick="rowClick"
        />
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="dataForm.pageIndex"
          :page-size="dataForm.pageSize"
          layout="prev, pager, next"
          :total="dataForm.total"
        >
        </el-pagination>
      </BeautifulCard>
      <BeautifulCard
        title="项目报警详情"
        class="xmbj-info"
        v-show="isXmbjInfo"
        :isTriangle='false'
      >
        <div class="form-select">
          <el-button
            size="small"
            @click="dialogClick(dialogTitle.xmbj)"
            type="primary"
          >{{ dialogTitle.xmbj }}</el-button>
          <el-select
            v-model="dataForm.xmbjInfoDate"
            clearable
            @change="getXmbjInfoData"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in dictOptions.dayList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <i
          class="el-icon-close close--icon"
          @click="xmbjInfoClose"
        ></i>
        <BeautifulTableList
          :loading="loadings.xmbjInfoLoading"
          cell-height="2.2rem"
          :oper-obj="operObj"
          :index-obj="{isIndex: false}"
          :data-list="dataList.xmbjInfoList"
          :columns="columns.xmbjInfoColumns"
        />
        <el-pagination
          @current-change="handleInfoChange"
          :current-page="dataForm.infopageIndex"
          :page-size="dataForm.infopageSize"
          layout="prev, pager, next"
          :total="dataForm.infoTotal"
        >
        </el-pagination>
      </BeautifulCard>
    </div>
    <TableDialog ref="TableDialog" />
    <BeImageFixed ref="imageRef" />
  </BeautifulWrapper>
</template>

<script>
import BeautifulWrapper from '_com/common/BeautifulWrapper'
import BeautifulCard from '_com/common/BeautifulCard'
import BeautifulTableList from '_com/common/BeautifulTableList'
import BeImageFixed from '_com/common/BeImageFixed'
import TableDialog from './components/TableDialog'
export default {
  name: 'AIdistinguish',
  components: {
    BeautifulWrapper,
    BeautifulCard,
    BeautifulTableList,
    TableDialog,
    BeImageFixed
  },
  data () {
    return {
      // 字典数据
      dictOptions: {
        jkdwList: [],
        dayList: []
      },
      // 监控点位视频地址
      videoSrc: '',
      // 所有加载效果
      loadings: {
        sssjLoading: false,
        xmbjLoading: false,
        xmbjInfoLoading: false,
        bjflLoading: false,
        xmflLoading: false,
        bjlsLoading: false
      },
      // 所有表头
      columns: {
        sssjColumns: [
          { name: '位置', prop: 'address', key: 1 },
          { name: '日期', prop: 'date', key: 2 }
        ],
        xmbjColumns: [
          { name: '项目名称', prop: 'name', key: 1 },
          { name: '报警数量', prop: 'count', width: '20%', key: 2 }
        ],
        xmbjInfoColumns: [
          { name: '日期', prop: 'date', key: 1 },
          { name: '报警分类', prop: 'warnType', key: 2 }
        ]
      },
      // 所有列表数据
      dataList: {
        sssjList: [],
        xmbjList: [],
        xmbjInfoList: []
      },
      // 所有选择框参数
      dataForm: {
        jkdw: '',
        dayDate: '',
        dateList: [],
        pageIndex: 1,
        pageSize: 3,
        total: 0,
        xmbjInfoDate: '',
        infoPageIndex: 1,
        infopageSize: 3,
        infoTotal: 0
      },
      // 项目分类图信息
      xmflOption: {
        myChart: null,
        list: [],
        // 当前图例点击的index
        curIndex: null,
        colors: ['#FCFF20', '#FF9920', '#FF4F01', '#FF3D54', '#2F71FF', '#317FFF', '#B790FF', '#8A4AFF']
      },
      // 报警分类图信息
      bjflOption: {
        myChart: null,
        list: [],
        // 当前图例点击的index
        curIndex: null,
        colors: ['#FCFF20', '#FF9920', '#FF4F01', '#FF3D54', '#2F71FF', '#317FFF', '#B790FF', '#8A4AFF']
      },
      // 报警历史图数据
      bjlsOption: {
        myChart: null,
        xlist: [],
        list: [],
        colors: ['#1CC483', '#9834FF', '#00FFFF', '#FF4F01'],
        // 当前图例点击的index
        curIndex: null
      },
      // 弹窗标题及其按钮文字
      dialogTitle: {
        bjls: '报警记录',
        xmbj: '分类排名',
        title: ''
      },
      // 是否显示项目报警详情
      isXmbjInfo: false,
      // 报警详情操作列
      operObj: {
        isOperation: true,
        headName: '图片',
        operButton: [
          {
            text: '查看',
            click: this.imgClick
          }
        ]
      }
    }
  },
  created () {
    this.initDict()
    // 设置历史统计默认日期
    const now = this.$format.getSysDateString()
    this.dataForm.dateList = [now, now]
  },
  mounted () {
    // getData获取不需传参的数据
    this.getData()
    // 以下获取的是三个需要传参的数据
    this.getBjlsData()
    this.getJkdwTree()
    this.getXmbjData()
    // echart的监听
    window.addEventListener('resize', this.watchEchart)
  },
  destroyed () {
    // 销毁监听
    window.removeEventListener('resize', this.watchEchart)
  },
  methods: {
    // 初始化字典数据
    initDict () {
      const dict = this.$store.state.global.dictData
      if (dict.dayDate && dict.dayDate.length > 0) {
        this.dictOptions.dayList = dict.dayDate
        this.dataForm.dayDate = dict.dayDate[0].id
        this.dataForm.xmbjInfoDate = dict.dayDate[0].id
      }
    },
    // 项目报警页码改变
    handleCurrentChange (val) {
      this.dataForm.pageIndex = val
      this.getXmbjData()
    },
    // 项目报警详情页码改变
    handleInfoChange (val) {
      this.dataForm.infoPageIndex = val
      this.getXmbjInfoData()
    },
    // 项目报警详情图片点击
    imgClick (item, e) {
      this.$refs.imageRef.showImg(e, item)
    },
    // 项目报警详情关闭事件
    xmbjInfoClose () {
      this.$refs.imageRef.closeClick()
      this.isXmbjInfo = false
    },
    // 项目报警统计行点击
    rowClick ({ row }) {
      this.currentXmbj = row
      this.isXmbjInfo = true
      this.getXmbjInfoData()
    },
    // 弹窗按钮点击
    dialogClick (name) {
      this.$refs.TableDialog.open(name)
    },
    // 获取所有数据
    getData () {
      // ---获取实时数据
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
      // ---获取项目分类统计数据
      this.loadings.xmflLoading = true
      this.$http({ url: '/aixb/getXmflData' }).then(res => {
        this.loadings.xmflLoading = false
        if (res.code === 200) {
          this.xmflOption.list = res.data.list
          console.log(res)
        } else {
          this.$message.error('获取项目分类统计失败！')
          this.xmflOption.list = []
        }
      }, () => {
        this.loadings.xmflLoading = false
        // this.$message.error('获取项目分类统计失败！')
        const list = [
          { name: '监测站', count: 16 },
          { name: '燃气站', count: 26 },
          { name: '加油站', count: 36 },
          { name: '建筑工地', count: 47 },
          { name: '其他', count: 49 }
        ]
        this.xmflOption.list = list
        const series = list.map((item) => {
          return {
            value: item.count,
            name: item.name
          }
        })
        this.setXmflEchart(series)
      })
      // ---获取报警分类统计数据
      this.loadings.bjflLoading = true
      this.$http({ url: '/aixb/getBjflData' }).then(res => {
        this.loadings.bjflLoading = false
        if (res.code === 200) {
          this.bjflOption.list = res.data.list
          console.log(res)
        } else {
          this.$message.error('获取报警分类统计失败！')
          this.bjflOption.list = []
        }
      }, () => {
        this.loadings.bjflLoading = false
        // this.$message.error('获取报警分类统计失败！')
        const list = [
          { name: '反光衣', count: 16 },
          { name: '抽烟', count: 26 },
          { name: '火焰', count: 36 },
          { name: '安全帽', count: 47 },
          { name: '行人闯入', count: 49 },
          { name: '打电话', count: 60 },
          { name: '人员离岗', count: 75 },
          { name: '工作服', count: 80 }
        ]
        this.bjflOption.list = list
        const series = list.map((item) => {
          return {
            value: item.count,
            name: item.name
          }
        })
        this.setBjflEchart(series)
      })
    },
    // 获取项目报警统计数据
    getXmbjData () {
      // ---获取项目报警统计排行
      this.loadings.xmbjLoading = true
      this.$http({
        url: '/aixb/getXmbjData',
        data: {
          page: this.dataForm.pageIndex,
          pageSize: this.dataForm.pageSize,
          date: this.dataForm.dayDate || ''
        }
      }).then(res => {
        this.loadings.xmbjLoading = false
        if (res.code === 200) {
          this.dataList.xmbjList = res.data.list
          this.dataForm.total = res.data.total
          console.log(res)
        } else {
          this.$message.error('获取项目报警统计排行失败！')
          this.dataList.xmbjList = []
          this.dataForm.total = 0
        }
      }, () => {
        this.loadings.xmbjLoading = false
        this.$message.error('获取项目报警统计排行失败！')
        const list = [
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
        this.dataForm.total = list.length
        this.dataList.xmbjList = list
      })
    },
    // 获取项目报警详情数据
    getXmbjInfoData () {
      if (!this.currentXmbj) return this.$message.warninf('请选择项目报警！')
      // ---获取项目报警统计排行
      this.loadings.xmbjInfoLoading = true
      this.$http({
        url: '/aixb/getXmbjInfoData',
        data: {
          page: this.dataForm.infoPageIndex,
          pageSize: this.dataForm.infopageSize,
          date: this.dataForm.xmbjInfoDate || '',
          xmbjId: this.currentXmbj.id || ''
        }
      }).then(res => {
        this.loadings.xmbjInfoLoading = false
        if (res.code === 200) {
          this.dataList.xmbjInfoList = res.data.list
          this.dataForm.infoTotal = res.data.total
          console.log(res)
        } else {
          this.$message.error('获取项目报警统计排行失败！')
          this.dataList.xmbjInfoList = []
          this.dataForm.infoTotal = 0
        }
      }, () => {
        this.loadings.xmbjInfoLoading = false
        this.$message.error('获取项目报警详情排行失败！')
        const list = [
          { id: '1212', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://bj.xpei.ren/zt/work-note/images/head_user.gif' },
          { id: '165', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ0.jpg' },
          { id: '1215542', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7.png' },
          { id: '124', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '145452', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '1256', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '1565232', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '15652445', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '156222', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '15652565', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '1565323232', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '152', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' },
          { id: '1552', warnType: '项目名称项目名称', date: '2022-02-02', imgUrl: 'http://xpei.ren/uploads/allimg/180704/1-1PF41KJ7-50.png' }
        ]
        this.dataForm.infoTotal = list.length
        this.dataList.xmbjInfoList = list
      })
    },
    // 获取监控点位树结构数据
    getJkdwTree () {
      this.$http({ url: '/aixb/getJkdwTree' }).then(res => {
        if (res.code === 200) {
          this.dictOptions.jkdwList = res.data.list
          console.log(res)
        } else {
          this.$message.error('视频已失效！')
          this.dictOptions.jkdwList = []
        }
      }, () => {
        this.$message.error('视频已失效！')
        const list = [
          { id: 'aaa', name: '监控一层', parentId: '00' },
          { id: 'ddd', name: '监控点位', parentId: 'aaa' },
          { id: 'ccc', name: '监控一层', parentId: '00' },
          { id: 'bbb', name: '监控一层', parentId: '00' },
          { id: 'eee', name: '监控一层', parentId: '00' },
          { id: 'fff', name: '监控一层', parentId: '00' },
          { id: 'kkk', name: '监控二层', parentId: 'fff' },
          { id: 'hhh', name: '监控点位', parentId: 'kkk' },
          { id: 'whw', name: '监控点位', parentId: 'kkk' },
          { id: 'hwe', name: '监控点位', parentId: 'kkk' },
          { id: 'ahh', name: '监控点位', parentId: 'kkk' },
          { id: 'whw', name: '监控二层', parentId: 'fff' },
          { id: 'ahw', name: '监控二层', parentId: 'fff' }
        ]
        this.dictOptions.jkdwList = this.$utils.treeDataTranslate(list)
        this.dataForm.jkdw = this.$utils.queryTreeFirst(this.dictOptions.jkdwList).id
        this.$nextTick(() => {
          // 默认获取第一条数据的视频地址
          this.getJkdwVideos()
        })
      })
    },
    // 获取监控点位视频地址
    getJkdwVideos () {
      if (!this.dataForm.jkdw) return
      this.$http({ url: `/aixb/getVideoData/${this.dataForm.jkdw}` }).then(res => {
        if (res.code === 200) {
          this.dictOptions.videoSrc = res.data.url
          console.log(res)
        } else {
          this.$message.error('视频已失效！')
          this.dataList.videoSrc = ''
        }
      }, () => {
        this.$message.error('视频已失效！')
        this.videoSrc = 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
      })
    },
    // 获取报警历史统计数据
    getBjlsData () {
      // ---获取报警历史统计数据
      this.loadings.bjlsLoading = true
      // 参数处理
      let params = {}
      if (this.dataForm.dateList && this.dataForm.dateList.length) {
        params.startTime = this.dataForm.dateList[0]
        params.endTime = this.dataForm.dateList[1]
      }
      this.$http({
        url: '/aixb/getBjlsData',
        data: params
      }).then(res => {
        this.loadings.bjlsLoading = false
        if (res.code === 200) {
          this.bjlsOption.list = res.data.list
          console.log(res)
        } else {
          this.$message.error('获取报警分类统计失败！')
          this.bjlsOption.list = []
        }
      }, () => {
        this.loadings.bjlsLoading = false
        // this.$message.error('获取报警分类统计失败！')
        const list = [
          { count: 56, name: '反光衣', typeId: 'bj1', date: '2022-3-9' },
          { count: 43, name: '行人闯入', typeId: 'bj2', date: '2022-3-9' },
          { count: 26, name: '打电话', typeId: 'bj3', date: '2022-3-9' },
          { count: 54, name: '抽烟', typeId: 'bj4', date: '2022-3-9' },
          { count: 46, name: '反光衣', typeId: 'bj1', date: '2022-3-10' },
          { count: 32, name: '行人闯入', typeId: 'bj2', date: '2022-3-10' },
          { count: 16, name: '打电话', typeId: 'bj3', date: '2022-3-10' },
          { count: 24, name: '抽烟', typeId: 'bj4', date: '2022-3-10' },
          { count: 16, name: '反光衣', typeId: 'bj1', date: '2022-3-11' },
          { count: 22, name: '行人闯入', typeId: 'bj2', date: '2022-3-11' },
          { count: 26, name: '打电话', typeId: 'bj3', date: '2022-3-11' },
          { count: 27, name: '抽烟', typeId: 'bj4', date: '2022-3-11' },
          { count: 16, name: '反光衣', typeId: 'bj1', date: '2022-3-12' },
          { count: 22, name: '行人闯入', typeId: 'bj2', date: '2022-3-12' },
          { count: 26, name: '打电话', typeId: 'bj3', date: '2022-3-12' },
          { count: 27, name: '抽烟', typeId: 'bj4', date: '2022-3-12' },
          { count: 16, name: '反光衣', typeId: 'bj1', date: '2022-3-13' },
          { count: 22, name: '行人闯入', typeId: 'bj2', date: '2022-3-13' },
          { count: 26, name: '打电话', typeId: 'bj3', date: '2022-3-13' },
          { count: 27, name: '抽烟', typeId: 'bj4', date: '2022-3-13' }
        ]
        let allList = []
        let xlist = []
        // 处理成需要的数据结构
        list.map((item) => {
          if (!xlist.includes(item.date)) xlist.push(item.date)
          const isName = allList.find(t => t.name === item.name)
          if (isName) {
            // 新数组里面如果找到了当前名称的，则直接push到series的data
            isName.all += item.count
            isName.data.push(item.count)
          } else {
            // 新数组里面如果没找到当前名称的，则添加一个新的series数据
            allList.push({
              all: item.count,
              name: item.name,
              type: 'line',
              smooth: false,
              symbol: 'circle',
              symbolSize: 12,
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  borderColor: '#fff'
                }
              },
              data: [item.count]
            })
          }
        })
        // 保存当前处理完成的数据
        this.bjlsOption.list = allList
        // 保存当前xAixs数据，为了点击图例重新渲染而用
        this.bjlsOption.xlist = xlist
        this.setBjlsEchart(allList, xlist)
      })
    },
    // 初始化项目分类echarts图
    setXmflEchart (data) {
      if (!this.xmflOption.myChart) {
        // 报警分类
        this.xmflOption.myChart = this.$echarts.init(document.getElementById('xmflEchart'))
      }
      let option = {
        color: this.xmflOption.colors,
        series: {
          type: 'pie',
          radius: ['50%', '80%'],
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            label: { show: true, formatter: '{b}: {c}' },
            labelLine: { show: true }
          },
          data: data || []
        }
      }
      console.log(option)
      this.xmflOption.myChart.setOption(option)
      // 鼠标移入隐藏点击的高亮---单个元素的移入移出不太友好，最好是对echarts整个图表做移入移出
      this.xmflOption.myChart.on('mouseover', (v) => {
        if (this.xmflOption.curIndex !== null && v.dataIndex !== this.xmflOption.curIndex) {
          this.xmflOption.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.xmflOption.curIndex
          })
        }
      })
      // 鼠标移出重新高亮当前点击的图例
      this.xmflOption.myChart.on('mouseout', (v) => {
        if (this.xmflOption.curIndex !== null && v.dataIndex !== this.xmflOption.curIndex) {
          this.xmflOption.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.xmflOption.curIndex
          })
        }
      })
    },
    // 初始化报警分类echart图
    setBjflEchart (data) {
      if (!this.bjflOption.myChart) {
        // 报警分类
        this.bjflOption.myChart = this.$echarts.init(document.getElementById('bjflEchart'))
      }
      let option = {
        color: this.bjflOption.colors,
        series: {
          type: 'pie',
          radius: ['50%', '80%'],
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            label: { show: true, formatter: '{b}: {c}' },
            labelLine: { show: true }
          },
          data: data || []
        }
      }
      this.bjflOption.myChart.setOption(option)
      // 鼠标移入隐藏点击的高亮---单个元素的移入移出不太友好，最好是对echarts整个图表做移入移出
      this.bjflOption.myChart.on('mouseover', (v) => {
        if (this.bjflOption.curIndex !== null && v.dataIndex !== this.bjflOption.curIndex) {
          this.bjflOption.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.bjflOption.curIndex
          })
        }
      })
      // 鼠标移出重新高亮当前点击的图例
      this.bjflOption.myChart.on('mouseout', (v) => {
        if (this.bjflOption.curIndex !== null && v.dataIndex !== this.bjflOption.curIndex) {
          this.bjflOption.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.bjflOption.curIndex
          })
        }
      })
    },
    // 初始化报警历史echart图
    setBjlsEchart (data, xlist, index) {
      if (!this.bjlsOption.myChart) {
        // 报警分类
        this.bjlsOption.myChart = this.$echarts.init(document.getElementById('bjlsEchart'))
      }
      let option = {
        color: index === undefined ? this.bjlsOption.colors : [this.bjlsOption.colors[index]],
        tooltip: {
          trigger: 'axis',
          // transitionDuration: 0,
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          axisLabel: {
            color: '#fff',
            fontSize: '10'
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#B9C8DB'
            }
          },
          data: xlist || []
        },
        yAxis: {
          type: 'value',
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            color: '#fff',
            fontSize: '10'
          },
          splitLine: {
            lineStyle: {
              color: '#fff',
              width: 1,
              type: 'solid',
              opacity: 0.1
            }
          },
          axisLine: {
            lineStyle: {
              color: '#B9C8DB'
            }
          },
          axisTick: { show: false }
        },
        series: data || []
      }
      this.bjlsOption.myChart.setOption(option)
    },
    // 监听窗口改变，两个echarts刷新
    watchEchart () {
      if (this.xmflOption.myChart) {
        this.xmflOption.myChart.resize()
      }
      if (this.bjflOption.myChart) {
        this.bjflOption.myChart.resize()
      }
      if (this.bjlsOption.myChart) {
        this.bjlsOption.myChart.resize()
      }
    },
    // 图例点击事件---obj是data里面定义的图表对象
    echartClick (index, obj) {
      if (obj === 'xmflOption' || obj === 'bjflOption') {
        // 点击回调，如果点击同一个图例，则直接清除高亮
        if (this[obj].curIndex !== null && index === this[obj].curIndex) {
          this[obj].curIndex = null
          this[obj].myChart.dispatchAction({
            type: 'downplay', seriesIndex: 0, dataIndex: index
          })
        } else {
          // 如果上一个点击的图例不为空，则清除上一个
          if (this[obj].curIndex !== null) {
            this[obj].myChart.dispatchAction({
              type: 'downplay', seriesIndex: 0, dataIndex: this[obj].curIndex
            })
          }
          // 新点击的图例高亮
          this[obj].myChart.dispatchAction({
            type: 'highlight', seriesIndex: 0, dataIndex: index
          })
          // 保存当前点击的图例的索引
          this[obj].curIndex = index
        }
      } else if (this.bjlsOption.list.length > 0) {
        // 清除历史统计数据
        this[obj].myChart.clear()
        // 如果相同图例，则重新渲染所有数据
        if (index === this[obj].curIndex) {
          this[obj].curIndex = null
          this.setBjlsEchart(this[obj].list, this[obj].xlist)
        } else {
          // 如果不同的图例，则过滤出当前图例并重新渲染
          const list = this[obj].list.filter((i, dex) => dex === index)
          this.setBjlsEchart(list, this[obj].xlist, index)
          this[obj].curIndex = index
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// ----公共
/deep/ .beau-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  .beautiful-card,
  .xmbj-card {
    height: 50%;
  }
}
.be-table-list /deep/ .cell {
  font-size: 14px;
}
.echart-legend {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.echart-legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 0.875rem;
  height: 45px;
  background: #2f71ff33;
  color: #fff;
  width: calc(33.33% - 10px);
  margin: 5px;
  cursor: pointer;
  padding: 0 12px;
  transition: background 0.5s;
  > i {
    width: 20px;
    height: 8px;
    border-radius: 5px;
    margin-right: 20px;
    flex-shrink: 0;
  }
  .legend-name {
    width: 120px;
    flex-shrink: 0;
    text-align: left;
  }
  .legend-value {
    flex-shrink: 1;
    width: 50%;
  }
}
.active-legend {
  background: #2f71ffce;
}
.form-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  .el-select,
  .el-cascader {
    width: 150px;
  }
  .el-date-editor {
    width: 270px;
  }
}
.jkdw-card,
.xmfl-card,
.bjfl-card {
  width: 33%;
  flex-grow: 1;
}
.sssj-card,
.xmbj-card {
  position: relative;
  width: 28%;
  flex-shrink: 0;
  text-align: right;
}
.bjls-card {
  flex: 1;
  width: 40%;
}
// ----单个模块
.xmfl-card .echart-legend {
  padding: 0 25px;
}
.bjfl-card .echart-legend {
  padding: 0 30px;
}
.bjfl-card .echart-legend-item {
  background: transparent;
  height: 20px;
}
.jkdw-card .video {
  height: calc(100% - 47px);
}
.jkdw-card .form-select::before {
  // 为了适应flex布局右边
  content: "";
}
.xmbj-card {
  .xmbj-info,
  .xmbj-list {
    height: 100%;
    width: 100%;
  }
  .be-table-list {
    height: calc(100% - 101px);
  }
}
.xmbj-info {
  position: absolute;
  top: 0;
  right: 100%;
  background-color: var(--wrapper-bgcolor);
  .close--icon {
    top: 8px;
    right: 8px;
    font-size: 20px;
  }
}

/deep/ .be-table-ul {
  height: 100%;
}
#xmflEchart {
  width: 100%;
  height: calc(100% - 110px);
}
#bjflEchart {
  width: 100%;
  height: calc(100% - 110px);
}
#bjlsEchart {
  width: calc(100% - 140px);
  height: 100%;
}
.bjls-content {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 55px);
}
.bjls-card {
  .echart-legend {
    width: 129px;
    flex-shrink: 0;
  }
  .echart-legend-item {
    width: 100%;
  }
}
</style>