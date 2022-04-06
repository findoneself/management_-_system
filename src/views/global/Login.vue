<template>
  <div id="login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img
          src="~_ats/img/form.jpg"
          alt=""
        />
      </div>
      <!-- 登录表单区域 -->
      <div class="login-form">
        <div class="title">本初一体化平台</div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
              v-model="loginForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            prop="yzm"
            class="yam_box"
          >
            <el-input
              placeholder="请输入验证码"
              prefix-icon="el-icon-unlock"
              v-model="loginForm.yzm"
              type="yzm"
            ></el-input>
            <img
              class="yzm_img"
              src="../../assets/img/book.png"
              alt=""
            >
          </el-form-item> -->
          <el-form-item class="login-button">
            <el-button
              type="primary"
              @click="loginClick"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// 导入Vuex
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: '18994585055',
        password: 'admin123',
        yzm: ''
      },
      // 表单的验证规则
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '用户名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^(\w){6,15}$/,
            message: '密码由6-15个字母、数字、下划线组成',
            trigger: 'blur'
          }
        ],
        yzm: [
          {
            required: false
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({ getUserInfo: 'global/getUserInfo' }),
    // 登录按钮
    loginClick () {
      this.$http({
        url: '/gridmember/login',
        method: 'post',
        data: this.loginForm
      }).then(res => {
        const { data, code, msg } = res.data
        if (code === 200) {
          let token = data.access_token
          this.$cookie.setItem(token)
        } else {
          this.$message.error(msg || '登录失败')
        }
        const userId = res.id || '1'
        // 登录成功获取用户信息
        this.getUserInfo(userId).then((user) => {
          if (user.isUser) {
            // 获取信息成功跳转至主页
            this.$router.push({ name: 'main', props: { userId: userId } })
          } else {
            // 获取用户信息失败
            if (!user.isUser) this.$message.error(user.message)
          }
        })
      }, () => {
        // 登录失败
        this.$message.error('toke验证失效或不存在此账户!')
        // ----以下逻辑仅为测试
        // 登录成功获取用户信息
        this.getUserInfo('1').then((user) => {
          // 获取用户信息失败
          this.$router.push({ name: 'main', params: { userId: '1' } })
          if (!user.isUser) this.$message.error(user.message)
        })
      })
    },
    // 重置按钮
    resetForm () {
      // resetFields是element-ui的表单组件方法
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  display: grid;
  place-items: center;
  height: 100%;
  background: #eee url("../../assets/img/back.jpg") no-repeat center top;
  background-size: 100% 100%;
}
.login-box {
  position: relative;
  width: 60%;
  height: 60%;
  border-radius: 3px;
  background-color: #fff;
  display: flex;
}
.avatar-box {
  width: 60%;
  height: 100%;
  border-radius: 50%;
  background-color: inherit;
  img {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
}
.login-form {
  width: 40%;
  padding: 0 20px;
  .title {
    height: 200px;
    font-size: 2.5rem;
    line-height: 200px;
    color: #2b9afc;
    font-weight: 600;
    text-align: center;
  }
  .el-form {
    width: 70%;
    margin: auto;
  }
}
/deep/.el-input__icon {
  font-size: 25px;
  margin-right: 10px;
}
/deep/.el-form-item__content {
  width: 100%;
  height: 50px;
  display: flex;
}
/deep/button.el-button {
  background: #2b9afc;
  border-radius: 5px;
  font-size: 20px;
  width: 100%;
  // margin: 15px 0;
}
/deep/.el-form .el-form-item:last-of-type {
  margin-top: 50px;
}
/deep/.el-button.el-button--primary:hover,
.el-button.el-button--primary:focus {
  background: #228eee;
}
/deep/.el-input .el-input__inner,
.el-date-editor.el-input__inner,
div.el-select-dropdown,
div.el-picker-panel,
div.el-picker-panel [slot="sidebar"],
div.el-picker-panel__sidebar {
  background: #fff;
  box-shadow: none;
  border-color: #eeeeee;
  color: #9f9f9f;
  height: 50px;
  font-size: 20px;
  padding-left: 2.5rem;
}
.login-button {
  display: flex;
  justify-content: flex-end;
}

.yzm_img {
  width: 45%;
}
</style>
