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
      <el-form-item label="整改日期">
        <el-input
          v-model="name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="整改内容">
        <el-input
          v-model="name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="upload-demo"
          action
          :on-preview="handlePreview"
          :on-change="handleChange"
          :file-list="fileList"
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
    }
  },
  data () {
    return {
      dataLoading: false,
      dataForm: { projectName: '' },
      dictOptions: {
        projectList: []

      },
      dialogTitle: '',
      isAddVisible: false,
      name: '',
      fileList: [],

      api: {
        uploadApi: '/communal/file/upload',
        projectPickerApi: '/integration/project/getProjectsByWgPhone/'
      }
    }
  },
  created () {
    this.getProjectData()
  },
  methods: {
    getProjectData () {
      this.$http({
        url: this.api.dataListApi + sessionStorage.getItem('userId')
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
    closeClickAdd () {
      this.$emit('closeDialog')
      this.name = ''
    },
    handleChange (file) {
      const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg']
      const isJPG = typeArr.indexOf(file.raw.type) !== -1
      if (!isJPG) {
        this.$message.error('只能是图片!')
        // this.$refs.upload.clearFiles()
        this.files = null
        return
      }
      console.log(file)
    },
    addSubmit () {
      this.$http({
        url: '/xczg/getEchartData',
        data: this.name
      }).then(res => {
        // 如果获取到数据
        if (res.code === 200) {
          console.log(res)
          this.$message.info('提交成功！')
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
  width: 40%;
  height: 70%;
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
  margin-left: 2rem;
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