<template>
  <!--新增修改弹窗 -->
  <div
    v-if="dialogVisible"
    id="detail_dialog"
    :modal='false'
  >
    <div class="title">
      <h2>{{title}}</h2>
      <i
        class="el-icon-close"
        @click="closeClickAdd('false')"
      ></i>
    </div>
    <el-form
      :inline="true"
      :rules="zgRules"
      ref="zgForm"
      :model='dataForm'
      size="medium"
      class="demo-form-inline"
      v-if="isForm"
    >
      <el-form-item
        label="整改项目"
        prop="projectName"
      >
        <el-select
          v-model="dataForm.projectName"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictOptions.projectList"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="整改类型"
        prop="rectificationName"
      >
        <el-select
          v-model="dataForm.rectificationName"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictOptions.typeList"
            :key="item.rectificationTypeId"
            :label="item.rectificationName"
            :value="item.rectificationName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="整改开始日期"
        prop="rectificationBeginTime"
      >
        <el-date-picker
          v-model="dataForm.rectificationBeginTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="整改结束日期"
        prop="rectificationEndTime"
      >
        <el-date-picker
          v-model="dataForm.rectificationEndTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item
        label="整改内容"
        prop="rectificationContent"
      >
        <el-input
          type="textarea"
          :rows="2"
          v-model="dataForm.rectificationContent"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="整改前图片"
        prop="beforeFileList"
      >
        <el-upload
          class="upload-demo"
          v-model="dataForm.beforeFileList"
          action='#'
          :auto-upload='false'
          :on-remove="(file, fileList)=>{handleRemove(file, fileList,'zgq')}"
          :on-change="handleChange1"
          :file-list="dataForm.beforeFileList"
          :limit='4'
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <!-- <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item
        label="整改后图片"
        prop="afterFileList"
      >
        <el-upload
          class="upload-demo"
          v-model="dataForm.afterFileList"
          action='#'
          :auto-upload='false'
          :on-change="handleChange2"
          :file-list="dataForm.afterFileList"
          :on-remove="(file, fileList)=>{handleRemove(file, fileList,'zgh')}"
          :limit='4'
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <!-- <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model='dataForm1'
      :rules="xcRules"
      ref="xcForm"
      size="medium"
      class="demo-form-inline"
      v-else
    >
      <el-form-item
        label="巡查项目"
        prop="projectList"
      >
        <el-select
          v-model="dataForm1.projectList"
          clearable
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictOptions.projectList"
            :key="item.projectId"
            :label="item.projectName"
            :value="item.projectName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="巡查分类"
        prop="patrolName"
      >
        <el-select
          v-model="dataForm1.patrolName"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictOptions.patrolTypeList"
            :key="item.patrolTypeId"
            :label="item.patrolName"
            :value="item.patrolName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="巡查日期"
        prop="patrolTime"
      >
        <el-date-picker
          v-model="dataForm1.patrolTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="巡查内容"
        prop="patrolContent"
      >
        <el-input
          type="textarea"
          :rows="2"
          v-model="dataForm1.patrolContent"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图片"
        prop="fileList"
      >
        <el-upload
          class="upload-demo"
          v-model="dataForm1.fileList"
          action='#'
          :auto-upload='false'
          :on-change="handleChange3"
          :file-list="dataForm1.fileList"
          :limit='3'
          :on-remove="(file, fileList)=>{handleRemove(file, fileList,'xc')}"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <!-- <div
            slot="tip"
            class="el-upload__tip"
          >只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button @click="addSubmit">提交</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProjectOverdue',
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: true
    },
    isForm: {
      type: Boolean,
      default: true
    },
    dataForm: {
      type: Object,
      default () {
        return {
          projectName: '', // 整改项目
          rectificationName: '', // 整改类型
          rectificationContent: '', // 整改内容
          rectificationBeginTime: '', // 开始时间
          rectificationEndTime: '', // 整改结束
          beforeFileList: [], // 整改前的图片
          afterFileList: [] // 整改后图片
        }
      }
    },
    dataForm1: {
      type: Object,
      default () {
        return {
          projectList: [], // 巡查项目
          patrolName: '', // 巡查分类
          patrolContent: '', // 巡查内容
          patrolTime: '', // 时间
          fileList: [], // 图片
          patrolTypeId: '' // 巡查分类id
        }
      }
    }
  },
  data () {
    return {
      dataLoading: false,
      dictOptions: {
        projectList: [],
        typeList: [],
        patrolTypeList: []
      },
      zgRules: {
        projectName: [
          {
            required: true,
            message: '整改项目不能为空',
            trigger: 'blur'
          }
        ],
        rectificationName: [
          {
            required: true,
            message: '整改类型不能为空',
            trigger: 'blur'
          }
        ],
        rectificationContent: [
          {
            required: true,
            message: '整改内容不能为空',
            trigger: 'blur'
          }
        ],
        rectificationBeginTime: [
          {
            required: true,
            message: '整改开始时间不能为空',
            trigger: 'blur'
          }
        ],
        rectificationEndTime: [
          {
            required: false
          }
        ],
        beforeFileList: [
          {
            required: false
          }
        ],
        afterFileList: [
          {
            required: false
          }
        ]
      },
      xcRules: {
        projectList: [
          {
            required: true,
            message: '巡查项目不能为空',
            trigger: 'blur'
          }
        ],
        patrolName: [
          {
            required: true,
            message: '巡查分类不能为空',
            trigger: 'blur'
          }
        ],
        patrolContent: [
          {
            required: true,
            message: '巡查内容不能为空',
            trigger: 'blur'
          }
        ],
        patrolTime: [
          {
            required: true,
            message: '巡查时间不能为空',
            trigger: 'blur'
          }
        ],
        fileList: [
          {
            required: false
          }
        ]
      },
      api: {
        uploadApi: '/communal/file/upload',
        projectPickerApi: '/integration/project/getProjectsByWgPhone/',
        addApi: '/integration/rectification/add', // 新增整改记录
        typeApi: '/integration/rectificationType/list', // 增改分类
        editZG: '/integration/rectification/editFromWg', // 整改编辑
        patrolAdd: '/integration/patrol/addFromWg', // 巡查新增
        patrolEdit: '/integration/patrol/editFromWg', // 巡查修改
        patrolTypeList: '/integration/patrolType/list' // 巡查分类下拉

      }
    }
  },
  watch: {
    isForm: {
      handler () {
        console.log(this.isForm)
      },
      deep: true
    }
  },
  created () {

    this.getProjectData()
    this.getTypeData()
    this.getpatrolTypeList()
  },
  mounted () {
  },
  methods: {
    getProjectData () {
      this.$http({
        url: this.api.projectPickerApi + sessionStorage.getItem('userId')
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.dictOptions.projectList = data || []
        } else {
          this.$message.error(msg || '获取项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    getTypeData () {
      this.$http({
        url: this.api.typeApi
      }).then(res => {
        const { rows, code, msg } = res.data
        if (code === 200) {
          this.dictOptions.typeList = rows || []

        } else {
          this.$message.error(msg || '获取项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    getpatrolTypeList () {
      this.$http({
        url: this.api.patrolTypeList
      }).then(res => {
        const { rows, code, msg } = res.data
        if (code === 200) {
          this.dictOptions.patrolTypeList = rows || []

        } else {
          this.$message.error(msg || '获取分类错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    closeClickAdd (val) {
      this.$emit('closeDialog', val)
      // this.name = ''
      this.dataForm = {
        projectName: '', // 整改项目
        rectificationName: '', // 整改类型
        rectificationContent: '', // 整改内容
        rectificationBeginTime: '', // 开始时间
        beforeFileList: [], // 整改前的图片
        afterFileList: [] // 整改后图片
      }
      this.dataForm1 = {
        projectList: [], // 巡查项目
        patrolType: '', // 巡查分类
        patrolTypeId: '', // 巡查分类id
        patrolContent: '', // 巡查内容
        patrolTime: '', // 时间
        fileList: [] // 图片

      }
      console.log(this.dataForm1)
    },
    handleChange1 (file) {
      let formData = this.beforeUpload(file)
      this.uploadImg(formData, 1)

    },
    handleChange2 (file) {
      let formData = this.beforeUpload(file)
      this.uploadImg(formData, 2)
    },
    handleChange3 (file) {
      let formData = this.beforeUpload(file)
      this.uploadImg(formData, 3)

    },
    uploadImg (formData, num) {
      this.$http({
        url: this.api.uploadApi,
        data: formData,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + this.$cookie.get('token') || ''
        }
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          if (num === 1) {
            this.dataForm.beforeFileList.push({ name: data })
          } else if (num === 2) {
            this.dataForm.afterFileList.push({ name: data })
          } else {
            console.log(this.dataForm1.fileList)
            this.dataForm1.fileList.push({ name: data })
          }
        } else {
          this.$message.error(msg || '获取项目错误')
        }
      }, (err) => {
        this.$message.error(err.data.msg || err.data.error)
      })
    },
    beforeUpload (file) {
      const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg']
      const isJPG = typeArr.indexOf(file.raw.type) !== -1
      if (!isJPG) {
        this.$message.error('只能是图片!')
        // this.$refs.upload.clearFiles()
        this.files = null
        return
      }
      this.imgFiles = file.raw
      // FormData 对象
      var formData = new FormData()
      // 文件对象
      formData.append('file', this.imgFiles)
      return formData
    },
    async addSubmit () {
      let str = this.title.slice(0, 2)
      if (str === '新增' && this.isForm) {
        this.changeDataForm('整改')
        this.submitData(this.api.addApi, 'post', 'zgxz')
      } else if (str === '修改' && this.isForm) {
        this.changeDataForm('整改')
        this.submitData(this.api.editZG, 'put', 'zgxg')
      } else if (str === '新增' && !this.isForm) {
        let res = await this.changeDataForm('巡查')
        console.log(res)
        res && this.submitData(this.api.patrolAdd, 'post', 'xcxz')
      } else if (str === '修改' && !this.isForm) {
        this.changeDataForm('巡查')
        this.submitData(this.api.patrolEdit, 'put', 'xcxg')
      }
    },
    submitData (url, method, val) {
      let data = {}
      if (this.isForm) {
        console.log(123)
        this.$refs.zgForm.validate(async valid => {
          console.log(valid)
          if (!valid) return
          if (val === 'zgxz') {
            data = {
              projectId: this.dictOptions.projectList.find(i => i.projectName === this.dataForm.projectName).projectId,
              rectificationTypeId: this.dictOptions.typeList.find(i => i.rectificationName === this.dataForm.rectificationName).rectificationTypeId,
              ...this.dataForm
            }
          } else if (val === 'zgxg') {
            data = this.dataForm
          }
          this.submitHandel(url, method, data)
        })
      } else {
        this.$refs.xcForm.validate(async valid => {
          if (!valid) return
          if (val === 'xcxz') {
            let { projectList, patrolName } = this.dataForm1
            let projectLists = []
            this.dictOptions.projectList.map(i => {
              projectList.map(j => {
                if (i.projectName === j) {
                  projectLists.push({ 'projectId': i.projectId, 'projectName': j })
                }
              })
            })
            this.dictOptions.patrolTypeList.map(i => {
              if (i.patrolName === patrolName) {
                this.dataForm1.patrolTypeId = i.patrolTypeId
              }
            })
            this.dataForm1.phoneNumber = sessionStorage.getItem('userId')
            this.dataForm1.projectList = projectLists
            data = this.dataForm1
          } else {
            data = this.dataForm1
          }
          this.submitHandel(url, method, data)
        })
      }

      // if (val === 'zgxz') {

      //   data = {
      //     projectId: this.dictOptions.projectList.find(i => i.projectName === this.dataForm.projectName).projectId,
      //     rectificationTypeId: this.dictOptions.typeList.find(i => i.rectificationName === this.dataForm.rectificationName).rectificationTypeId,
      //     ...this.dataForm
      //   }
      // } else if (val === 'zgxg') {
      //   data = this.dataForm
      // } else if (val === 'xcxz') {
      //   let { projectList, patrolName } = this.dataForm1
      //   let projectLists = []
      //   this.dictOptions.projectList.map(i => {
      //     projectList.map(j => {
      //       if (i.projectName === j) {
      //         projectLists.push({ 'projectId': i.projectId, 'projectName': j })
      //       }
      //     })
      //   })
      //   this.dictOptions.patrolTypeList.map(i => {
      //     if (i.patrolName === patrolName) {
      //       this.dataForm1.patrolTypeId = i.patrolTypeId
      //     }
      //   })
      //   this.dataForm1.phoneNumber = sessionStorage.getItem('userId')
      //   this.dataForm1.projectList = projectLists
      //   data = this.dataForm1
      // } else {
      //   data = this.dataForm1
      // }

    },
    submitHandel (url, method, data) {
      this.$http({
        url,
        method,
        data
      }).then(res => {
        console.log(res)
        // 如果获取到数据
        if (res.data.code === 200) {
          this.$message.success('提交成功！')
          this.closeClickAdd('true')
        } else {
          this.$message.error('提交失败！')
        }
      })
    },
    changeDataForm (val) {
      if (val === '整改') {
        let { beforeFileList, afterFileList } = this.dataForm
        let beforeFileLists = []
        beforeFileList && beforeFileList.map(i => {
          i.fileUrl ? beforeFileLists.push(i) : beforeFileLists.push({ fileUrl: i.name })
        })
        this.dataForm.beforeFileList = beforeFileLists || []
        let afterFileLists = []
        afterFileList && afterFileList.map(i => {
          i.fileUrl ? afterFileLists.push(i) : afterFileLists.push({ fileUrl: i.name })
        })
        this.dataForm.afterFileList = afterFileLists || []
        return this.dataForm
      } else {
        let { fileList } = this.dataForm1
        let fileLists = []
        fileList && fileList.map(i => {
          i.fileUrl ? fileLists.push(i) : fileLists.push({ fileUrl: i.name })
        })
        this.dataForm1.fileList = fileLists || []
        return this.dataForm1
      }
    },
    handleRemove (file, fileList, val) {
      console.log(file, fileList, val)
      if (val === 'zgq') {
        let res = this.dataForm.beforeFileList.findIndex(i => i.fileUrl === file.fileUrl)
        this.dataForm.beforeFileList.splice(res, 1)
      } else if (val === 'zgh') {
        let res = this.dataForm.afterFileList.findIndex(i => i.fileUrl === file.fileUrl)
        this.dataForm.afterFileList.splice(res, 1)
      } else {
        let res = this.dataForm1.fileList.findIndex(i => i.fileUrl === file.fileUrl)
        this.dataForm1.fileList.splice(res, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#detail_dialog {
  margin: 8.125rem 1.25rem 1.25rem 1.25rem;
  .input_project {
    position: relative;
    .el-icon-search {
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
      color: #fff;
    }
  }
  /deep/.el-dialog {
    width: 100%;
    height: 100%;
    margin: 0 !important;
  }
  /deep/.el-dialog__header {
    display: none;
  }
  /deep/.el-dialog__body {
    height: 100%;
    padding: 0;
    .beautiful-wrapper {
      padding: 0 !important;
    }
  }
}
/deep/.el-form--inline .el-form-item__label {
  width: 120px;
}
/deep/ .menu-tablist > li {
  width: 226px;
  color: #fff;
}
/deep/ .menu-tablist .tab-shadow {
  margin-left: -206px;
}
.el-button {
  color: #fff;
}
.el-input {
  width: 20rem;
}
/deep/.be-table-item .cell {
  color: #fff;
}
/deep/.be-ishead-content {
  // height: 0;
}
/deep/.be-table-list,
.be-table-ul {
  padding: 1rem;
}
#detail_dialog {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0b1771;
  color: #fff;
  border: 1px solid #0a44ff;
  .title {
    padding: 20px;
    border-bottom: 1px solid #fff;
    display: flex;
    justify-content: space-between;
    .el-icon-close {
      font-size: 20px;
    }
  }
  .demo-form-inline {
    margin: 40px;
    /deep/.el-form-item {
      width: 100%;
    }
  }
  .button {
    text-align: center;
    margin: 20px 0;
  }
}
.upload-demo {
  // margin-left: 2rem;
}
.deleteDia {
  width: 30%;
  height: 250px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  h3 {
    text-align: center;
    margin: 45px;
  }
}
</style>