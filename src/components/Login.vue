<template>
  <div class="login_box">
    <div class="login_form">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div class="login_form_inputMSG">
        <!--登入表单-->
        <el-form label-width="80px" :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-goods"  placeholder="请输入密码"
                      type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!--按钮区域-->
        <el-row class="btns">
          <el-button type="primary" @click="login_up">登入</el-button>
          <el-button type="info" @click="login_reset">重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      //  登入表单绑定数据对象
      loginForm: {
        username: '',
        password: ''
      },
      //  表单验证规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  登入处理
    login_up () {
      this.$refs.loginFormRef.validate(async (flag) => {
        if (!flag) {
          this.$message.error('错误请重新输入')
          return true
        } else {
          // 发送请求(使用axios)
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            // 存储token值
            window.sessionStorage.setItem('token', res.data.token)

            // 跳转管理到主页
            this.$router.push('home')
          } else {
            this.$message({
              message: res.meta.msg,
              type: 'error'
            })
          }
        }
      })
    },
    //  重置表单
    login_reset () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login_box {
    height: 100%;
    background-color: #2b4b6b;

    .login_form {
      width: 450px;
      height: 300px;
      background-color: #fff;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .logo {
        position: absolute;
        left: 50%;
        top: 3%;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0 0 10px #dddddd;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .login_form_inputMSG{
        position: absolute;
        bottom: 0;
        width: 80%;

        .btns{
          margin-left: 22%;
          margin-bottom: 2%;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
</style>
