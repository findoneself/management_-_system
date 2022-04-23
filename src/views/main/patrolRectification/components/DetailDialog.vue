<template>
  <!--超过90天未竣工 -->
  <div
    v-if="dialogVisible"
    id="detail_dialog"
    :modal='false'
  >
    <div class="title">
      <h2>{{title}}</h2>
      <i
        class="el-icon-close"
        @click="closeClickAdd"
      ></i>
    </div>
    <el-form
      :inline="true"
      size="medium"
      class="demo-form-inline"
      v-if="isForm"
    >
      <el-form-item label="整改项目">
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
      <el-form-item label="整改类型">
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
      <el-form-item label="整改开始日期">
        <el-date-picker
          v-model="dataForm.rectificationBeginTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="整改结束日期">
        <el-date-picker
          v-model="dataForm.rectificationEndTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="整改内容">
        <el-input
          type="textarea"
          :rows="2"
          v-model="dataForm.rectificationContent"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="整改前图片">
        <el-upload
          class="upload-demo"
          v-model="dataForm.beforeFileList"
          action='#'
          :auto-upload='false'
          :on-change="handleChange1"
          :file-list="dataForm.beforeFileList"
          :limit='3'
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
      <el-form-item label="整改后图片">
        <el-upload
          class="upload-demo"
          v-model="dataForm.afterFileList"
          action='#'
          :auto-upload='false'
          :on-change="handleChange2"
          :file-list="dataForm.afterFileList"
          :limit='3'
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
      size="medium"
      class="demo-form-inline"
      v-else
    >
      <el-form-item label="整改项目">
        <el-select
          v-model="dataForm.projectName"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in dictOptions.projectList"
            :key="item.prop"
            :label="item.name"
            :value="item.prop"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="整改类型">
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
      <el-form-item label="整改开始日期">
        <el-date-picker
          v-model="dataForm.date"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="dataForm.date"
          type="daterange"
          align="right"
          unlink-panels
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="整改内容">
        <el-input
          type="textarea"
          :rows="2"
          v-model="dataForm.rectificationContent"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="整改前图片">
        <el-upload
          class="upload-demo"
          v-model="dataForm.beforeFileList"
          action='#'
          :auto-upload='false'
          :on-change="handleChange1"
          :file-list="dataForm.beforeFileList"
          :limit='3'
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
      <el-form-item label="整改后图片">
        <el-upload
          class="upload-demo"
          v-model="dataForm.afterFileList"
          action='#'
          :auto-upload='false'
          :on-change="handleChange2"
          :file-list="dataForm.afterFileList"
          :limit='3'
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
          date: '',
          rectificationContent: '', // 整改内容
          rectificationBeginTime: '', // 开始时间
          rectificationEndTime: '', // 整改结束
          beforeFileList: [], // 整改前的图片
          afterFileList: [] // 整改后图片
        }
      }
    }
  },
  data () {
    return {
      dataLoading: false,
      // dataForm: {
      //   projectName: '', // 整改项目
      //   rectificationName: '', // 整改类型
      //   date: this.$format.getTwodaysTime(),
      //   rectificationContent: '', // 整改内容
      //   rectificationBeginTime: '', // 开始时间
      //   beforeFileList: [], // 整改前的图片
      //   afterFileList: [] // 整改后图片
      // },
      dictOptions: {
        projectList: [],
        typeList: []
      },
      dialogTitle: '',
      isAddVisible: false,
      name: '',
      fileList1: [],
      fileList2: [],
      api: {
        uploadApi: '/communal/file/upload',
        projectPickerApi: '/integration/project/getProjectsByWgPhone/',
        addApi: '/integration/rectification/add', // 新增整改记录
        typeApi: '/integration/rectificationType/list', // 增改分类
        editZG: '/integration/rectification/edit'// 整改编辑

      }
    }
  },
  created () {
    this.getProjectData()
    this.getTypeData()
  },
  mounted () {
    console.log(this.dataForm)
  },
  methods: {
    getProjectData () {
      this.$http({
        url: this.api.projectPickerApi + sessionStorage.getItem('userId')
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          this.dictOptions.projectList = data || []
          console.log(data, this.dictOptions.projectList)
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
    closeClickAdd () {
      this.$emit('closeDialog')
      this.name = ''
      this.dataForm = {
        projectName: '', // 整改项目
        rectificationName: '', // 整改类型
        date: this.$format.getTwodaysTime(),
        rectificationContent: '', // 整改内容
        rectificationBeginTime: '', // 开始时间
        beforeFileList: [], // 整改前的图片
        afterFileList: [] // 整改后图片
      }
    },
    handleChange1 (file) {
      let formData = this.beforeUpload(file)
      this.uploadImg(formData, 1)

    },
    handleChange2 (file) {
      let formData = this.beforeUpload(file)
      this.uploadImg(formData, 2)

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
          console.log(this.fileList, data)
          if (num === 1) {
            this.dataForm.beforeFileList.push({ name: data })
          } else {
            this.dataForm.afterFileList.push({ name: data })
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
    addSubmit () {
      console.log(this.dataForm)
      // 处理参数
      let { projectName, beforeFileList, afterFileList, rectificationName } = this.dataForm
      let beforeFileLists = []
      beforeFileList && beforeFileList.map(i => {
        beforeFileLists.push({ fileUrl: i.name })
      })
      this.dataForm.beforeFileList = beforeFileLists || []
      let afterFileLists = []
      afterFileList && afterFileList.map(i => {
        afterFileLists.push({ fileUrl: i.name })
      })
      this.dataForm.afterFileList = afterFileLists || []
      console.log(projectName, this.dictOptions.projectList.find(i => i.projectName === projectName))
      // 完结
      console.log(beforeFileList, afterFileList, this.dataForm)
      let str = this.title.slice(0, 2)
      if (str === '新增') {
        this.submitData(this.api.addApi, 'post')
      } else {
        this.submitData(this.api.editZG, 'put')
      }

    },
    submitData (url, method) {
      this.$http({
        url,
        method,
        data: {
          projectId: this.dictOptions.projectList.find(i => i.projectName === this.dataForm.projectName).projectId,
          rectificationTypeId: this.dictOptions.typeList.find(i => i.rectificationName === this.dataForm.rectificationName).rectificationTypeId,
          ...this.dataForm
        }
      }).then(res => {
        console.log(res)
        // 如果获取到数据
        if (res.data.code === 200) {
          this.$message.success('提交成功！')
          this.closeClickAdd()
        } else {
          this.$message.error('提交失败！')
        }
      })
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
  width: 100px;
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