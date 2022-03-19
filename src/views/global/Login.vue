<template>
  <div id="login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img
          src="~_ats/img/login-logo.png"
          alt=""
        />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="login-form demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="iconfont iconuser"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="iconfont icon3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-button">
          <el-button
            type="primary"
            @click="loginClick"
          >登录</el-button>
          <el-button
            type="info"
            @click="resetForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
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
        username: 'admin',
        password: '123456'
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
        ]
      }
    }
  },
  methods: {
    ...mapActions({ getUserInfo: 'global/getUserInfo' }),
    // 登录按钮
    loginClick () {
      this.$http({
        url: '/login',
        methods: 'post',
        data: {
          username: 'admin',
          password: '1'
        }
      }).then(res => {
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
        this.$message.error('toke验证失效或不存在此账户！')
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
  background-color: #2b4b6b;
}
.login-box {
  position: relative;
  width: 450px;
  height: 300px;
  border-radius: 3px;
  background-color: #fff;
}
.avatar-box {
  position: absolute;
  left: 50%;
  width: 130px;
  height: 130px;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  background-color: inherit;
  img {
    display: block;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}
.login-button {
  display: flex;
  justify-content: flex-end;
}
</style>
